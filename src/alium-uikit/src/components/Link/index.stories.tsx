import Flex from '../Flex/Flex'
import CheckmarkCircleIcon from '../Svg/Icons/CheckmarkCircle'
import { Link, LinkExternal } from './index'

export default {
  title: 'Components/Link',
  component: Link,
  argTypes: {
    fontSize: {
      name: 'fontSize',
      table: {
        type: { summary: 'string', detail: 'Fontsize in px or em' },
        defaultValue: { summary: '16px' },
      },
      control: {
        type: null,
      },
    },
  },
}

export const Default: FC = () => {
  return (
    <div>
      <div>
        <Link href='/'>Default</Link>
      </div>
      <div>
        <Link href='/' color='text'>
          Custom color
        </Link>
      </div>
      <div>
        <Link external href='/'>
          External
        </Link>
      </div>
      <div>
        <LinkExternal href='/'>
          <Flex>
            <CheckmarkCircleIcon color='primaryBright' marginRight='8px' />
            LinkExternal
          </Flex>
        </LinkExternal>
      </div>
    </div>
  )
}
