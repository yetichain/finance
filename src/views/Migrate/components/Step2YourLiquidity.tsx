import CoinLogo from 'alium-uikit/src/components/Svg/Icons/CoinLogo'
import { useTranslation } from 'next-i18next'
import { ChangeEvent, FC, useState } from 'react'
import Loader from 'react-loader-spinner'
import styled from 'styled-components'
import { IconChevron } from 'views/Migrate/components/IconChevron'

interface props {
  pairs?: { title: string; symbolA: string; symbolB: string; addressLP: string; exchange: string; balance: number }[]
  selectedPairKey: number
  setSelectedPairKey: (key: number) => void
  tokensAmount: string | number
  setTokensAmount: (tokensAmount: string | number) => void
  handleMigrate: () => void
  isLoadingPairs: boolean
}

export const Step2YourLiquidity: FC<props> = ({
  pairs,
  selectedPairKey,
  setSelectedPairKey,
  tokensAmount,
  setTokensAmount,
  handleMigrate,
  isLoadingPairs,
}) => {
  const { t } = useTranslation()
  const [viewTokens, setViewTokens] = useState(false)
  const { title, symbolA, symbolB, exchange, balance } = pairs[selectedPairKey] ?? {
    title: t('Token not selected'),
    exchange: '',
    balance: 0,
  }

  const handleTokensAmount = (event: ChangeEvent<HTMLInputElement>) => {
    let value = event.target.value
    value = value.replace(/[^0-9.]/g, '')

    let split = value.split('.')

    if (split.length > 2 && split[1].length > 1) value = `${split[0]}.${split[1]}`

    split = value.split('.')
    if (split.length > 1) value = `${Number(split[0])}.${split[1].slice(0, 18)}`

    isNaN(Number(value)) ? setTokensAmount('0') : setTokensAmount(value)
  }

  const handleMax = () => {
    setTokensAmount(balance)
  }

  const balancedMigrate = balance >= Number(tokensAmount) && Number(tokensAmount) > 0

  return (
    <Root>
      <header>
        <div className='title'>{t('Your Liquidity')}</div>
        <div className='title2'>
          {t('Click on a pool below, input the amount you wish to migrate or select max, and click migrate')}
        </div>
      </header>
      <main>
        <div
          className='tokens'
          onClick={() => setViewTokens((current) => !current)}
          style={{
            minHeight: '54px',
          }}
        >
          <div className='label'>{t('Tokens')}</div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {isLoadingPairs ? (
                <div style={{ position: 'absolute', margin: '5px 16px 0px 0px' }}>
                  <Loader width='24px' type='TailSpin' color='#6C5DD3' />
                </div>
              ) : (
                <>
                  {symbolA ? (
                    <img
                      src={`/images/coins-new/${symbolA?.toLocaleLowerCase() ?? 'link'}.png`}
                      alt=''
                      style={{ zIndex: 1 }}
                    />
                  ) : (
                    <CoinLogo />
                  )}

                  <div style={{ margin: '0 8px 0 -8px', display: 'flex', alignItems: 'center' }}>
                    {symbolB ? (
                      <img src={`/images/coins-new/${symbolB?.toLocaleLowerCase() ?? 'link'}.png`} alt='' />
                    ) : (
                      <CoinLogo />
                    )}
                  </div>
                  {title}
                  <div style={{ margin: '0 0 0 8px', display: 'flex', alignItems: 'center' }}>
                    {exchange && <img src={`/images/exchanges/${exchange}.png`} alt='' />}
                  </div>
                </>
              )}
            </div>
            <IconChevron inverted={viewTokens} />
          </div>
        </div>
        {viewTokens && (
          <div className='tokens-list'>
            {!pairs.length && (
              <div className='title2' style={{ padding: '12px 16px' }}>
                {t('You do not have liquidity available for migration')}
              </div>
            )}
            {pairs.map((pair, key) => (
              <div
                className='tokens-list-item'
                key={key}
                onClick={() => {
                  setSelectedPairKey(key)
                  setViewTokens(false)
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  {pair.symbolA ? (
                    <img
                      src={`/images/coins-new/${pair?.symbolA?.toLocaleLowerCase() ?? 'link'}.png`}
                      alt=''
                      style={{ zIndex: 1 }}
                    />
                  ) : (
                    <CoinLogo />
                  )}
                  <div style={{ margin: '0 8px 0 -8px', display: 'flex', alignItems: 'center' }}>
                    {pair.symbolB ? (
                      <img src={`/images/coins-new/${pair?.symbolB?.toLocaleLowerCase() ?? 'link'}.png`} alt='' />
                    ) : (
                      <CoinLogo />
                    )}
                  </div>

                  {pair.title}
                  <div style={{ margin: '0 0 0 8px', display: 'flex', alignItems: 'center' }}>
                    {pair.exchange && <img src={`/images/exchanges/${pair.exchange}.png`} alt='' />}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className={`tokens-amount ${selectedPairKey !== -1}`}>
          <div className='label'>{t('Amount of Tokens')}</div>
          <input
            type='text'
            placeholder='0.0'
            value={tokensAmount}
            onChange={handleTokensAmount}
            disabled={selectedPairKey === -1}
          />
          {tokensAmount !== balance && (
            <div className='max' onClick={handleMax}>
              {t('MAX')}
            </div>
          )}
        </div>
        <div className='balance'>
          <div>
            {t('Balance:')} <span>{balance}</span>
          </div>
        </div>
        <div className='action'>
          {balancedMigrate ? (
            <div className={`button ${balancedMigrate}`} onClick={handleMigrate}>
              {t('Migrate')}
            </div>
          ) : (
            <div className='button false'>{t('Migrate')}</div>
          )}
          {selectedPairKey !== -1 && (
            <div className='title2'>
              {t('You {{exchange}} {{title}} liquidity will become YETI {{title}} liquidity', { exchange, title })}
            </div>
          )}
        </div>
      </main>
    </Root>
  )
}

// styles

export const Root = styled.div`
  display: flex;
  flex-direction: column;

  .title {
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin: 0 0 8px 0;
  }

  .title2 {
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }

  header {
    padding: 24px;
    border-bottom: 1px solid #f4f5fa;
  }

  main {
    padding: 24px;
  }

  .tokens {
    user-select: none;
    width: 100%;
    margin: 16px 0;
    position: relative;
    padding: 16px;
    display: flex;
    align-items: center;

    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;

    border: 1px solid #d2d6e5;
    border-radius: 6px;
    cursor: pointer;
  }

  .tokens-list {
    margin: -16px 0 16px 0;
    width: 100%;
    padding: 2px;
    border-radius: 6px;
    background: #ffffff;
    box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
  }

  .tokens-list-item {
    user-select: none;
    cursor: pointer;
    height: 48px;
    border-radius: 6px;
    display: flex;
    align-items: center;
    padding-left: 16px;

    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;
  }

  .tokens-list-item:hover {
    background: #f5f7ff;
  }

  .tokens-amount {
    margin-top: 24px;
    width: 100%;
    position: relative;
    padding: 0 8px 0 16px;
    display: flex;
    align-items: center;

    border: 1px solid #d2d6e5;
    border-radius: 6px;

    &:hover {
      border-color: #8990a5;

      input::placeholder {
        color: #0b1359;
      }
    }

    &:focus-within {
      border-color: #6c5dd3;
    }
  }

  .tokens-amount input {
    border: none;
    outline: none;
    width: 100%;
    padding: 16px 0;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;
  }

  .tokens-amount .max {
    padding: 10px 8px;
    background: #e6e6f6;
    border-radius: 6px;
    font-weight: bold;
    font-size: 10px;
    line-height: 10px;
    letter-spacing: 1px;
    color: #6c5dd3;
    cursor: pointer;
  }

  .tokens-amount .max:hover {
    background: #6c5cd1;
    color: white;
  }

  .tokens-amount.false {
    user-select: none;
    background: #f5f7ff;
    border: 1px solid transparent;
  }

  .tokens-amount.false input {
    background: #f5f7ff;
  }

  .label {
    background: white;
    padding: 0 4px;
    position: absolute;
    top: -7px;
    left: 12px;

    font-weight: 500;
    font-size: 11px;
    line-height: 14px;
    color: #6c5dd3;
  }

  .action {
    display: flex;
    flex-direction: column;
  }

  @media screen and (min-width: 768px) {
    .action {
      flex-direction: row;
      align-items: center;
    }
  }

  .button {
    margin: 16px 24px 16px 0;
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 14px 24px;
    border-radius: 6px;
    background: #6c5dd3;
    color: #ffffff;
    cursor: pointer;

    font-style: normal;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    user-select: none;
  }

  .button:hover {
    background: #8677f0;
  }

  .button.false {
    cursor: default;
    background: #cbc8ee;
  }

  .button.false:hover {
    background: #cbc8ee;
  }

  .balance {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;

    @media screen and (min-width: 1024px) {
      flex-direction: row;
    }
  }

  .balance > div {
    margin: 20px 0 4px 0;
  }

  .balance span {
    color: #6c5dd3;
  }

  img {
    width: 24px;
    height: 24px;
  }
`
