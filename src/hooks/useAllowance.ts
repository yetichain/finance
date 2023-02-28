import { useWeb3React } from '@web3-react/core'
import BigNumber from 'bignumber.js'
import { useEffect, useState } from 'react'
import { getAllowance } from 'utils/erc20'
import { useCake, useLottery } from './useContract'

// Retrieve lottery allowance
export const useLotteryAllowance = () => {
  const [allowance, setAllowance] = useState(new BigNumber(0))
  const { account } = useWeb3React()
  const lotteryContract = useLottery()
  const cakeContract = useCake()

  useEffect(() => {
    const fetchAllowance = async () => {
      const res = await getAllowance(cakeContract as any, lotteryContract as any, account)
      setAllowance(new BigNumber(res))
    }

    if (account && cakeContract && cakeContract) {
      fetchAllowance()
    }
    const refreshInterval = setInterval(fetchAllowance, 10000)
    return () => clearInterval(refreshInterval)
  }, [account, cakeContract, lotteryContract])

  return allowance
}

// Retrieve IFO allowance
// export const useIfoAllowance = (tokenContract: Contract, spenderAddress: string, dependency?: any) => {
//   const { account } = useWeb3React()
//   const [allowance, setAllowance] = useState(null)
//
//   useEffect(() => {
//     const fetch = async () => {
//       try {
//         const res = await tokenContract.methods.allowance(account, spenderAddress).call()
//         setAllowance(new BigNumber(res))
//       } catch (e) {
//         setAllowance(null)
//       }
//     }
//     fetch()
//   }, [account, spenderAddress, tokenContract, dependency])
//
//   return allowance
// }
