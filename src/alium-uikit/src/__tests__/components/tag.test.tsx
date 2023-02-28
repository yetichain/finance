import Tag from '../../components/Tag/Tag'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Tag>Core</Tag>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: #6C5DD3;
      border: 2px solid #6C5DD3;
      border-radius: 16px;
      color: #ffffff;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      font-size: 14px;
      font-weight: 400;
      height: 28px;
      line-height: 1.5;
      padding: 0 8px;
      white-space: nowrap;
    }

    .c0 svg {
      fill: #ffffff;
    }

    <div
        class="c0"
      >
        Core
      </div>
    </DocumentFragment>
  `)
})
