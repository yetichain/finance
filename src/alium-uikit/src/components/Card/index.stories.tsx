import { Meta } from '@storybook/react/types-6-0'
import styled from 'styled-components'
import Heading from '../Heading/Heading'
import Card from './Card'
import CardBody from './CardBody'
import CardFooter from './CardFooter'
import UIKitCardHeader from './CardHeader'
import CardRibbon from './CardRibbon'

const Row = styled.div`
  margin-bottom: 32px;
`

export default {
  title: 'Components/Card',
  component: Card,
  argTypes: {},
} as Meta

export const Default: FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Row>
        <Card>
          <CardBody>Body</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isActive>
          <CardBody>Active</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isSuccess>
          <CardBody>Success</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isWarning>
          <CardBody>Warning</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
      <Row>
        <Card isDisabled>
          <CardBody>Disabled</CardBody>
          <CardFooter>Footer</CardFooter>
        </Card>
      </Row>
    </div>
  )
}

export const CardHeader: FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Card>
        <UIKitCardHeader>
          <Heading size='xl'>Card Header</Heading>
        </UIKitCardHeader>
        <CardBody>Body</CardBody>
        <CardFooter>Footer</CardFooter>
      </Card>
    </div>
  )
}
export const Ribbon: FC = () => {
  return (
    <div style={{ padding: '32px', width: '500px' }}>
      <Row>
        <Card ribbon={<CardRibbon text='Ribbon' />}>
          <div style={{ height: '112px', backgroundColor: '#191326' }} />
          <CardBody style={{ height: '150px' }}>Body</CardBody>
        </Card>
      </Row>
      <Row>
        <Card ribbon={<CardRibbon variantColor='textDisabled' text='Ribbon with Long Text' />}>
          <CardBody style={{ height: '150px' }}>Ribbons will truncate when text is too long</CardBody>
        </Card>
      </Row>
      <Row>
        <Card ribbon={<CardRibbon variantColor='success' text='Success' />}>
          <CardBody style={{ height: '150px' }}>Card</CardBody>
        </Card>
      </Row>
      <Row>
        <Card ribbon={<CardRibbon variantColor='failure' text='Failure' />}>
          <CardBody style={{ height: '150px' }}>Any Color in the theme</CardBody>
        </Card>
      </Row>
    </div>
  )
}
