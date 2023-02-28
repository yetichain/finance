import { useGTMDispatch } from '@elgorditosalsero/react-gtm-hook'
import { MaxUint256 } from '@ethersproject/constants'
import { parseEther } from '@ethersproject/units'
import { CardNav } from 'components/CardNav'
import { VAMPIRE_ABI } from 'config/vampiring/VAMPIRE_ABI'
import { BigNumber } from 'ethers'
import { useActiveWeb3React } from 'hooks'
import { useFactoryContract, useLPTokenContract, useVampireContract } from 'hooks/useContract'
import { i18n } from 'next-i18next'
import { FC, useEffect, useState } from 'react'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useStoreNetwork } from 'store/network/useStoreNetwork'
import styled from 'styled-components'
import { calculateGasMargin, calculateGasPrice } from 'utils'
import GTM from 'utils/gtm'
import multicall from 'utils/multicall'
import { Step1Connect } from 'views/Migrate/components/Step1Connect'
import { Step2YourLiquidity } from 'views/Migrate/components/Step2YourLiquidity'
import { Step3Migrating } from 'views/Migrate/components/Step3Migrating'
import { Step4MigrationResult } from 'views/Migrate/components/Step4MigrationResult'
import { getReadyToMigrateTokens } from 'views/Migrate/lib/getReadyToMigrateTokens'
import SwapAppBody from 'views/Swap/SwapAppBody'
import { useCreateMigratePair } from './hooks/useMigratePair'
import { MigratePairs } from './lib/migrate.types'

const Root = styled.div``

