import styled from 'styled-components'
import { BaseLayout, CardsLayout } from '.'

export default {
  title: 'Components/Layouts',
  argTypes: {},
}

const Stub = styled.div`
  width: 100%;
  background: #1fc7d4;
  height: 300px;
`

export const Base: FC = () => {
  return (
    <BaseLayout>
      {[...Array(24)].map((value) => (
        <Stub key={value} />
      ))}
    </BaseLayout>
  )
}

export const Cards: FC = () => {
  return (
    <CardsLayout>
      {[...Array(10)].map((value) => (
        <Stub key={value} />
      ))}
    </CardsLayout>
  )
}
