import { Flex, Text } from 'alium-uikit/src'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'
import useCollectionNft from '../../hooks/useCollectionNft'
import AppInvestorsAccountBody from './AppInvestorsAccountBody'
import NftCollectionCard from './components/NftCollectionCard'
import NftCollectionHeader from './components/NftCollectionHeader'
import NftNavTabs from './components/NftNavTabs'

const ContentHolder = styled.div`
  position: relative;
  margin: -11px 9px;
`

const SelectedNftRow = styled(Flex)`
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
`

const SelectedNftWrapper = styled(Flex)`
  position: relative;
  justify-content: center;
  align-content: center;
  align-items: center;
  width: 100%;
  max-width: 354px;
  max-height: 374px;
  height: 374px;
  background-color: #fff;
  padding: 16px;
  box-sizing: border-box;
  span {
    font-style: normal;
    font-weight: 900;
    font-size: 117.091px;
    line-height: 146px;
    letter-spacing: 1.46364px;
    position: absolute;
    bottom: 8px;
    left: 44px;
    color: #ffffff;
  }
`

const CardWrapper = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  margin: 0 auto;
  position: relative;

  @media screen and (max-width: 1024px) {
    max-width: 954px;
  }

  @media screen and (max-width: 1016px) {
    padding: 0 32px 0 32px;
  }
  @media screen and (max-width: 790px) {
    padding: 0;
  }
`

const Image = styled.img`
  width: 100%;
  max-height: 342px;
  margin: 0 auto;
`

const NftTable = styled.div`
  margin-top: 24px;
`
const NftTableContent = styled(Flex)`
  margin-top: 8px;
  flex-direction: column;
  width: 100%;
`

function Collection() {
  const { t } = useTranslation()
  const [selectedCard, setSelectedCard] = useState<[number, number] | null>(null)
  const selectImage = useRef<HTMLDivElement>(null)

  const onSelectCard = (pid, cid, from) => {
    if (selectImage) {
      const toTop = selectImage.current?.offsetHeight || 0
      const offsetPosition = from - toTop
      window.scrollBy({
        top: offsetPosition,
        behavior: 'smooth',
      })
    }
    setSelectedCard([pid, cid])
  }

  const { poolsWithCards } = useCollectionNft()

  const poolClearedCards = poolsWithCards.filter((pool) => pool.cards?.length > 0)

  useEffect(() => {
    const selectDefaultCard = () => {
      if (poolClearedCards?.length && !selectedCard) {
        const firstEl = poolClearedCards[0]
        const firstCard = firstEl?.cards[0]
        if (firstEl && firstCard) onSelectCard(firstEl, firstCard, 0)
      }
    }

    selectDefaultCard()
  }, [poolClearedCards])

  return (
    <ContentHolder>
      <CardWrapper ref={selectImage}>
        <Text fontSize='48px' style={{ fontWeight: 700, marginBottom: '32px' }}>
          {t('Your NFT deck')}
        </Text>
        <AppInvestorsAccountBody>
          <SelectedNftRow>
            {selectedCard && (
              <SelectedNftWrapper>
                <Image src='/images/collection/Card-Preview.png' alt='nft-preview' className='nft-preview' />
                <span>{selectedCard[1]}</span>
              </SelectedNftWrapper>
            )}
          </SelectedNftRow>
          <NftNavTabs />

          <NftTable>
            <NftCollectionHeader />
            <NftTableContent>
              {poolClearedCards?.length ? (
                poolClearedCards.map((pool) => (
                  <NftCollectionCard
                    key={`Pool-Nft-${pool.id}`}
                    selectedCard={selectedCard}
                    onSelectCard={onSelectCard}
                    pool={pool}
                  />
                ))
              ) : (
                <></>
              )}
            </NftTableContent>
          </NftTable>
        </AppInvestorsAccountBody>
      </CardWrapper>
    </ContentHolder>
  )
}

export default Collection
