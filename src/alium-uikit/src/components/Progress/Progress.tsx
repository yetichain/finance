import { FC } from 'react'
import { ProgressBunny } from '../Svg'
import ProgressBunnyWrapper from './ProgressBunnyWrapper'
import StyledProgress, { Bar } from './StyledProgress'
import { ProgressProps } from './types'

const stepGuard = (step: number) => {
  if (step < 0) {
    return 0
  }

  if (step > 100) {
    return 100
  }

  return step
}

const Progress: FC<ProgressProps> = ({ primaryStep = 0, secondaryStep = null, showProgressBunny = false }) => {
  return (
    <StyledProgress>
      {showProgressBunny && (
        <ProgressBunnyWrapper style={{ left: `${stepGuard(primaryStep)}%` }}>
          <ProgressBunny />
        </ProgressBunnyWrapper>
      )}
      <Bar primary style={{ width: `${stepGuard(primaryStep)}%` }} />
      {secondaryStep ? <Bar style={{ width: `${stepGuard(secondaryStep)}%` }} /> : null}
    </StyledProgress>
  )
}

export default Progress
