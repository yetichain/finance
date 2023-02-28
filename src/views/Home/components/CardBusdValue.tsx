import { FC } from 'react'
import CardValue, { CardValueProps } from './CardValue'

const CardBusdValue: FC<CardValueProps> = ({ value }) => {
  return <CardValue value={value} fontSize='14px' lineHeight='1.1' color='white' prefix='~$' bold={false} />
}

export default CardBusdValue
