import { Meta } from '@storybook/react/types-6-0'
import styled from 'styled-components'
import Heading from '../Heading/Heading'
import { scales } from '../Input/types'
import Numeric from './index'

const Row = styled.div`
  display: flex;
  margin-bottom: 32px;

  & > input + input {
    margin-left: 16px;
  }
`

export default {
  title: 'Components/Input',
  component: Numeric,
  argTypes: {},
} as Meta

export const Default = () => {
  return (
    <div>
      {Object.keys(scales).map((key) => (
        <>
          <Heading mb='16px'>{key}</Heading>
          <Row>
            <Numeric type='text' scale={scales[key]} value='Value' />
            <Numeric type='text' scale={scales[key]} placeholder='Placeholder...' />
            <Numeric type='text' scale={scales[key]} value='Disabled' disabled />
            <Numeric type='text' scale={scales[key]} value='Success' isSuccess />
            <Numeric type='text' scale={scales[key]} value='Warning' isWarning />
          </Row>
        </>
      ))}
    </div>
  )
}
