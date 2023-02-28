import capitalize from 'lodash/capitalize'
import { BrowserRouter, Link } from 'react-router-dom'
import styled from 'styled-components'
import { getMainDomain } from '../../util'
import Flex from '../Flex/Flex'
import { AddIcon, AutoRenewIcon, CloseIcon, LogoIcon } from '../Svg'
import Button from './Button'
import IconButton from './IconButton'
import { variants } from './types'

const Row = styled(Flex)`
  margin-bottom: 32px;
  & > button + button,
  & > a + a {
    margin-left: 16px;
  }
`

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {},
}

export const Default: FC = () => {
  return (
    <>
      {Object.values(variants).map((variant) => (
        <Row key={variant}>
          <Button variant={variant}>{capitalize(variant)}</Button>
          <Button variant={variant} disabled>
            Disabled
          </Button>
          <Button variant={variant} size='sm'>
            Small
          </Button>
        </Row>
      ))}
    </>
  )
}

export const Variants: FC = () => {
  return (
    <BrowserRouter>
      <Row>
        <Button as='a' href={`https://${getMainDomain()}`} target='_blank' rel='noreferrer'>
          As an anchor
        </Button>
        <Button as={Link} to='/router-link' variant='secondary'>
          As an React Router link
        </Button>
        <Button as='a' href={`https://${getMainDomain()}`} disabled>
          As an anchor (disabled)
        </Button>
      </Row>
      <Row>
        <Button fullwidth>Full size</Button>
      </Row>
      <Row>
        <Button isloading endIcon={<AutoRenewIcon spin color='currentColor' />}>
          Approving
        </Button>
        <Button isloading variant='success'>
          Approving
        </Button>
      </Row>
      <Row>
        <Button startIcon={<LogoIcon />}>Start Icon</Button>
        <Button endIcon={<LogoIcon />}>End Icon</Button>
        <Button startIcon={<LogoIcon />} endIcon={<LogoIcon />}>
          Start & End Icon
        </Button>
      </Row>
      <Row>
        <IconButton>
          <LogoIcon />
        </IconButton>
        <IconButton variant='secondary'>
          <AddIcon />
        </IconButton>
        <IconButton buttonType='close' buttonSize='40px'>
          <CloseIcon />
        </IconButton>
      </Row>
      <Row>
        <IconButton size='sm' variant='danger'>
          <LogoIcon />
        </IconButton>
        <IconButton size='sm' variant='success'>
          <AddIcon />
        </IconButton>
      </Row>
      <Row>
        <Button buttonType='max'>MAX</Button>
      </Row>
    </BrowserRouter>
  )
}
