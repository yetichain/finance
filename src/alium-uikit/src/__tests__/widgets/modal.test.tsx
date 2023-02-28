import noop from 'lodash/noop'
import { renderWithTheme } from '../../testHelpers'
import { Modal } from '../../widgets/Modal'

it('renders correctly', () => {
  const { asFragment } = renderWithTheme(
    <Modal title='Title' onDismiss={noop}>
      body
    </Modal>,
  )
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    .c9 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      padding: 24px;
    }

    .c4 {
      color: #0B1359;
      font-size: 16px;
      font-weight: 600;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    .c5 {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.1;
    }

    .c8 {
      fill: #6C5DD3;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c0 {
      background: #FFFFFF;
      box-shadow: 0 20px 36px -8px rgba(14,14,44,0.1),0px 1px 1px rgba(0,0,0,0.05);
      border-radius: 6px;
      width: 100%;
      z-index: 100;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .c1 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      border-bottom: 1px solid #e9eaeb;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 16px 24px;
    }

    .c3 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-flex: 1;
      -ms-flex: 1;
      flex: 1;
    }

    .c10 {
      padding: 30px 24px;
      box-sizing: border-box;
    }

    .c6 {
      font-size: 18px;
      line-height: 24px;
    }

    .c7 {
      cursor: pointer;
      outline: none;
      padding: 8px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      border: 1px solid #d2d6e5;
      border-radius: 4px;
      background: #fff;
      -webkit-transition: background-color 200ms ease-in-out;
      transition: background-color 200ms ease-in-out;
    }

    .c7:hover {
      background-color: #d2d6e5;
    }

    @media screen and (min-width:968px) {
      .c5 {
        font-size: 20px;
      }
    }

    @media screen and (min-width:370px) {
      .c0 {
        width: auto;
        min-width: 360px;
        max-width: 100%;
        margin: 0 10px;
      }
    }

    <div
        class="c0"
      >
        <div
          class="c1"
        >
          <div
            class="c2 c3"
          >
            <h2
              class="c4 c5 c6"
              color="text"
            >
              Title
            </h2>
          </div>
          <button
            aria-label="Close the dialog"
            class="c7"
          >
            <svg
              class="c8"
              color="primary"
              viewBox="0 0 24 24"
              width="20px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M7.75781 16.4623L16.2431 7.97705M7.75781 7.97705L16.2431 16.4623"
                stroke="#8990A5"
                stroke-linecap="round"
                stroke-width="1.5"
              />
            </svg>
          </button>
        </div>
        <div
          class="c9 c10"
        >
          body
        </div>
      </div>
    </DocumentFragment>
  `)
})
