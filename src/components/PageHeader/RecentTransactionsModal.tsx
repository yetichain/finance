import { Button, CheckmarkCircleIcon, ErrorIcon, Flex, LinkExternal, Modal, Text } from 'alium-uikit/src'
import Loader from 'components/Loaders/Loader'
import { useActiveWeb3React } from 'hooks'
import { useTranslation } from 'next-i18next'
import { useMemo } from 'react'
import { isTransactionRecent, useAllTransactions } from 'state/transactions/hooks'
import { TransactionDetails } from 'state/transactions/reducer'
import styled from 'styled-components'
import { getExplorerLink } from 'utils'

const StyledWrapper = styled.div`
  max-width: 450px;
  width: 100%;
  z-index: inherit;
  > div > div:last-child {
    max-height: 472px;
    overflow-y: auto;
    padding: 19px 24px 15px 24px;
  }
`

const StyledTransactionsList = styled.div``

interface RecentTransactionsModalProps {
  onDismiss?: () => void
}

// TODO: Fix UI Kit typings
const defaultOnDismiss = () => null

const newTransactionsFirst = (a: TransactionDetails, b: TransactionDetails) => b.addedTime - a.addedTime

const getRowStatus = (sortedRecentTransaction: TransactionDetails) => {
  const { hash, receipt } = sortedRecentTransaction

  if (!hash) {
    return { icon: <Loader />, color: 'text' }
  }

  if (hash && receipt?.status === 1) {
    return { icon: <CheckmarkCircleIcon color='primaryBright' marginRight='8px' />, color: 'primaryBright' }
  }

  return { icon: <ErrorIcon color='failure' marginRight='8px' />, color: 'failure' }
}

const RecentTransactionsModal = ({ onDismiss = defaultOnDismiss }: RecentTransactionsModalProps) => {
  const { account, chainId } = useActiveWeb3React()
  const allTransactions = useAllTransactions()
  const { t } = useTranslation()

  // Logic taken from Web3Status/index.tsx line 175
  const sortedRecentTransactions = useMemo(() => {
    const txs = Object.values(allTransactions)
    return txs.filter(isTransactionRecent).sort(newTransactionsFirst)
  }, [allTransactions])

  return (
    <StyledWrapper>
      <Modal title={t('Recent Transactions')} onDismiss={onDismiss}>
        {!account && (
          <Flex justifyContent='center' flexDirection='column' alignItems='center'>
            <Text mb='20px' bold mt='12px' style={{ textAlign: 'center' }}>
              {t('Please connect your wallet to view your recent transactions')}
            </Text>
            <Button variant='secondary' size='md' onClick={onDismiss}>
              {t('Close')}
            </Button>
          </Flex>
        )}
        {account && chainId && sortedRecentTransactions.length === 0 && (
          <Flex justifyContent='center' flexDirection='column' alignItems='center'>
            <Text mb='8px'>{t('No recent transactions')}</Text>
            <Button variant='secondary' size='md' onClick={onDismiss} mt='10px'>
              {t('Close')}
            </Button>
          </Flex>
        )}
        <StyledTransactionsList>
          {account &&
            chainId &&
            sortedRecentTransactions.map((sortedRecentTransaction) => {
              const { hash, summary } = sortedRecentTransaction
              const { icon } = getRowStatus(sortedRecentTransaction)

              return (
                <Flex key={hash} alignItems='center' justifyContent='space-between' mb='16px' style={{ width: '100%' }}>
                  <LinkExternal
                    href={getExplorerLink(chainId, hash, 'transaction')}
                    color='#0B1359'
                    style={{ width: '100%', justifyContent: 'space-between', paddingRight: '4px' }}
                  >
                    <Flex>
                      {icon}
                      {summary ?? hash}
                    </Flex>
                  </LinkExternal>
                </Flex>
              )
            })}
        </StyledTransactionsList>
      </Modal>
    </StyledWrapper>
  )
}

export default RecentTransactionsModal
