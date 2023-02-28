import noop from 'lodash/noop'
import { renderWithTheme } from '../../testHelpers'
import AccountModal from '../../widgets/WalletModal/AccountModal'
import ConnectModal from '../../widgets/WalletModal/ConnectModal'

it('renders ConnectModal correctly', () => {
  // @ts-ignore
  const { asFragment } = renderWithTheme(<ConnectModal login={noop} />)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c8 {
      fill: #6C5DD3;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c20 {
      fill: #0B1359;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c31 {
      fill: #6C5DD3;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      margin-right: 6px;
    }

    .c18 {
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

    .c18:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #8677F0;
      border-color: currentColor;
    }

    .c18:active {
      background-color: #5849BD;
      box-shadow: inset 0 3px 0 inset 0px -1px 0px rgba(14,14,44,0.4);
    }

    .c18:disabled,
    .c18.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c25 {
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
      width: 100%;
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

    .c25:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #6C5DD3;
      border-color: currentColor;
    }

    .c25:hover,
    .c25:hover > div,
    .c25:hover p,
    .c25:hover span {
      color: #fff;
    }

    .c25:hover svg {
      fill: #fff;
    }

    .c25:active {
      background-color: #5849BD;
      box-shadow: inset 0 3px 0 none;
    }

    .c25:disabled,
    .c25.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

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

    .c11 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-bottom: 5px;
    }

    .c16 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c22 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-top: 30px;
      margin-bottom: 5px;
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

    .c14 {
      color: #0B1359;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    .c21 {
      color: #8990A5;
      font-size: 11px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
      margin-bottom: 10px;
    }

    .c28 {
      color: #6C5DD3;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    .c32 {
      color: #6C5DD3;
      font-size: 10px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    .c27 {
      color: #8990A5;
      font-size: 11px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
      margin-bottom: 8px;
    }

    .c5 {
      font-size: 20px;
      font-weight: 600;
      line-height: 1.1;
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

    .c29 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
    }

    .c29:hover {
      color: #6c5dd3;
    }

    .c29 svg > * {
      -webkit-transition: stroke 200ms ease-in-out;
      transition: stroke 200ms ease-in-out;
    }

    .c29:hover > svg:last-child > * {
      stroke: #6c5dd3;
    }

    .c19 {
      position: relative;
      width: 48px;
      height: 48px;
      background: #f5f7ff;
      border-radius: 6px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 0;
    }

    .c19 > * {
      margin: auto;
    }

    .c17 > button {
      border: 1px solid white !important;
      -webkit-transition: border 200ms ease-in-out;
      transition: border 200ms ease-in-out;
    }

    .c17 > div {
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
    }

    .c17:hover > button {
      background: #f5f7ff !important;
      border: 1px solid #6c5dd3 !important;
    }

    .c17:hover > div {
      color: #6c5dd3;
    }

    .c26 {
      position: relative;
      width: 48px;
      height: 48px;
      background: #f5f7ff;
      border-radius: 6px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      padding: 0;
    }

    .c26 > * {
      margin: auto;
    }

    .c26 svg {
      fill: transparent;
    }

    .c24 > button {
      border: 1px solid white !important;
      opacity: 0.5;
      -webkit-transition: border 200ms ease-in-out;
      transition: border 200ms ease-in-out;
    }

    .c24 > div {
      opacity: 0.5;
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
    }

    .c24 > button {
      background: #f5f7ff !important;
    }

    .c30 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-self: flex-start;
      -ms-flex-item-align: start;
      align-self: flex-start;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-top: 24px;
    }

    .c13 {
      width: 32px;
      height: 32px;
      background: #f5f7ff;
      border-radius: 6px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    .c13 > * {
      color: #8990a5;
      font-size: 11px;
      margin: auto;
    }

    .c15 {
      margin-left: 60px;
      -webkit-flex-wrap: wrap;
      -ms-flex-wrap: wrap;
      flex-wrap: wrap;
    }

    .c15 > * {
      width: 72px;
    }

    .c15 > *:not(:last-child) {
      margin-right: 16px;
    }

    .c23 {
      -webkit-flex-wrap: nowrap;
      -ms-flex-wrap: nowrap;
      flex-wrap: nowrap;
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

    @media screen and (max-width:800px) {
      .c13 {
        display: none;
      }
    }

    @media screen and (max-width:800px) {
      .c15 {
        margin-left: 1px;
        margin-top: 12px;
      }
    }

    @media screen and (max-width:800px) {
      .c12 > div {
        margin-left: 0 !important;
      }
    }

    @media screen and (max-width:420px) {
      .c23 {
        -webkit-flex-wrap: wrap;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
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
              Connect Wallet
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
          <div
            class="c11 c12"
          >
            <div
              class="c13"
            >
              <p>
                1
              </p>
            </div>
            <div
              class="c14"
              color="text"
              style="font-size: 14px; color: rgb(11, 19, 89); margin-left: 16px;"
            >
              Choose Network
            </div>
          </div>
          <div
            class="c2 c15"
          >
            <div
              class="c16 c17"
            >
              <button
                class="c18 c19"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.50409 10.5638L11.9997 7.06828L15.4972 10.5656L17.5312 8.53162L11.9997 3L6.47009 8.52977L8.50409 10.5638Z"
                    fill="#F3BA2F"
                  />
                  <path
                    d="M7.0679 11.9995L5.03394 9.96558L2.99987 11.9996L5.03384 14.0336L7.0679 11.9995Z"
                    fill="#F3BA2F"
                  />
                  <path
                    d="M8.50427 13.4363L11.9999 16.9318L15.4972 13.4346L17.5324 15.4674L17.5314 15.4686L11.9999 21L6.47013 15.4704L6.46729 15.4676L8.50427 13.4363Z"
                    fill="#F3BA2F"
                  />
                  <path
                    d="M18.9661 14.0347L21.0002 12.0006L18.9662 9.96665L16.9322 12.0007L18.9661 14.0347Z"
                    fill="#F3BA2F"
                  />
                  <path
                    d="M14.0629 11.9989H14.0637L11.9997 9.93494L10.4744 11.4603H10.4743L10.2991 11.6356L9.9376 11.9971L9.93475 11.9999L9.9376 12.0029L11.9997 14.0651L14.0637 12.0011L14.0647 11.9999L14.0629 11.9989Z"
                    fill="#F3BA2F"
                  />
                </svg>
              </button>
              <div
                class="c21"
                color="#8990A5"
                font-size="11px"
                style="user-select: none;"
              >
                Binance
              </div>
            </div>
            <div
              class="c16 c17"
            >
              <button
                class="c18 c19"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M13.6751 8.5365C13.6751 5.95391 12.4216 3.72972 11.4669 3.00782C11.4669 3.00782 11.3935 2.96714 11.4011 3.07136C11.3226 8.06116 8.78272 9.41346 7.38742 11.2335C4.16635 15.4378 7.15952 20.0463 10.2135 20.8979C11.9152 21.3758 9.81842 20.054 9.54747 17.2655C9.21574 13.9 13.6751 11.3275 13.6751 8.5365Z"
                    fill="#1B2143"
                  />
                  <path
                    d="M15.1384 10.237C15.1182 10.2243 15.0903 10.2142 15.0726 10.2472C15.0194 10.8751 14.3813 12.2172 13.5709 13.4526C10.8234 17.6366 12.3883 19.6549 13.2696 20.7403C13.7811 21.3681 13.2696 20.7403 14.5459 20.0972C16.1235 19.1363 17.1465 17.4739 17.2985 15.6285C17.5492 12.6544 15.7715 10.781 15.1384 10.237Z"
                    fill="#2CA6E0"
                  />
                </svg>
              </button>
              <div
                class="c21"
                color="#8990A5"
                font-size="11px"
                style="user-select: none;"
              >
                Huobi
              </div>
            </div>
            <div
              class="c16 c17"
            >
              <button
                class="c18 c19"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 38.4 33.5"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M29,10.2c-0.7-0.4-1.6-0.4-2.4,0L21,13.5l-3.8,2.1l-5.5,3.3c-0.7,0.4-1.6,0.4-2.4,0L5,16.3 c-0.7-0.4-1.2-1.2-1.2-2.1v-5c0-0.8,0.4-1.6,1.2-2.1l4.3-2.5c0.7-0.4,1.6-0.4,2.4,0L16,7.2c0.7,0.4,1.2,1.2,1.2,2.1v3.3l3.8-2.2V7 c0-0.8-0.4-1.6-1.2-2.1l-8-4.7c-0.7-0.4-1.6-0.4-2.4,0L1.2,5C0.4,5.4,0,6.2,0,7v9.4c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l5.5-3.2l3.8-2.2l5.5-3.2c0.7-0.4,1.6-0.4,2.4,0l4.3,2.5c0.7,0.4,1.2,1.2,1.2,2.1v5c0,0.8-0.4,1.6-1.2,2.1 L29,28.8c-0.7,0.4-1.6,0.4-2.4,0l-4.3-2.5c-0.7-0.4-1.2-1.2-1.2-2.1V21l-3.8,2.2v3.3c0,0.8,0.4,1.6,1.2,2.1l8.1,4.7 c0.7,0.4,1.6,0.4,2.4,0l8.1-4.7c0.7-0.4,1.2-1.2,1.2-2.1V17c0-0.8-0.4-1.6-1.2-2.1L29,10.2z"
                    fill="#8247E5"
                  />
                </svg>
              </button>
              <div
                class="c21"
                color="#8990A5"
                font-size="11px"
                style="user-select: none;"
              >
                Polygon
              </div>
            </div>
            <div
              class="c16 c17"
            >
              <button
                class="c18 c19"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 256 417"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M127.961 0l-2.795 9.5v275.668l2.795 2.79 127.962-75.638z"
                    fill="#343434"
                  />
                  <path
                    d="M127.962 0L0 212.32l127.962 75.639V154.158z"
                    fill="#8C8C8C"
                  />
                  <path
                    d="M127.961 312.187l-1.575 1.92v98.199l1.575 4.6L256 236.587z"
                    fill="#3C3C3B"
                  />
                  <path
                    d="M127.962 416.905v-104.72L0 236.585z"
                    fill="#8C8C8C"
                  />
                  <path
                    d="M127.961 287.958l127.96-75.637-127.96-58.162z"
                    fill="#141414"
                  />
                  <path
                    d="M0 212.32l127.96 75.638v-133.8z"
                    fill="#393939"
                  />
                </svg>
              </button>
              <div
                class="c21"
                color="#8990A5"
                font-size="11px"
                style="user-select: none;"
              >
                Ethereum
              </div>
            </div>
          </div>
          <div
            class="c22 c12"
          >
            <div
              class="c13"
            >
              <p>
                2
              </p>
            </div>
            <div
              class="c14"
              color="text"
              style="font-size: 14px; color: rgb(11, 19, 89); margin-left: 16px;"
            >
              Choose Wallet
            </div>
          </div>
          <div
            class="c2 c15 c23"
          >
             
            <div
              class="c16 c24"
            >
              <button
                class="c25 c26"
                id="wallet-connect-metamask"
                style="justify-content: space-between;"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M22.813 0.75L13.4374 7.68729L15.1809 3.59892L22.813 0.75Z"
                    fill="#E17726"
                    stroke="#E17726"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M1.18701 0.75L10.4791 7.75203L8.81919 3.59891L1.18701 0.75Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M19.4372 16.8352L16.9426 20.6461L22.2842 22.1168L23.8144 16.9185L19.4372 16.8352Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M0.194641 16.9185L1.7155 22.1168L7.04783 20.6461L4.56249 16.8352L0.194641 16.9185Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M6.7603 10.3974L5.27655 12.6358L10.5625 12.8763L10.3863 7.18774L6.7603 10.3974Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M17.2394 10.3976L13.5579 7.12317L13.4373 12.8765L18.7232 12.636L17.2394 10.3976Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M7.04791 20.6461L10.2473 19.1014L7.49306 16.9554L7.04791 20.6461Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.7527 19.1014L16.9428 20.6461L16.5069 16.9554L13.7527 19.1014Z"
                    fill="#E27625"
                    stroke="#E27625"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M16.9428 20.6462L13.7527 19.1016L14.0123 21.1735L13.9845 22.0522L16.9428 20.6462Z"
                    fill="#D5BFB2"
                    stroke="#D5BFB2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M7.04791 20.6462L10.0155 22.0522L9.99692 21.1735L10.2473 19.1016L7.04791 20.6462Z"
                    fill="#D5BFB2"
                    stroke="#D5BFB2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M10.071 15.5865L7.41876 14.8096L9.29201 13.9493L10.071 15.5865Z"
                    fill="#233447"
                    stroke="#233447"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.9289 15.5865L14.7079 13.9493L16.5904 14.8096L13.9289 15.5865Z"
                    fill="#233447"
                    stroke="#233447"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M7.04786 20.6461L7.51157 16.8352L4.56256 16.9185L7.04786 20.6461Z"
                    fill="#CC6228"
                    stroke="#CC6228"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M16.4883 16.8352L16.9427 20.6461L19.4373 16.9185L16.4883 16.8352Z"
                    fill="#CC6228"
                    stroke="#CC6228"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M18.7232 12.6359L13.4373 12.8764L13.9288 15.5866L14.7078 13.9493L16.5903 14.8096L18.7232 12.6359Z"
                    fill="#CC6228"
                    stroke="#CC6228"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M7.41874 14.8096L9.29199 13.9493L10.071 15.5866L10.5625 12.8764L5.27655 12.6359L7.41874 14.8096Z"
                    fill="#CC6228"
                    stroke="#CC6228"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M5.27673 12.6359L7.49313 16.9555L7.4189 14.8096L5.27673 12.6359Z"
                    fill="#E27525"
                    stroke="#E27525"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M16.5904 14.8096L16.507 16.9555L18.7234 12.6359L16.5904 14.8096Z"
                    fill="#E27525"
                    stroke="#E27525"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M10.5628 12.8763L10.0713 15.5866L10.6926 18.7869L10.8317 14.5691L10.5628 12.8763Z"
                    fill="#E27525"
                    stroke="#E27525"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.4374 12.8763L13.1777 14.5599L13.3076 18.7869L13.9289 15.5866L13.4374 12.8763Z"
                    fill="#E27525"
                    stroke="#E27525"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.9289 15.5866L13.3076 18.7869L13.7527 19.1014L16.507 16.9555L16.5904 14.8096L13.9289 15.5866Z"
                    fill="#F5841F"
                    stroke="#F5841F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M7.41876 14.8096L7.493 16.9555L10.2472 19.1014L10.6923 18.7869L10.071 15.5866L7.41876 14.8096Z"
                    fill="#F5841F"
                    stroke="#F5841F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.9846 22.0521L14.0123 21.1734L13.7713 20.9698H10.2288L9.99692 21.1734L10.0155 22.0521L7.04791 20.6461L8.08655 21.4971L10.1917 22.9493H13.799L15.9134 21.4971L16.9428 20.6461L13.9846 22.0521Z"
                    fill="#C0AC9D"
                    stroke="#C0AC9D"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.7526 19.1014L13.3075 18.787H10.6923L10.2472 19.1014L9.99683 21.1734L10.2287 20.9699H13.7712L14.0123 21.1734L13.7526 19.1014Z"
                    fill="#161616"
                    stroke="#161616"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M23.2117 8.1405L24 4.31114L22.813 0.75L13.7527 7.45607L17.2395 10.3974L22.1638 11.8312L23.2488 10.564L22.7759 10.2217L23.527 9.53727L22.9521 9.09326L23.7033 8.51976L23.2117 8.1405Z"
                    fill="#763E1A"
                    stroke="#763E1A"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M0 4.31114L0.797528 8.1405L0.287484 8.51976L1.04791 9.09326L0.472953 9.53727L1.22411 10.2217L0.751157 10.564L1.83617 11.8312L6.76047 10.3974L10.2473 7.45607L1.18702 0.75L0 4.31114Z"
                    fill="#763E1A"
                    stroke="#763E1A"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M22.1639 11.8311L17.2396 10.3975L18.7234 12.6359L16.507 16.9555L19.4374 16.9185H23.8145L22.1639 11.8311Z"
                    fill="#F5841F"
                    stroke="#F5841F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M6.7603 10.3975L1.83606 11.8311L0.194641 16.9185H4.56249L7.49291 16.9555L5.27656 12.6359L6.7603 10.3975Z"
                    fill="#F5841F"
                    stroke="#F5841F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                  <path
                    d="M13.4373 12.8764L13.7526 7.45598L15.1807 3.59888H8.81909L10.2472 7.45598L10.5625 12.8764L10.6831 14.5783L10.6923 18.7869H13.3075L13.3168 14.5783L13.4373 12.8764Z"
                    fill="#F5841F"
                    stroke="#F5841F"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="0.25"
                  />
                </svg>
              </button>
              <div
                class="c27"
                color="#8990A5"
                font-size="11px"
                style="text-align: center;"
              >
                Metamask
              </div>
            </div>
              
            <div
              class="c16 c24"
            >
              <button
                class="c25 c26"
                id="wallet-connect-token pocket"
                style="justify-content: space-between;"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 24C18.6274 24 24 18.6274 24 12C24 5.37258 18.6274 0 12 0C5.37258 0 0 5.37258 0 12C0 18.6274 5.37258 24 12 24Z"
                    fill="white"
                  />
                  <path
                    d="M11.0822 8.83864V5.42834H4.77315C4.64525 5.42834 4.56 5.51359 4.56 5.64149V10.4585C4.56 10.5864 4.64525 10.6717 4.77315 10.6717H7.20297V19.4532C7.20297 19.5811 7.28825 19.6663 7.41612 19.6663H11.3806C11.5085 19.6663 11.5937 19.5811 11.5937 19.4532V8.83864H11.0822Z"
                    fill="#29AEFF"
                  />
                  <path
                    d="M15.473 4.31995H13.9383H9.80334C9.67547 4.31995 9.59019 4.4052 9.59019 4.5331V18.3448C9.59019 18.4727 9.67547 18.5579 9.80334 18.5579H13.7678C13.8957 18.5579 13.981 18.4727 13.981 18.3448V14.8492H15.5156C18.4144 14.8492 20.7589 12.5047 20.7589 9.60592C20.7589 6.66452 18.3717 4.31995 15.473 4.31995Z"
                    fill="#2761E7"
                  />
                </svg>
              </button>
              <div
                class="c27"
                color="#8990A5"
                font-size="11px"
                style="text-align: center;"
              >
                Token Pocket
              </div>
            </div>
             
            <div
              class="c16 c24"
            >
              <button
                class="c25 c26"
                id="wallet-connect-wallet connect"
                style="justify-content: space-between;"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 12C24 5.37257 18.6274 0 12 0C5.37257 0 0 5.37257 0 12C0 18.6274 5.37257 24 12 24C18.6274 24 24 18.6274 24 12Z"
                    fill="#3389FB"
                  />
                  <path
                    d="M7.42317 8.85612C9.9509 6.38129 14.0491 6.38129 16.5768 8.85612L16.881 9.15397C17.0074 9.27772 17.0074 9.47835 16.881 9.6021L15.8404 10.621C15.7772 10.6828 15.6747 10.6828 15.6115 10.621L15.1929 10.2111C13.4295 8.48459 10.5705 8.48459 8.8071 10.2111L8.35877 10.65C8.29557 10.7119 8.19312 10.7119 8.12992 10.65L7.08927 9.63117C6.96287 9.50742 6.96287 9.30679 7.08927 9.18304L7.42317 8.85612ZM18.729 10.9633L19.6552 11.8701C19.7816 11.9939 19.7816 12.1945 19.6552 12.3182L15.479 16.4072C15.3526 16.5309 15.1477 16.5309 15.0213 16.4072L12.0572 13.5051C12.0256 13.4742 11.9744 13.4742 11.9428 13.5051L8.97882 16.4072C8.85245 16.5309 8.64755 16.5309 8.52115 16.4072L4.3448 12.3182C4.2184 12.1944 4.2184 11.9938 4.3448 11.8701L5.27097 10.9632C5.39737 10.8395 5.60227 10.8395 5.72865 10.9632L8.69275 13.8653C8.72435 13.8963 8.77557 13.8963 8.80717 13.8653L11.7711 10.9632C11.8975 10.8395 12.1024 10.8395 12.2288 10.9632L15.1929 13.8653C15.2245 13.8963 15.2757 13.8963 15.3073 13.8653L18.2713 10.9633C18.3977 10.8396 18.6026 10.8396 18.729 10.9633Z"
                    fill="white"
                  />
                </svg>
              </button>
              <div
                class="c27"
                color="#8990A5"
                font-size="11px"
                style="text-align: center;"
              >
                Wallet Connect
              </div>
            </div>
             
            <div
              class="c16 c24"
            >
              <button
                class="c25 c26"
                id="wallet-connect-binance chain wallet"
                style="justify-content: space-between;"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="18"
                  viewBox="0 0 16 18"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M7.71441 0L2.9779 2.75707L4.71928 3.77561L7.71441 2.03707L10.7095 3.77561L12.451 2.75707L7.71441 0Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M10.7095 5.21558L12.451 6.23415V8.27123L9.45576 10.0097V13.4868L7.71441 14.5054L5.97306 13.4868V10.0097L2.9779 8.27123V6.23415L4.71928 5.21558L7.71441 6.95415L10.7095 5.21558Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M12.4509 9.71118V11.7483L10.7095 12.7668V10.7297L12.4509 9.71118Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M10.6919 14.2068L13.687 12.4683V8.99123L15.4284 7.97266V13.4868L10.6919 16.2439V14.2068Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M13.6873 5.51413L11.946 4.49559L13.6873 3.47705L15.4287 4.49559V6.53263L13.6873 7.55121V5.51413Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M5.97298 16.9815V14.9445L7.71433 15.963L9.45568 14.9445V16.9815L7.71433 18L5.97298 16.9815Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M4.71928 12.7668L2.9779 11.7483V9.71118L4.71928 10.7297V12.7668Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M7.71433 5.51413L5.97298 4.49559L7.71433 3.47705L9.45568 4.49559L7.71433 5.51413Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M3.48277 4.49559L1.74137 5.51413V7.55121L0 6.53263V4.49559L1.74137 3.47705L3.48277 4.49559Z"
                    fill="#F0B90B"
                  />
                  <path
                    d="M0 7.97266L1.74137 8.99123V12.4683L4.73655 14.2068V16.2439L0 13.4868V7.97266Z"
                    fill="#F0B90B"
                  />
                </svg>
              </button>
              <div
                class="c27"
                color="#8990A5"
                font-size="11px"
                style="text-align: center;"
              >
                Binance Chain Wallet
              </div>
            </div>
             
            <div
              class="c16 c24"
            >
              <button
                class="c25 c26"
                id="wallet-connect-onto wallet"
                style="justify-content: space-between;"
                type="button"
              >
                <svg
                  class="c20"
                  color="text"
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="32px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clip-rule="evenodd"
                    d="M7.08763 7.53915L5.2002 5.6521V12.0942C5.2002 13.7432 5.82934 15.3919 7.08763 16.6497C9.60459 19.1656 13.6852 19.1656 16.2022 16.6497L7.08763 7.53915Z"
                    fill-rule="evenodd"
                    stroke="black"
                    stroke-width="2"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M16.0803 16.3974L17.9677 18.2841V11.8419C17.9677 10.1933 17.3386 8.54464 16.0803 7.28686C13.5633 4.77092 9.48268 4.77092 6.96573 7.28686L16.0803 16.3974Z"
                    fill-rule="evenodd"
                    stroke="black"
                    stroke-width="2"
                  />
                </svg>
              </button>
              <div
                class="c27"
                color="#8990A5"
                font-size="11px"
                style="text-align: center;"
              >
                ONTO Wallet
              </div>
            </div>
          </div>
          <a
            class="c28 c29 c30"
            color="primary"
            href="https://medium.com/@yetichain"
            rel="noreferrer noopener"
            target="_blank"
          >
            <svg
              class="c31"
              color="primary"
              fill="none"
              height="18px"
              viewBox="0 0 24 24"
              width="18px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle
                cx="12"
                cy="12"
                fill="none"
                opacity="0.5"
                r="9"
                stroke="#8990A5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                d="M9.77881 9.33526C9.95793 8.82608 10.3115 8.39672 10.7768 8.12322C11.2422 7.84973 11.7893 7.74976 12.3213 7.84101C12.8533 7.93226 13.3359 8.20885 13.6835 8.62179C14.0311 9.03473 14.2213 9.55737 14.2205 10.0971C14.2205 11.6209 11.9349 12.3828 11.9349 12.3828V13.5222"
                fill="none"
                stroke="#8990A5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                d="M11.9956 16.1919H12.0035"
                fill="none"
                stroke="#8990A5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
            <div
              class="c32"
              color="#6C5DD3"
              font-size="10px"
              style="font-weight: 500;"
            >
              Learn how to connect
            </div>
          </a>
        </div>
      </div>
    </DocumentFragment>
  `)
})

it('renders AccountModal correctly', () => {
  const { asFragment } = renderWithTheme(
    <AccountModal account='0xb218C5D6aF1F979aC42BC68d98A5A0D796C6aB01' logout={noop} />,
  )
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c8 {
      fill: #6C5DD3;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c13 {
      fill: #0B1359;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c24 {
      fill: #0B1359;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      margin-right: 16px;
    }

    .c21 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: transparent;
      border: 1px solid #6C5DD3;
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

    .c21:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #8677F0;
      border-color: #8677F0;
    }

    .c21:hover,
    .c21:hover > div,
    .c21:hover p,
    .c21:hover span {
      color: #fff;
    }

    .c21:hover svg {
      fill: #fff;
    }

    .c21:active {
      background-color: #5849BD;
      box-shadow: inset 0 3px 0 none;
    }

    .c21:disabled,
    .c21.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

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

    .c15 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      margin-left: 40px;
    }

    .c20 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      margin-top: 16px;
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

    .c16 {
      color: #CBC8EE;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
    }

    .c17 {
      color: white;
      font-size: 16px;
      font-weight: 400;
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

    .c11 {
      background-position: center;
      height: 128px;
      width: auto;
      margin: 0 -25px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 24px;
      background-clip: padding-box;
    }

    .c12 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c19 {
      width: 100%;
      padding: 16px 50px 16px 46px;
      border: 1px solid #d2d6e5;
      box-sizing: border-box;
      border-radius: 6px;
      color: #8990a5;
      overflow: hidden;
      font-size: 14px;
      font-weight: 400;
      line-height: 16px;
      -webkit-letter-spacing: 0.1px;
      -moz-letter-spacing: 0.1px;
      -ms-letter-spacing: 0.1px;
      letter-spacing: 0.1px;
      text-align: left;
    }

    .c19:focus {
      border: 1px solid #d2d6e5;
      outline: none;
    }

    .c18 {
      margin-top: 24px;
      position: relative;
    }

    .c18 > svg:first-child {
      cursor: pointer;
      position: absolute;
      left: 8px;
      top: 10px;
    }

    .c18 > svg:last-child {
      cursor: pointer;
      position: absolute;
      right: 16px;
      top: 12px;
    }

    .c23 svg * {
      -webkit-transition: stroke 200ms ease-in-out;
      transition: stroke 200ms ease-in-out;
    }

    .c23:hover svg * {
      stroke: white;
    }

    .c14 .c22 {
      margin-right: 8px;
    }

    .c14 .c22:last-child {
      margin: 0;
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

    @media screen and (max-width:800px) {
      .c23 {
        max-width: none;
        width: 100%;
      }
    }

    @media screen and (max-width:800px) {
      .c14 {
        -webkit-flex-direction: column;
        -ms-flex-direction: column;
        flex-direction: column;
      }

      .c14 > * {
        width: 100%;
      }

      .c14 > *:not(:last-child) {
        margin-bottom: 8px;
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
              Account
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
          style="padding: 0px 24px 32px 24px;"
        >
          <div
            class="c11"
          >
            <div
              class="c12"
            >
              <svg
                class="c13"
                color="text"
                fill="none"
                height="80px"
                viewBox="0 0 80 80"
                width="80px"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  fill="#4334A6"
                  height="80"
                  rx="6"
                  width="80"
                />
                <mask
                  height="80"
                  id="mask0"
                  mask-type="alpha"
                  maskUnits="userSpaceOnUse"
                  width="80"
                  x="0"
                  y="0"
                >
                  <rect
                    fill="#4334A6"
                    height="80"
                    rx="6"
                    width="80"
                  />
                </mask>
                <g
                  mask="url(#mask0)"
                >
                  <path
                    clip-rule="evenodd"
                    d="M54.85 105.837C57.5314 109.492 74.0129 127.356 75.8302 128.747C77.6499 130.129 82.5971 132.892 85.1124 131.618C87.6194 130.342 88.0344 127.568 88.8587 127.56C89.6801 127.547 91.2845 129.55 91.2845 129.55C91.2845 129.55 90.4565 114.583 81.5582 101.941C72.6515 89.2973 62.2935 85.952 55.4656 85.4385C55.4656 85.4385 52.171 102.174 54.85 105.837Z"
                    fill="url(#paint0_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M31.7658 94.9985C32.1886 95.1212 44.3504 98.6444 50.5952 105.141C51.125 105.686 51.6151 106.259 52.0483 106.844C52.0483 106.844 52.3819 106.653 52.9675 106.414C53.7412 106.099 54.9542 105.71 56.4295 105.595C56.4295 105.595 60.4291 93.7421 55.4657 85.4384C55.4657 85.4384 50.6894 84.5411 48.4857 83.5236L48.8842 84.3988C48.8842 84.3988 48.0891 88.5809 43.2337 87.7549C41.4084 87.4495 39.8539 87.2946 38.507 87.2764C36.0159 87.254 34.1994 87.7106 32.5754 88.6051C32.576 88.6187 32.6207 91.4179 31.7658 94.9985Z"
                    fill="url(#paint1_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M31.7658 94.9985L50.5952 105.141L52.9675 106.414C53.7412 106.099 54.9542 105.71 56.4295 105.595C56.4295 105.595 60.4291 93.7421 55.4657 85.4384C55.4657 85.4384 59.2265 94.5927 56.0004 97.3318C52.7766 100.063 44.2025 96.4669 41.0363 93.3858C38.8308 91.2398 38.4998 88.654 38.4993 87.2877C36.0082 87.2653 34.1917 87.7219 32.5676 88.6163C32.5759 88.6187 32.6207 91.418 31.7658 94.9985Z"
                    fill="url(#paint2_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M23.0108 134.129C24.8564 135.229 26.3127 135.291 28.5376 134.365C30.7624 133.439 31.8237 132.457 35.5665 133.442L34.6468 136.832L34.1159 138.117C34.1159 138.117 38.1644 135.796 39.0027 134.89C39.0027 134.89 47.695 118.847 46.4157 99.5796C45.2856 82.5437 34.1491 77.8576 34.1491 77.8576C32.9449 78.9005 31.5321 79.9651 30.0329 81.1972C25.5341 84.9178 20.3123 90.1359 17.8866 100.651C14.6648 114.665 21.1653 133.03 23.0108 134.129Z"
                    fill="url(#paint3_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M29.2838 87.7917C29.2915 87.7553 30.1889 84.3153 37.2137 79.7608L37.1161 79.6161C30.0221 84.2165 29.1449 87.6146 29.1145 87.7539L29.2838 87.7917Z"
                    fill="#929ACE"
                  />
                  <path
                    d="M90.0124 72.4507C82.2131 73.8561 54.6429 79.088 65.3354 63.6855C73.4528 51.9923 92.9075 54.1113 101.573 55.673L106.17 59.2145C106.17 59.2145 97.8116 71.0453 90.0124 72.4507Z"
                    fill="url(#paint4_radial)"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M69.0127 62.9822C69.0127 62.9822 76.5551 60.4717 94.0338 59.3072L101.575 55.6627L106.17 59.2083L107.648 65.3093L102.241 69.6525C102.241 69.6525 83.8887 75.3129 80.3294 76.999L81.1668 75.7381L75.9704 66.4864L69.0127 62.9822Z"
                    fill="url(#paint5_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M96.0957 67.3111C84.823 64.6189 69.0182 62.9883 69.0182 62.9883L71.4041 80.6249L102.246 69.6649L107.653 65.3217L106.063 59.0776L101.58 55.6688L94.0393 59.3133L100.794 68.7158L96.0957 67.3111Z"
                    fill="url(#paint6_radial)"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M84.66 54.6431C84.66 54.6431 83.7056 55.3204 82.9376 55.9584C82.1695 56.5963 81.8051 60.1156 81.8051 60.1156L73.1996 61.0036C73.1996 61.0036 76.2332 58.8804 76.9157 57.9776C77.5982 57.0748 76.3451 55.9731 76.3451 55.9731C76.3451 55.9731 81.9683 54.4619 84.66 54.6431Z"
                    fill="url(#paint7_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M51.1465 61.3563C51.9338 68.473 54.5136 74.7815 58.0701 78.997C61.3215 82.854 65.3829 84.9664 69.6646 84.3549C75.7426 83.4897 80.4485 75.4156 82.4689 66.7014C82.4842 66.6295 82.4955 66.5878 82.4955 66.5878C83.2073 63.4766 83.5788 60.2855 83.5415 57.3138C83.3902 44.5647 75.1721 37.1947 68.4796 36.3512C57.6966 34.9922 49.6346 47.7463 51.1465 61.3563Z"
                    fill="url(#paint8_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M58.0695 78.9968C61.3209 82.8538 65.3823 84.9662 69.664 84.3547C75.742 83.4895 80.448 75.4154 82.4683 66.7012C82.289 67.3927 81.2693 71.1423 79.2868 74.0933C79.2868 74.0933 76.8274 75.9994 75.3798 72.5606C75.3798 72.5606 82.6291 58.7437 80.938 47.5796L60.5127 71.0254L58.0695 78.9968Z"
                    fill="url(#paint9_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M12.1595 44.424C12.9343 50.2742 15.9871 56.3202 19.2078 61.1085C21.8568 65.0408 24.6253 68.1072 26.3526 69.5272C30.1805 72.67 32.8979 72.9461 38.3989 73.6742C43.9 74.4023 50.7425 77.7494 50.7425 77.7494L49.9607 80.9354C50.1952 80.9795 50.4269 81.0103 50.6586 81.041C53.8542 81.4648 55.1787 80.7208 55.3074 80.6416C55.3132 80.6432 55.3133 80.6432 55.3148 80.6373C58.8882 79.493 62.1497 77.4425 65.0197 74.8756C65.0768 74.8277 65.119 74.7885 65.1627 74.7433C65.2891 74.6255 65.4231 74.5035 65.5554 74.3873C65.7165 74.2346 65.8717 74.0803 66.0253 73.9319C66.0344 73.9217 66.0509 73.9072 66.0675 73.8927C66.084 73.8781 66.0931 73.8679 66.1022 73.8577C66.188 73.7733 66.2723 73.6948 66.3582 73.6104C66.5134 73.4561 66.6628 73.3003 66.8196 73.1401C66.9764 72.9799 67.1273 72.8181 67.275 72.6681C67.7368 72.1726 68.1959 71.6637 68.6448 71.1458C68.7493 71.0158 68.84 70.9137 68.905 70.8363C68.9428 70.7896 68.9775 70.7546 69.0095 70.7063C75.2186 63.2194 78.7636 53.7567 78.4913 48.6679C78.2865 44.7357 76.1167 41.1347 73.5199 37.6655L73.5215 37.6596C70.7469 33.9591 67.4902 30.4071 65.5916 26.7843C61.9073 19.7524 58.9399 13.9761 49.2842 11.2252C39.6226 8.47274 35.6387 12.0807 30.992 15.3585C28.2101 17.3166 25.8453 18.1475 23.4935 18.8363C23.4876 18.8347 23.4876 18.8347 23.4876 18.8347C21.9093 19.3016 20.3366 19.7005 18.6426 20.3387C18.6378 20.3564 10.4247 31.2759 12.1595 44.424Z"
                    fill="url(#paint10_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M46.9105 76.1486L49.8175 74.3126C49.8372 74.2863 51.9118 71.7645 54.7167 62.5644L54.5475 62.5125C51.8464 71.3738 49.8348 74.0136 49.6924 74.1904L46.817 76.0032L46.9105 76.1486Z"
                    fill="#929ACE"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M19.2074 61.1081C21.8564 65.0404 24.6248 68.1068 26.3521 69.5268C30.18 72.6696 32.8974 72.9457 38.3985 73.6738C43.8995 74.4019 50.742 77.749 50.742 77.749L49.9602 80.935C50.1947 80.9791 50.4264 81.0098 50.6581 81.0406C52.2395 81.2196 53.7963 81.0441 55.3069 80.6411C55.3128 80.6427 55.3128 80.6427 55.3144 80.6368C59.0941 79.6177 62.5324 77.1215 65.0192 74.8752C65.0763 74.8273 65.1185 74.788 65.1622 74.7429C65.2887 74.6251 65.4226 74.503 65.5549 74.3869C65.716 74.2342 65.8712 74.0799 66.0249 73.9315C61.9509 77.2875 57.3435 77.9321 57.3435 77.9321C43.4521 70.5498 32.272 68.2298 32.272 68.2298C28.3056 66.1882 28.3137 61.6998 28.3137 61.6998C36.0754 46.826 33.8267 34.2732 33.8267 34.2732L19.2074 61.1081Z"
                    fill="url(#paint11_linear)"
                    fill-rule="evenodd"
                    opacity="0.5"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M33.2224 37.5703C33.2224 37.5703 35.4233 52.4124 24.6029 67.8795C24.6029 67.8795 21.7313 64.8676 19.6142 61.7046L27.7292 45.4713L33.2224 37.5703Z"
                    fill="url(#paint12_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M23.4887 18.8539C23.6893 18.8826 28.5092 19.7246 33.0702 25.8224C37.7204 32.058 41.2847 51.8779 45.7362 57.1619C50.2043 62.4314 60.5568 64.5413 63.3122 63.55C65.8292 62.6463 69.3983 59.1481 72.001 52.8345C74.6036 46.5209 73.5193 37.6906 73.5193 37.6906L73.5209 37.6847C70.7463 33.9842 67.4896 30.4322 65.591 26.8094C61.9067 19.7775 58.9393 14.0012 49.2836 11.2503C39.622 8.49784 35.6381 12.1058 30.9914 15.3836C29.5586 16.3893 28.2361 17.1022 26.973 17.6414L26.9715 17.6473C25.7682 18.1519 24.6325 18.523 23.4887 18.8539Z"
                    fill="url(#paint13_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M23.4872 18.8535C23.6879 18.8823 28.5078 19.7243 33.0688 25.822C37.719 32.0577 41.8467 50.2457 46.2982 55.5298C50.7663 60.7993 58.6929 63.0656 61.4482 62.0743C63.9653 61.1706 67.5344 57.6724 70.137 51.3588C72.7397 45.0452 71.6554 36.2149 71.6554 36.2149L71.657 36.209C68.8824 32.5085 67.4882 30.4318 65.5896 26.809C61.9053 19.7771 58.9379 14.0008 49.2822 11.2499C39.6206 8.49748 35.6367 12.1054 30.99 15.3832C29.5572 16.389 28.2347 17.1019 26.9716 17.641L26.97 17.6469C25.7668 18.1516 24.6311 18.5226 23.4872 18.8535Z"
                    fill="url(#paint14_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M50.742 77.7493C50.742 77.7493 49.4903 82.8453 48.2803 86.1437C48.2803 86.1437 45.7431 89.6098 41.1938 87.4808C41.1938 87.4808 39.4091 80.3847 33.6063 77.8677L34.8668 73.1851C34.8668 73.1851 43.9632 73.5085 50.742 77.7493Z"
                    fill="url(#paint15_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M73.4043 64.4006L68.7709 68.169L63.2879 66.6931L62.3252 68.0405L68.721 69.762L70.5428 68.7661C70.537 68.7645 72.3347 66.3327 73.4043 64.4006Z"
                    fill="url(#paint16_linear)"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M76.2883 58.5424L72.1444 55.2829L70.5843 56.1279C70.5843 56.1279 73.1098 52.6586 74.2097 47.6103L74.6993 49.6395L77.8815 53.7027C77.8815 53.7027 77.0348 56.8016 76.2883 58.5424Z"
                    fill="url(#paint17_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M74.2083 47.6097C74.2083 47.6097 75.5576 53.602 70.5829 56.1273C70.577 56.1258 72.1508 53.3997 74.2083 47.6097Z"
                    fill="white"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M50.266 79.5882C50.266 79.5882 44.3796 76.0683 41.6954 76.1617L40.8832 83.3557C40.8832 83.3557 38.7194 79.5919 33.6064 77.8678L34.8668 73.1852C34.8668 73.1852 43.607 73.166 50.7405 77.7552L50.266 79.5882Z"
                    fill="url(#paint18_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M0.718706 44.1545C0.262027 53.9999 3.5923 62.5764 7.98545 64.3011C15.5853 67.2726 27.445 63.1069 32.6061 49.5462C32.6211 49.5106 32.6351 49.4872 32.6361 49.475C32.9739 48.5885 33.2841 47.663 33.5546 46.6977C37.9587 31.2224 31.9182 22.5706 24.138 19.1625C16.3569 15.7665 5.88064 24.0272 2.60424 33.8686C1.46398 37.2964 0.868642 40.797 0.718706 44.1545Z"
                    fill="url(#paint19_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M0.72015 44.1547C0.263471 54 3.59374 62.5766 7.98689 64.3012C15.5868 67.2727 27.4465 63.107 32.6075 49.5463C32.149 50.4909 27.5997 59.7069 21.7374 61.4703C21.7374 61.4703 19.0305 62.0631 17.2175 57.4326C17.2175 57.4326 27.2752 46.9159 25.9482 31.9032L5.36764 53.4948L0.72015 44.1547Z"
                    fill="url(#paint20_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M7.46121 57.7326C8.43555 58.0457 9.45805 58.1296 10.4903 58.0058C15.9449 57.3968 21.7938 51.1541 24.5388 42.4135C26.6607 35.6544 26.4055 29.064 24.2734 24.7522C23.1349 22.4221 21.4369 20.7606 19.2845 20.076C13.1185 18.1361 5.4764 25.0026 2.2064 35.4012C-1.0636 45.7997 1.29432 55.8049 7.46121 57.7326Z"
                    fill="url(#paint21_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M8.49017 54.4521C8.54404 54.4685 8.58573 54.4839 8.64007 54.4942C8.77779 54.5353 8.91597 54.5703 9.05509 54.5931C9.06071 54.5997 9.0668 54.6002 9.07289 54.6006C9.7001 54.728 10.3413 54.7522 10.99 54.6789C13.0531 54.4496 15.1787 53.2443 17.1026 51.3127C19.3782 49.0277 21.3523 45.7206 22.5828 41.8054C24.3331 36.2195 24.1238 30.7911 22.3633 27.2246C22.1937 26.8807 22.0048 26.5476 21.8023 26.2319C21.239 25.3493 20.5531 24.629 19.7553 24.0903C19.7492 24.0898 19.7375 24.0828 19.7318 24.0762C19.2713 23.7715 18.7691 23.531 18.237 23.3619C13.1536 21.7617 6.84029 27.4297 4.14391 36.0147C1.45362 44.6001 3.40067 52.8515 8.49017 54.4521Z"
                    fill="url(#paint22_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M10.9831 54.6746C15.4884 54.1767 20.3198 49.015 22.5873 41.8019C24.3377 36.2227 24.1282 30.7891 22.366 27.2295C17.8607 27.7275 13.0298 32.883 10.7618 40.1022C9.01192 45.6753 9.22138 51.1089 10.9831 54.6746Z"
                    fill="url(#paint23_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M11.9991 54.7519C16.0967 54.299 20.4909 49.6045 22.5532 43.0441C24.1451 37.9698 23.9546 33.0279 22.3519 29.7904C18.2542 30.2433 13.8605 34.9323 11.7978 41.4982C10.2062 46.567 10.3967 51.5089 11.9991 54.7519Z"
                    fill="url(#paint24_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M6.42426 35.8628C8.60657 30.4818 12.2864 26.1889 16.031 24.6528C17.3213 24.1256 18.5919 23.934 19.762 24.0964C20.5546 24.6284 21.2465 25.3551 21.81 26.2376C21.4922 25.9867 21.1412 25.77 20.7794 25.6139C20.3229 25.4137 19.8295 25.2966 19.3178 25.2578C18.4284 25.1903 17.4661 25.3563 16.4855 25.7599C13.0318 27.1771 9.59788 31.2189 7.53494 36.3209C4.40847 44.0328 5.27326 51.7902 9.47798 53.6109L9.59654 53.6628C10.1791 53.897 10.8079 54.006 11.4836 53.9838C13.3133 53.9327 15.2687 52.9595 17.11 51.3157C15.1855 53.2473 13.0591 54.4527 10.9952 54.6822C10.3462 54.7555 9.70428 54.7374 9.07728 54.604L9.24579 54.1633L9.05947 54.5965C8.83079 54.5424 8.81205 54.5471 8.49432 54.4556C4.13473 52.0164 3.16999 43.8837 6.42426 35.8628Z"
                    fill="url(#paint25_linear)"
                  />
                  <path
                    d="M21.003 20.9654L24.1896 19.2337L24.1036 19.08L20.9236 20.8062L21.003 20.9654Z"
                    fill="#929ACE"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M35.0215 35.8095C35.0215 35.8095 34.5972 37.9697 33.5064 37.9954C32.4155 38.0212 27.0109 37.2718 26.6387 36.3119C26.2665 35.352 25.9755 32.4749 25.9755 32.4749C25.9755 32.4749 25.5658 38.238 24.0153 43.8822C24.0153 43.8822 24.7919 42.3068 26.1567 42.535C27.5154 42.7628 33.2772 43.8767 33.4344 44.6117C33.5911 45.3528 33.3719 47.2348 33.3719 47.2348C33.3719 47.2348 35.6468 40.293 35.0215 35.8095Z"
                    fill="url(#paint26_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M25.8172 35.464C25.8172 35.464 27.0874 37.3878 26.9703 39.1368C26.8597 40.8802 24.2724 43.1668 24.2724 43.1668C24.2724 43.1668 25.6586 38.4594 25.8172 35.464Z"
                    fill="white"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M6.23317 65.7237L10.3479 66.8262C12.4127 65.9598 13.9086 64.433 14.7712 63.357C9.37627 62.0837 6.85772 60.194 5.85883 58.7731C5.70799 58.3192 5.52486 57.8623 5.30367 57.4087C5.31695 57.7544 5.47668 58.2294 5.85883 58.7731C7.04598 62.3449 6.23317 65.7237 6.23317 65.7237Z"
                    fill="url(#paint27_radial)"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M10.3487 66.8328C10.3487 66.8328 7.39015 76.1617 6.94458 83.5091L3.08929 83.3886L6.23396 65.7303L10.3487 66.8328Z"
                    fill="url(#paint28_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M-14.2633 70.3088C-15.2919 76.9065 -14.1466 83.0974 -12.0975 87.699C-9.96771 92.4753 -6.85577 95.5364 -4.14722 95.5601C-1.38791 95.5847 6.38288 83.2567 7.52999 68.4391C8.2764 58.8748 0.93349 46.5113 -2.36922 45.7795C-4.05329 45.4048 -6.56685 48.2924 -8.9083 52.9875C-11.1587 57.5091 -13.2423 63.7156 -14.2633 70.3088Z"
                    fill="url(#paint29_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M-8.92137 52.8813C-8.92137 52.8813 -2.48022 47.4659 2.01559 56.0416C6.60116 64.7817 3.09757 81.9482 -3.37319 88.8299C-7.68703 93.4176 -12.1089 87.5868 -12.1089 87.5868L-12.1105 87.5928C-9.98077 92.3691 -6.86883 95.4302 -4.16028 95.4539C-1.40097 95.4785 6.36981 83.1505 7.51693 68.3329C8.26334 58.7686 0.920432 46.4051 -2.38228 45.6733C-4.07388 45.303 -6.58585 48.1846 -8.92137 52.8813Z"
                    fill="url(#paint30_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M4.07434 67.4106C4.07434 67.4106 3.99823 66.3627 3.30603 65.7114C2.61382 65.06 -3.5937 66.0835 -3.5937 66.0835L-4.07075 67.8638C-4.07075 67.8638 -3.50477 64.9905 -5.08117 62.6918L-4.01205 63.7441C-4.01205 63.7441 1.84914 63.0618 2.34835 62.3404C2.84915 61.613 3.42873 59.9495 3.42873 59.9495C3.42873 59.9495 4.33737 64.0029 4.07434 67.4106Z"
                    fill="url(#paint31_radial)"
                    fill-rule="evenodd"
                    opacity="0.8"
                  />
                  <path
                    d="M-4.27885 72.9264L3.63404 73.3873L6.6947 74.2138L6.74097 74.0411L3.66088 73.2158L-4.26985 72.7501L-4.27885 72.9264Z"
                    fill="white"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M26.9593 17.6375C31.7095 18.6441 36.3551 20.603 42.462 26.4717C43.7866 27.7454 45.2813 29.0205 46.834 30.1975C46.8442 30.2065 46.8544 30.2156 46.8646 30.2247C52.4639 34.4831 58.8853 37.6347 61.4578 35.9617C64.7474 33.8302 65.5772 26.8054 65.5772 26.8054C61.893 19.7736 58.9255 13.9972 49.2698 11.2464C45.6151 10.2057 42.7692 10.0784 40.3957 10.4958L40.3898 10.4942C36.4919 11.178 33.8572 13.3402 30.9718 15.378C29.5448 16.3854 28.2239 17.0924 26.9593 17.6375Z"
                    fill="url(#paint32_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M60.8621 33.9165C58.5413 34.6074 52.8957 32.3983 49.1035 29.5687C45.3114 26.7391 42.6373 22.4774 42.6933 20.7911C42.7434 19.1032 50.989 13.3662 56.1971 15.7927C61.4068 18.2133 63.592 23.3996 63.8183 26.4774C64.0446 29.5552 62.3261 33.4757 60.8621 33.9165Z"
                    fill="url(#paint33_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M26.9595 17.6374C31.7098 18.6441 36.3553 20.6029 42.4622 26.4717C43.7868 27.7453 45.2816 29.0205 46.8343 30.1974C46.4509 29.8855 43.2879 27.2758 40.653 23.9481C37.8313 20.3994 37.1907 19.4237 37.1907 19.4237C37.1907 19.4237 41.4669 15.5276 46.6818 17.178L49.2617 15.994L40.396 10.4958L40.3901 10.4942C36.4922 11.178 33.8575 13.3402 30.972 15.378C29.5451 16.3854 28.2242 17.0924 26.9595 17.6374Z"
                    fill="url(#paint34_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M31.7048 17.9279C36.5674 19.5024 38.719 15.6859 38.9599 15.2131C38.9706 15.197 38.9754 15.1793 38.986 15.1632C37.1191 10.1321 26.8746 6.00212 25.6817 7.47725C24.2771 9.19901 31.7048 17.9279 31.7048 17.9279Z"
                    fill="url(#paint35_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M54.6064 25.9685L54.4091 23.9635C54.4091 23.9635 53.5793 21.8103 51.3683 20.8011L48.6753 22.2204L54.6064 25.9685Z"
                    fill="#5563B4"
                  />
                  <path
                    d="M53.6617 25.3273L53.5101 23.9351C53.5101 23.9351 52.9067 22.4367 51.3252 21.7243L49.4134 22.6942L53.6617 25.3273Z"
                    fill="#FFA100"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M31.7039 17.9279C36.5666 19.5025 38.7182 15.6859 38.9591 15.2132C37.9263 17.0792 36.2898 17.8088 32.6095 16.0655C26.9282 13.3788 25.6808 7.4773 25.6808 7.4773C24.2763 9.19906 31.7039 17.9279 31.7039 17.9279Z"
                    fill="url(#paint36_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M60.8746 27.6064L60.81 25.5445C60.81 25.5445 61.5981 23.0353 62.9447 24.0746L63.3301 26.1735L60.8746 27.6064Z"
                    fill="#5563B4"
                  />
                  <path
                    d="M60.8729 27.6024L60.8139 25.7171C60.8139 25.7171 61.5344 23.4228 62.7657 24.3731L63.1181 26.2923L60.8729 27.6024Z"
                    fill="#FFA100"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M61.5042 32.6282C61.5042 32.6282 66.0953 27.2103 60.6386 19.6065C60.6386 19.6065 60.8979 30.4221 55.8758 32.6311C58.2597 33.7472 60.3836 33.7876 61.5042 32.6282Z"
                    fill="url(#paint37_linear)"
                    fill-rule="evenodd"
                    opacity="0.4"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M37.1618 14.6095C37.1618 14.6095 31.32 10.9942 30.1827 9.02462C30.1827 9.02462 35.2493 8.99696 37.1618 14.6095Z"
                    fill="url(#paint38_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M25.3851 0.895915C25.3605 1.43322 27.3262 2.60114 31.7786 5.25429C31.8107 5.2756 31.8445 5.29101 31.8766 5.31231C32.9758 5.96869 34.233 6.71822 35.6436 7.57859C35.9158 7.74042 36.1849 7.91404 36.4748 8.08062C36.507 8.10193 36.5333 8.12165 36.5611 8.13547C43.8262 12.564 55.1123 19.77 57.3964 20.7643C59.8507 21.8297 60.9828 20.6039 60.0146 18.4521C60.0162 18.4462 60.0119 18.4387 60.0135 18.4328C59.7232 17.7981 59.2568 17.0907 58.5901 16.3294C55.2461 12.5388 51.1524 9.60907 47.0003 7.36562C46.8685 7.29219 46.741 7.22624 46.6076 7.15871C45.2198 6.42466 43.8307 5.76613 42.4611 5.17608C42.2291 5.0757 41.9956 4.98122 41.768 4.88832C41.7637 4.88084 41.7621 4.88674 41.7621 4.88674C38.4771 3.52815 35.3388 2.56324 32.7006 1.92267C28.3658 0.850725 25.3956 0.64575 25.3851 0.895915Z"
                    fill="url(#paint39_radial)"
                    fill-rule="evenodd"
                  />
                  <path
                    d="M36.8424 6.71847L36.4693 8.10438L36.6401 8.15035L36.9846 6.8706C42.2214 5.78826 46.9232 7.4207 46.9746 7.44087L47.0027 7.35989C46.8709 7.28646 46.7434 7.22051 46.61 7.15298C45.3341 6.77791 41.2922 5.79112 36.8884 6.71188L36.8424 6.71847Z"
                    fill="#929ACE"
                  />
                  <path
                    d="M32.3028 3.30227L31.771 5.27792L31.9418 5.32389L32.437 3.48388C33.0695 3.52763 37.8188 3.85731 42.4451 5.25437L42.4673 5.17181C42.2354 5.07143 42.0018 4.97695 41.7742 4.88405C41.7699 4.87657 41.7683 4.88246 41.7683 4.88246C37.0283 3.55598 32.4312 3.31787 32.375 3.31539L32.3028 3.30227Z"
                    fill="#929ACE"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M25.3859 0.896173C25.3558 1.57115 28.4518 3.23304 35.646 7.57295C42.837 11.9247 55.0135 19.7181 57.3987 20.7586C59.8531 21.8241 60.9852 20.5982 60.017 18.4465C60.1575 18.9334 60.1129 19.5918 59.1272 20.0158C57.4046 20.7602 37.2776 7.18991 34.3281 4.96027C31.5947 2.88999 32.5589 2.03003 32.7089 1.91861C28.3666 0.850983 25.3964 0.646007 25.3859 0.896173Z"
                    fill="url(#paint40_linear)"
                    fill-rule="evenodd"
                  />
                  <path
                    clip-rule="evenodd"
                    d="M52.5317 16.8048C52.5317 16.8048 50.8735 12.1715 44.2621 11.7201C44.268 11.7217 51.2115 15.9372 52.5317 16.8048Z"
                    fill="white"
                    fill-rule="evenodd"
                  />
                </g>
                <defs>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(71.3844 101.736) rotate(50.2124) scale(25.393 8.01838)"
                    gradientUnits="userSpaceOnUse"
                    id="paint0_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(49.8657 91.1514) rotate(78.9515) scale(12.2502 8.51425)"
                    gradientUnits="userSpaceOnUse"
                    id="paint1_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint2_linear"
                    x1="51.9386"
                    x2="45.6715"
                    y1="106.786"
                    y2="89.7265"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(37.7723 102.153) rotate(101.687) scale(26.9609 10.2138)"
                    gradientUnits="userSpaceOnUse"
                    id="paint3_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(80.5441 60.2241) rotate(12.8322) scale(19.072 7.32876)"
                    gradientUnits="userSpaceOnUse"
                    id="paint4_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(75.2697 55.7977) rotate(9.94656) scale(28.5554 19.1074)"
                    gradientUnits="userSpaceOnUse"
                    id="paint5_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#C0C9FB"
                    />
                    <stop
                      offset="1"
                      stop-color="#7480C4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(101.382 47.2902) rotate(103.049) scale(23.7713 17.3322)"
                    gradientUnits="userSpaceOnUse"
                    id="paint6_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#8794E0"
                    />
                    <stop
                      offset="1"
                      stop-color="#5B69B4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(75.7369 55.5986) rotate(62.1143) scale(6.39715 8.75996)"
                    gradientUnits="userSpaceOnUse"
                    id="paint7_radial"
                    r="1"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(74.0092 56.3669) rotate(110.07) scale(21.6936 11.2641)"
                    gradientUnits="userSpaceOnUse"
                    id="paint8_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint9_linear"
                    x1="64.4948"
                    x2="81.0747"
                    y1="81.4089"
                    y2="50.0524"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(59.7386 41.8902) rotate(123.778) scale(31.3321 22.7388)"
                    gradientUnits="userSpaceOnUse"
                    id="paint10_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint11_linear"
                    x1="38.8913"
                    x2="43.5801"
                    y1="76.1538"
                    y2="64.4724"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint12_linear"
                    x1="21.6402"
                    x2="41.3043"
                    y1="64.8279"
                    y2="49.4256"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(55.5308 26.2177) rotate(87.7927) scale(19.8828 23.7256)"
                    gradientUnits="userSpaceOnUse"
                    id="paint13_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#C0C9FB"
                    />
                    <stop
                      offset="1"
                      stop-color="#6370BB"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(64.182 22.7548) rotate(92.4082) scale(26.4792 31.597)"
                    gradientUnits="userSpaceOnUse"
                    id="paint14_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#C0C9FB"
                    />
                    <stop
                      offset="1"
                      stop-color="#7480C4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(48.0912 82.7052) rotate(-164.935) scale(8.93521 9.0027)"
                    gradientUnits="userSpaceOnUse"
                    id="paint15_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#C0C9FB"
                    />
                    <stop
                      offset="1"
                      stop-color="#8A93C8"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint16_linear"
                    x1="72.7247"
                    x2="62.4436"
                    y1="66.6999"
                    y2="68.0636"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(77.3309 50.5213) rotate(163.891) scale(5.82193 7.94864)"
                    gradientUnits="userSpaceOnUse"
                    id="paint17_radial"
                    r="1"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint18_linear"
                    x1="40.3604"
                    x2="42.0099"
                    y1="82.8096"
                    y2="73.6313"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(24.4321 36.3359) rotate(105.798) scale(22.7108 12.2248)"
                    gradientUnits="userSpaceOnUse"
                    id="paint19_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint20_linear"
                    x1="14.4429"
                    x2="16.8063"
                    y1="63.9034"
                    y2="53.6663"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(18.2557 21.7554) rotate(98.3962) scale(31.0379 22.2224)"
                    gradientUnits="userSpaceOnUse"
                    id="paint21_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#C0C9FB"
                    />
                    <stop
                      offset="1"
                      stop-color="#7480C4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(7.43119 52.9728) rotate(-53.3418) scale(25.1264 17.9763)"
                    gradientUnits="userSpaceOnUse"
                    id="paint22_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#C0C9FB"
                    />
                    <stop
                      offset="1"
                      stop-color="#7480C4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(14.9905 60.914) rotate(-72.3068) scale(24.2843 13.4332)"
                    gradientUnits="userSpaceOnUse"
                    id="paint23_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#8794E0"
                    />
                    <stop
                      offset="1"
                      stop-color="#4151A9"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(15.6438 60.4267) rotate(-72.3067) scale(22.0868 12.2176)"
                    gradientUnits="userSpaceOnUse"
                    id="paint24_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#8794E0"
                    />
                    <stop
                      offset="1"
                      stop-color="#5B69B4"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint25_linear"
                    x1="12.8967"
                    x2="7.17777"
                    y1="29.6887"
                    y2="50.233"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(33.0528 35.8554) rotate(157.181) scale(9.29574 11.6638)"
                    gradientUnits="userSpaceOnUse"
                    id="paint26_radial"
                    r="1"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(15.8824 66.8627) rotate(-160.327) scale(8.04262 2.89612)"
                    gradientUnits="userSpaceOnUse"
                    id="paint27_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#8794E0"
                    />
                    <stop
                      offset="1"
                      stop-color="#5B69B4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(8.57926 81.4478) rotate(-144.933) scale(4.50447 6.43811)"
                    gradientUnits="userSpaceOnUse"
                    id="paint28_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#8794E0"
                    />
                    <stop
                      offset="1"
                      stop-color="#5B69B4"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(-4.16793 65.3742) rotate(93.1922) scale(25.0656 8.32171)"
                    gradientUnits="userSpaceOnUse"
                    id="paint29_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint30_linear"
                    x1="-9.27943"
                    x2="8.23094"
                    y1="92.065"
                    y2="54.4914"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(3.34232 61.9076) rotate(174.74) scale(8.32926 8.34091)"
                    gradientUnits="userSpaceOnUse"
                    id="paint31_radial"
                    r="1"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(54.6604 21.7615) rotate(136.399) scale(11.3101 11.9984)"
                    gradientUnits="userSpaceOnUse"
                    id="paint32_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(58.5414 22.4015) rotate(133.541) scale(10.7089 18.2254)"
                    gradientUnits="userSpaceOnUse"
                    id="paint33_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#8794E0"
                    />
                    <stop
                      offset="1"
                      stop-color="#5B69B4"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint34_linear"
                    x1="39.8333"
                    x2="35.7925"
                    y1="13.0087"
                    y2="23.0258"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(30.2282 9.07788) rotate(47.5031) scale(11.8943 6.05629)"
                    gradientUnits="userSpaceOnUse"
                    id="paint35_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F4F6FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint36_linear"
                    x1="27.7914"
                    x2="30.9849"
                    y1="16.2756"
                    y2="8.51666"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint37_linear"
                    x1="58.9235"
                    x2="62.5349"
                    y1="32.967"
                    y2="16.1507"
                  >
                    <stop
                      stop-color="white"
                      stop-opacity="0"
                    />
                    <stop
                      offset="0.557299"
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </lineargradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(36.2663 11.2632) rotate(-174.987) scale(6.45821 3.42162)"
                    gradientUnits="userSpaceOnUse"
                    id="paint38_radial"
                    r="1"
                  >
                    <stop
                      stop-color="white"
                    />
                    <stop
                      offset="1"
                      stop-color="white"
                      stop-opacity="0"
                    />
                  </radialgradient>
                  <radialgradient
                    cx="0"
                    cy="0"
                    gradientTransform="translate(38.8195 4.57286) rotate(37.0664) scale(25.1831 6.64993)"
                    gradientUnits="userSpaceOnUse"
                    id="paint39_radial"
                    r="1"
                  >
                    <stop
                      stop-color="#F2F4FF"
                    />
                    <stop
                      offset="0.402438"
                      stop-color="#E4E8FF"
                    />
                    <stop
                      offset="0.87338"
                      stop-color="#C8CDE9"
                    />
                    <stop
                      offset="1"
                      stop-color="#B9BFE6"
                    />
                  </radialgradient>
                  <lineargradient
                    gradientUnits="userSpaceOnUse"
                    id="paint40_linear"
                    x1="33.7806"
                    x2="37.5857"
                    y1="13.6197"
                    y2="2.55277"
                  >
                    <stop
                      stop-color="#8993CF"
                    />
                    <stop
                      offset="1"
                      stop-color="#8993CF"
                      stop-opacity="0"
                    />
                  </lineargradient>
                </defs>
              </svg>
              <div
                class="c2 c14"
              >
                <div
                  class="c15"
                >
                  <div
                    class="c16"
                    color="#CBC8EE"
                  >
                    Balance
                  </div>
                  <div
                    class="c17"
                    color="white"
                  >
                    <p>
                      Loading balance...
                    </p>
                  </div>
                </div>
                <div
                  class="c15"
                >
                  <div
                    class="c16"
                    color="#CBC8EE"
                  >
                    Network
                  </div>
                  <div
                    class="c17"
                    color="white"
                  />
                </div>
              </div>
            </div>
          </div>
          <div
            class="c18"
          >
            <svg
              class="c13"
              color="text"
              fill="none"
              height="32"
              viewBox="0 0 32 32"
              width="32"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect
                fill="#F5F7FF"
                height="32"
                rx="4"
                width="32"
              />
              <g
                clip-path="url(#clip0)"
              >
                <path
                  d="M24.1097 7.5625L17.078 12.7655L18.3856 9.69919L24.1097 7.5625Z"
                  fill="#E17726"
                  stroke="#E17726"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M7.89026 7.5625L14.8594 12.814L13.6144 9.69918L7.89026 7.5625Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M21.5778 19.6265L19.7069 22.4846L23.7131 23.5877L24.8607 19.6889L21.5778 19.6265Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M7.146 19.6889L8.28664 23.5877L12.2859 22.4846L10.4219 19.6265L7.146 19.6889Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.0703 14.7981L10.9575 16.4769L14.922 16.6573L14.7898 12.3909L12.0703 14.7981Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M19.9295 14.7982L17.1683 12.3424L17.0779 16.6574L21.0423 16.477L19.9295 14.7982Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.286 22.4845L14.6855 21.326L12.6199 19.7166L12.286 22.4845Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.3145 21.326L19.707 22.4845L19.3801 19.7166L17.3145 21.326Z"
                  fill="#E27625"
                  stroke="#E27625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M19.707 22.4847L17.3145 21.3262L17.5092 22.8801L17.4883 23.5392L19.707 22.4847Z"
                  fill="#D5BFB2"
                  stroke="#D5BFB2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.286 22.4847L14.5117 23.5392L14.4978 22.8801L14.6855 21.3262L12.286 22.4847Z"
                  fill="#D5BFB2"
                  stroke="#D5BFB2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M14.5532 18.6899L12.564 18.1072L13.9689 17.462L14.5532 18.6899Z"
                  fill="#233447"
                  stroke="#233447"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.4467 18.6899L18.0309 17.462L19.4428 18.1072L17.4467 18.6899Z"
                  fill="#233447"
                  stroke="#233447"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.286 22.4846L12.6338 19.6265L10.422 19.6889L12.286 22.4846Z"
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M19.3662 19.6265L19.707 22.4846L21.578 19.6889L19.3662 19.6265Z"
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M21.0423 16.4769L17.0779 16.6573L17.4465 18.69L18.0307 17.462L19.4426 18.1072L21.0423 16.4769Z"
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.5642 18.1072L13.9691 17.462L14.5534 18.69L14.922 16.6573L10.9575 16.4769L12.5642 18.1072Z"
                  fill="#CC6228"
                  stroke="#CC6228"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M10.9575 16.4769L12.6198 19.7167L12.5641 18.1072L10.9575 16.4769Z"
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M19.4428 18.1072L19.3802 19.7167L21.0425 16.4769L19.4428 18.1072Z"
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M14.9221 16.6572L14.5535 18.6899L15.0195 21.0902L15.1238 17.9268L14.9221 16.6572Z"
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.0781 16.6572L16.8833 17.9199L16.9807 21.0902L17.4467 18.6899L17.0781 16.6572Z"
                  fill="#E27525"
                  stroke="#E27525"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.4467 18.6899L16.9807 21.0902L17.3146 21.3261L19.3803 19.7166L19.4429 18.1072L17.4467 18.6899Z"
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.564 18.1072L12.6196 19.7166L14.6853 21.3261L15.0192 21.0902L14.5532 18.6899L12.564 18.1072Z"
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.4885 23.5391L17.5093 22.88L17.3285 22.7274H14.6717L14.4978 22.88L14.5117 23.5391L12.286 22.4846L13.065 23.1228L14.6438 24.212H17.3493L18.9351 23.1228L19.7072 22.4846L17.4885 23.5391Z"
                  fill="#C0AC9D"
                  stroke="#C0AC9D"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.3144 21.326L16.9805 21.0902H15.0192L14.6854 21.326L14.4976 22.88L14.6714 22.7274H17.3283L17.5092 22.88L17.3144 21.326Z"
                  fill="#161616"
                  stroke="#161616"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M24.4087 13.1054L24.9999 10.2334L24.1096 7.5625L17.3145 12.5921L19.9296 14.7981L23.6228 15.8734L24.4365 14.923L24.0818 14.6663L24.6452 14.153L24.214 13.8199L24.7774 13.3898L24.4087 13.1054Z"
                  fill="#763E1A"
                  stroke="#763E1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M7 10.2334L7.59815 13.1054L7.21561 13.3898L7.78593 13.8199L7.35471 14.153L7.91808 14.6663L7.56337 14.923L8.37713 15.8734L12.0704 14.7981L14.6855 12.5921L7.89026 7.5625L7 10.2334Z"
                  fill="#763E1A"
                  stroke="#763E1A"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M23.6229 15.8733L19.9297 14.7981L21.0425 16.4769L19.3802 19.7166L21.5781 19.6889H24.8609L23.6229 15.8733Z"
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M12.0702 14.7981L8.37706 15.8733L7.146 19.6889H10.4219L12.6197 19.7166L10.9574 16.4769L12.0702 14.7981Z"
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
                <path
                  d="M17.0779 16.6573L17.3144 12.592L18.3855 9.69922H13.6143L14.6853 12.592L14.9218 16.6573L15.0122 17.9338L15.0192 21.0903H16.9806L16.9875 17.9338L17.0779 16.6573Z"
                  fill="#F5841F"
                  stroke="#F5841F"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="0.25"
                />
              </g>
              <defs>
                <clippath
                  id="clip0"
                >
                  <rect
                    fill="white"
                    height="18"
                    transform="translate(7 7)"
                    width="18"
                  />
                </clippath>
              </defs>
            </svg>
            <input
              class="c19"
              value="0xb218C5D6aF1F979aC42BC68d98A5A0D796C6aB01"
            />
            <svg
              class="c13"
              color="text"
              fill="none"
              height="24px"
              viewBox="0 0 24 24"
              width="24px"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 9H11C9.89543 9 9 9.89543 9 11V20C9 21.1046 9.89543 22 11 22H20C21.1046 22 22 21.1046 22 20V11C22 9.89543 21.1046 9 20 9Z"
                fill="none"
                stroke="#8990A5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
              <path
                d="M5 15H4C3.46957 15 2.96086 14.7893 2.58579 14.4142C2.21071 14.0391 2 13.5304 2 13V4C2 3.46957 2.21071 2.96086 2.58579 2.58579C2.96086 2.21071 3.46957 2 4 2H13C13.5304 2 14.0391 2.21071 14.4142 2.58579C14.7893 2.96086 15 3.46957 15 4V5"
                fill="none"
                opacity="0.5"
                stroke="#8990A5"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="1.5"
              />
            </svg>
          </div>
          <div
            class="c20 c14"
          >
            <button
              class="c21 c22 c23"
              type="button"
            >
              <svg
                class="c24"
                color="text"
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.66605 11.4836C5.66608 11.3626 5.69 11.2428 5.73644 11.131C5.78289 11.0193 5.85094 10.9178 5.9367 10.8324C6.02245 10.747 6.12422 10.6794 6.23616 10.6335C6.3481 10.5876 6.468 10.5643 6.58899 10.5648L7.65859 10.5629C7.90256 10.5629 8.13654 10.6598 8.30906 10.8324C8.48157 11.005 8.57849 11.239 8.57849 11.4831V17.2714C8.75082 17.2203 9.43189 17.1728 9.67459 17.1156C9.84274 17.0761 10.2587 16.9808 10.366 16.8454C10.4733 16.7099 10.5317 16.5422 10.5317 16.3694V9.18991C10.5317 8.94583 10.6286 8.71175 10.8011 8.53914C10.9736 8.36653 11.2076 8.26954 11.4516 8.26949H12.4549C12.6989 8.26954 12.9329 8.36653 13.1054 8.53914C13.2779 8.71175 13.3748 8.94583 13.3748 9.18991V15.8536C13.3748 15.8536 14.6223 15.6982 14.996 15.5403C15.1349 15.4815 15.2535 15.3831 15.3368 15.2574C15.4202 15.1317 15.4647 14.9842 15.4648 14.8334V6.88923C15.4648 6.6452 15.5617 6.41116 15.7342 6.23858C15.9067 6.06601 16.1406 5.96904 16.3845 5.96899H17.3195C17.5633 5.96923 17.7971 6.06629 17.9694 6.23884C18.1417 6.41139 18.2385 6.64532 18.2385 6.88923V13.4309C19.5677 12.4673 20.9148 11.3082 21.9838 9.91452C22.1389 9.71222 22.2415 9.47467 22.2825 9.22304C22.3236 8.97142 22.3017 8.71355 22.2188 8.47244C21.724 7.04825 20.9374 5.74308 19.9094 4.64045C18.8814 3.53782 17.6346 2.66202 16.2488 2.06908C14.863 1.47615 13.3688 1.17913 11.8617 1.19705C10.3545 1.21498 8.86778 1.54743 7.49648 2.17315C6.12518 2.79887 4.89955 3.70408 3.89803 4.83084C2.89651 5.9576 2.14114 7.28111 1.68028 8.71666C1.21941 10.1522 1.06318 11.6682 1.2216 13.1676C1.38002 14.6671 1.84959 16.1169 2.60027 17.4243C2.73105 17.6499 2.92347 17.8334 3.1549 17.9534C3.38634 18.0733 3.64719 18.1247 3.9068 18.1014C4.19683 18.0759 4.55793 18.0398 4.98725 17.9894C5.1741 17.9682 5.3466 17.8789 5.47191 17.7386C5.59722 17.5983 5.66657 17.4168 5.66677 17.2287L5.66605 11.4836Z"
                  fill="none"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M5.63354 20.7668C7.24961 21.9429 9.1594 22.6488 11.1516 22.8065C13.1439 22.9642 15.1409 22.5675 16.9217 21.6602C18.7025 20.753 20.1978 19.3706 21.242 17.666C22.2862 15.9614 22.8387 14.0011 22.8383 12.0019C22.8383 11.7518 22.8267 11.5056 22.8101 11.2601C18.8521 17.1655 11.544 19.9262 5.63354 20.7668"
                  fill="none"
                  opacity="0.5"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
              View on {{explorerName}}
            </button>
            <button
              class="c21 c22 c23"
              type="button"
            >
              <svg
                class="c24"
                color="text"
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.5 5.09628L8.50003 3M8.50004 21L8.50003 3M8.50003 3L11.5 5.09628"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M12.5 18.9037L15.5 21M15.5 3L15.5 21M15.5 21L18.5 18.9037"
                  opacity="0.5"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
              Transaction History
            </button>
            <button
              class="c21 c22 c23"
              type="button"
            >
              <svg
                class="c24"
                color="text"
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M9 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H9"
                  fill="none"
                  opacity="0.5"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M16 17L21 12L16 7"
                  fill="none"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
                <path
                  d="M21 12H9"
                  fill="none"
                  stroke="#6C5DD3"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="1.5"
                />
              </svg>
              Logout
            </button>
          </div>
        </div>
      </div>
    </DocumentFragment>
  `)
})
