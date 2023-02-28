import { useTranslation } from 'react-i18next'
import { useStoreFarms } from 'store/farms/useStoreFarms'
import styled from 'styled-components'
import { breakpoints, mq } from 'ui'

export const FarmStakedSwitcher = () => {
  const { t } = useTranslation()
  const stakedOnly = useStoreFarms((state) => state.stakedOnly)
  const setStakedOnly = useStoreFarms((state) => state.setStakedOnly)

  return (
    <SwitchWrap>
      <Switch align={stakedOnly ? 'end' : 'start'} active={stakedOnly} onClick={() => setStakedOnly(!stakedOnly)}>
        <span />
      </Switch>
      <h3>{t('Staked only')}</h3>
    </SwitchWrap>
  )
}

// styles

const SwitchWrap = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 24px;

  @media ${mq.down(breakpoints.lg)} {
    margin-right: 16px;
  }

  @media ${mq.down(breakpoints.sm)} {
    margin-right: 0;
  }

  h3 {
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    color: #8990a5;
  }
`
const Switch = styled.div<{ align: 'start' | 'end'; active: boolean }>`
  background: ${(props) => (props.active ? '#B9E4D2' : '#f4f5fa')};
  border: 1px solid ${(props) => (props.active ? '#24BA7B' : '#D2D6E5')};
  box-sizing: border-box;
  border-radius: 50px;
  width: 46px;
  height: 24px;
  padding: 3px;
  cursor: pointer;
  display: flex;
  justify-content: flex-${(props) => props.align};
  margin-right: 16px;

  @media ${mq.down(breakpoints.lg)} {
    margin-right: 8px;
  }

  span {
    height: 16px;
    width: 16px;
    background: #ffffff;
    box-shadow: 0px 6px 12px rgba(185, 189, 208, 0.4);
    border-radius: 50%;
    display: block;
  }
`
