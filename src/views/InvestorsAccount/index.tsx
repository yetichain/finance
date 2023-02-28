import { Flex, Heading, Text } from 'alium-uikit/src'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Modal from 'components/Modal'
import { Dots } from 'components/swap/styleds'
import { TransactionSubmittedContent, TransactionSucceedContent } from 'components/TransactionConfirmationModal'
import { useActiveWeb3React } from 'hooks'
import { useNFTPrivateContract } from 'hooks/useContract'
import useNftPoolHook from 'hooks/useNftPool'
import { useTranslation } from 'next-i18next'
import { useCallback, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { removePopup } from 'state/application/actions'
import { PopupList } from 'state/application/reducer'
import styled from 'styled-components'
import { getAccountTotalBalance } from 'utils'
import useCollectionNft from '../../hooks/useCollectionNft'
import AppInvestorsAccountBody from './AppInvestorsAccountBody'
import AvailableAccount from './components/AvailableAccount'
import NftAccountCard from './components/NftAccountCard'
import NftNavTabs from './components/NftNavTabs'
import NftPoolCard from './components/NftPoolCard'
import NftPoolsHeader from './components/NftPoolsHeader'

const InvestorsAccount = () => {
  const { t } = useTranslation()
  const [isTransactionLoading, setIsTransactionLoading] = useState(false)
  const [isHideModalOpen, setHideModalOpen] = useState(false)
  const { account, chainId, library } = useActiveWeb3React()

  const { poolsWithData, onClaim, pendingClaimResult, filterPools } = useNftPoolHook()
  const { balanceAccount, strategicalCardsWithCount, publicCardsWithCount, privateCardsWithCount } = useCollectionNft()

  const nftContract = useNFTPrivateContract()
  const [isSucceedPopupVisible, setSucceedPopupVisible] = useState(false)
  const [accountTotalBalance, setAccountTotalBalance] = useState(-1)

  const cbAccountTotalBalance = useCallback(() => {
    ;(async () => {
      try {
        const newAccountTotalBalance = await getAccountTotalBalance(account, library)
        setAccountTotalBalance(newAccountTotalBalance)
      } catch (err) {
        console.error(err)
      }
    })()
  }, [account, library])

  useEffect(() => {
    cbAccountTotalBalance()
  }, [cbAccountTotalBalance])

  useEffect(() => {
    if (!account) return
    nftContract?.bought(account).then((res) => {
      if (res === true) {
        setSucceedPopupVisible(true)
      } else if (isSucceedPopupVisible) {
        setSucceedPopupVisible(false)
      }
    })
  }, [account, isSucceedPopupVisible, nftContract])

  const [txHash, setTxHash] = useState('xczxczxczxc')
  const [tempTxHash, setTempTxHash] = useState('')
  const [isTxOpen, setTxOpen] = useState(false)

  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)
  const transactions: any = chainId ? state[chainId] ?? {} : {}

  if (txHash !== '' && transactions[txHash]?.receipt) {
    setTempTxHash(txHash)
    setTxHash('')
    setTxOpen(false)
  }

  const handleTxClose = () => {
    setTxOpen(false)
  }

  const popupList = useSelector<AppState, PopupList>((s) => s.application.popupList)
  const succeedHash = txHash || tempTxHash

  const filteredPopups = popupList.filter((popup) => popup.key === succeedHash)
  if (filteredPopups.length && filteredPopups[0].show) {
    if (!isSucceedPopupVisible) {
      setSucceedPopupVisible(true)
    }
  }

  const handleSucceedModalClose = () => {
    removePopup({ key: succeedHash })
    setTempTxHash('')
    setSucceedPopupVisible(false)

    setIsTransactionLoading(false)
  }

  const onClaimHandler = useCallback(
    (pid: number) => {
      setIsTransactionLoading(true)
      onClaim(pid)
        .then((tx) => {
          if (tx) {
            setTxHash(tx)
            setTxOpen(true)
          }
          setIsTransactionLoading(false)
        })
        .catch((e) => {
          console.error(e.message || e)
          setIsTransactionLoading(false)
        })
    },
    [onClaim],
  )

  return (
    <ContentHolder>
      <AvailableAccount title={t('Your NFT deck')}>
        <CardWrapper>
          <Text fontSize='48px' style={{ fontWeight: 700, marginBottom: '32px' }}>
            {t('Your NFT deck')}
          </Text>
          <Modal
            isOpen={isHideModalOpen}
            onDismiss={() => {
              setHideModalOpen(false)
            }}
          >
            <Flex flexDirection='column' style={{ margin: '0 auto' }}>
              <Text
                mb='30px'
                style={{
                  textAlign: 'center',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  lineHeight: '22px',
                  letterSpacing: '0.3px',
                  color: '#0B1359',
                }}
              >
                ???
              </Text>
              <ConnectWalletButton fullwidth />
            </Flex>
          </Modal>
          <Modal isOpen={isTxOpen} onDismiss={handleTxClose} maxHeight={90} padding='24px' isTransparancy>
            <TransactionSubmittedContent hash={txHash} onDismiss={handleTxClose} />
          </Modal>

          <Modal isOpen={isSucceedPopupVisible} onDismiss={handleSucceedModalClose} maxHeight={90} padding='24px'>
            <TransactionSucceedContent hash={succeedHash} onDismiss={handleSucceedModalClose} />
          </Modal>

          <AppInvestorsAccountBody>
            {!account ? (
              t('Please connect to your wallet first.')
            ) : balanceAccount === undefined || accountTotalBalance === -1 ? (
              <Dots>
                <span style={{ fontSize: '20px' }}>{t('Loading please wait')}</span>
              </Dots>
            ) : accountTotalBalance === 0 && balanceAccount?.toString() === '0' ? (
              <NoNFT>
                <NoNFTText>{t("You don't have NFT tokens.")}</NoNFTText>
              </NoNFT>
            ) : (
              <>
                {privateCardsWithCount.filter((pool) => pool.cardsCount > 0).length > 0 && (
                  <>
                    <StyledHeading as='h2' size='lg' color='heading' mb='16px' mt='16px'>
                      {t('Private Pool Cards')}
                    </StyledHeading>
                    <NftCardsContainer>
                      {privateCardsWithCount
                        .filter((pool) => pool.cardsCount > 0)
                        .map((card, index) => {
                          return <NftAccountCard key={`cardListPrivate-${card.id}/${index.toString()}`} card={card} />
                        })}
                    </NftCardsContainer>
                  </>
                )}
                {strategicalCardsWithCount.filter((pool) => pool.cardsCount > 0).length > 0 && (
                  <>
                    <StyledHeading as='h2' size='lg' color='heading' mb='16px' mt='16px'>
                      {t('Strategical Pool Cards')}
                    </StyledHeading>
                    <NftCardsContainer>
                      {strategicalCardsWithCount
                        .filter((pool) => pool.cardsCount > 0)
                        .map((card, index) => {
                          return (
                            <NftAccountCard key={`cardListStrategical-${card.id}/${index.toString()}`} card={card} />
                          )
                        })}
                    </NftCardsContainer>
                  </>
                )}
                {publicCardsWithCount.filter((pool) => pool.cardsCount > 0).length > 0 && (
                  <>
                    <StyledHeading as='h2' size='lg' color='heading' mb='16px' mt='16px'>
                      {t('Public Pool Cards')}
                    </StyledHeading>
                    <NftCardsContainer>
                      {publicCardsWithCount
                        .filter((pool) => pool.cardsCount > 0)
                        .map((card, index) => {
                          return <NftAccountCard key={`cardListPublic-${card.id}/${index.toString()}`} card={card} />
                        })}
                    </NftCardsContainer>
                  </>
                )}
                <HelperDiv>
                  <span>*</span>
                  {t('Please note that converting Private NFTs to YETs is an irreversible action.')}
                </HelperDiv>
                <NftNavTabs />
                <NftTable>
                  <NftPoolsHeader />
                  <NftTableContent>
                    {poolsWithData.filter(filterPools).map((pool) => (
                      <NftPoolCard
                        key={`Pool-Nft-${pool.id}`}
                        pool={pool}
                        onClaim={onClaimHandler}
                        pending={Boolean(pendingClaimResult?.[0] === pool.id)}
                        isLoading={isTransactionLoading}
                      />
                    ))}
                  </NftTableContent>
                </NftTable>
              </>
            )}
          </AppInvestorsAccountBody>
        </CardWrapper>
      </AvailableAccount>
    </ContentHolder>
  )
}

