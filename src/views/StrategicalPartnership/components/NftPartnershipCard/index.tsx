import { ArrowDropDownIcon, ArrowDropUpIcon, Flex, Text } from 'alium-uikit/src'
import { useTranslation } from 'next-i18next'
import { ComponentProps, useState } from 'react'
import styled from 'styled-components'
import cardList, { CardType } from '../../constants/cards'
import { getCurrencies } from '../../constants/currencies'

const NFTWrapper = styled.button`
  border: none;
  box-sizing: border-box;
  border-radius: 6px;
  outline: none;
  background: none;
  position: relative;
  width: 100%;
`

const ContentHolder = styled.div`
  @media screen and (max-width: 850px) {
    > div:nth-child(3) {
      margin-top: 10px;
    }
  }
  @media screen and (max-width: 790px) {
    > div:nth-child(3) {
      margin-top: 15px;
    }
  }
`

const StyledDropDown = styled.div`
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  margin-right: 73px;
  height: 48px;
  position: relative;
  margin-top: 36px;
  cursor: pointer;

  > svg {
    position: absolute;
    right: 24px;
    top: 18px;
  }

  @media screen and (max-width: 1170px) {
    margin-right: 14px;
  }
  @media screen and (max-width: 850px) {
    margin-right: 118px;
  }
  @media screen and (max-width: 790px) {
    display: none;
  }
`

const StyledMobileDropDown = styled.div`
  border: 1px solid #d2d6e5;
  box-sizing: border-box;
  border-radius: 6px;
  width: 100%;
  height: 48px;
  position: relative;
  margin-top: 24px;
  cursor: pointer;

  > svg {
    position: absolute;
    right: 24px;
    top: 18px;
  }

  display: none;

  @media screen and (max-width: 790px) {
    display: block;
  }
`

const StyledSelectedOption = styled.p`
  position: absolute;
  left: 15px;
  top: 15px;
  letter-spacing: 0.3px;
`

const StyledLabel = styled.p`
  padding: 0 4px;
  font-weight: 500;
  position: absolute;
  background: white;
  top: -7px;
  left: 10px;
  font-size: 11px;
  color: #6c5dd3;
`

const StyledOptionsContainer = styled.div`
  box-sizing: border-box;
  position: relative;
  margin-top: 48px;
  background: white;
  box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
  border-radius: 6px;
  @media screen and (max-width: 790px) {
    position: fixed;
    width: calc(100vw - 54px);
  }
`

const StyledOption = styled.div`
  padding: 12px;
  text-align: left;
  color: #8990a5;
  transition: color, background-color 100ms ease-in-out;
  cursor: pointer;
  :hover {
    background-color: #f5f7ff;
    color: #0b1359;
  }
`

const StyledFlex = styled(Flex)`
  > div {
    margin-left: 80px;
    margin-top: 35px;
    width: 100%;
    > div {
      width: 100%;
    }
  }
  > img {
    width: 356px;
    height: 400px;
  }

  @media screen and (max-width: 850px) {
    > div {
      margin-left: 20px;
      margin-top: 25px;
    }
    > img {
      width: 270px;
      height: 304px;
    }
  }

  @media screen and (max-width: 790px) {
    flex-direction: row-reverse;
    justify-content: space-between;
    > img {
      width: 146px;
      height: 164px;
    }
    > div {
      margin-left: 0;
      margin-top: 4px;
    }
  }
`

const StyledButton = styled.div`
  > div {
    margin-top: 16px;
    margin-right: 32px;
    margin-right: 73px;
    @media screen and (max-width: 1170px) {
      margin-right: 14px;
    }
    @media screen and (max-width: 850px) {
      margin-right: 118px;
    }
    font-size: 14px;
    @media screen and (max-width: 790px) {
      display: none;
    }
  }
`

const StyledMobileButton = styled.div`
  > div {
    margin-top: 16px;
    margin-right: 32px;
    width: 100%;
    font-size: 14px;
    display: none;
    @media screen and (max-width: 790px) {
      display: block;
      margin-top: 8px;
    }
  }
`

const StyledCardInfo = styled(Flex)`
  padding-right: 73px;
  @media screen and (max-width: 1170px) {
    padding-right: 14px;
  }
  @media screen and (max-width: 850px) {
    padding-right: 118px;
  }
  @media screen and (max-width: 790px) {
    flex-direction: column;
    align-items: flex-start;
    padding-right: 0;

    > div:first-child {
      margin-bottom: 5px;
    }
  }
`

type TextPropsType = ComponentProps<typeof Text>

const StyledHeading = (props: TextPropsType) => (
  <Text
    mb='15px'
    style={{
      textAlign: 'left',
      fontStyle: 'normal',
      fontWeight: '500',
      fontSize: '24px',
      lineHeight: '22px',
      letterSpacing: '0.3px',
      color: '#0B1359',
    }}
    {...props}
  />
)

const CustomStyledHeading = styled(StyledHeading)`
  margin-top: 32px;
  margin-bottom: 34px;
  @media screen and (max-width: 850px) {
    margin-top: 0;
    margin-bottom: 22px;
    font-size: 18px !important;
  }
  @media screen and (max-width: 790px) {
    margin-top: 0;
    margin-bottom: 16px;
  }
`

