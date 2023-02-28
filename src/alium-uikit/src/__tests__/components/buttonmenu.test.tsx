import ButtonMenu from '../../components/ButtonMenu/ButtonMenu'
import ButtonMenuItem from '../../components/ButtonMenu/ButtonMenuItem'
import { renderWithTheme } from '../../testHelpers'

const handleClick = jest.fn()

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(
    <ButtonMenu activeIndex={0} onClick={handleClick}>
      <ButtonMenuItem>Item 1</ButtonMenuItem>
      <ButtonMenuItem>Item 2</ButtonMenuItem>
    </ButtonMenu>,
  )
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      background: #f4f5fa;
      padding: 10px;
      border: 1px solid #d2d6e5;
      border-radius: 6px;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
    }

    .c0 > button + button,
    .c0 > a + a {
      -webkit-letter-spacing: 0;
      -moz-letter-spacing: 0;
      -ms-letter-spacing: 0;
      letter-spacing: 0;
      margin-left: 8px;
    }

    .c1 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: #6C5DD3;
      border: none;
      border-radius: 6px;
      color: #FFFFFF;
      cursor: pointer;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: max-content;
      height: 48px;
      line-height: 1;
      -webkit-letter-spacing: 0.03em;
      -moz-letter-spacing: 0.03em;
      -ms-letter-spacing: 0.03em;
      letter-spacing: 0.03em;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      outline: 0;
      padding: 0 24px;
      -webkit-transition: background-color 0.2s;
      transition: background-color 0.2s;
      opacity: 1;
    }

    .c1:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #8677F0;
      border-color: currentColor;
    }

    .c1:active {
      background-color: #5849BD;
      box-shadow: inset 0 3px 0 inset 0px -1px 0px rgba(14,14,44,0.4);
    }

    .c1:disabled,
    .c1.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c2 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: #EBEDF9;
      border: 0;
      border-radius: 6px;
      color: #6C5DD3;
      cursor: pointer;
      display: -webkit-inline-box;
      display: -webkit-inline-flex;
      display: -ms-inline-flexbox;
      display: inline-flex;
      font-family: inherit;
      font-size: 14px;
      font-weight: 600;
      width: -webkit-max-content;
      width: -moz-max-content;
      width: max-content;
      height: 48px;
      line-height: 1;
      -webkit-letter-spacing: 0.03em;
      -moz-letter-spacing: 0.03em;
      -ms-letter-spacing: 0.03em;
      letter-spacing: 0.03em;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      outline: 0;
      padding: 0 24px;
      -webkit-transition: background-color 0.2s;
      transition: background-color 0.2s;
      opacity: 1;
    }

    .c2:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #6C5DD3;
      border-color: currentColor;
    }

    .c2:hover,
    .c2:hover > div,
    .c2:hover p,
    .c2:hover span {
      color: #fff;
    }

    .c2:hover svg {
      fill: #fff;
    }

    .c2:active {
      background-color: #5849BD;
      box-shadow: inset 0 3px 0 none;
    }

    .c2:disabled,
    .c2.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c3 {
      color: #6C5DD3;
    }

    .c3:hover:not(:disabled):not(:active) {
      background-color: transparent;
    }

    <div
        class="c0"
      >
        <button
          class="c1"
          type="button"
        >
          Item 1
        </button>
        <button
          class="c2 c3"
          type="button"
        >
          Item 2
        </button>
      </div>
    </DocumentFragment>
  `)
})
