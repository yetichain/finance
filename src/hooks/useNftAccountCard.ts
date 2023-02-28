import { Contract } from '@ethersproject/contracts'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useMemo, useState } from 'react'
import { useSingleCallResult } from 'state/multicall/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { getContract } from 'utils'
import {
  AliumCollectibleAbi,
  NFTPrivateExchangerAbi,
  NFTPublicExchangerAbi,
  NFT_ALIUM_COLLECTIBLE_NFT,
  NFT_EXCHANGER_PRIVATE,
  NFT_EXCHANGER_PUBLIC,
} from 'views/InvestorsAccount/constants'
import { useActiveWeb3React } from './index'
import useCollectionNft from './useCollectionNft'

export default function useNftAccountCard(tokenId: number | string, cardId: number) {
  const { t } = useTranslation()
  const [collectibleContract, setCollectibleContract] = useState<Contract | null>(null)
  const [privateExchangerContract, setPrivateExchangerContract] = useState<Contract | null>(null)
  const [publicExchangerContract, setPublicExchangerContract] = useState<Contract | null>(null)
  const [pendingApprove, setPendingApprove] = useState<boolean>(false)
  const [pendingConvert, setPendingConvert] = useState<boolean>(false)
  const { account, library } = useActiveWeb3React()
  const { tokenTypesWithTokenId } = useCollectionNft()
  const [errorResponse, setErrorResponse] = useState('')

  const updateErrorResponse = (message: string) => {
    setErrorResponse(message)
    setTimeout(() => {
      setErrorResponse('')
    }, 1500)
  }

  const cardIds: Array<string | number> = useMemo(() => {
    return tokenTypesWithTokenId[cardId] || []
  }, [cardId, tokenTypesWithTokenId])

  useEffect(() => {
    if (library && account) {
      const instanceCollectible = getContract(NFT_ALIUM_COLLECTIBLE_NFT, AliumCollectibleAbi, library, account)
      const instancePrivate = getContract(NFT_EXCHANGER_PRIVATE, NFTPrivateExchangerAbi, library, account)
      const instancePublic = getContract(NFT_EXCHANGER_PUBLIC, NFTPublicExchangerAbi, library, account)
      setCollectibleContract(instanceCollectible)
      setPrivateExchangerContract(instancePrivate)
      setPublicExchangerContract(instancePublic)
    }
  }, [library, account])
  const addTransaction = useTransactionAdder()
  const inputs = useMemo(() => (tokenId !== '' && tokenId !== '-' ? [tokenId] : [1]), [tokenId])
  const ownerOfToken = useSingleCallResult(collectibleContract, 'ownerOf', inputs).result
  const tokenType = useSingleCallResult(collectibleContract, 'getTokenType', inputs).result?.[0].toString()
  const isApprovedPublic = useSingleCallResult(collectibleContract, 'isApprovedForAll', [
    account || undefined,
    NFT_EXCHANGER_PUBLIC,
  ]).result?.[0]
  const isApprovedPrivate = useSingleCallResult(collectibleContract, 'isApprovedForAll', [
    account || undefined,
    NFT_EXCHANGER_PRIVATE,
  ]).result?.[0]
  const totalSupply = useSingleCallResult(collectibleContract, 'totalSupply').result

  let error = ''

  const approve = useCallback(
    async (privateCall: boolean) => {
      if (collectibleContract && account) {
        setPendingApprove(true)
        return collectibleContract
          .setApprovalForAll(privateCall ? NFT_EXCHANGER_PRIVATE : NFT_EXCHANGER_PUBLIC, true, { from: account })
          .then((response) => {
            addTransaction(response, {
              summary: t('Approve for all nft tokens'),
            })
            return response.hash
          })
          .catch((e) => {
            console.error(e.message || e)
            updateErrorResponse(e?.data?.message || e?.message || '')
            setPendingApprove(false)
          })
      }
      return null
    },
    [collectibleContract, account, addTransaction],
  )

  if (account && ownerOfToken?.[0] !== account) {
    error = t('You don`t have this token!')
  }

  const onConvert = useCallback(
    async (privateCall: boolean, token: number) => {
      if (account && privateExchangerContract && publicExchangerContract) {
        setPendingConvert(true)
        const contract = privateCall ? privateExchangerContract : publicExchangerContract
        return contract
          .charge(token, { from: account })
          .then((response) => {
            addTransaction(response, {
              // eslint-disable-next-line no-template-curly-in-string
              summary: t('Convert token with id - ${{token}}', { token }),
            })
            return response.hash
          })
          .catch((e) => {
            console.error(e.message || e)
            updateErrorResponse(e?.data?.message || e?.message || '')
            // user decline here
            setPendingConvert(false)
          })
      }
      return null
    },
    [account, addTransaction, privateExchangerContract, publicExchangerContract],
  )

  if (tokenType && parseInt(tokenType, 10) !== cardId) {
    error = t('Invalid Pool ID')
  }

  if (tokenId === '' || tokenId === '-') {
    error = t('Enter NFT ID')
  }

  return {
    isApprovedPrivate,
    isApprovedPublic,
    onApprove: approve,
    totalSupply: totalSupply?.[0]?.toString(),
    error: error || errorResponse,
    pending: pendingApprove || pendingConvert,
    setPendingConvert,
    setPendingApprove,
    onConvert,
    cardIds,
  }
}