const ViewMigrate: FC = () => {
  // --- STORE ---
  const currentNetwork = useStoreNetwork((state) => state.currentNetwork)

  // --- STATE ---
  const [step, setStep] = useState(2)
  const [pairs, setPairs] = useState<MigratePairs>([])
  const [selectedPairKey, setSelectedPairKey] = useState(-1)
  const [tokensAmount, setTokensAmount] = useState<string | number>('')
  const [contract, setContract] = useState('')
  const [aliumLPTokenForPair, setAliumLPTokenForPair] = useState('')
  const [isSuccessful, setIsSuccessful] = useState(false)
  const [isLoadingPairs, setIsLoadingPairs] = useState(false)

  // --- DESTRUCTURING STATE ---
  const currentPair = pairs[selectedPairKey]

  // --- HOOKS ---
  const gtmDispatch = useGTMDispatch()
  const { account } = useActiveWeb3React()
  const addTransaction = useTransactionAdder()
  const lpTokenContract = useLPTokenContract(currentPair?.addressLP)
  const vampireContract = useVampireContract(currentNetwork.address.vampiring)
  const factoryContract = useFactoryContract(currentNetwork.address.factory)
  // Liqudity pair
  useCreateMigratePair(currentPair)

  const setDefaultState = async () => {
    setStep(account ? 2 : 1)
    setPairs([])
    setSelectedPairKey(-1)
    setTokensAmount('')
    setContract('')
    setAliumLPTokenForPair('')
    setIsSuccessful(false)
    setIsLoadingPairs(false)
  }

  const handleGetReadyToMigrateTokens = async () => {
    await setIsLoadingPairs(true)
    await setPairs(await getReadyToMigrateTokens(account))
    await setIsLoadingPairs(false)
  }

  useEffect(() => {
    ;(async () => {
      await setDefaultState()
      await handleGetReadyToMigrateTokens()
    })()
  }, [account, currentNetwork])

  const handleMigrate = async () => {
    // return if pair not selected or input amount out of balance
    if (selectedPairKey === -1 || currentPair.balance < Number(tokensAmount)) return

    // set loading
    setStep(3)

    // GET PAIR CONTRACT ID
    const countLPTokensBigNumber = await vampireContract.lpTokensInfoLength()
    const countLPTokens = Number(countLPTokensBigNumber.toString())
    const numsArr = [...Array(countLPTokens).keys()]
    const calls = numsArr.map((i) => ({
      address: currentNetwork.address.vampiring,
      name: 'lpTokensInfo',
      params: [i],
    }))
    const pairIds = (await multicall(VAMPIRE_ABI, calls))?.returnData
    const pairId =
      pairIds &&
      Object.keys(pairIds).find(
        (key) => `0x${pairIds[key].slice(26, 66).toLowerCase()}` === currentPair.addressLP.toLowerCase(),
      )

    console.info('Migration Pair Id', pairId)

    if (pairId === undefined) {
      setStep(2)
      return
    }

    // GET PAIR ADDRESS
    let responsePair
    try {
      responsePair = await factoryContract.getPair(currentPair?.addressA, currentPair?.addressB)
      console.info('PAIR: Response:', responsePair)
    } catch (err) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! GET PAIR:', err)
      return
    }

    // IS APPROVE Needed?
    const tokensAmountWei = parseEther(String(tokensAmount))
    const allowanceWei: BigNumber = await lpTokenContract.allowance(account, currentNetwork.address.vampiring)
    const isApproveNeeded: boolean = tokensAmountWei > allowanceWei

    if (isApproveNeeded) {
      const isApproved = await migrationApprove()
      if (!isApproved) {
        setIsSuccessful(false)
        setStep(4)
        return
      }
    }

    // DEPOSIT: STEP 1: GAS ESTIMATE
    let gasEstimateDeposit
    try {
      gasEstimateDeposit = await vampireContract.estimateGas.deposit(pairId, tokensAmountWei, { from: account })
    } catch (err) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! DEPOSIT: GAS ESTIMATE:', err)
      return
    }

    const gasLimitDeposit: BigNumber = await calculateGasMargin(gasEstimateDeposit)
    const gasPriceDeposit: BigNumber = await calculateGasPrice(vampireContract.provider)

    // DEPOSIT: STEP 2: CALL
    let responseDeposit
    try {
      responseDeposit = await vampireContract.deposit(pairId, tokensAmountWei, {
        gasLimit: gasLimitDeposit,
        gasPrice: gasPriceDeposit,
        from: account,
      })
      console.info(
        'DEPOSIT RESPONSE LINK:',
        `${currentNetwork.providerParams.blockExplorerUrls[0]}tx/${responseDeposit.hash}`,
      )
      const resultDeposit = await responseDeposit.wait()
      GTM.migrate(gtmDispatch, currentPair.title, String(tokensAmount))
      console.info('DEPOSIT: RESULT:', resultDeposit)
    } catch (e) {
      setIsSuccessful(false)
      setStep(4)
      console.error('!!! DEPOSIT: CALL:', e)
      return
    }

    // FINAL
    setAliumLPTokenForPair(responsePair)
    setContract(responseDeposit.hash)
    setIsSuccessful(true)
    setStep(4)
  }

  const migrationApprove = async (): Promise<boolean> => {
    // GAS ESTIMATE
    let gasEstimateApprove: BigNumber
    let gasLimitApprove: BigNumber
    let gasPriceApprove: BigNumber
    let responseApprove
    let resultApprove

    try {
      gasEstimateApprove = await lpTokenContract.estimateGas.approve(currentNetwork.address.vampiring, MaxUint256)
    } catch (err) {
      console.error('!!! APPROVE: GAS ESTIMATE:', err)
      return false
    }

    try {
      gasLimitApprove = await calculateGasMargin(gasEstimateApprove)
    } catch (err) {
      console.error('!!! APPROVE: CALC GAS LIMIT:', err)
      return false
    }

    try {
      gasPriceApprove = await calculateGasPrice(lpTokenContract.provider)
    } catch (err) {
      console.error('!!! APPROVE: CALC GAS PRICE:', err)
      return false
    }

    try {
      responseApprove = await lpTokenContract.approve(currentNetwork.address.vampiring, MaxUint256, {
        gasLimit: gasLimitApprove,
        gasPrice: gasPriceApprove,
        from: account,
      })
    } catch (err) {
      console.error('!!! APPROVE: CALL:', err)
      return false
    }

    try {
      resultApprove = await responseApprove.wait()
    } catch (err) {
      console.error('!!! APPROVE: RESULT:', err)
      return false
    }

    console.info('APPROVE: RESULT:', resultApprove)

    try {
      await addTransaction(responseApprove, {
        summary: i18n.t('Approve {{title}} from {{exchange}}', {
          title: currentPair.title,
          exchange: currentPair.exchange,
        }),
        approval: { tokenAddress: currentPair.addressLP, spender: account },
      })
    } catch (err) {
      console.error('!!! APPROVE: VIEW TRANSACTION:', err)
      return false
    }

    return true
  }

  return (
    <Root>
      <CardNav activeIndex={2} />
      <SwapAppBody>
        {step === 1 && <Step1Connect />}
        {step === 2 && (
          <Step2YourLiquidity
            pairs={pairs}
            selectedPairKey={selectedPairKey}
            setSelectedPairKey={setSelectedPairKey}
            tokensAmount={tokensAmount}
            setTokensAmount={setTokensAmount}
            handleMigrate={handleMigrate}
            isLoadingPairs={isLoadingPairs}
          />
        )}
        {step === 3 && <Step3Migrating />}
        {step === 4 && (
          <Step4MigrationResult
            pair={currentPair}
            isSuccessful={isSuccessful}
            contract={contract}
            explorer={currentNetwork.providerParams.blockExplorerUrls[0]}
            aliumLPTokenForPair={aliumLPTokenForPair}
            setStep1={() => {
              handleGetReadyToMigrateTokens()
              setStep(account ? 2 : 1)
            }}
            handleTryAgain={handleMigrate}
          />
        )}
      </SwapAppBody>
    </Root>
  )
}

export default ViewMigrate
