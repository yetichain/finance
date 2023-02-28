import { JSBI, TokenAmount } from '@alium-official/sdk'
import { parseUnits } from '@ethersproject/units'
import { Button, Flex, Text } from 'alium-uikit/src'
import axios from 'axios'
import { GreyCard } from 'components/Card'
import { AutoColumn } from 'components/Column'
import ConnectWalletButton from 'components/ConnectWalletButton'
import Modal from 'components/Modal'
import { RowBetween } from 'components/Row'
import { TransactionSubmittedContent, TransactionSucceedContent } from 'components/TransactionConfirmationModal'
import { isProduction } from 'config'
import { NFT_PRIVATE_ADDRESS } from 'constants/abis/nftPrivate'
import { useActiveWeb3React } from 'hooks'
import { ApprovalState, useApproveCallback } from 'hooks/useApproveCallback'
import { useNFTPrivateContract } from 'hooks/useContract'
import { useTranslation } from 'next-i18next'
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from 'state'
import { PopupList } from 'state/application/reducer'
import { WrappedTokenInfo } from 'state/lists/hooks'
import { useTransactionAdder } from 'state/transactions/hooks'
import { useCurrencyBalance } from 'state/wallet/hooks'
import styled from 'styled-components'
import AppBody from '../AppBody'
import { Dots } from '../Pool/styleds'
import NftPartnershipCard from './components/NftPartnershipCard'
import cardList from './constants/cards'
import { getCurrencies } from './constants/currencies'
import emails from './constants/membersList'

const bgIMG = 'images/home/background-img.svg'

const ContentHolder = styled.div`
  position: relative;
  & .content-background {
    position: absolute;
    right: -20px;
    top: -35px;
  }

  @media screen and (max-width: 1170px) {
    & .content-background {
      top: 12px;
    }
  }

  @media screen and (max-width: 480px) {
    & .content-background {
      right: 0;
      top: 50px;
    }
  }
`

const ButtonWrap = styled.div``

const CardWrapper = styled.div`
  width: 100%;
  font-family: Roboto, sans-serif;
  max-width: 906px;
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

const AddressWrap = styled.div`
  background: rgba(108, 93, 211, 0.1);
  border: 1px solid #6c5dd3;
  padding: 5px;
  margin: 8px 0 32px 0;
  width: 207px;
  align-self: center;
  border-radius: 6px;
  text-align: center;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 0.3px;
  color: #6c5dd3;
`

const StyledLink = styled.a`
  color: #6c5dd3;
  display: inline-block;
  text-decoration: underline;
  cursor: pointer;
  :active {
    outline: none;
    border: none;
  }
  :focus {
    outline: none;
    border: none;
  }
`

const StyledTextWrapper = styled.div`
  padding: 0 80px;

  @media screen and (max-width: 655px) {
    padding: 0 50px;
  }

  @media screen and (max-width: 500px) {
    padding: 0;
  }
