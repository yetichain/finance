import languageCodes from 'config/localisation/languageCodes'
import useOnClickOutside from 'hooks/useOnClickOutside'
import Cookies from 'js-cookie'
import { useTranslation } from 'next-i18next'
import nextI18nextConfig from 'next-i18next.config'
import { useRouter } from 'next/router'
import { useCallback, useRef, useState } from 'react'
import styled from 'styled-components'
import { Card } from 'ui'
import { ReactComponent as GlobeIcon } from './assets/globe.svg'

export interface LanguageSwitchProps {
  className?: string
  inPanel?: boolean
}

const locales = nextI18nextConfig.i18n.locales

export default function LanguageSwitch({ className, inPanel }: LanguageSwitchProps) {
  const rootRef = useRef()
  const { i18n } = useTranslation()
  const [isOpen, setOpen] = useState(false)
  const router = useRouter()
  const changeLanguage = useCallback(
    (locale: string) => {
      Cookies.set('NEXT_LOCALE', locale)
      router
        .push({ pathname: router.pathname, query: router.query }, router.asPath, { locale })
        .then(() => setOpen(false))
    },
    [router],
  )
  useOnClickOutside(rootRef, () => setOpen(false))
  if (locales.length < 2) {
    return null
  }
  return (
    <LanguageSwitch.Root
      ref={rootRef}
      data-open={isOpen || undefined}
      data-in-panel={inPanel || undefined}
      className={className}
    >
      <LanguageSwitch.Button onClick={() => setOpen(true)} type='button'>
        <GlobeIcon />
        {inPanel ? languageCodes[i18n.language] : i18n.language.toUpperCase()}
      </LanguageSwitch.Button>
      {isOpen && (
        <LanguageSwitch.Menu>
          {locales.map((locale) => (
            <LanguageSwitch.MenuItem onClick={() => changeLanguage(locale)} key={locale}>
              {languageCodes[locale]}
            </LanguageSwitch.MenuItem>
          ))}
        </LanguageSwitch.Menu>
      )}
    </LanguageSwitch.Root>
  )
}

LanguageSwitch.Button = styled.button`
  width: 100%;
  display: inline-flex;
  align-items: center;
  border: 1px solid #d2d6e5;
  border-radius: 6px;
  background: none;
  cursor: pointer;
  padding: 12px 20px 12px 12px;
  font-weight: 500;
  font-size: 14px;
  line-height: 16px;
  color: #8990a5;

  svg {
    margin-right: 8px;
  }
`

LanguageSwitch.Menu = styled(Card)`
  display: flex;
  flex-direction: column;
  box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
  padding: 8px 2px;
  z-index: 1;

  position: absolute;
  left: 0;
  right: 0;
  bottom: -2px;
  transform: translateY(100%);
`

LanguageSwitch.MenuItem = styled.button`
  background: none;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  padding: 8px;
  text-align: left;
  font-size: 14px;
  line-height: 16px;
  letter-spacing: 0.1px;
  color: #8990a5;

  &:hover {
    background: #f5f7ff;
  }
`

LanguageSwitch.Root = styled.div`
  position: relative;

  &[data-open] {
    ${LanguageSwitch.Button} {
      border-color: #6c5dd3;
    }
  }

  &[data-in-panel] {
    ${LanguageSwitch.Button} {
      svg {
        margin-right: 16px;
      }
    }

    ${LanguageSwitch.Menu} {
      top: -2px;
      bottom: unset;
      transform: translateY(-100%);
    }
  }
`
