import { Token } from '@alium-official/sdk'
import TransferLoader from 'components/Modal/transaction/TransferLoader'
import { useWeb3Context } from 'hooks/bridge/useWeb3Context'
import { useTranslation } from 'next-i18next'
import { ChevronRight } from 'react-feather'
import { useStoreBridge } from 'store/bridge/useStoreBridge'
import styled from 'styled-components'
import { getExplorerLink, useExplorerName } from 'utils'

interface Props {
  token: Token
  amount: string
}

const BridgeTransferLoader = ({ token, amount }: Props) => {
  const loadingText = useStoreBridge((state) => state.transactionText)
  const txHash = useStoreBridge((state) => state.txHash)
  const { t } = useTranslation()
  const { providerChainId } = useWeb3Context()
  const { explorerName } = useExplorerName(providerChainId)
  const link = getExplorerLink(providerChainId, txHash, 'transaction')

  return (
    <TransferLoader withoutHeader withoutWrapper>
      <BridgeTransferLoader.Wrapper>
        <h2>{t('Transfer {{amount}} {{tokenSymbol}} pending...', { amount, tokenSymbol: token?.symbol })}</h2>
        <p>{loadingText || t('Transaction is pending...')}</p>
        {txHash && (
          <BridgeTransferLoader.View>
            <a href={link} target='_blank'>
              {t('View on {{explorerName}}', { explorerName })} <ChevronRight />
            </a>
          </BridgeTransferLoader.View>
        )}
      </BridgeTransferLoader.Wrapper>
    </TransferLoader>
  )
}

export default BridgeTransferLoader

// styles

BridgeTransferLoader.Wrapper = styled.div`
  margin-top: 24px;
  text-align: center;
`

BridgeTransferLoader.View = styled.div`
  cursor: pointer;
  margin-top: 8px;
  font-style: normal;
  font-weight: bold;
  font-size: 14px;
  line-height: 20px;
  letter-spacing: 1px;
  color: #6c5dd3;
  display: flex;
  justify-content: center;
  align-items: center;

  a {
    display: flex;
    align-items: center;
    justify-content: center;
  }

  svg {
    stroke: #6c5dd3;
    width: 18px;
    height: 16px;
  }
`
