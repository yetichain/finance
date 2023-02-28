import styled from 'styled-components'
import NftItem from '../NftItem'
import { ReactComponent as GiftIcon } from './gift.svg'
import { ReactComponent as PlusIcon } from './plus.svg'

export default function NftItemReward() {
  return (
    <NftItemReward.Root>
      <PlusIcon />
      <NftItemReward.Wrapper>
        <NftItem />
        <NftItemReward.Icon>
          <GiftIcon />
        </NftItemReward.Icon>
      </NftItemReward.Wrapper>
    </NftItemReward.Root>
  )
}

NftItemReward.Root = styled.div`
  display: flex;
  align-items: flex-start;
  /* GiftIcon offset */
  padding-right: 12px;
`

NftItemReward.Wrapper = styled.div`
  position: relative;
  height: 100%;
`

NftItemReward.Icon = styled.div`
  background: #fff;
  border-radius: 50%;
  position: absolute;
  top: 0;
  right: 0;
  width: 24px;
  height: 24px;
  transform: translate(50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 6px 8px -6px rgba(24, 39, 75, 0.12), 0px 8px 16px -6px rgba(24, 39, 75, 0.08);
`
