import Overlay from '../../components/Overlay/Overlay'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Overlay show />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      position: fixed;
      top: 0;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(11,19,89,0.9);
      -webkit-transition: opacity 0.4s;
      transition: opacity 0.4s;
      opacity: 1;
      z-index: 10;
      pointer-events: initial;
    }

    <div
        class="c0"
        role="presentation"
      />
    </DocumentFragment>
  `)
})
