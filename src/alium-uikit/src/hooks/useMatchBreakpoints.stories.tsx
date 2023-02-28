import useMatchBreakpoints from './useMatchBreakpoints'

export default {
  title: 'Hooks/useMatchBreakpoints',
  argTypes: {},
}

export const Default: FC = () => {
  const state = useMatchBreakpoints()

  return (
    <div style={{ padding: '32px' }}>
      <pre>{JSON.stringify(state, null, 2)}</pre>
    </div>
  )
}
