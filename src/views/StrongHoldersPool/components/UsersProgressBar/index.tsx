import { useTranslation } from 'next-i18next'
import { rgba } from 'polished'
import { Fragment, useMemo } from 'react'
import { useMedia } from 'react-use'
import styled from 'styled-components'
import { breakpoints, mq, typography } from 'ui'

function toRadians(degrees: number) {
  return degrees * (Math.PI / 180)
}

function getPoint(center: number, radius: number, degrees: number) {
  const normalized = toRadians(degrees - 90)
  return {
    x: center + radius * Math.cos(normalized),
    y: center + radius * Math.sin(normalized),
  }
}

export interface UsersProgressBarProps {
  current: number
  all: number
}

export default function UsersProgressBar({ current, all }: UsersProgressBarProps) {
  const { t } = useTranslation()
  const isNotLg = useMedia(mq.down(breakpoints.lg))
  const isNotSm = useMedia(mq.down(breakpoints.sm))
  const outerPadding = isNotSm ? 0 : 15
  const innerRadius = useMemo(() => {
    switch (true) {
      case isNotSm:
        return 190
      case isNotLg:
        return 220
      default:
        return 250
    }
  }, [isNotLg, isNotSm])
  const size = innerRadius + outerPadding * 2
  const svgPadding = 10
  const svgRadius = innerRadius / 2 - svgPadding
  const svgCenter = svgRadius
  // gap in degrees
  const svgAreaGap = 3
  const svgAreas = useMemo(
    () => [
      {
        start: 0,
        end: 90,
      },
      {
        start: 90,
        end: 180,
      },
      {
        start: 180,
        end: 270,
      },
      {
        start: 270,
        end: 360,
      },
    ],
    [],
  )
  const areaMax = all / svgAreas.length
  return (
    <UsersProgressBar.Root style={{ width: size, height: size, padding: outerPadding }}>
      <UsersProgressBar.Inner>
        <UsersProgressBar.Svg style={{ padding: svgPadding }}>
          {svgAreas.map((area, i) => {
            const startDegrees = area.start + svgAreaGap
            const endDegrees = area.end - svgAreaGap
            const startPoint = getPoint(svgCenter, svgRadius, startDegrees)
            const endPoint = getPoint(svgCenter, svgRadius, endDegrees)
            const progress = Math.max(0, current - areaMax * i) / areaMax
            const progressDegrees = Math.min(startDegrees + (endDegrees - startDegrees) * progress, endDegrees)
            const progressPoint = getPoint(svgCenter, svgRadius, progressDegrees)
            return (
              <Fragment key={i}>
                <UsersProgressBar.Arc
                  d={`M ${startPoint.x} ${startPoint.y} A ${svgRadius} ${svgRadius} 0 0 1 ${endPoint.x} ${endPoint.y}`}
                  opacity='0.1'
                />
                {progress > 0 && (
                  <UsersProgressBar.Arc
                    d={`M ${startPoint.x} ${startPoint.y} A ${svgRadius} ${svgRadius} 0 0 1 ${progressPoint.x} ${progressPoint.y}`}
                  />
                )}
              </Fragment>
            )
          })}
        </UsersProgressBar.Svg>
        <UsersProgressBar.Counters>
          <UsersProgressBar.Value>
            {current}
            <UsersProgressBar.Text as='span'>/ {all}</UsersProgressBar.Text>
          </UsersProgressBar.Value>
          <UsersProgressBar.Text>{t('Users In the pool\n/ All')}</UsersProgressBar.Text>
        </UsersProgressBar.Counters>
      </UsersProgressBar.Inner>
    </UsersProgressBar.Root>
  )
}

UsersProgressBar.Root = styled.div`
  background: ${rgba('#6c5dd3', 0.05)};
  border-radius: 50%;
`

UsersProgressBar.Inner = styled.div`
  width: 100%;
  height: 100%;
  background: radial-gradient(50% 50% at 50% 50%, #8071ed 0%, #6c5dd3 100%);
  border-radius: 50%;
  position: relative;
`

UsersProgressBar.Counters = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
`

UsersProgressBar.Text = styled.div`
  ${typography.ultrasmall.medium}
  color: #ffffff;
  white-space: pre-line;
`

UsersProgressBar.Value = styled.div`
  ${typography.h2}
  color: #ffffff;
  position: relative;
  margin-bottom: 8px;

  & > span {
    position: absolute;
    top: 5px;
    white-space: nowrap;
  }
`

UsersProgressBar.Svg = styled.svg`
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  right: 0;
  width: 100%;
  height: 100%;
  overflow: visible;
`

UsersProgressBar.Arc = styled.path.attrs({
  fill: 'none',
  stroke: '#F5F7FF',
  strokeWidth: 5,
  strokeLinecap: 'round',
})``
