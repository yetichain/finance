import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import PaginateWithMore from 'components/PaginateWithMore'
import { usePaginate } from 'components/Pagination/hooks/usePaginate'
import { orderBy } from 'lodash'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Farm } from 'state/types'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import { latinise } from 'utils/farm/latinise'
import AvailableAccount from 'views/InvestorsAccount/components/AvailableAccount'
import FarmBanner from './components/FarmBanner'
import FarmContent from './components/FarmContent'
import FarmFilters from './components/FarmFilters'
import FarmLoader from './components/Loaders/FarmLoader'
import TicketBanner from './components/TicketBanner'
import FarmContainer from './FarmContainer'
import { FarmTab, FarmWithStakedValue } from './farms.types'
import useBlockReward from './hooks/useBlockReward'
import { useFarms, usePollFarmsWithUserData, usePriceAlmBusd } from './hooks/useFarmingPools'
import { useFarmsPooling } from './hooks/useFarmsPooling'

const NUMBER_OF_FARMS_VISIBLE = 12

const Farms = () => {
  const { t } = useTranslation()
  const { pathname } = useRouter()
  // Farm hooks
  const farmsLP = useFarms()

  const almPrice = usePriceAlmBusd()
  // Farm Filters
  const query = useStoreFarms((state) => state.query)
  const viewMode = useStoreFarms((state) => state.viewMode)
  const sortOption = useStoreFarms((state) => state.sortOption)
  const stakedOnly = useStoreFarms((state) => state.stakedOnly)
  const activeTab = useStoreFarms((state) => state.activeTab)
  const blockReward = useBlockReward()
  const { account } = useWeb3React()
  useFarmsPooling(account)

  const chosenFarmsLength = useRef(0)

  const isArchived = pathname.includes('archived')
  const isInactive = activeTab === FarmTab.finished
  const isActive = !isInactive && !isArchived
  // Loaders
  const { farmsUserDataLoading: userDataLoaded } = usePollFarmsWithUserData(isArchived)
  const ticketLoader = useStoreFarms((state) => state.ticketLoader)
  const slowUpdate = useStoreFarms((state) => state.slowUpdate)

  // filters

  const { activeFarms, inactiveFarms } = useMemo(() => {
    const activeFarms: Farm[] = []
    const inactiveFarms: Farm[] = []
    farmsLP.forEach((farm) => {
      if (farm.multiplier && farm.allocPoint && blockReward) {
        if (farm.multiplier !== '0X' && !farm.allocPoint.eq(0) && !blockReward.eq(0)) {
          activeFarms.push(farm)
        } else {
          inactiveFarms.push(farm)
        }
      }
    })
    return {
      activeFarms,
      inactiveFarms,
    }
  }, [blockReward, farmsLP, slowUpdate, userDataLoaded])

  const stakedOnlyFarms = activeFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const stakedInactiveFarms = inactiveFarms.filter(
    (farm) => farm.userData && new BigNumber(farm.userData.stakedBalance).isGreaterThan(0),
  )

  const farmsList = useCallback(
    (farmsToDisplay: Farm[]): FarmWithStakedValue[] => {
      let farmsToDisplayWithAPR = farmsToDisplay.map((farm) => {
        if (!farm.farmLpBalance) {
          return farm
        }

        return { ...farm, apr: farm?.apy }
      })

      if (query) {
        const lowercaseQuery = latinise(query.toLowerCase())
        farmsToDisplayWithAPR = farmsToDisplayWithAPR.filter((farm) => {
          return latinise(farm.lpSymbol.toLowerCase()).includes(lowercaseQuery)
        })
      }
      return farmsToDisplayWithAPR as FarmWithStakedValue[]
    },
    [almPrice, query, isActive],
  )

  const [numberOfFarmsVisible] = useState(NUMBER_OF_FARMS_VISIBLE)

  const chosenFarmsMemoized = useMemo(() => {
    let chosenFarms = []

    const sortFarms = (farms: FarmWithStakedValue[]) => {
      switch (sortOption) {
        case 'Hot':
          return orderBy(farms, (farm) => farm.apr, 'desc')
        case 'Multiplier':
          return orderBy(farms, (farm) => (farm.multiplier ? Number(farm.multiplier.slice(0, -1)) : 0), 'desc')
        case 'Earned':
          return orderBy(farms, (farm) => (farm.userData ? Number(farm.userData.earnings) : 0), 'desc')
        case 'Liquidity':
          return orderBy(farms, (farm) => Number(farm.liqudity), 'desc')
        default:
          return farms
      }
    }

    if (isActive) {
      chosenFarms = stakedOnly ? farmsList(stakedOnlyFarms) : farmsList(activeFarms)
    }
    if (isInactive) {
      chosenFarms = stakedOnly ? farmsList(stakedInactiveFarms) : farmsList(inactiveFarms)
    }

    return sortFarms(chosenFarms).slice(0, numberOfFarmsVisible)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    sortOption,
    activeFarms,
    farmsList,
    inactiveFarms,
    isActive,
    isInactive,
    stakedInactiveFarms,
    stakedOnly,
    stakedOnlyFarms,
    numberOfFarmsVisible,
    userDataLoaded,
    slowUpdate,
  ])

  chosenFarmsLength.current = chosenFarmsMemoized.length

  const { items, ...paginate } = usePaginate({ items: chosenFarmsMemoized, pageLimit: 10 })

  return (
    <FarmContainer>
      <AvailableAccount title={t('Farms')}>
        <div>
          <FarmBanner />
          <FarmFilters />
        </div>
        <FarmContent.Container>
          <FarmLoader loading={ticketLoader}>
            <TicketBanner />
            <FarmContent viewMode={viewMode} farms={items} almPrice={almPrice} />
            <PaginateWithMore {...paginate} />
          </FarmLoader>
        </FarmContent.Container>
      </AvailableAccount>
    </FarmContainer>
  )
}

export default Farms
