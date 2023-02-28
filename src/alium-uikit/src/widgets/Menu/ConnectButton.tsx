import { useTranslation } from 'next-i18next'
import { ReactComponent as AddIcon } from 'public/icons/ConnectAdd.svg'
import { FC } from 'react'
import styled, { css } from 'styled-components'
import { breakpoints, mq } from 'ui'

interface props {
  isAccount: boolean
  accountEllipsis: string | null
  onClick: () => void
}

export const ConnectButton: FC<props> = ({ isAccount, accountEllipsis, onClick }) => {
  const { t } = useTranslation()

  return (
    <SConnectButton isAccount={isAccount} onClick={onClick}>
      <SIcon isAccount={isAccount}>
        <AddIcon />
      </SIcon>
      {isAccount ? accountEllipsis : t('Connect')}
    </SConnectButton>
  )
}

// styles

const SConnectButton = styled.div<{ isAccount: boolean }>`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 16px;
  margin-right: 6px;

  border-radius: 6px;
  background: #6c5dd3;

  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #ffffff;

  &:hover {
    background: #8677f0;
  }

  ${({ isAccount }) =>
    isAccount &&
    css`
      background: #ebedf9;
      color: #6c5dd3;

      &:hover {
        background: #6c5dd3;
        color: #ffffff;
      }
    `}

  @media ${mq.up(breakpoints.sm)} {
    padding: 12px 24px;
    margin-right: 8px;
  }

  @media ${mq.up(breakpoints.md)} {
    margin-right: initial;
  }
`

const SIcon = styled.div<{ isAccount: boolean }>`
  display: none;
  margin-right: 18px;

  @media ${mq.up(breakpoints.sm)} {
    display: ${({ isAccount }) => !isAccount && 'flex'};
  }
`
