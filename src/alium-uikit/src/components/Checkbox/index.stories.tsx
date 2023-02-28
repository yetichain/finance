import Checkbox from './Checkbox'

export default {
  title: 'Components/Checkbox',
  component: Checkbox,
  argTypes: {},
}

export const Default: FC = () => {
  return (
    <>
      <div style={{ marginBottom: '32px' }}>
        <Checkbox />
      </div>
      <div>
        <Checkbox scale='sm' />
      </div>
    </>
  )
}
