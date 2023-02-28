import Button from '../../components/Button/Button'
import { renderWithTheme } from '../../testHelpers'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(<Button>Submit</Button>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
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

    .c0:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #8677F0;
      border-color: currentColor;
    }

    .c0:active {
      background-color: #5849BD;
      box-shadow: inset 0 3px 0 inset 0px -1px 0px rgba(14,14,44,0.4);
    }

    .c0:disabled,
    .c0.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    <button
        class="c0"
        type="button"
      >
        Submit
      </button>
    </DocumentFragment>
  `)
})
