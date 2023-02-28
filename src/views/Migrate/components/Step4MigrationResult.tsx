import { Button } from 'alium-uikit/src'
import copy from 'copy-to-clipboard'
import { useTranslation } from 'next-i18next'
import Link from 'next/link'
import { FC, useEffect, useState } from 'react'
import styled from 'styled-components'
import { IconClose } from 'views/Migrate/components/IconClose'
import { IconCopy } from 'views/Migrate/components/IconCopy'
import { IconNotSuccessful } from 'views/Migrate/components/IconNotSuccessful'
import { IconSuccessful } from 'views/Migrate/components/IconSuccessful'

interface props {
  pair?: { title: string; symbolA: string; symbolB: string; addressLP: string; exchange: string; balance: number }
  isSuccessful: boolean
  contract?: string
  explorer?: string
  aliumLPTokenForPair?: string
  setStep1: () => void
  handleTryAgain: () => void
}

export const Step4MigrationResult: FC<props> = ({
  pair = {},
  isSuccessful,
  contract = '',
  explorer = '',
  aliumLPTokenForPair = '',
  setStep1,
  handleTryAgain,
}) => {
  const { t } = useTranslation()
  const [isCopied, setIsCopied] = useState(false)

  const handleCopy = (str: string) => {
    setIsCopied(copy(str))
  }

  useEffect(() => {
    if (isCopied) {
      let timer = setTimeout(() => setIsCopied(false), 1500)

      return () => {
        clearTimeout(timer)
      }
    }
  }, [isCopied])

  const inputValue = isCopied ? t('Copied') : aliumLPTokenForPair

  return (
    <Root>
      <div className='close' onClick={setStep1}>
        <IconClose />
      </div>
      {isSuccessful ? (
        <>
          <IconSuccessful />
          <div className='title'>
            {t('Migrate {{pairExchange}} {{pairTitle}} liquidity to YETI', {
              pairExchange: pair.exchange,
              pairTitle: pair.title,
            })}
          </div>
          <div
            style={{
              display: 'flex',
              width: '100%',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '8px 0',
              padding: '0 16px',
            }}
          >
            <div style={{ marginRight: '12px' }}>{t('Alium-LP Token:')}</div>
            <div className='copy'>
              <input type='text' value={inputValue} />
              <div onClick={() => handleCopy(aliumLPTokenForPair)}>
                <IconCopy />
              </div>
            </div>
          </div>
          <Link href={`${explorer}tx/${contract}`}>
            <a className='view-on-explorer' target='_blank'>
              {t('View on explorer >')}
            </a>
          </Link>
        </>
      ) : (
        <>
          <IconNotSuccessful />
          <div className='title error'>{t('Migration failed')}</div>
          <Button onClick={handleTryAgain}>{t('Try again')}</Button>
        </>
      )}
    </Root>
  )
}

// styles

const Root = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 0;
  position: relative;

  .close {
    position: absolute;
    right: 0;
    top: 0;
    padding: 12px 15px;
    margin: 4px;
    cursor: pointer;
    border-radius: 6px;

    &:hover {
      background: #eeeeee;
    }
  }

  .title {
    font-size: 16px;
    line-height: 22px;
    letter-spacing: 0.3px;
    color: #0b1359;
    margin: 24px 8px 10px 8px;
    text-align: center;

    &.error {
      margin: 24px 0 36px 0;
      color: #ff4d00;
    }
  }

  .copy {
    padding: 12px 16px;
    width: 100%;
    max-width: 354px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    line-height: 16px;
    letter-spacing: 0.1px;
    color: #0b1359;
    border: 1px solid #d2d6e5;
    border-radius: 6px;

    & input {
      border: none;
      outline: none;
      width: 100%;
      font-size: 14px;
      line-height: 16px;
      letter-spacing: 0.1px;
      color: #8990a5;
    }

    & svg {
      cursor: pointer;
    }
  }

  .view-on-explorer {
    padding: 12px;
    font-weight: bold;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 1px;
    color: #6c5dd3;
  }

  @media screen and (min-width: 768px) {
    padding: 90px 0;
  }
`
