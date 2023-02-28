import FarmRow, { FarmRowViewsProps } from '.'

const FarmMobileRow = ({
  cells,
  farmClassname,
  isOpen,
}: Pick<FarmRowViewsProps, 'farmClassname' | 'cells' | 'isOpen'>) => {
  return (
    <>
      <FarmRow.MobileView className={farmClassname}>
        <tr>{cells.heading}</tr>
        <tr>{[cells.apr, cells.earn, !isOpen && cells.indicator]}</tr>
        {isOpen && (
          <>
            <tr>{[cells.totalLiquidity, cells.deposit]}</tr>
            <tr>{[cells.lpType, cells.depositFee]}</tr>
            <tr>{[cells.earned, cells.harvest]}</tr>
            <tr>{[cells.staked, cells.stakedButtonsOrActionsNode]}</tr>
            <tr>{[cells.bscScan]}</tr>
            <tr>{[cells.stakedActions, cells.indicator]}</tr>
          </>
        )}
      </FarmRow.MobileView>
      <FarmRow.Separator />
    </>
  )
}

export default FarmMobileRow