const StyledListLabel = (props: TextPropsType) => (
  <Text style={{ fontSize: '14px', lineHeight: '16px', letterSpacing: '0.3px', color: '#8990A5' }} {...props} />
)

const StyledListValue = (props: TextPropsType) => (
  <Text style={{ fontSize: '14px', lineHeight: '16px', color: '#6C5DD3', fontWeight: '500' }} {...props} />
)

interface PropsType {
  card: CardType
  handleChange: any
  buttonWrap: any
}

const NftPartnershipCard = ({ card, handleChange, buttonWrap }: PropsType) => {
  const { t } = useTranslation()
  const currencies = getCurrencies()

  const ID = card.id.toString()

  const [showOptions, setShowOptions] = useState(false)
  const [selectedOption, setSelectedOption] = useState(
    `${Number(cardList[0]?.price).toLocaleString()} ${currencies.stablecoins[0]}`,
  )

  const handleClick = (item) => {
    setSelectedOption(`${Number(cardList[0]?.price).toLocaleString()} ${item}`)
    handleChange({ currency: item })
  }

  return (
    <NFTWrapper key={ID} type='button'>
      <StyledFlex>
        <img src={card.img} alt='nft-preview' className='nft-preview' />
        <Flex>
          <ContentHolder>
            <CustomStyledHeading className='desktop'>{card.headline}</CustomStyledHeading>
            <StyledCardInfo justifyContent='space-between' mt='10px'>
              <StyledListLabel>{t('cardsPrice')}</StyledListLabel>
              <StyledListValue>{card.cost}</StyledListValue>
            </StyledCardInfo>
            <StyledCardInfo justifyContent='space-between' mt='15px'>
              <StyledListLabel>{t('tokensAmount')}</StyledListLabel>
              <StyledListValue>{card.tokens}</StyledListValue>
            </StyledCardInfo>
            <StyledDropDown onClick={() => setShowOptions(!showOptions)}>
              <StyledLabel>Currency</StyledLabel>
              <StyledSelectedOption>{selectedOption}</StyledSelectedOption>
              {!showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
              {showOptions && (
                <StyledOptionsContainer>
                  {currencies.stablecoins.map((item, key) => (
                    <StyledOption key={key} onClick={() => handleClick(item)}>
                      {`${Number(cardList[0]?.price).toLocaleString()} ${item}`}
                    </StyledOption>
                  ))}
                </StyledOptionsContainer>
              )}
            </StyledDropDown>
            <StyledButton>{buttonWrap}</StyledButton>
          </ContentHolder>
        </Flex>
      </StyledFlex>
      <StyledMobileDropDown onClick={() => setShowOptions(!showOptions)}>
        <StyledLabel>Currency</StyledLabel>
        <StyledSelectedOption>{selectedOption}</StyledSelectedOption>
        {!showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
        {showOptions && (
          <StyledOptionsContainer>
            {currencies.stablecoins.map((item, key) => (
              <StyledOption
                key={key}
                onClick={() => setSelectedOption(`${Number(cardList[0]?.price).toLocaleString()} ${item}`)}
              >
                {`${Number(cardList[0]?.price).toLocaleString()} ${item}`}
              </StyledOption>
            ))}
          </StyledOptionsContainer>
        )}
      </StyledMobileDropDown>
      <StyledMobileButton>{buttonWrap}</StyledMobileButton>
      {/* <Flex style={{ width: '100%' }}>
        <img src={card.img} alt="nft-preview" className="nft-preview" />
        <StyledFlex flexDirection="column" style={{ width: '100%' }}>
          <StyledHeading className="desktop">{card.headline}</StyledHeading>
          <ContentHolder>
            <StyledHeading className="mobile">{card.headline}</StyledHeading>
            <Flex justifyContent="space-between" mt="10px" pr="34px">
              <StyledListLabel>{t('cardsPrice')}</StyledListLabel>
              <StyledListValue>{card.cost}</StyledListValue>
            </Flex>
            <Flex justifyContent="space-between" mt="10px" pr="34px">
              <StyledListLabel>{t('tokensAmount')}</StyledListLabel>
              <StyledListValue>{card.tokens}</StyledListValue>
            </Flex>
          </ContentHolder>
          <StyledDropDown onClick={() => setShowOptions(!showOptions)}>
            <StyledLabel>Currency</StyledLabel>
            <StyledSelectedOption>100 000 USDT</StyledSelectedOption>
            {!showOptions ? <ArrowDropDownIcon /> : <ArrowDropUpIcon />}
            {showOptions &&
            <StyledOptionsContainer>
              <StyledOption>100 000 BUSDT</StyledOption>
              <StyledOption>100 000 BUSDT</StyledOption>
            </StyledOptionsContainer>
            }
          </StyledDropDown>
          <StyledButton mt="16px" mr="32px">Unlock Wallet</StyledButton>
        </StyledFlex>
      </Flex> */}
    </NFTWrapper>
  )
}

export default NftPartnershipCard
