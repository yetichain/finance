import { useWeb3React } from '@web3-react/core'
import { Skeleton } from 'alium-uikit/src'
import PaginateWithMore from 'components/PaginateWithMore'
import { usePaginate } from 'components/Pagination/hooks/usePaginate'
import times from 'lodash/times'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { useYourPools } from 'views/StrongHoldersPool/hooks'
import ConnectWallet from '../ConnectWallet'
import EmptyYourPools from '../EmptyYourPools'
import YourPoolCard from '../YourPoolCard'

const PAGE_LIMIT = 6

export default function NestedYour() {
  const { data } = useYourPools()
  const { account } = useWeb3React()
  const { items, ...paginate } = usePaginate({
    items: data || [],
    pageLimit: PAGE_LIMIT,
  })

  if (!account) {
    return (
      <NestedYour.Root>
        <ConnectWallet />
      </NestedYour.Root>
    )
  }

  if (data?.length === 0) {
    return (
      <NestedYour.Root>
        <EmptyYourPools />
      </NestedYour.Root>
    )
  }

  return (
    <NestedYour.Root>
      <NestedYour.Pools>
        {data && items
          ? items.map((poolId) => <YourPoolCard key={poolId.toString()} poolId={poolId} />)
          : times(PAGE_LIMIT, (i) => <Skeleton animation='waves' key={i} height={400} />)}
      </NestedYour.Pools>
      <PaginateWithMore {...paginate} />
    </NestedYour.Root>
  )
}

NestedYour.Pools = styled.div`
  display: grid;
  align-items: flex-start;
  grid-template-columns: repeat(auto-fit, 546px);
  gap: 32px 30px;
`

NestedYour.Root = styled.div`
  @media ${mq.down(breakpoints.lg)} {
    ${NestedYour.Pools} {
      grid-template-columns: repeat(auto-fit, 362px);
      gap: 16px;
    }
  }

  @media ${mq.down(breakpoints.sm)} {
    padding-top: 24px;

    ${NestedYour.Pools} {
      justify-content: center;
    }
  }
`
