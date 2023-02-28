import { Trade } from '@alium-official/sdk'
import { Flex } from 'alium-uikit/src'
import { Fragment, memo } from 'react'
import { ChevronRight } from 'react-feather'
import styled from 'styled-components'
import CurrencyLogo from '../CurrencyLogo'
import { TYPE } from '../Shared'

const { black: Black } = TYPE

const StyledFlex = styled(Flex)`
  > img {
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
  }
  > svg {
    border-radius: 16px;
    box-shadow: 0 6px 12px rgba(185, 189, 208, 0.4);
  }
`

export default memo(({ trade }: { trade: Trade }) => {
  return (
    <Flex
      px='1rem'
      py='0.5rem'
      my='0.5rem'
      style={{ border: `1px solid #F5F7FF`, borderRadius: '6px' }}
      flexWrap='wrap'
      justifyContent='space-evenly'
      alignItems='center'
    >
      {trade.route.path.map((token, i, path) => {
        const isLastItem: boolean = i === path.length - 1
        return (
          <Fragment key={i}>
            <StyledFlex my='0.5rem' alignItems='center' style={{ flexShrink: 0 }}>
              <CurrencyLogo currency={token} />
              <Black fontSize={14} color='#8990A5' ml='0.5rem'>
                {token.symbol}
              </Black>
            </StyledFlex>
            {isLastItem ? null : <ChevronRight color='#8990A5' />}
          </Fragment>
        )
      })}
    </Flex>
  )
})
