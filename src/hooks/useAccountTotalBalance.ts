import { useCallback, useEffect, useState } from 'react'
import { getContract } from 'utils'
import AliumVestingAbi from '../config/abi/AliumVesting.json'

const getAccountTotalBalance = async (account, library): Promise<number> => {
  try {
    const contract = getContract(process.env.APP_NFT_VESTING, AliumVestingAbi, library, account)
    const { 0: totalBalanceRaw } = await contract.getTotalBalanceOf(account)
    return Number(totalBalanceRaw.toString())
  } catch (err) {
    console.error(err)
  }
}

const useAccountTotalBalance = (account: string, library: any): { totalBalance: number } => {
  const [totalBalance, setTotalBalance] = useState<number>(0)

  const cbAccountTotalBalance = useCallback(() => {
    ;(async () => {
      try {
        if (account) {
          const newTotalBalance = await getAccountTotalBalance(account, library)
          setTotalBalance(newTotalBalance ?? 0)
        }
      } catch (err) {
        console.error(err)
      }
    })()
  }, [account, library])

  useEffect(() => {
    cbAccountTotalBalance()
  }, [cbAccountTotalBalance])

  return { totalBalance }
}

export default useAccountTotalBalance
