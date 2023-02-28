import Flex from '../../components/Flex/Flex'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Flex>flex</Flex>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    <div
        class="c0"
      >
        flex
      </div>
    </DocumentFragment>
  `)
})
