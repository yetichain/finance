import { ApolloProvider } from '@apollo/client'
import { useWeb3React } from '@web3-react/core'
import { ReactElement, ReactNode, useMemo } from 'react'
import Container from './components/Container'
import { getSourceByChainId } from './config'
import { createApolloClient } from './gql'

export interface LayoutProps {
  children: ReactNode
}

export default function Layout({ children }: LayoutProps) {
  const { chainId } = useWeb3React()
  const source = useMemo(() => getSourceByChainId(chainId), [chainId])
  const client = useMemo(() => source && createApolloClient(source), [source])

  if (!client) {
    return null
  }

  return (
    <ApolloProvider client={client}>
      <Container>{children}</Container>
    </ApolloProvider>
  )
}

export const getInfoLayout = (page: ReactElement) => <Layout>{page}</Layout>
