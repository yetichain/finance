import Text from '../../components/Text/Text'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Text>Alium</Text>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      color: #0B1359;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    <div
        class="c0"
        color="text"
      >
        Alium
      </div>
    </DocumentFragment>
  `)
})
