import { getFarmsConfig } from 'config/constants/farms/farms'

const getFarmConfig = (pid: number) => getFarmsConfig().find((f) => f.pid === pid)

export default getFarmConfig
