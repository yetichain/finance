import { Button, Flex } from 'alium-uikit/src'
import Modal from 'components/Modal'
import { Dots } from 'components/swap/styleds'
import { TransactionSubmittedContent } from 'components/TransactionConfirmationModal'
import useNftAccountCard from 'hooks/useNftAccountCard'
import { useTranslation } from 'next-i18next'
import { useCallback, useMemo, useState } from 'react'
import styled from 'styled-components'
import { CardType } from '../../constants/cards'

interface PropsType {
  card: CardType
}

const NftAccountCard = ({ card }: PropsType) => {
  const { t } = useTranslation()
  const isMp4 = card.img.split('.')[1] === 'mp4'
  const [value, setValue] = useState<number | string>('-')
  const [isTxOpen, setTxOpen] = useState(false)
  const [txHash, setTxHash] = useState('xczxczxczxc')
  const handleTxClose = () => {
    setTxOpen(false)
  }
  const {
    totalSupply,
    error,
    isApprovedPrivate,
    isApprovedPublic,
    pending,
    onApprove,
    onConvert,
    cardIds,
    setPendingConvert,
    setPendingApprove,
  } = useNftAccountCard(value, card.id)

  const limitId: number = useMemo(() => {
    return totalSupply ? parseInt(totalSupply, 10) : 1
  }, [totalSupply])

  const handleInput = useCallback(
    (event) => {
      let input = event.target.value
      input = parseInt(input, 10) <= 1 ? '1' : input
      input = parseInt(input, 10) >= limitId ? limitId.toString() : input
      const withoutSpaces = input.replace(/\s+/g, '')
      setValue(withoutSpaces)
    },
    [setValue, limitId],
  )

  const onApproveHandler = useCallback(() => {
    setPendingApprove(true)
    try {
      onApprove(card.privateCall).then((tx) => {
        if (tx) {
          setTxHash(tx)
          setTxOpen(true)
        }
      })
    } catch (e) {
      console.error('onApproveHandler', e.message || e)
      setPendingApprove(false)
    }
  }, [card.privateCall, onApprove, setPendingApprove])

  const onConvertHandler = useCallback(async () => {
    setPendingConvert(true)
    try {
      onConvert(card.privateCall, typeof value === 'string' ? parseInt(value, 10) : value).then((tx) => {
        if (tx) {
          setTxHash(tx)
          setTxOpen(true)
        }
      })
    } catch (e) {
      console.error('onConvertHandler', e.message || e)
      setPendingConvert(false)
    }
  }, [card.privateCall, onConvert, setPendingConvert, value])

  return (
    <NFTWrapper>
      <Modal isOpen={isTxOpen} onDismiss={handleTxClose} maxHeight={90} padding='24px' isTransparancy>
        <TransactionSubmittedContent hash={txHash} onDismiss={handleTxClose} />
      </Modal>
      <StyledFlex>
        {isMp4 ? (
          <Video autoPlay loop muted>
            <source src={card.img} type='video/mp4' />
          </Video>
        ) : (
          <Image src={card.img} alt='nft-preview' className='nft-preview' />
        )}
        <InputWrapper>
          <Label>{t('Select you NFT id')}</Label>
          <Select value={value} onChange={handleInput}>
            <Option value='-'>-</Option>
            {cardIds.map((cardId, key) => {
              return (
                <Option key={key} value={cardId}>
                  {cardId}
                </Option>
              )
            })}
          </Select>
        </InputWrapper>
        <ButtonFlex>
          {(card.privateCall && isApprovedPrivate) || (!card.privateCall && isApprovedPublic) ? (
            <Button onClick={onConvertHandler} disabled={Boolean(error || pending)}>
              {pending ? <Dots>{t('Converting')}</Dots> : error || t('Convert to YETs')}
            </Button>
          ) : (
            <Button onClick={onApproveHandler} disabled={pending}>
              {pending ? <Dots>{t('Approving')}</Dots> : t('Approve')}
            </Button>
          )}
        </ButtonFlex>
      </StyledFlex>
    </NFTWrapper>
  )
}

export default NftAccountCard

// styles

const NFTWrapper = styled.div`
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  outline: none;
  position: relative;
  width: 100%;
  max-width: 320px;
  background-color: white;
  margin: 0 15px 15px;

  @media (min-width: 568px) {
    width: calc(100% / 2 - 30px);
    max-width: 280px;
  }

  @media (min-width: 768px) {
    width: calc(100% / 3 - 30px);
    max-width: 280px;
  }

  @media (min-width: 1024px) {
    max-width: 354px;
    width: calc(100% / 3 - 30px);
  }
`

const StyledFlex = styled(Flex)`
  flex-direction: column;
  padding: 16px;
  box-sizing: border-box;
`

const ButtonFlex = styled(Flex)`
  padding: 0;
  margin-top: 16px;
  box-sizing: border-box;
  width: 100%;

  button {
    width: 100%;
  }
`

const Image = styled.img`
  max-width: 100%;
  max-height: 333px;
  margin: 0 auto;
`

const Video = styled.video`
  max-width: 100%;
  max-height: 333px;
  margin: 0 auto;
`

const InputWrapper = styled(Flex)`
  margin-top: 32px;
  position: relative;
  width: 100%;
`

const Label = styled.label`
  font-size: 12px;
  color: #6c5dd3;
  position: absolute;
  background-color: white;
  line-height: 14px;
  left: 12px;
  padding: 0 4px;
  top: calc(0% - 14px / 2);

  @media (min-width: 568px) {
    font-size: 10px;
  }

  @media (min-width: 1024px) {
    font-size: 12px;
  }
`

const Select = styled.select`
  background-color: transparent;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  box-shadow: inset 0 2px 2px -1px rgb(74 74 104 / 10%);
  color: #0b1359;
  display: block;
  font-size: 16px;
  height: 48px;
  outline: 0;
  padding: 0 16px;
  width: 100%;
`

const Option = styled.option``
