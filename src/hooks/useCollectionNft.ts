import { Contract } from '@ethersproject/contracts'
import { useEffect, useMemo, useState } from 'react'
import { useSingleCallResult, useSingleContractMultipleData } from 'state/multicall/hooks'
import { getContract } from 'utils'
import { AliumCollectibleAbi, NFT_ALIUM_COLLECTIBLE_NFT } from 'views/InvestorsAccount/constants'
import { cardListPrivate, cardListPublic, cardListStrategical, CardType } from 'views/InvestorsAccount/constants/cards'
import pools from 'views/InvestorsAccount/constants/pools'
import { useActiveWeb3React } from './index'

export default function useCollectionNft() {
  const [collectibleContract, setCollectibleContract] = useState<Contract | null>(null)
  const [nftIndex, setNftIndex] = useState<number[]>([])
  const { account, library } = useActiveWeb3React()

  useEffect(() => {
    if (library) {
      const instance = getContract(NFT_ALIUM_COLLECTIBLE_NFT, AliumCollectibleAbi, library)
      setCollectibleContract(instance)
    }
  }, [library])

  const balanceInputs = useMemo(() => {
    return [account || undefined]
  }, [account])
  const balanceAccount = useSingleCallResult(collectibleContract, 'balanceOf', balanceInputs).result?.[0]

  useEffect(() => {
    const countNft = balanceAccount?.toNumber()
    const nfts: number[] = []
    for (let i = 0; i < countNft; i++) {
      nfts.push(i)
    }
    setNftIndex(nfts)
  }, [balanceAccount])

  const tokenOfOwnerInputs: [string, number][] = useMemo(() => {
    if (account) {
      return nftIndex.map((ind) => {
        return [account, ind]
      })
    }
    return []
  }, [nftIndex, account])

  const tokenOfOwnerResult = useSingleContractMultipleData(
    collectibleContract,
    'tokenOfOwnerByIndex',
    tokenOfOwnerInputs,
  )

  const tokensIds = useMemo(() => {
    return tokenOfOwnerResult
      .map((result) => {
        return result.result?.[0]?.toString()
      })
      .filter((token) => token !== undefined)
  }, [tokenOfOwnerResult])

  const tokenTypeInputs = useMemo(() => {
    return tokensIds.map((tokenId: string) => {
      return [parseInt(tokenId, 10)]
    })
  }, [tokensIds])

  const tokenTypeResults = useSingleContractMultipleData(collectibleContract, 'getTokenType', tokenTypeInputs)

  const tokensTypes = useMemo(() => {
    return tokenTypeResults.map((result) => {
      return result.result?.[0]?.toString()
    })
  }, [tokenTypeResults])

  const tokenTypesWithTokenId: { [tokenType: string]: number[] } = useMemo(() => {
    const newObj = {}
    tokensTypes.forEach((tokenType: string, id) => {
      if (newObj[parseInt(tokenType, 10)]) {
        newObj[parseInt(tokenType, 10)]?.push(tokensIds[id])
      } else {
        newObj[parseInt(tokenType, 10)] = [tokensIds[id]]
      }
    })
    return newObj
  }, [tokensIds, tokensTypes])

  const poolsWithCards = useMemo(() => {
    return pools.map((pool) => {
      return {
        ...pool,
        cards: tokenTypesWithTokenId[pool.id] || [],
      }
    })
  }, [tokenTypesWithTokenId])

  const publicCardsWithCount: CardType[] = useMemo(() => {
    return cardListPublic.map((card) => {
      return {
        ...card,
        cardsCount: tokenTypesWithTokenId[card.id]?.length || 0,
      }
    })
  }, [tokenTypesWithTokenId])

  const strategicalCardsWithCount: CardType[] = useMemo(() => {
    return cardListStrategical.map((card) => {
      return {
        ...card,
        cardsCount: tokenTypesWithTokenId[card.id]?.length || 0,
      }
    })
  }, [tokenTypesWithTokenId])

  const privateCardsWithCount: CardType[] = useMemo(() => {
    return cardListPrivate.map((card) => {
      return {
        ...card,
        cardsCount: tokenTypesWithTokenId[card.id]?.length || 0,
      }
    })
  }, [tokenTypesWithTokenId])
  return {
    tokenTypesWithTokenId,
    balanceAccount,
    privateCardsWithCount,
    publicCardsWithCount,
    strategicalCardsWithCount,
    poolsWithCards,
  }
}
