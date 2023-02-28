import Heading from '../../components/Heading/Heading'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Heading>Title</Heading>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      color: #0B1359;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    .c1 {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.1;
    }

    @media screen and (min-width:968px) {
      .c1 {
        font-size: 20px;
      }
    }

    <h2
        class="c0 c1"
        color="text"
      >
        Title
      </h2>
    </DocumentFragment>
  `)
})
