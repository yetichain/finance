import Progress from '../../components/Progress/Progress'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Progress primaryStep={50} />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c1 {
      position: absolute;
      top: 0;
      left: 0;
      background-color: #7645D9;
      border-top-left-radius: 32px;
      border-bottom-left-radius: 32px;
      height: 16px;
      -webkit-transition: width 200ms ease;
      transition: width 200ms ease;
    }

    .c0 {
      position: relative;
      background-color: none;
      border-radius: 32px;
      box-shadow: inset 0px 2px 2px -1px rgba(74,74,104,0.1);
      height: 16px;
      overflow: hidden;
    }

    <div
        class="c0"
      >
        <div
          class="c1"
          style="width: 50%;"
        />
      </div>
    </DocumentFragment>
  `)
})