export default InvestorsAccount

// styles

const ContentHolder = styled.div`
  position: relative;
  margin: -11px 10px;
`

const CardWrapper = styled.div`
  width: 100%;
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

const StyledHeading = styled(Heading)`
  &.heading--desktop {
    display: none;
  }

  &.heading--mobile {
    display: none;
  }

  @media screen and (max-width: 1170px) {
    &.heading--desktop {
      display: block;
      font-size: 32px;
      text-align: center;
    }
  }

  @media screen and (max-width: 850px) {
    &.heading--desktop {
      display: block;
      font-size: 32px;
      text-align: left;
      margin: 36px 0 24px 0;
    }
  }

  @media screen and (max-width: 850px) {
    &.heading--desktop {
      display: none;
    }

    &.heading--mobile {
      display: block;
      text-align: left;
      letter-spacing: 0.3px;
      margin-bottom: 24px;
    }
  }

  @media screen and (max-width: 790px) {
    &.heading--mobile {
      font-size: 28px;
      text-align: center;
      line-height: 34.1px;
    }
  }

  @media screen and (max-width: 544px) {
    padding: 0 78px;
  }

  @media screen and (max-width: 482px) {
    padding: 0 60px;
  }

  @media screen and (max-width: 446px) {
    padding: 0 60px;
  }

  @media screen and (max-width: 446px) {
    padding: 0 30px;
  }

  @media screen and (max-width: 386px) {
    padding: 0;
  }
`

const NftCardsContainer = styled(Flex)`
  flex-wrap: wrap;
  align-content: flex-start;
  align-items: flex-start;
  justify-content: flex-start;
  margin-left: -15px;
  margin-right: -15px;
`

const HelperDiv = styled(Text)`
  padding: 8px 16px;
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  margin-top: 17px;
  width: fit-content;

  span {
    font-weight: 500;
    font-size: 24px;
    line-height: 30px;
    letter-spacing: 0.3px;
    color: #ff4d00;
    margin-right: 8px;
    position: relative;
    top: 5px;
  }
`

const NftTable = styled.div`
  margin-top: 24px;
`

const NftTableContent = styled(Flex)`
  margin-top: 8px;
  flex-direction: column;
  width: 100%;
`

const NoNFT = styled(Flex)`
  margin-top: 16px;
  flex-direction: column;
  width: 100%;
`

const NoNFTText = styled(Flex)`
  font-size: 22px;
  line-height: 1.5;
  font-weight: 500;
  color: #000;
  margin-bottom: 16px;
`
