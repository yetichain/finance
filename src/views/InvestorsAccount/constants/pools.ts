import { BigNumber } from 'ethers'
import { i18n } from 'next-i18next'

export interface PoolsTypes {
  name: string
  id: number
  description: string
  total?: number | BigNumber
  locked?: number | BigNumber
  unlocked?: number | BigNumber
  claimed?: number | BigNumber
  nextDate?: number
  timestamp?: undefined | string
  cards?: number[]
  reward?: number | string
  privateCall: boolean
}

const pools: PoolsTypes[] = [
  {
    id: 1,
    name: i18n.t('Private Pool One'),
    description: '',
    privateCall: true,
  },
  {
    id: 2,
    name: i18n.t('Private Pool Two'),
    description: '',
    privateCall: true,
  },
  {
    id: 3,
    name: i18n.t('Private Pool Three'),
    description: '',
    privateCall: true,
  },
  {
    id: 5,
    name: i18n.t('Strategical Pool One'),
    description: '',
    privateCall: true,
  },
  {
    id: 6,
    name: i18n.t('Public Pool Necesse'),
    description: '',
    privateCall: false,
  },
  {
    id: 7,
    name: i18n.t('Public Pool Regno'),
    description: '',
    privateCall: false,
  },
  {
    id: 8,
    name: i18n.t('Public Pool Altum'),
    description: '',
    privateCall: false,
  },
  {
    id: 9,
    name: i18n.t('Public Pool Castus'),
    description: '',
    privateCall: false,
  },
  {
    id: 10,
    name: i18n.t('Public Pool Illustris'),
    description: '',
    privateCall: false,
  },
]

export default pools
