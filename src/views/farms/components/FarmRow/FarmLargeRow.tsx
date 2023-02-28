import React, { useCallback } from 'react'
import FarmRow, { FarmRowViewsProps } from '.'
import { InfoDeposit, InfoDepositFee, InfoLpType, InfoTotalLiquidity, InfoViewBscScan } from '../Info'

const FarmLargeRow = ({ cells, farmClassname, isOpen, earned, farm, media }: FarmRowViewsProps) => {
  const { isXlMedia, isLGMedia } = media
  // XL view
  const detailsXlRender = useCallback(() => {
    const elements = [
      <FarmLargeRow.DepositWithLiqudity farm={farm} key={1} />,
      cells.depositFee,
      cells.lpType,
      cells.earned,
      <FarmLargeRow.HarvestWithBsc key={4} withBsc={isXlMedia} earned={earned} farm={farm} />,
    ]
    if (isLGMedia) {
      return []
    }
    if (!isXlMedia) {
      elements.push([cells.empty, cells.empty])
    } else {
      elements.push([cells.bscScanEnd, cells.empty])
    }

    return elements
  }, [cells.bscScanEnd, cells.depositFee, cells.earned, cells.empty, cells.lpType, earned, farm, isLGMedia, isXlMedia])
  // Lg view
  const detailsLgRender = useCallback(() => {
    const firstCell = [
      <FarmLargeRow.DepositWithLiqudity farm={farm} key={1} />,
      cells.earned,
      cells.harvest,
      cells.stakedButtonsOrActionsNode,
    ]
    const secondCell = [
      <FarmLargeRow.LpTypeWithDepositFee key={1} withDeposit={isLGMedia} cells={cells} farm={farm} />,
      cells.staked,
      cells.empty,
      cells.bscScanEnd,
      cells.empty,
    ]

    return { firstCell, secondCell }
  }, [cells, farm, isLGMedia])

  const onLarge = detailsXlRender()
  const { firstCell, secondCell } = detailsLgRender()

  return (
    <>
      <FarmRow.Summary className={farmClassname}>
        {!isLGMedia
          ? [
              cells.heading,
              cells.apr,
              cells.earn,
              cells.earned,
              cells.staked,
              cells.stakedButtonsOrActionsNode,
              cells.indicator,
            ]
          : [cells.heading, cells.apr, cells.earn, cells.earned, cells.indicator]}
      </FarmRow.Summary>
      {isOpen && (
        <>
          {!isLGMedia ? (
            <FarmRow.Details>{onLarge}</FarmRow.Details>
          ) : (
            <FarmRow.Details>
              <td colSpan={100}>
                <table style={{ width: '100%' }}>
                  <tbody>
                    <tr>{firstCell}</tr>
                    <tr>{secondCell}</tr>
                  </tbody>
                </table>
              </td>
            </FarmRow.Details>
          )}
        </>
      )}
      <FarmRow.Separator />
    </>
  )
}

FarmLargeRow.DepositWithLiqudity = ({ farm }: { farm: FarmRowViewsProps['farm'] }) => {
  return (
    <FarmRow.Cell>
      <FarmRow.MultipleField>
        <FarmRow.Field>
          <InfoDeposit farm={farm} />
        </FarmRow.Field>
        <FarmRow.Field>
          <InfoTotalLiquidity farm={farm} />
        </FarmRow.Field>
      </FarmRow.MultipleField>
    </FarmRow.Cell>
  )
}

FarmLargeRow.LpTypeWithDepositFee = ({
  withDeposit,
  cells,
  farm,
}: {
  withDeposit: boolean
  cells: FarmRowViewsProps['cells']
  farm: FarmRowViewsProps['farm']
}) => {
  return (
    <FarmRow.Cell>
      {withDeposit ? (
        <FarmRow.MultipleField>
          <FarmRow.Field>
            <InfoLpType />
          </FarmRow.Field>

          <FarmRow.Field>
            <InfoDepositFee depositFee={farm?.depositFee} />
          </FarmRow.Field>
        </FarmRow.MultipleField>
      ) : (
        <>{cells.lpType}</>
      )}
    </FarmRow.Cell>
  )
}

FarmLargeRow.HarvestWithBsc = ({
  withBsc,
  earned,
  farm,
}: {
  withBsc: boolean
  earned: FarmRowViewsProps['earned']
  farm: FarmRowViewsProps['farm']
}) => {
  return (
    <FarmRow.Cell>
      {!withBsc ? (
        <FarmRow.MultipleField>
          <FarmRow.Field>{earned.harvestButtonNode}</FarmRow.Field>
          <FarmRow.Field>
            <InfoViewBscScan farm={farm} />
          </FarmRow.Field>
        </FarmRow.MultipleField>
      ) : (
        <>{earned.harvestButtonNode}</>
      )}
    </FarmRow.Cell>
  )
}

export default FarmLargeRow
