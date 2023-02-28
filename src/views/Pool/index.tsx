import { Button, Text } from 'alium-uikit/src'
import { LightCard } from 'components/Card'
import { CardNav } from 'components/CardNav'
import UnlockButton from 'components/ConnectWalletButton'
import PageHeader from 'components/PageHeader'
import FullPositionCard from 'components/PositionCard'
import Question from 'components/QuestionHelper'
import { StyledInternalLink, TYPE } from 'components/Shared'
import { Dots } from 'components/swap/styleds'
import { useActiveWeb3React } from 'hooks'
import { useAllV2PairsWithLiquidity } from 'hooks/pool/useAllV2PairsWithLiquidity'
import { useTranslation } from 'next-i18next'
import { useRouter } from 'next/router'
import React, { useContext } from 'react'
import { ROUTES } from 'routes'
import styled, { css, ThemeContext } from 'styled-components'
import SwapAppBody from 'views/Swap/SwapAppBody'

const md = '768px'

interface StyledLiquidityProps {
  found?: boolean
}

const { body: Body } = TYPE

const Pool = React.memo(() => {
  const { data, loading } = useAllV2PairsWithLiquidity()
  const router = useRouter()
  const theme = useContext(ThemeContext)
  const { account } = useActiveWeb3React()
  const { t } = useTranslation()

  const getButton = () => {
    return (
      <AddLiquidityBtn
        id='join-pool-button'
        onClick={() => {
          router.push(ROUTES.addByOne('ETH'))
        }}
      >
        {t('Add Liquidity')}
      </AddLiquidityBtn>
    )
  }

  return (
    <CardWrapper>
      <CardNav activeIndex={1} />
      <SwapAppBody>
        <PageHeader
          title={t('Liquidity')}
          description={t('Add liquidity to receive LP tokens')}
          settingsModalTitle={t('Liquidity Creation Settings')}
        />
        <StyledCardBody singleBlock={data?.length > 0}>
          {!account ? <UnlockButton /> : getButton()}
          <div>
            {data?.length === 0 && (
              <>
                <StyledLiquidity>
                  <Text color={theme.colors.text}>{t('Your Liquidity')}</Text>
                  <Question
                    text={t(
                      'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.',
                    )}
                  />
                </StyledLiquidity>
                {!account ? (
                  <LightCard>
                    <Body color={theme.colors.textDisabled} textAlign='center' style={{ fontSize: '14px' }}>
                      {t('Connect to a wallet to view your liquidity.')}
                    </Body>
                  </LightCard>
                ) : loading ? (
                  <LightCard>
                    <Body color={theme.colors.textDisabled} textAlign='center'>
                      <Dots>{t('Loading')}</Dots>
                    </Body>
                  </LightCard>
                ) : data?.length > 0 ? (
                  <>
                    {data.map((v2Pair) => (
                      <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                    ))}
                  </>
                ) : (
                  <LightCard>
                    <Body color={theme.colors.textDisabled} textAlign='center'>
                      {t('No liquidity found.')}
                    </Body>
                  </LightCard>
                )}
              </>
            )}
          </div>
        </StyledCardBody>
        {data?.length > 0 && (
          <StyledYourLiquidity>
            <StyledLiquidity found>
              <Text color={theme.colors.text}>{t('Your Liquidity')}</Text>
              <Question
                text={t(
                  'When you add liquidity, you are given pool tokens representing your position. These tokens automatically earn fees proportional to your share of the pool, and can be redeemed at any time.',
                )}
              />
            </StyledLiquidity>
            <StyledFoundLiquidity>
              {data.map((v2Pair) => (
                <StyledFullPositionCard key={v2Pair.liquidityToken.address}>
                  <FullPositionCard key={v2Pair.liquidityToken.address} pair={v2Pair} />
                </StyledFullPositionCard>
              ))}
            </StyledFoundLiquidity>
          </StyledYourLiquidity>
        )}
        <NoJoinedPoolText small>
          {t("Don't see a pool you joined?")}
          &nbsp;
          <StyledInternalLink id='import-pool-link' href='/find'>
            {t('Import it.')}
          </StyledInternalLink>
        </NoJoinedPoolText>
      </SwapAppBody>
    </CardWrapper>
  )
})

// styles

const CardWrapper = styled.div`
  width: 100%;
`

const StyledCardBody = styled.div<{ singleBlock?: boolean }>`
  display: flex;
  justify-content: space-between;
  padding: 34px 24px 32px 24px;
  align-items: center;
  height: 114px;
  border-bottom: 1px solid #f4f5fa;

  & > div {
    text-align: center;

    &:last-child {
      flex-basis: 80%;
    }

    &:first-child {
      display: flex;
      > button {
        margin-top: 0;
      }
    }
  }

  & > a {
    width: 173px;
  }

  @media screen and (max-width: 461px) {
    flex-direction: column-reverse;
    height: 196px;
    padding: 32px 16px;

    ${({ singleBlock }) =>
      singleBlock &&
      css`
        height: 96px;
        flex-direction: row;
        padding-left: 16px;

        & > div {
          flex-basis: 0 !important;
        }
      `}

    > div {
      flex-basis: 60%;
    }

    > button {
      width: 100%;
    }
  }
`

const StyledLiquidity = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 5px;

  @media screen and (max-width: 414px) {
    padding-left: 24px;
  }

  ${(props: StyledLiquidityProps) =>
    props.found &&
    `
    justify-content: flex-start;
    border-bottom: 1px solid #F4F5FA;
    padding: 16px;
  `}
`

const StyledYourLiquidity = styled.div`
  margin: 24px;
  border: 1px solid #f4f5fa;
  box-sizing: border-box;
  border-radius: 6px;

  @media screen and (max-width: 376px) {
    margin: 16px;
  }
`

const StyledFoundLiquidity = styled.div`
  padding: 16px;
  overflow-y: auto;

  > div:not(:last-child) {
    border-bottom: 1px solid #f4f5fa;
  }
`

const StyledFullPositionCard = styled.div`
  div {
    padding: 6px 6px 6px 2px;
    border: none;

    &:hover {
      border: none;
    }
  }

  > a {
    width: auto !important;
  }

  // TODO: bad practice
  > div > div > div div {
    &:last-child {
      justify-content: flex-start;
    }

    &:last-child a {
      margin-right: 20px;
    }
  }

  @media screen and (max-width: 576px) {
    div {
      padding: 6px 6px 6px 0;
    }
  }
`

const AddLiquidityBtn = styled(Button)`
  width: 143px;
  padding: 0 21px;
  flex-shrink: 0;
`

const NoJoinedPoolText = styled(Text)`
  width: fit-content;
  margin: 16px auto;

  @media screen and (min-width: ${md}) {
    margin: 16px 24px;
  }
`

export default Pool
