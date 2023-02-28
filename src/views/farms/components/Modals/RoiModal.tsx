import { Button, LinkIcon, Modal } from 'alium-uikit/src'
import React, { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'
import { getExplorerLink } from 'utils'
import {
  calculateAlmEarnedPerDollars,
  calculateApyModalRoiByEarnedDates,
  formatRoiValuesView,
} from 'utils/farm/compoundApyHelpers'
import { InfoAPRProps, useFarmLpAddress } from '../Info'

const Wrapper = styled.div`
  width: 486px;
  height: auto;
  @media ${mq.down(breakpoints.sm)} {
    width: auto;
    max-width: 360px;
  }
`

const Main = styled.div`
  background: url(/images/farms/bg/roibg.png);
  height: 208px;
  width: 100%;
  background-repeat: no-repeat;
  padding: 32px 24px;
`

const StyleRoiTable = styled.div`
  display: flex;
  justify-content: space-between;
`

const Footer = styled.div`
  padding: 16px 22px 24px 22px;
  p {
    font-style: normal;
    font-weight: normal;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`

const StyledButton = styled(Button)`
  margin-top: 16px;

  svg {
    margin-right: 16px;
    height: 24px;
    width: 24px;
  }
  &:hover {
    svg {
      path {
        fill: transparent;
      }
      stroke: white;
    }
  }
`

type RoiTable = {
  day: string
  roi: string
  per: string
}[]

const RoiModal: FC<InfoAPRProps & { onDismiss?: any }> = ({ farm, onDismiss, almPrice }) => {
  const { t } = useTranslation()
  const { apr } = farm

  const roiTableData = () => {
    const dollars = 1000
    const earns = calculateAlmEarnedPerDollars([1, 7, 30, 365], apr, almPrice, dollars)
    const roidPercents = calculateApyModalRoiByEarnedDates(earns, almPrice, dollars)
    const rois = earns.map(({ earned, date }, index) => {
      const formattedPercent = formatRoiValuesView(roidPercents[index])

      const formattedDate = date === 365 ? '365 d (APY)' : `${date} d`
      const formattedEarned = formatRoiValuesView(earned)

      const res = {
        day: formattedDate,
        roi: `${formattedPercent}%`,
        per: formattedEarned,
      }
      return res
    })
    return rois
  }

  const roiTables: RoiTable = roiTableData()
  const currentChainId = useStoreNetwork((state) => state.currentChainId)

  const link = getExplorerLink(currentChainId, useFarmLpAddress(farm), 'address')
  const tokenName = farm.lpSymbol

  return (
    <Modal title={t('ROI')} withoutContentWrapper onDismiss={onDismiss}>
      <Wrapper>
        <Main>
          <StyleRoiTable>
            <RoiRow table={roiTables} type='day' title={t('Timeframe')} />
            <RoiRow table={roiTables} type='roi' title={t('ROI')} />
            <RoiRow table={roiTables} type='per' title={t('YETI per $1000')} />
          </StyleRoiTable>
        </Main>
        <Footer>
          <p>
            {t(
              'Calculated based on current rates. Compounding once daily. Rates are estimates provided for your convenience only, and by no means represent guaranteed returns.',
            )}
          </p>
          <a href={link} target='_blank'>
            <StyledButton variant='secondary'>
              <LinkIcon />
              <h3>{t('Get {{tokenName}}', { tokenName })}</h3>
            </StyledButton>
          </a>
        </Footer>
      </Wrapper>
    </Modal>
  )
}

const Row = styled.div`
  h2 {
    font-style: normal;
    font-weight: bold;
    font-size: 12px;
    line-height: 16px;
    letter-spacing: 0.3px;
    text-transform: uppercase;
    color: #cbc8ee;
    margin-bottom: 16px;
  }
  .item-roi {
    font-style: normal;
    font-weight: 500;
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #ffffff;
    margin-bottom: 8px;
  }
`
interface RowProps {
  table: RoiTable
  type: keyof RoiTable[0]
  title: string
}
const RoiRow: FC<RowProps> = ({ table, type, title }) => {
  return (
    <Row>
      <h2 className='title-roi'>{title}</h2>
      {table.map((tab, index) => {
        return (
          <div className='item-roi' key={index}>
            {tab[type]}
          </div>
        )
      })}
    </Row>
  )
}

export default RoiModal
