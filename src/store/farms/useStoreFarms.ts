import { getFarmsConfig } from 'config/constants/farms/farms'
import { ethers } from 'ethers'
import { Farm } from 'state/types'
import { FarmSortOption, FarmTab, ViewMode } from 'views/farms/farms.types'
import create from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import createVanilla, { GetState, SetState } from 'zustand/vanilla'
import { FarmWithUserData } from './../../state/types'

export interface StoreFarmsState {
  farms: Farm[]
  setFarms: (farms: Farm[]) => void
  setFarmsUserData: (farms: FarmWithUserData[]) => void
  farmsLoading: boolean
  farmsUserDataLoading: boolean
  slowUpdate: boolean
  toggleFarmsFetched: (loading: boolean) => void
  toggleUserDataFarmsFetched: (loading: boolean) => void
  toggleSlowUpdate: (loading: boolean) => void
  viewMode: ViewMode
  setViewMode: (view: ViewMode) => void
  query: string
  setQuery: (query: string) => void
  sortOption: FarmSortOption
  setSortOption: (sortOption: FarmSortOption) => void
  stakedOnly: boolean
  setStakedOnly: (stakedOnly: boolean) => void
  activeTab: FarmTab
  setActiveTab: (tab: FarmTab) => void
  hasTicket: boolean
  checkHasTicket: (contract: ethers.Contract, account: string | undefined) => Promise<boolean>
  ticketLoader: boolean
  toggleTicketLoader: (toggle: boolean) => void
  blockReward?: ethers.BigNumber
  fetchBlockReward: (contract: ethers.Contract) => Promise<ethers.BigNumber>
  clearFarms: () => void
}

const noAccountFarmConfig: Farm[] = getFarmsConfig().map((farm) => ({
  ...farm,
  userData: {
    allowance: '0',
    tokenBalance: '0',
    stakedBalance: '0',
    earnings: '0',
  },
}))
// store like reducer
const store = (set: SetState<StoreFarmsState>, get: GetState<StoreFarmsState>): StoreFarmsState => ({
  hasTicket: false,
  ticketLoader: true,
  farmsLoading: false,
  viewMode: ViewMode.CARD,
  farmsUserDataLoading: false,
  slowUpdate: false,
  farms: noAccountFarmConfig,
  query: '',
  sortOption: FarmSortOption.Hot,
  stakedOnly: false,
  activeTab: FarmTab.live,
  toggleTicketLoader: (ticketLoader) => {
    set({ ticketLoader })
  },
  checkHasTicket: async (contract, account) => {
    const toggleTicketLoader = get().toggleTicketLoader
    if (!account) {
      toggleTicketLoader(false)
      set({ hasTicket: false })
    }

    try {
      toggleTicketLoader(true)
      const hasTicket: boolean = await contract.hasTicket(account)
      set({ hasTicket })
      return hasTicket
    } catch (error) {
      return false
    } finally {
      toggleTicketLoader(false)
    }
  },
  setActiveTab: (tab: FarmTab) => {
    set({ activeTab: tab })
  },
  setStakedOnly: (stakedOnly: boolean) => {
    set({ stakedOnly })
  },
  setSortOption: (sortOption) => {
    set({ sortOption })
  },
  setQuery: (query) => {
    set({ query })
  },
  setViewMode: (view) => {
    set({ viewMode: view })
  },
  toggleFarmsFetched: (loading) => {
    set({ farmsLoading: loading })
  },
  toggleUserDataFarmsFetched: (loading) => {
    set({ farmsUserDataLoading: loading })
  },
  toggleSlowUpdate: (loading) => {
    set({ slowUpdate: loading })
  },
  setFarms: (farms) => {
    const data = get().farms
    const changedFarm = data.map((farm) => {
      const liveFarmData = farms.find((farmData) => farmData.pid === farm.pid)
      return { ...farm, ...liveFarmData }
    })
    set({ farms: changedFarm })
  },
  setFarmsUserData: (farms) => {
    const data = get().farms
    farms.forEach((userDataEl) => {
      const { pid } = userDataEl
      const index = data.findIndex((farm) => farm.pid === pid)
      data[index] = { ...data[index], userData: userDataEl }
    })
    set({ farms: data })
  },
  clearFarms: () => {
    const data = get().farms
    const clearedData = data.map((farm) => ({
      ...farm,
      allowance: '0',
      earnings: '0',
      pid: farm.pid,
      stakedBalance: '0',
      tokenBalance: '0',
    }))
    set({ farms: clearedData })
  },
  async fetchBlockReward(contract) {
    const blockReward: ethers.BigNumber = await contract.blockReward()
    set({
      blockReward,
    })
    return blockReward
  },
})

// store for usage outside of react
export const storeFarms = createVanilla<StoreFarmsState>(
  persist(devtools(store, 'farm-store'), {
    name: 'farms-storage', // unique name
    blacklist: ['farmsLoading', 'farmsUserDataLoading', 'slowUpdate', 'farms', 'hasTicket', 'ticketLoader', 'query'],
  }),
)

// store for usage inside of react
export const useStoreFarms = create<StoreFarmsState>(storeFarms)
