import { FC } from 'react'
import StyledCard from './StyledCard'
import { CardProps } from './types'

const Card: FC<CardProps> = ({ ribbon, children, ...props }) => {
  return (
    <StyledCard {...props}>
      {ribbon}
      {children}
    </StyledCard>
  )
}
export default Card
