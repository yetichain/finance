import { FC } from 'react'
import Svg from '../../../components/Svg/Svg'
import { SvgProps } from '../../../components/Svg/types'

interface LogoProps extends SvgProps {
  isDark: boolean
  withText?: boolean
}

const Logo: FC<LogoProps> = ({ ...props }) => {
  const { withText } = props
  return (
    <Svg viewBox='0 0 120 40' width={120} height={40} fill='none' {...props}>
      <image width='120' height='40' href='/images/logo.svg' />
    </Svg>
  )
}

export default Logo