`

const NotifyMembers = (hash, currency) => {
  const explorer = 'https://bscscan.com/tx'
  if (isProduction) {
    emails.forEach((email) => {
      const obj = {
        to: email,
        subject: 'New card purchase',
        message: `Client bought card for ${currency} \n  ${explorer}/${hash}`,
      }
      axios.post('https://private.alium.finance/api/send-email/', obj).catch((err) => {
        console.error(err)
      })
    })
  }
}

const StrategicalPartnershipHome = () => {
  const currencies = getCurrencies()
  const [isOpenModal] = useState(false)
  const [isHideModalOpen, setHideModalOpen] = useState(false)
  const { account, chainId } = useActiveWeb3React()

  const { t } = useTranslation()

  useEffect(() => {
    if (account) {
      setHideModalOpen(false)
    } else if (!isHideModalOpen) setHideModalOpen(true)
  }, [account, isHideModalOpen, isOpenModal])

  const nftContract = useNFTPrivateContract()
  const [isSucceedPopupVisible, setSucceedPopupVisible] = useState(false)

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

  const [values, setValues] = useState<any>({
    currency: currencies.stablecoins[0],
    count: 1,
  })

  const [txHash, setTxHash] = useState('xczxczxczxc')
  const [tempTxHash, setTempTxHash] = useState('')
  const [isTxOpen, setTxOpen] = useState(false)
  const [bought, setBought] = useState(false)

  const state = useSelector<AppState, AppState['transactions']>((s) => s.transactions)
  const transactions: any = chainId ? state[chainId] ?? {} : {}

  if (txHash !== '' && transactions[txHash]?.receipt) {
    setTempTxHash(txHash)
    setTxHash('')
    setTxOpen(false)
  }

  const addTransaction = useTransactionAdder()

  const cardPrice = '100000'

  const handleBuy = () => {
    const args = [
      currencies.match[values.currency]?.address,
      '5',
      parseUnits(cardPrice, currencies.match[values.currency]?.decimals),
    ]
    nftContract?.estimateGas
      .buy(...args, { from: account })
      .then((estimatedGasLimit) => {
        nftContract
          ?.buy(...args, { gasLimit: estimatedGasLimit })
          .then((resp) => {
            NotifyMembers(resp.hash, values.currency)
            addTransaction(resp, {
              // @ts-ignore
              summary: t('boughtCards', { count: '1' }),
              additionalData: {
                count: '1',
                card: '1',
              },
            })

            setTxHash(resp.hash)
            setTxOpen(true)
            setBought(true)
          })
          .catch((err) => console.error(err))
      })
      .catch((err) => console.error(err))
  }

  const [approval, approveCallback] = useApproveCallback(
    new TokenAmount(
      new WrappedTokenInfo(currencies.match[values.currency], []),
      JSBI.BigInt(parseUnits(cardPrice, currencies.match[values.currency]?.decimals).toString()),
    ),
    NFT_PRIVATE_ADDRESS,
  )
  const [approvalSubmitted, setApprovalSubmitted] = useState<boolean>(false)

  useEffect(() => {
    if (approval === ApprovalState.PENDING) {
      setApprovalSubmitted(true)
    }
  }, [approval, approvalSubmitted])

  const handleChange = (value) => {
    setValues(value)
    if (approvalSubmitted && approval !== ApprovalState.PENDING) {
      setApprovalSubmitted(false)
    }
  }

  const balance = useCurrencyBalance(account?.toString(), new WrappedTokenInfo(currencies.match[values.currency], []))

  const sufficientBalance =
    balance &&
    parseInt(balance?.raw.toString(), 10) >=
      parseInt(parseUnits(cardPrice, currencies.match[values.currency]?.decimals).toString(), 10)

  const accountEllipsis = account ? `${account.substring(0, 8)}...${account.substring(account.length - 8)}` : null

  const handleClose = () => {}

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
    // removePopup(succeedHash)
    // setTempTxHash('')
  }

  return (
    <ContentHolder>
      <img className='content-background' src={bgIMG} alt='background' />
      <CardWrapper>
        <Modal isOpen={isOpenModal} onDismiss={handleClose}>
          <Flex flexDirection='column'>
            <Text
              style={{
                textAlign: 'center',
                fontStyle: 'normal',
                fontWeight: 'bold',
                fontSize: '16px',
                lineHeight: '22px',
                letterSpacing: '0.3px',
                color: '#0B1359',
              }}
            >
              Sorry, we haven’t found this address in
              <Text
                style={{
                  textAlign: 'center',
                  fontStyle: 'normal',
                  fontWeight: 'bold',
                  fontSize: '16px',
                  lineHeight: '22px',
                  letterSpacing: '0.3px',
                  color: '#0B1359',
                }}
              >
                the Strategical Partnership Whitelist:
              </Text>
            </Text>
            <AddressWrap>{accountEllipsis}</AddressWrap>
            <StyledTextWrapper>
              <Text
                style={{
                  textAlign: 'center',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.3px',
                  color: '#0B1359',
                }}
              >
                If you have been registered for the Whitelist before, please try to connect with another address.
              </Text>
              <Text
                mt='15px'
                style={{
                  textAlign: 'center',
                  fontStyle: 'normal',
                  fontWeight: 'normal',
                  fontSize: '14px',
                  lineHeight: '20px',
                  letterSpacing: '0.3px',
                  color: '#0B1359',
                }}
              >
                If that didn&#39;t help, please contact <StyledLink href='https://t.me/akents'>@Akents</StyledLink> and
                he will help you to solve this issue.
              </Text>
            </StyledTextWrapper>
          </Flex>
        </Modal>
        <Modal isOpen={isHideModalOpen} onDismiss={handleClose}>
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
              {t('pleaseUnlockWallet')}
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

        {/* <StyledHeading as='h1' size='xl' color='heading' mb='40px' mt='20px' className='heading--desktop'>
          {t('strategicalPartnership')}
        </StyledHeading>
        <StyledHeading as='h1' size='xl' color='heading' mb='40px' className='heading--mobile'>
          {t('strategicalPartnership')}
        </StyledHeading> */}

        <AppBody>
          {cardList.map((card, key) => (
            <NftPartnershipCard
              key={key}
              card={card}
              handleChange={handleChange}
              buttonWrap={
                <ButtonWrap>
                  {!account ? (
                    <ConnectWalletButton fullwidth />
                  ) : (
                    <AutoColumn gap='md'>
                      {sufficientBalance ? (
                        approval === ApprovalState.APPROVED ? (
                          !bought ? (
                            <RowBetween>
                              <Button onClick={handleBuy} style={{ width: '100%' }}>
                                {t('buyAmountCards', { count: 1 })}
                              </Button>
                            </RowBetween>
                          ) : (
                            <GreyCard style={{ textAlign: 'center' }}>Please, wait...</GreyCard>
                          )
                        ) : (
                          <RowBetween>
                            <Button
                              onClick={approveCallback}
                              disabled={approval === ApprovalState.PENDING || approvalSubmitted}
                              style={{ width: '100%' }}
                            >
                              {approval === ApprovalState.PENDING || approvalSubmitted ? (
                                <Dots>{t('Approving', { count: values.currency })}</Dots>
                              ) : (
                                t('Approve', { count: values.currency })
                              )}
                            </Button>
                          </RowBetween>
                        )
                      ) : (
                        <GreyCard style={{ textAlign: 'center', width: '100%' }}>
                          {balance && !sufficientBalance ? t('Insufficient Balance') : 'Please, wait...'}
                        </GreyCard>
                      )}
                    </AutoColumn>
                  )}
                </ButtonWrap>
              }
            />
          ))}
        </AppBody>
      </CardWrapper>
    </ContentHolder>
  )
}

export default StrategicalPartnershipHome
