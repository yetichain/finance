import { ApolloClient, ApolloLink, HttpLink, InMemoryCache } from '@apollo/client'
import { ApiSource } from '../config'

export function createApolloClient(source: ApiSource) {
  const subgraphLink = new HttpLink({
    uri: source.url,
  })
  const blocklyticsLink = new HttpLink({
    uri: source.blocklytics,
  })
  return new ApolloClient({
    link: ApolloLink.split((operation) => operation.getContext().blocklytics, blocklyticsLink, subgraphLink),
    cache: new InMemoryCache({}),
  })
}
