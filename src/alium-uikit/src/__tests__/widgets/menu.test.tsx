import noop from 'lodash/noop'
import { renderWithTheme } from '../../testHelpers'
import { Menu, menuConfig } from '../../widgets/Menu'

/**
 * @see https://jestjs.io/docs/en/manual-mocks
 */
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

it.skip('renders correctly', () => {
  const { asFragment } = renderWithTheme(
    <Menu
      account='0xbdda50183d817c3289f895a4472eb475967dc980'
      // @ts-ignore
      login={noop}
      logout={noop}
      isDark={false}
      toggleTheme={noop}
      links={menuConfig}
    >
      body
    </Menu>,
  )

  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c46 {
      position: fixed;
      top: 0;
      left: 0px;
      width: 100%;
      height: 100%;
      background-color: rgba(11,19,89,0.9);
      -webkit-transition: opacity 0.4s;
      transition: opacity 0.4s;
      opacity: 0;
      z-index: 10;
      pointer-events: none;
    }

    .c15 {
      fill: #0B1359;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c35 {
      fill: #8990A5;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      margin-right: 8px;
    }

    .c40 {
      fill: #0B1359;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      margin-right: 8px;
    }

    .c11 {
      fill: currentColor;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c19 {
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 12px;
      border-radius: 6px;
      border: 1px solid #d2d6e5;
      width: 40px;
      height: 40px;
    }

    .c9 {
      -webkit-text-decoration: none;
      text-decoration: none;
      cursor: pointer;
      color: #6C5DD3;
      font-weight: 500;
    }

    .c9:hover {
      -webkit-text-decoration: underline;
      text-decoration: underline;
    }

    .c9:focus {
      outline: none;
      -webkit-text-decoration: underline;
      text-decoration: underline;
    }

    .c9:active {
      -webkit-text-decoration: none;
      text-decoration: none;
    }

    .c29 {
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background-color: transparent;
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
      height: 32px;
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
      padding: 0 16px;
      -webkit-transition: background-color 0.2s;
      transition: background-color 0.2s;
      opacity: 1;
    }

    .c29:hover:not(:disabled):not(.button--disabled):not(:active) {
      background-color: #EBEDF9;
      border-color: currentColor;
    }

    .c29:active {
      background-color: transparent;
      box-shadow: inset 0 3px 0 none;
    }

    .c29:disabled,
    .c29.button--disabled {
      background-color: #E9EAEB;
      border-color: #E9EAEB;
      box-shadow: none;
      color: #BDC2C4;
      cursor: not-allowed;
    }

    .c27 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    .c43 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      margin-left: auto;
      margin-right: auto;
      margin-bottom: 24px;
      padding-top: 8px;
    }

    .c44 {
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
    }

    .c44 svg * {
      -webkit-transition: fill 100ms ease-in-out;
      transition: fill 100ms ease-in-out;
    }

    .c44:hover svg * {
      fill: #6c5dd3;
    }

    .c44:not(:last-child) {
      margin-right: 16px;
      margin-right: 0;
      margin-bottom: 12px;
    }

    .c5 {
      display: none;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-transition: all 200ms ease-out;
      transition: all 200ms ease-out;
    }

    .c22 {
      margin-top: 24px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-transition: all 200ms ease-out;
      transition: all 200ms ease-out;
    }

    .c6 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background: #dfefed;
      border-radius: 6px;
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    .c23 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      background: #dfefed;
      border-radius: 6px;
      width: 32px;
      height: 32px;
      margin-right: 8px;
    }

    .c7 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      font-size: 11px;
      line-height: 14px;
      font-weight: 500;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
      color: #0b1359;
    }

    .c24 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-size: 11px;
      line-height: 14px;
      font-weight: 500;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
      color: #0b1359;
    }

    .c8 {
      font-size: 11px;
      line-height: 14px;
      font-weight: 500;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
      color: #0b1359;
    }

    .c10 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      font-weight: bold;
      font-size: 12px;
      line-height: 20px;
    }

    .c25 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-left: 8px;
      font-weight: bold;
      font-size: 12px;
      line-height: 20px;
    }

    .c36 {
      color: transparent !important;
      -webkit-transition: color 0.4s;
      transition: color 0.4s;
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      font-size: 14px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
    }

    .c33 {
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      height: auto;
      padding: 0 14px;
      font-size: 16px;
      padding-top: 18px;
      padding-bottom: 14px;
      font-style: normal;
      font-weight: 500;
      line-height: 20px;
      -webkit-letter-spacing: 0.1px;
      -moz-letter-spacing: 0.1px;
      -ms-letter-spacing: 0.1px;
      letter-spacing: 0.1px;
      color: #0B1359;
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
    }

    .c33 a {
      color: #8990a5 !important;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      width: 100%;
      height: 100%;
      font-weight: 500;
    }

    .c33 a > div {
      margin-left: 8px;
    }

    .c33 a > span {
      margin-left: 8px;
    }

    .c33 svg * {
      -webkit-transition: all 200ms ease-in-out;
      transition: all 200ms ease-in-out;
    }

    .c33:hover div {
      color: #24ba7b;
    }

    .c33 a {
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
    }

    .c33 a div {
      color: #0B1359;
    }

    .c33:hover a {
      color: #24ba7b !important;
    }

    .c33.rainbow {
      -webkit-background-clip: text;
      -webkit-animation: CbIIe 3s ease-in-out infinite;
      animation: CbIIe 3s ease-in-out infinite;
      background: linear-gradient(139.73deg,#E6FDFF 0%,#F3EFFF 100%);
      background-size: 200% 100%;
      font-weight: bold;
    }

    .c38 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      background: #ffffff;
      border-radius: 6px;
    }

    .c38 div:first-child > div {
      margin-left: 8px;
      padding-bottom: 2px;
    }

    .c39 {
      max-height: 0;
      -webkit-transition: max-height 0.3s ease-out;
      transition: max-height 0.3s ease-out;
      overflow: hidden;
    }

    .c39 > div > a {
      padding-left: 25px;
      color: #8990a5;
      margin-top: 10px;
      font-style: normal;
      font-weight: normal;
      font-size: 14px;
      line-height: 20px;
      -webkit-letter-spacing: 0.1px;
      -moz-letter-spacing: 0.1px;
      -ms-letter-spacing: 0.1px;
      letter-spacing: 0.1px;
      height: auto;
    }

    .c39 div {
      height: auto;
      padding-top: 0px;
      padding-bottom: 0px !important;
    }

    .c39 div:first-child a {
      margin-top: 0;
    }

    .c39 div:last-child a {
      margin-bottom: 14px;
    }

    .c28 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
    }

    .c28 .mobile-icon {
      width: 32px;
    }

    .c28 .desktop-icon {
      width: 144px;
      height: auto;
      display: none;
    }

    .c30 {
      color: #0B1359;
      padding: 0 8px;
      border-radius: 8px;
      -webkit-tap-highlight-color: transparent;
      display: none;
    }

    .c30:hover:not(:disabled):not(.button--disabled):not(:active) {
      background: none;
    }

    .c42 {
      width: 30px;
      height: 18px;
      background: #e5f8f0;
      border: 1px solid #24ba7b;
      box-sizing: border-box;
      border-radius: 4px;
      font-style: normal;
      font-weight: bold;
      font-size: 9px;
      line-height: 12px;
      -webkit-letter-spacing: 1px;
      -moz-letter-spacing: 1px;
      -ms-letter-spacing: 1px;
      letter-spacing: 1px;
      padding: 4px;
      color: #1ea76d;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      text-transform: uppercase;
    }

    .c42:hover {
      opacity: 0.7;
    }

    .c21 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      overflow-y: auto;
      overflow-x: hidden;
      height: 100%;
    }

    .c21::-webkit-scrollbar-track {
      background: #FFFFFF;
    }

    .c31 {
      height: 24px;
      width: 24px;
      background: linear-gradient(0deg,#ffffff,#ffffff);
      box-shadow: 0 6px 8px rgba(220,224,244,0.56);
      border-radius: 40px;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      position: absolute;
      right: -12px;
      top: 36px;
      -webkit-transition: background-color 200ms ease-in-out;
      transition: background-color 200ms ease-in-out;
      border-right: 2px solid rgba(133,133,133,0.1);
    }

    .c31:hover {
      background: linear-gradient(0deg,#f0f0f0,#f0f0f0);
    }

    .c31 > * {
      margin: auto;
      -webkit-transition: -webkit-transform 200ms ease-in-out;
      -webkit-transition: transform 200ms ease-in-out;
      transition: transform 200ms ease-in-out;
      -webkit-transform: rotate(180deg);
      -ms-transform: rotate(180deg);
      transform: rotate(180deg);
    }

    .c32 {
      padding: 18px;
    }

    .c26 {
      display: none;
    }

    .c34 {
      -webkit-flex-direction: inherit;
      -ms-flex-direction: inherit;
      flex-direction: inherit;
    }

    .c34 div,
    .c34 span {
      margin-left: 8px !important;
      margin-top: 0px !important;
      -webkit-transition: 0.3s all ease;
      transition: 0.3s all ease;
    }

    .c34 svg {
      margin-right: 8px !important;
    }

    .c34:hover div:last-child {
      opacity: 1 !important;
    }

    .c41 {
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
    }

    .c41 div,
    .c41 span {
      margin-left: 0px !important;
      margin-top: 3px !important;
      -webkit-transition: 0.3s all ease;
      transition: 0.3s all ease;
    }

    .c41 svg {
      margin-right: 0px !important;
    }

    .c41:hover div:last-child {
      opacity: 0.7 !important;
    }

    .c37 {
      -webkit-box-flex: inherit !important;
      -webkit-flex-grow: inherit !important;
      -ms-flex-positive: inherit !important;
      flex-grow: inherit !important;
      font-style: normal;
      font-weight: 500;
      font-size: 14px;
      line-height: 20px;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      -webkit-letter-spacing: 0.1px;
      -moz-letter-spacing: 0.1px;
      -ms-letter-spacing: 0.1px;
      letter-spacing: 0.1px;
      display: none;
      color: #0b1359;
    }

    .c20 {
      position: fixed;
      padding-top: 0;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-flex-direction: column;
      -ms-flex-direction: column;
      flex-direction: column;
      -webkit-box-pack: justify;
      -webkit-justify-content: space-between;
      -ms-flex-pack: justify;
      justify-content: space-between;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      background-color: #FFFFFF;
      height: calc(100vh - 97px);
      -webkit-transition: padding-top 0.2s,width 0.2s;
      transition: padding-top 0.2s,width 0.2s;
      border-right: 0;
      overflow: initial;
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      z-index: 20;
      top: 97px;
      right: 0;
      width: 0;
    }

    .c17 {
      cursor: pointer;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-box-pack: center;
      -webkit-justify-content: center;
      -ms-flex-pack: center;
      justify-content: center;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding: 10px 16px;
      margin-right: 6px;
      border-radius: 6px;
      background: #6c5dd3;
      font-weight: bold;
      font-size: 14px;
      line-height: 20px;
      -webkit-letter-spacing: 1px;
      -moz-letter-spacing: 1px;
      -ms-letter-spacing: 1px;
      letter-spacing: 1px;
      color: #ffffff;
      background: #ebedf9;
      color: #6c5dd3;
    }

    .c17:hover {
      background: #8677f0;
    }

    .c17:hover {
      background: #6c5dd3;
      color: #ffffff;
    }

    .c18 {
      display: none;
      margin-right: 18px;
    }

    .c13 {
      width: 232px;
      margin-left: auto;
      border: 1px solid #6c5dd3;
      box-sizing: border-box;
      border-radius: 6px;
      height: 48px;
      position: relative;
      cursor: pointer;
      margin-right: 16px;
      background: transparent;
      -webkit-transition: background-color 200ms ease-in-out,color 200ms ease-in-out;
      transition: background-color 200ms ease-in-out,color 200ms ease-in-out;
    }

    .c13:hover {
      background-color: #6c5dd3;
    }

    .c13:hover > * {
      color: white;
    }

    .c13:hover > svg * {
      stroke: white;
    }

    .c13 > svg {
      fill: #6c5dd3;
      position: absolute;
      right: 23px;
      top: 18px;
    }

    .c13 > svg * {
      -webkit-transition: stroke 200ms ease-in-out;
      transition: stroke 200ms ease-in-out;
    }

    .c13 > svg path {
      stroke: #6c5dd3;
    }

    .c16 {
      position: absolute;
      padding-left: 47px;
      margin-top: 15px;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
      color: #6c5dd3;
      font-size: 14px;
    }

    .c14 {
      position: absolute;
      top: 12px;
      left: 14px;
    }

    .c0 {
      position: relative;
      width: 100%;
    }

    .c1 {
      position: fixed;
      top: 0;
      left: 0;
      -webkit-transition: top 0.2s;
      transition: top 0.2s;
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      padding-right: 33px;
      padding-left: 29px;
      width: 100%;
      height: 97px;
      border-bottom: solid 2px rgba(133,133,133,0.1);
      z-index: 20;
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      background-color: #f4f5fa;
    }

    .c2 {
      display: -webkit-box;
      display: -webkit-flex;
      display: -ms-flexbox;
      display: flex;
      -webkit-align-items: center;
      -webkit-box-align: center;
      -ms-flex-align: center;
      align-items: center;
      margin-right: auto;
    }

    .c3 {
      display: none;
    }

    .c4 {
      display: none;
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

    .c45 {
      -webkit-box-flex: 1;
      -webkit-flex-grow: 1;
      -ms-flex-positive: 1;
      flex-grow: 1;
      margin-top: 97px;
      -webkit-transition: margin-top 0.2s;
      transition: margin-top 0.2s;
      -webkit-transform: translate3d(0,0,0);
      -ms-transform: translate3d(0,0,0);
      transform: translate3d(0,0,0);
      max-width: 100%;
    }

    .c47 {
      position: fixed;
      height: 100%;
      display: none;
    }

    @media (min-width:768px) {
      .c19 {
        padding: 0 8px;
        width: 48px;
        height: 48px;
      }
    }

    @media (min-width:1024px) {
      .c19 {
        display: none;
      }
    }

    @media screen and (max-width:1024px) {
      .c43 {
        -webkit-box-pack: justify;
        -webkit-justify-content: space-between;
        -ms-flex-pack: justify;
        justify-content: space-between;
      }
    }

    @media (min-width:768px) {
      .c5 {
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }
    }

    @media (max-width:1023px) {
      .c5 {
        margin-left: 24px;
      }
    }

    @media (min-width:768px) {
      .c22 {
        display: none;
      }
    }

    @media (max-width:1023px) {
      .c22 {
        margin-left: 22px;
      }
    }

    @media (min-width:768px) {
      .c6 {
        width: 40px;
        height: 40px;
      }
    }

    @media (max-width:1023px) {
      .c6 {
        display: none;
      }
    }

    @media (min-width:768px) {
      .c23 {
        width: 40px;
        height: 40px;
      }
    }

    @media (max-width:1023px) {

    }

    @media (min-width:768px) {
      .c7 {
        font-size: 14px;
        line-height: 20px;
        width: auto;
      }
    }

    @media (min-width:768px) {
      .c24 {
        font-size: 14px;
        line-height: 20px;
        width: auto;
      }
    }

    @media (min-width:1024px) {
      .c8 {
        font-size: 14px;
        line-height: 20px;
        width: auto;
      }
    }

    @media (min-width:1024px) {
      .c28 .mobile-icon {
        display: none;
      }
    }

    @media (min-width:1024px) {
      .c28 .desktop-icon {
        display: block;
      }
    }

    @media (min-width:1024px) {
      .c30 {
        display: block;
      }
    }

    @media (min-width:1024px) {
      .c32 {
        padding-top: 33px;
        padding-left: 17px;
        padding-right: 17px;
      }
    }

    @media screen and (max-width:967px) {
      .c32 > div:not(:last-child) {
        border-bottom: 1px solid #f4f5fa;
      }

      .c32 > div > a {
        font-weight: 500;
      }

      .c32 > div > div:first-child {
        font-weight: 500;
      }

      .c32 > div > div:not(:first-child) > div > a {
        font-weight: 500;
      }
    }

    @media (min-width:1024px) {
      .c26 {
        display: block;
      }
    }

    @media (min-width:1024px) {
      .c20 {
        border-right: 2px solid rgba(133,133,133,0.1);
        width: 88px;
        top: 0;
        left: 0;
        padding-top: 28px;
        height: 100vh;
      }
    }

    @media (max-width:767px) {
      .c20 {
        width: 0px;
      }
    }

    @media (min-width:768px) {
      .c17 {
        padding: 12px 24px;
        margin-right: 8px;
      }
    }

    @media (min-width:1024px) {
      .c17 {
        margin-right: initial;
      }
    }

    @media (min-width:768px) {

    }

    @media (max-width:1023px) {
      .c13 {
        margin-right: 8px;
      }
    }

    @media (max-width:767px) {
      .c13 {
        margin-right: 6px;
        width: 40px;
        height: 40px;
        display: -webkit-box;
        display: -webkit-flex;
        display: -ms-flexbox;
        display: flex;
      }

      .c13 > svg {
        display: none;
      }
    }

    @media (max-width:767px) {
      .c16 {
        display: none;
      }
    }

    @media (max-width:767px) {
      .c14 {
        margin: auto;
        position: initial;
        width: 24px;
        height: 24px;
      }
    }

    @media (min-width:1024px) {
      .c1 {
        left: 88px;
        max-width: calc(100% - 88px);
      }
    }

    @media (max-width:1439px) {
      .c1 {
        padding-right: 24px;
        padding-left: 24px;
      }
    }

    @media (max-width:767px) {
      .c1 {
        padding-right: 10px;
        padding-left: 11px;
      }
    }

    @media (max-width:1023px) {
      .c3 {
        display: initial;
      }
    }

    @media (max-width:767px) {
      .c3 {
        display: none;
      }
    }

    @media (max-width:767px) {
      .c4 {
        display: initial;
      }
    }

    @media (min-width:1024px) {
      .c45 {
        margin-left: 88px;
        max-width: calc(100% - 88px);
      }
    }

    @media (min-width:1024px) {
      .c47 {
        display: none;
      }
    }

    <div
        class="c0"
      >
        <nav
          class="c1"
        >
          <div
            class="c2"
          >
            <div
              class="c3"
            >
              <img
                alt="Site logo"
                src="[object Object]"
              />
            </div>
            <div
              class="c4"
            >
              <img
                alt="Site logo"
                src="[object Object]"
              />
            </div>
            <div
              class="c5"
            >
              <div
                class="c6"
              >
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                <image width='40' height='40' href='/images/logo-mobile.svg' />
                </svg>
              </div>
              <div
                class="c7"
              >
                <div
                  class="c8"
                >
                 YET Price: 
                  <a
                    href="https://bscscan.com/address/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11"
                    style="color: rgb(108, 93, 211);"
                  >
                    $0
                  </a>
                </div>
                <a
                  class="c9 c10"
                  href="https://alium.finance/swap/ETH/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11"
                  target="_blank"
                >
                  Buy ALM
                  <svg
                    class="c11"
                    color="currentColor"
                    viewBox="0 0 24 24"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.29006 15.88L13.1701 12L9.29006 8.12001C8.90006 7.73001 8.90006 7.10001 9.29006 6.71001C9.68006 6.32001 10.3101 6.32001 10.7001 6.71001L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
          <div
            class="c12"
          >
            <div
              class="c13"
            >
              <div
                class="c14"
              >
                <svg
                  class="c15"
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
              </div>
              <p
                class="c16"
              >
                Binance Smart Chain
              </p>
              <svg
                class="c15"
                color="text"
                fill="none"
                height="8"
                viewBox="0 0 13 8"
                width="13"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12.2218 1.35108L7.22183 6.35108C6.83131 6.7416 6.19814 6.7416 5.80762 6.35107L0.807617 1.35107"
                  fill="none"
                  stroke="#8990A5"
                  stroke-linecap="round"
                  stroke-width="1.5"
                />
              </svg>
            </div>
            <div
              class="c17"
            >
              <div
                class="c18"
              />
              0xbd...c980
            </div>
            <div
              aria-label="Toggle menu"
              class="c19"
            >
              <svg
                class="c15"
                color="text"
                fill="none"
                height="24"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  clip-rule="evenodd"
                  d="M19.75 12.0024C19.75 11.5882 19.4142 11.2524 19 11.2524H5C4.58579 11.2524 4.25 11.5882 4.25 12.0024C4.25 12.4166 4.58579 12.7524 5 12.7524H19C19.4142 12.7524 19.75 12.4166 19.75 12.0024Z"
                  fill="#8990A5"
                  fill-rule="evenodd"
                  opacity="0.5"
                />
                <path
                  clip-rule="evenodd"
                  d="M19.75 7.00244C19.75 6.58823 19.4142 6.25244 19 6.25244H5C4.58579 6.25244 4.25 6.58823 4.25 7.00244C4.25 7.41665 4.58579 7.75244 5 7.75244H19C19.4142 7.75244 19.75 7.41665 19.75 7.00244Z"
                  fill="#8990A5"
                  fill-rule="evenodd"
                />
                <path
                  clip-rule="evenodd"
                  d="M19.75 17.0024C19.75 16.5882 19.4142 16.2524 19 16.2524H5C4.58579 16.2524 4.25 16.5882 4.25 17.0024C4.25 17.4166 4.58579 17.7524 5 17.7524H19C19.4142 17.7524 19.75 17.4166 19.75 17.0024Z"
                  fill="#8990A5"
                  fill-rule="evenodd"
                />
              </svg>
            </div>
          </div>
        </nav>
        <div
          class="c20"
        >
          <div
            class="c21"
          >
            <div
              class="c22"
            >
              <div
                class="c23"
              >
                <svg
                  fill="none"
                  height="24"
                  viewBox="0 0 24 24"
                  width="24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12.0068 20.2H12.0067H12C7.47126 20.2 3.8 16.5287 3.8 12C3.8 7.47126 7.47126 3.8 12 3.8C16.5065 3.8 20.1642 7.43536 20.2 11.9333V19.5159C19.4403 19.1739 18.5858 18.9922 17.817 18.9922C17.3981 18.9922 16.9905 19.0454 16.601 19.1458C16.0996 19.275 15.5801 19.461 15.105 19.6312C14.9043 19.7031 14.7115 19.7722 14.5313 19.8329C13.8824 20.0516 13.3063 20.1995 12.7398 20.1995H12.1179V20.1995L12.1076 20.1996C12.0767 20.2 12.0448 20.2 12.0068 20.2Z"
                    stroke="#24BA7B"
                    stroke-width="1.6"
                  />
                  <path
                    d="M11.9997 16.468C9.53197 16.468 7.53145 14.4675 7.53145 11.9997C7.53145 9.53197 9.53197 7.53145 11.9997 7.53145C14.4675 7.53145 16.468 9.53197 16.468 11.9997C16.468 14.4675 14.4675 16.468 11.9997 16.468Z"
                    opacity="0.5"
                    stroke="#24BA7B"
                    stroke-width="1.6"
                  />
                </svg>
              </div>
              <div
                class="c24"
              >
                <div
                  class="c8"
                >
                 YET Price: 
                  <a
                    href="https://bscscan.com/address/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11"
                    style="color: rgb(108, 93, 211);"
                  >
                    $0
                  </a>
                </div>
                <a
                  class="c9 c25"
                  href="https://alium.finance/swap/ETH/0x7C38870e93A1f959cB6c533eB10bBc3e438AaC11"
                  target="_blank"
                >
                  Buy ALM
                  <svg
                    class="c11"
                    color="currentColor"
                    viewBox="0 0 24 24"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9.29006 15.88L13.1701 12L9.29006 8.12001C8.90006 7.73001 8.90006 7.10001 9.29006 6.71001C9.68006 6.32001 10.3101 6.32001 10.7001 6.71001L15.2901 11.3C15.6801 11.69 15.6801 12.32 15.2901 12.71L10.7001 17.3C10.3101 17.69 9.68006 17.69 9.29006 17.3C8.91006 16.91 8.90006 16.27 9.29006 15.88Z"
                    />
                  </svg>
                </a>
              </div>
            </div>
            <div
              class="c26"
            >
              <div
                class="c27"
              >
                <a
                  class="c28"
                  href="/"
                />
                <a
                  class=""
                  href="/"
                >
                  <svg
                    class="c15 mobile-icon"
                    color="text"
                    fill="none"
                    viewBox="0 0 1291 1291"
                    width="20px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M644.86.998C288.714.998 0 289.77 0 645.988c0 356.222 288.714 644.992 644.86 644.992 126.461 0 243.987-36.12 343.537-99.03 29.603-17.16 63.823-26.84 100.513-26.84 82.38 0 153.19 49.55 184.26 120.48 1.42 3.24 4.59 5.4 8.14 5.4 4.79 0 8.68-3.89 8.68-8.68l-.3-629.711c.02-2.201.03-4.404.03-6.611 0-356.218-288.71-644.99-644.86-644.99zm-288.922 644.99c0 159.599 129.354 288.979 288.921 288.979 159.567 0 288.921-129.38 288.921-288.979S804.426 357.009 644.859 357.009c-159.567 0-288.921 129.38-288.921 288.979z"
                      fill="url(#paint0_linear)"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M644.86 1290.97c126.461 0 243.986-36.12 343.536-99.02 29.604-17.17 63.824-26.84 100.514-26.84 82.38 0 153.19 49.55 184.26 120.47 1.42 3.25 4.59 5.41 8.14 5.41 4.79 0 8.68-3.89 8.68-8.69l-.3-629.706c.02-2.202.03-4.405.03-6.611 0-71.787-11.73-140.835-33.36-205.332L915.302 544.086c11.942 31.69 18.475 66.031 18.475 101.899 0 159.599-129.354 288.98-288.921 288.98-159.567 0-288.921-129.381-288.921-288.98L51.394 898.732C149.688 1129.33 378.4 1290.97 644.86 1290.97z"
                      fill="url(#paint1_linear)"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M0 645.988C0 289.77 288.714.998 644.86.998c356.15 0 644.86 288.772 644.86 644.99 0 2.207-.01 4.41-.03 6.611l.3 629.711c0 4.79-3.89 8.68-8.68 8.68-3.55 0-6.72-2.16-8.14-5.4-31.07-70.93-101.88-120.48-184.26-120.48-36.69 0-70.91 9.68-100.513 26.84-99.55 62.91-217.076 99.03-343.537 99.03C288.714 1290.98 0 1002.21 0 645.988zm693.455 344.887c186.814 0 338.255-151.473 338.255-338.325 0-15.899-1.1-31.543-3.22-46.859l-96.638 6.726c-16.631-143.783-138.779-255.408-286.993-255.408-159.567 0-288.921 129.38-288.921 288.979 0 2.174.024 4.343.072 6.506l-.812.056c0 186.852 151.443 338.325 338.257 338.325z"
                      fill="url(#paint2_linear)"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M1289.99 1282.29c0 4.8-3.88 8.69-8.68 8.69-3.54 0-6.71-2.16-8.13-5.4-31.08-70.93-101.89-120.48-184.27-120.48-36.68 0-70.9 9.68-100.51 26.84-99.55 62.91-217.076 99.03-343.536 99.03-190.86 0-362.354-82.93-480.425-214.74l297.793-176.742c60.483 56.677 141.798 91.382 231.218 91.382 135.364 0 252.157-79.528 306.221-194.419h290.089l.23 485.839z"
                      fill="url(#paint3_linear)"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M644.86.998C288.714.998 0 289.77 0 645.988c0 356.222 288.714 644.992 644.86 644.992 68.619 0 134.608-10.64 196.521-30.41-281.855-1.25-509.958-230.16-509.958-512.368 0-79.18 17.957-154.166 50.02-221.104h.001c45.321-100.297 146.219-170.089 263.415-170.089 117.196 0 218.094 69.792 263.415 170.089h170.346l115.26-152.851a515.427 515.427 0 0164.82 73.522C1175.08 188.531 931.865.999 644.86.999z"
                      fill="#C4C4C4"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M644.86.998C288.714.998 0 289.77 0 645.988c0 356.222 288.714 644.992 644.86 644.992 68.619 0 134.608-10.64 196.521-30.41-281.855-1.25-509.958-230.16-509.958-512.368 0-79.18 17.957-154.166 50.02-221.104 45.322-100.295 146.219-170.086 263.413-170.086 117.195 0 218.092 69.791 263.414 170.086h170.35l115.26-152.851a515.427 515.427 0 0164.82 73.522C1175.08 188.531 931.865.999 644.86.999z"
                      fill="url(#paint4_linear)"
                    />
                    <path
                      d="M649.716 1132.6c95.568 0 180.75-44.48 235.984-113.87l-125.257 228.71-110.727 10.75-226.029-125.59c-44.582-47.32-133.747-143.635-133.747-150.323 0-6.689 50.063-37.273 75.094-51.728C406.128 1048.2 518.068 1132.6 649.716 1132.6z"
                      fill="url(#paint5_linear)"
                    />
                    <g
                      opacity="0.7"
                    >
                      <path
                        d="M644.86.998C288.714.998 0 289.77 0 645.988c0 356.222 288.714 644.992 644.86 644.992 68.619 0 134.608-10.64 196.521-30.41-281.855-1.25-509.958-230.16-509.958-512.368 0-79.18 17.957-154.166 50.02-221.104 45.322-100.295 146.219-170.086 263.413-170.086 117.195 0 218.092 69.791 263.414 170.086h170.35l115.26-152.851a515.427 515.427 0 0164.82 73.522C1175.08 188.531 931.865.999 644.86.999z"
                        fill="url(#paint6_linear)"
                      />
                      <path
                        d="M649.716 1132.6c95.568 0 180.75-44.48 235.984-113.87l-125.257 228.71-110.727 10.75-226.029-125.59c-44.582-47.32-133.747-143.635-133.747-150.323 0-6.689 50.063-37.273 75.094-51.728C406.128 1048.2 518.068 1132.6 649.716 1132.6z"
                        fill="url(#paint7_linear)"
                      />
                    </g>
                    <path
                      d="M593.838 1288.98C261.543 1262.96 0 985.02 0 645.978 0 456.25 81.903 285.655 212.274 167.635l68.019 50.991C159.676 321.663 83.208 474.889 83.208 645.978c0 226.454 133.965 421.612 326.952 510.512 60.797 25.49 211.105 77.74 325.966 82.81 114.861 5.06-12.985 36.56-91.266 51.67-17.172 0-34.188-.67-51.022-1.99z"
                      fill="url(#paint8_radial)"
                      opacity="0.4"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M12.877 774.875l2.444 7.87c-6.85-31.75-10.457-64.707-10.457-98.506 0-256.71 208.062-464.814 464.72-464.814 165.867 0 311.439 86.915 393.673 217.694L753.163 172.765l-283.579-36.609-300.979 74.969C63.878 325.802 0 478.435 0 645.99c0 44.138 4.433 87.24 12.877 128.885z"
                      fill="url(#paint9_linear)"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M148.277 234.473C266.562 91.836 445.104.993 644.86.993c356.15 0 644.86 288.771 644.86 644.989 0 2.207-.01 4.41-.03 6.611l.3 629.707c0 4.8-3.89 8.69-8.68 8.69-3.55 0-6.72-2.16-8.14-5.41-31.07-70.93-101.88-120.47-184.26-120.47-36.69 0-70.91 9.67-100.513 26.83-99.55 62.91-217.076 99.03-343.537 99.03-44.782 0-88.498-4.56-130.708-13.25 248.937-55.38 435.059-277.57 435.059-543.237 0-307.348-249.105-556.503-556.391-556.503-87.739 0-170.735 20.312-244.543 56.493z"
                      fill="url(#paint10_linear)"
                    />
                    <path
                      d="M352.492 1221.02c73.442 37.43 155.008 61.2 241.351 67.96a652.48 652.48 0 0051.017 1.99c8.332-1.61 17.231-3.4 26.333-5.33l-24.378-56.02c-41.028 21.76-87.827 34.09-137.506 34.09-56.823 0-109.879-16.13-154.84-44.06l-1.977 1.37z"
                      fill="url(#paint11_linear)"
                    />
                    <path
                      d="M1289.7 652.593c.02-2.201.03-4.404.03-6.611 0-356.218-288.71-644.99-644.859-644.99-77.716 0-152.22 13.75-221.215 38.952a640.42 640.42 0 00-30.826 12.172C297.321 92.72 213.615 155.697 148.288 234.473c88.439-59.428 339.057-157.804 634.023-75.888 212.77 59.902 368.739 255.432 368.739 487.397 0 1.741-.01 3.48-.02 5.218l-.01.73.18 380.17.07 142.86c13 4.24 25.42 9.77 37.11 16.43 36.42 20.77 65.72 52.6 83.33 90.91.5 1.09.99 2.19 1.47 3.28 1.42 3.25 4.6 5.41 8.14 5.41 4.79 0 8.68-3.89 8.68-8.69l-.3-629.707z"
                      fill="url(#paint12_radial)"
                      opacity="0.4"
                    />
                    <path
                      d="M644.86.992c356.15 0 644.86 288.772 644.86 644.99l-.03 6.611.26 546.347h-55.47l-.26-546.612.03-6.346c0-325.575-263.879-589.507-589.39-589.507-41.078 0-81.174 4.2-119.882 12.197-32.091 7.399-65.245 17.58-98.22 29.469-110.346 39.781-218.685 98.668-278.481 136.332a648.777 648.777 0 0195.687-93.725C354.032 53.258 493.344.992 644.86.992z"
                      fill="url(#paint13_radial)"
                    />
                    <defs>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint0_linear"
                        x1="960.843"
                        x2="383.333"
                        y1="1290.99"
                        y2="898.98"
                      >
                        <stop
                          stop-color="#069F5F"
                        />
                        <stop
                          offset="1"
                          stop-color="#007E49"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint1_linear"
                        x1="919.932"
                        x2="301.077"
                        y1="887.482"
                        y2="1208.06"
                      >
                        <stop
                          stop-color="#005531"
                        />
                        <stop
                          offset="1"
                          stop-color="#005531"
                          stop-opacity="0"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint2_linear"
                        x1="960.843"
                        x2="383.333"
                        y1="1290.99"
                        y2="898.98"
                      >
                        <stop
                          stop-color="#0FA968"
                        />
                        <stop
                          offset="1"
                          stop-color="#088E56"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint3_linear"
                        x1="886.176"
                        x2="417.968"
                        y1="1144.83"
                        y2="1043.76"
                      >
                        <stop
                          stop-color="#005531"
                        />
                        <stop
                          offset="1"
                          stop-color="#005531"
                          stop-opacity="0"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint4_linear"
                        x1="352.501"
                        x2="249.628"
                        y1="1089.9"
                        y2="470.392"
                      >
                        <stop
                          stop-color="#0FA968"
                        />
                        <stop
                          offset="1"
                          stop-color="#0D995E"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint5_linear"
                        x1="352.501"
                        x2="249.628"
                        y1="1089.9"
                        y2="470.392"
                      >
                        <stop
                          stop-color="#0FA968"
                        />
                        <stop
                          offset="1"
                          stop-color="#0D995E"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint6_linear"
                        x1="355.369"
                        x2="479.804"
                        y1="913.415"
                        y2="316.683"
                      >
                        <stop
                          stop-color="#008C51"
                          stop-opacity="0"
                        />
                        <stop
                          offset="1"
                          stop-color="#00643A"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint7_linear"
                        x1="355.369"
                        x2="479.804"
                        y1="913.415"
                        y2="316.683"
                      >
                        <stop
                          stop-color="#008C51"
                          stop-opacity="0"
                        />
                        <stop
                          offset="1"
                          stop-color="#00643A"
                        />
                      </lineargradient>
                      <radialgradient
                        cx="0"
                        cy="0"
                        gradientTransform="rotate(-56.565 894.758 705.656) scale(839.182 584.23)"
                        gradientUnits="userSpaceOnUse"
                        id="paint8_radial"
                        r="1"
                      >
                        <stop
                          stop-color="#8FFED0"
                        />
                        <stop
                          offset="1"
                          stop-color="#8FFED0"
                          stop-opacity="0"
                        />
                      </radialgradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint9_linear"
                        x1="735.576"
                        x2="684.09"
                        y1="727.911"
                        y2="218.449"
                      >
                        <stop
                          stop-color="#13AC6C"
                        />
                        <stop
                          offset="1"
                          stop-color="#15BF78"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint10_linear"
                        x1="1121.13"
                        x2="968.148"
                        y1="1181.59"
                        y2="178.112"
                      >
                        <stop
                          stop-color="#24BA7B"
                        />
                        <stop
                          offset="1"
                          stop-color="#33D993"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="paint11_linear"
                        x1="1121.13"
                        x2="968.148"
                        y1="1181.59"
                        y2="178.112"
                      >
                        <stop
                          stop-color="#24BA7B"
                        />
                        <stop
                          offset="1"
                          stop-color="#33D993"
                        />
                      </lineargradient>
                      <radialgradient
                        cx="0"
                        cy="0"
                        gradientTransform="rotate(59.37 164.939 878.077) scale(795.225 703.891)"
                        gradientUnits="userSpaceOnUse"
                        id="paint12_radial"
                        r="1"
                      >
                        <stop
                          stop-color="#91FFD1"
                        />
                        <stop
                          offset="1"
                          stop-color="#90FFD1"
                          stop-opacity="0"
                        />
                      </radialgradient>
                      <radialgradient
                        cx="0"
                        cy="0"
                        gradientTransform="rotate(67.469 361.474 756.548) scale(834.623 750.919)"
                        gradientUnits="userSpaceOnUse"
                        id="paint13_radial"
                        r="1"
                      >
                        <stop
                          stop-color="#A6FFD9"
                        />
                        <stop
                          offset="1"
                          stop-color="#A6FFD9"
                          stop-opacity="0"
                        />
                      </radialgradient>
                    </defs>
                  </svg>
                  <svg
                    class="c15 desktop-icon"
                    color="text"
                    fill="none"
                    height="32"
                    viewBox="0 0 1800 608"
                    width="120"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M303.165.807C135.731.807 0 136.566 0 304.033s135.731 303.225 303.165 303.225c59.452 0 114.704-16.979 161.504-46.555 13.919-8.068 30.007-12.617 47.252-12.617 38.729 0 72.019 23.294 86.628 56.638.669 1.525 2.159 2.541 3.824 2.541a4.084 4.084 0 004.084-4.084l-.143-296.04c.01-1.035.015-2.071.015-3.108C606.329 136.566 470.598.807 303.165.807zm-135.83 303.225c0 75.031 60.812 135.856 135.828 135.856 75.017 0 135.829-60.825 135.829-135.856 0-75.031-60.812-135.856-135.829-135.856-75.016 0-135.828 60.825-135.828 135.856z"
                      fill="url(#prefix__paint0_linear)"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M303.165 607.255c59.452 0 114.704-16.98 161.505-46.555 13.918-8.068 30.006-12.618 47.251-12.618 38.729 0 72.019 23.294 86.628 56.639.669 1.525 2.159 2.541 3.824 2.541a4.085 4.085 0 004.084-4.084l-.143-296.041c.01-1.034.015-2.07.015-3.108 0-33.748-5.512-66.209-15.685-96.531l-160.338 48.627c5.614 14.898 8.686 31.043 8.686 47.906 0 75.031-60.813 135.856-135.829 135.856s-135.829-60.825-135.829-135.856L24.162 422.853c46.21 108.409 153.734 184.402 279.003 184.402z"
                      fill="url(#prefix__paint1_linear)"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M0 304.033C0 136.566 135.731.807 303.165.807c167.433 0 303.164 135.759 303.164 303.226 0 1.037-.005 2.073-.015 3.108l.143 296.04a4.084 4.084 0 01-4.084 4.084c-1.665 0-3.155-1.016-3.824-2.541-14.609-33.344-47.899-56.638-86.628-56.638-17.245 0-33.333 4.549-47.252 12.617-46.8 29.575-102.052 46.555-161.504 46.555C135.731 607.258 0 471.5 0 304.033zm326.01 162.139c87.826 0 159.023-71.211 159.023-159.055 0-7.474-.515-14.829-1.513-22.029l-45.434 3.162c-7.819-67.596-65.243-120.074-134.923-120.074-75.016 0-135.828 60.825-135.828 135.856 0 1.022.011 2.042.033 3.059l-.38.026c0 87.844 71.197 159.055 159.022 159.055z"
                      fill="url(#prefix__paint2_linear)"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M606.457 603.176a4.084 4.084 0 01-4.083 4.084c-1.665 0-3.156-1.016-3.824-2.541-14.609-33.345-47.899-56.639-86.628-56.639-17.246 0-33.333 4.55-47.252 12.618-46.801 29.575-102.052 46.555-161.504 46.555-89.728 0-170.352-38.989-225.86-100.952l140-83.092c28.434 26.645 66.663 42.961 108.701 42.961 63.638 0 118.545-37.389 143.962-91.401h136.378l.11 228.407z"
                      fill="url(#prefix__paint3_linear)"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M303.165.807C135.731.807 0 136.566 0 304.033s135.731 303.225 303.165 303.225c32.259 0 63.282-4.999 92.389-14.297-132.507-.585-239.744-108.204-239.744-240.875 0-37.221 8.44-72.47 23.511-103.937 21.304-47.157 68.742-79.973 123.842-79.973 55.097 0 102.532 32.811 123.838 79.964h80.085l54.185-71.859a242.196 242.196 0 0130.473 34.564C552.433 88.971 438.093.807 303.165.807z"
                      fill="#C4C4C4"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M303.165.807C135.731.807 0 136.566 0 304.033s135.731 303.225 303.165 303.225c32.259 0 63.282-4.999 92.389-14.297-132.507-.585-239.744-108.204-239.744-240.875 0-37.225 8.442-72.477 23.516-103.946 21.307-47.152 68.741-79.962 123.837-79.962 55.096 0 102.53 32.81 123.837 79.962h80.086l54.185-71.859a242.196 242.196 0 0130.473 34.564C552.433 88.971 438.093.807 303.165.807z"
                      fill="url(#prefix__paint4_linear)"
                    />
                    <path
                      d="M305.447 532.801c44.929 0 84.976-20.91 110.942-53.531l-58.886 107.518-52.056 5.054-106.261-59.041c-20.959-22.247-62.878-67.526-62.878-70.671 0-3.144 23.536-17.522 35.303-24.318 19.32 55.311 71.945 94.989 133.836 94.989z"
                      fill="url(#prefix__paint5_linear)"
                    />
                    <g
                      opacity="0.7"
                    >
                      <path
                        d="M303.165.807C135.731.807 0 136.566 0 304.033s135.731 303.225 303.165 303.225c32.259 0 63.282-4.999 92.389-14.297-132.507-.585-239.744-108.204-239.744-240.875 0-37.225 8.442-72.477 23.516-103.946 21.307-47.152 68.741-79.962 123.837-79.962 55.096 0 102.53 32.81 123.837 79.962h80.086l54.185-71.859a242.196 242.196 0 0130.473 34.564C552.433 88.971 438.093.807 303.165.807z"
                        fill="url(#prefix__paint6_linear)"
                      />
                      <path
                        d="M305.447 532.801c44.929 0 84.976-20.91 110.942-53.531l-58.886 107.518-52.056 5.054-106.261-59.041c-20.959-22.247-62.878-67.526-62.878-70.671 0-3.144 23.536-17.522 35.303-24.318 19.32 55.311 71.945 94.989 133.836 94.989z"
                        fill="url(#prefix__paint7_linear)"
                      />
                    </g>
                    <path
                      d="M279.178 606.319C122.958 594.088 0 463.42 0 304.028c0-89.195 38.504-169.396 99.795-224.88l31.977 23.972c-56.704 48.44-92.654 120.475-92.654 200.908 0 106.462 62.98 198.21 153.708 240.007 28.582 11.983 99.246 36.544 153.245 38.927 53.999 2.383-6.105 17.187-42.906 24.292-8.074 0-16.073-.316-23.987-.935z"
                      fill="url(#prefix__paint8_radial)"
                      opacity="0.4"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M6.053 364.625l1.15 3.701a219.417 219.417 0 01-4.916-46.311c0-120.685 97.815-218.52 218.476-218.52 77.978 0 146.415 40.861 185.075 102.343L354.08 81.558l-133.317-17.21L79.266 99.593C30.03 153.505 0 225.262 0 304.034c0 20.75 2.084 41.013 6.053 60.591z"
                      fill="url(#prefix__paint9_linear)"
                      fill-rule="evenodd"
                    />
                    <path
                      d="M69.71 110.569C125.317 43.512 209.255.804 303.165.804 470.598.804 606.33 136.563 606.33 304.03c0 1.037-.005 2.073-.016 3.108l.143 296.04a4.083 4.083 0 01-4.083 4.084c-1.665 0-3.156-1.015-3.824-2.541-14.609-33.344-47.899-56.638-86.628-56.638-17.246 0-33.333 4.549-47.252 12.617-46.801 29.576-102.052 46.556-161.505 46.556-21.053 0-41.605-2.147-61.449-6.233 117.032-26.035 204.532-130.49 204.532-255.387 0-144.492-117.11-261.626-261.573-261.626-41.248 0-80.267 9.55-114.966 26.559z"
                      fill="url(#prefix__paint10_linear)"
                    />
                    <path
                      d="M165.716 574.371c34.527 17.596 72.873 28.771 113.465 31.949 7.914.619 15.911.936 23.984.936a716.514 716.514 0 0012.38-2.507l-11.461-26.339c-19.288 10.234-41.29 16.03-64.645 16.03-26.714 0-51.657-7.583-72.794-20.716l-.929.647z"
                      fill="url(#prefix__paint11_linear)"
                    />
                    <path
                      d="M606.319 307.138c.01-1.035.015-2.071.015-3.108C606.334 136.563 470.603.804 303.17.804c-36.536 0-71.563 6.465-103.999 18.312a301.02 301.02 0 00-14.492 5.723c-44.901 19.088-84.253 48.696-114.965 85.73 41.577-27.938 159.399-74.187 298.07-35.676 100.028 28.161 173.354 120.084 173.354 229.137 0 .818-.005 1.636-.013 2.453l-.003.343.086 178.726.033 67.165a94.027 94.027 0 0117.444 7.723c17.121 9.765 30.896 24.727 39.177 42.738.234.511.466 1.028.692 1.543.669 1.526 2.159 2.541 3.824 2.541a4.084 4.084 0 004.084-4.084l-.143-296.04z"
                      fill="url(#prefix__paint12_radial)"
                      opacity="0.4"
                    />
                    <path
                      d="M303.165.804C470.598.804 606.33 136.563 606.33 304.03l-.016 3.108.124 256.852H580.36l-.124-256.977.015-2.983c0-153.061-124.055-277.142-277.086-277.142-19.312 0-38.162 1.975-56.359 5.734-15.087 3.479-30.674 8.265-46.176 13.854-51.876 18.702-102.81 46.387-130.92 64.093a305.024 305.024 0 0144.984-44.062C166.44 25.376 231.934.804 303.165.804z"
                      fill="url(#prefix__paint13_radial)"
                    />
                    <defs>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint0_linear"
                        x1="451.716"
                        x2="180.214"
                        y1="607.265"
                        y2="422.97"
                      >
                        <stop
                          stop-color="#069F5F"
                        />
                        <stop
                          offset="1"
                          stop-color="#007E49"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint1_linear"
                        x1="432.483"
                        x2="141.544"
                        y1="417.564"
                        y2="568.276"
                      >
                        <stop
                          stop-color="#005531"
                        />
                        <stop
                          offset="1"
                          stop-color="#005531"
                          stop-opacity="0"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint2_linear"
                        x1="451.716"
                        x2="180.214"
                        y1="607.265"
                        y2="422.97"
                      >
                        <stop
                          stop-color="#0FA968"
                        />
                        <stop
                          offset="1"
                          stop-color="#088E56"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint3_linear"
                        x1="416.613"
                        x2="196.496"
                        y1="538.55"
                        y2="491.032"
                      >
                        <stop
                          stop-color="#005531"
                        />
                        <stop
                          offset="1"
                          stop-color="#005531"
                          stop-opacity="0"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint4_linear"
                        x1="165.719"
                        x2="117.356"
                        y1="512.728"
                        y2="221.481"
                      >
                        <stop
                          stop-color="#0FA968"
                        />
                        <stop
                          offset="1"
                          stop-color="#0D995E"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint5_linear"
                        x1="165.719"
                        x2="117.356"
                        y1="512.728"
                        y2="221.481"
                      >
                        <stop
                          stop-color="#0FA968"
                        />
                        <stop
                          offset="1"
                          stop-color="#0D995E"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint6_linear"
                        x1="167.068"
                        x2="225.568"
                        y1="429.757"
                        y2="149.218"
                      >
                        <stop
                          stop-color="#008C51"
                          stop-opacity="0"
                        />
                        <stop
                          offset="1"
                          stop-color="#00643A"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint7_linear"
                        x1="167.068"
                        x2="225.568"
                        y1="429.757"
                        y2="149.218"
                      >
                        <stop
                          stop-color="#008C51"
                          stop-opacity="0"
                        />
                        <stop
                          offset="1"
                          stop-color="#00643A"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint9_linear"
                        x1="345.812"
                        x2="321.607"
                        y1="342.547"
                        y2="103.036"
                      >
                        <stop
                          stop-color="#13AC6C"
                        />
                        <stop
                          offset="1"
                          stop-color="#15BF78"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint10_linear"
                        x1="527.069"
                        x2="455.151"
                        y1="555.831"
                        y2="84.073"
                      >
                        <stop
                          stop-color="#24BA7B"
                        />
                        <stop
                          offset="1"
                          stop-color="#33D993"
                        />
                      </lineargradient>
                      <lineargradient
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint11_linear"
                        x1="527.069"
                        x2="455.151"
                        y1="555.831"
                        y2="84.073"
                      >
                        <stop
                          stop-color="#24BA7B"
                        />
                        <stop
                          offset="1"
                          stop-color="#33D993"
                        />
                      </lineargradient>
                      <radialgradient
                        cx="0"
                        cy="0"
                        gradientTransform="rotate(-56.565 420.963 331.916) scale(394.52 274.661)"
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint8_radial"
                        r="1"
                      >
                        <stop
                          stop-color="#8FFED0"
                        />
                        <stop
                          offset="1"
                          stop-color="#8FFED0"
                          stop-opacity="0"
                        />
                      </radialgradient>
                      <radialgradient
                        cx="0"
                        cy="0"
                        gradientTransform="matrix(190.47895 321.69136 -284.7436 168.60155 393.241 136.096)"
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint12_radial"
                        r="1"
                      >
                        <stop
                          stop-color="#91FFD1"
                        />
                        <stop
                          offset="1"
                          stop-color="#90FFD1"
                          stop-opacity="0"
                        />
                      </radialgradient>
                      <radialgradient
                        cx="0"
                        cy="0"
                        gradientTransform="matrix(150.35356 362.42726 -326.07896 135.2744 433.344 62.754)"
                        gradientUnits="userSpaceOnUse"
                        id="prefix__paint13_radial"
                        r="1"
                      >
                        <stop
                          stop-color="#A6FFD9"
                        />
                        <stop
                          offset="1"
                          stop-color="#A6FFD9"
                          stop-opacity="0"
                        />
                      </radialgradient>
                    </defs>
                  </svg>
                </a>
              </div>
            </div>
            <button
              aria-label="Toggle menu"
              class="c29 c30"
              type="button"
            >
              <div
                class="c31"
              >
                <svg
                  class="c15"
                  color="text"
                  fill="none"
                  viewBox="0 0 6 12"
                  width="6px"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M4.98462 10.2803L1.23462 6.53032C0.941725 6.23743 0.941725 5.76256 1.23462 5.46966L4.98462 1.71967"
                    fill="none"
                    stroke="#8990A5"
                    stroke-linecap="round"
                    stroke-width="1.5"
                  />
                </svg>
              </div>
            </button>
            <div
              class="c32"
            >
              <div
                class="c33"
                role="button"
              >
                <a
                  class="c34"
                  href="/"
                >
                  <svg
                    class="c35"
                    color="#8990A5"
                    height="21"
                    viewBox="0 0 19 21"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      clip-rule="evenodd"
                      d="M12.4485 18.9974C12.4485 19.4116 12.7843 19.7474 13.1985 19.7474H5.83008C6.24429 19.7474 6.58009 19.4116 6.58009 18.9974V12.7861H12.4485V18.9974Z"
                      fill="none"
                      fill-rule="evenodd"
                      opacity="0.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      clip-rule="evenodd"
                      d="M12.1111 2.44947C10.6601 1.05721 8.36931 1.05721 6.91834 2.44947L2.2919 6.88881C1.95133 7.2156 1.72225 7.64129 1.63712 8.10556C1.05259 11.2932 1.00944 14.5566 1.50949 17.7585L1.69025 18.916C1.765 19.3947 2.17729 19.7476 2.66177 19.7476H6.8305H12.1989H16.3676C16.8521 19.7476 17.2644 19.3947 17.3392 18.916L17.5199 17.7585C18.02 14.5566 17.9768 11.2932 17.3923 8.10556C17.3072 7.64129 17.0781 7.2156 16.7375 6.88881L12.1111 2.44947Z"
                      fill="none"
                      fill-rule="evenodd"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <div
                    class="c36 c37"
                  >
                    Home
                  </div>
                </a>
              </div>
              <div
                class="c38"
              >
                <div
                  class="c33"
                  role="button"
                >
                  <svg
                    class="c35"
                    color="#8990A5"
                    fill="none"
                    height="21"
                    viewBox="0 0 21 20"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.52398 9.9974L8.52398 12.8931L0.922851 7.25069L8.52398 1.60832L8.52398 4.50399L16.849 4.50398"
                      fill="none"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                    <path
                      d="M8.52416 9.99757L12.5057 9.99764L12.5057 7.10198L20.1068 12.7443L12.5057 18.3867L12.5057 15.4911L4.18066 15.4911"
                      fill="none"
                      opacity="0.5"
                      stroke="currentColor"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <div
                    class="c36"
                  >
                    Trade
                  </div>
                  <svg
                    class="c15"
                    color="text"
                    fill="none"
                    height="8"
                    viewBox="0 0 13 8"
                    width="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2218 1.35108L7.22183 6.35108C6.83131 6.7416 6.19814 6.7416 5.80762 6.35107L0.807617 1.35107"
                      fill="none"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                  </svg>
                </div>
                <div
                  class="c39"
                />
              </div>
              <div
                class="c33"
                role="button"
              >
                <a
                  class="c34"
                  href="/account"
                >
                  <svg
                    class="c35"
                    color="#8990A5"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                   <path d='M32,0c-1.021,0-2.025,0.076-3.015,0.21C27.953,0.072,26.972,0,26,0C18.638,0,11.999,3.571,7.34,9.264 C7.293,9.306,7.259,9.356,7.221,9.406c-1.485,1.839-2.761,3.898-3.793,6.126c-0.026,0.049-0.049,0.097-0.068,0.15 c-0.711,1.557-1.304,3.193-1.76,4.897c-0.045,0.096-0.065,0.201-0.078,0.31C0.861,23.465,0.5,26.185,0.5,29 c0,4.404,0.872,8.579,2.423,12.321c0.014,0.04,0.027,0.078,0.046,0.116c0.93,2.218,2.1,4.28,3.473,6.145 c0.035,0.048,0.064,0.099,0.107,0.14c1.39,1.865,2.983,3.526,4.74,4.942c0.05,0.055,0.11,0.096,0.172,0.139 C15.588,56.075,20.599,58,26,58c0.972,0,1.953-0.072,2.985-0.21C29.975,57.924,30.979,58,32,58c14.061,0,25.5-13.009,25.5-29 S46.061,0,32,0z M21.44,2.614c-0.331,0.172-0.658,0.352-0.981,0.539c-0.181,0.105-0.363,0.206-0.541,0.316 C19.641,3.639,19.37,3.819,19.1,4h-1.925c1.462-0.684,2.988-1.223,4.579-1.558C21.647,2.495,21.546,2.559,21.44,2.614z M11.36,46 H7.774c-0.882-1.246-1.665-2.585-2.345-4h3.788c0.157,0.354,0.318,0.705,0.487,1.051c0.073,0.149,0.149,0.296,0.225,0.444 c0.205,0.402,0.417,0.797,0.638,1.186c0.082,0.145,0.161,0.292,0.246,0.436C10.989,45.416,11.174,45.708,11.36,46z M4.968,17h3.827 c-0.175,0.437-0.341,0.879-0.498,1.327c-0.043,0.124-0.087,0.247-0.129,0.371C8.024,19.128,7.89,19.562,7.763,20H3.857 C4.175,18.969,4.547,17.969,4.968,17z M2.5,29c0-0.674,0.036-1.338,0.078-2h3.987c-0.001,0.016-0.001,0.032-0.002,0.048 C6.526,27.694,6.5,28.343,6.5,29c0,0.335,0.012,0.667,0.022,1H2.539C2.528,29.666,2.5,29.337,2.5,29z M6.636,32 c0.038,0.421,0.087,0.839,0.141,1.255c0.004,0.03,0.006,0.061,0.01,0.092C6.861,33.903,6.951,34.454,7.052,35H3.108 c-0.195-0.982-0.349-1.981-0.448-3H6.636z M7.256,22c-0.026,0.118-0.048,0.238-0.072,0.356c-0.027,0.132-0.055,0.263-0.081,0.395 c-0.122,0.627-0.23,1.26-0.315,1.902c-0.004,0.03-0.006,0.061-0.01,0.092C6.766,24.83,6.759,24.915,6.748,25H2.779 c0.132-1.018,0.299-2.022,0.528-3H7.256z M7.495,37c0.031,0.122,0.06,0.246,0.092,0.367c0.012,0.044,0.022,0.09,0.034,0.134 c0.165,0.609,0.35,1.208,0.548,1.8c0.042,0.125,0.086,0.247,0.129,0.371C8.335,39.782,8.372,39.892,8.411,40H4.558 c-0.379-0.971-0.705-1.973-0.983-3H7.495z M10.812,12.884c-0.084,0.143-0.164,0.291-0.246,0.436 c-0.221,0.389-0.434,0.785-0.638,1.186c-0.075,0.148-0.152,0.294-0.225,0.444C9.695,14.966,9.686,14.983,9.678,15H5.929 c0.757-1.427,1.629-2.762,2.596-4h3.503c-0.122,0.175-0.245,0.349-0.364,0.527C11.369,11.97,11.085,12.422,10.812,12.884z M13.732,6h2.762c-0.248,0.217-0.496,0.435-0.737,0.662c-0.201,0.19-0.396,0.387-0.592,0.584c-0.198,0.199-0.394,0.401-0.586,0.606 c-0.185,0.197-0.37,0.393-0.55,0.596C13.869,8.628,13.716,8.815,13.561,9h-3.302C11.333,7.883,12.492,6.876,13.732,6z M9.324,48 h3.432c0.113,0.148,0.225,0.296,0.341,0.441c0.302,0.38,0.613,0.75,0.932,1.111c0.179,0.203,0.365,0.399,0.55,0.596 c0.193,0.206,0.389,0.408,0.588,0.607c0.08,0.08,0.156,0.166,0.237,0.245h-3.008C11.297,50.101,10.27,49.097,9.324,48z M21.753,55.558c-2.293-0.483-4.46-1.369-6.47-2.558h2.419c0.128,0.099,0.26,0.192,0.389,0.288 c0.207,0.154,0.414,0.309,0.625,0.456c0.393,0.274,0.794,0.537,1.201,0.787c0.178,0.109,0.36,0.211,0.541,0.316 c0.323,0.187,0.65,0.367,0.981,0.539C21.546,55.441,21.647,55.505,21.753,55.558z M32,56c-0.795,0-1.58-0.047-2.354-0.136 l-0.387-0.054c-0.054-0.007-0.107-0.016-0.16-0.023c-0.346-0.049-0.689-0.106-1.029-0.172c-0.029-0.006-0.057-0.012-0.085-0.018 c-0.331-0.065-0.659-0.138-0.984-0.219c-0.049-0.012-0.098-0.026-0.147-0.039c-0.303-0.078-0.605-0.16-0.903-0.251 c-0.091-0.028-0.182-0.06-0.273-0.089c-0.255-0.081-0.509-0.164-0.76-0.255c-0.204-0.074-0.405-0.156-0.606-0.236 c-0.137-0.054-0.276-0.105-0.411-0.162c-5.377-2.275-9.836-6.748-12.549-12.466c-0.025-0.052-0.048-0.107-0.072-0.159 c-0.145-0.311-0.286-0.625-0.421-0.943c-0.054-0.127-0.104-0.256-0.156-0.384c-0.101-0.248-0.201-0.497-0.295-0.749 c-0.061-0.162-0.118-0.327-0.176-0.491c-0.079-0.222-0.157-0.445-0.23-0.67c-0.06-0.184-0.117-0.37-0.174-0.555 c-0.065-0.211-0.128-0.423-0.188-0.636C9.584,37.098,9.531,36.9,9.48,36.703c-0.054-0.209-0.106-0.42-0.156-0.631 c-0.048-0.202-0.094-0.404-0.138-0.608c-0.046-0.213-0.088-0.427-0.129-0.642c-0.039-0.205-0.078-0.41-0.114-0.617 c-0.038-0.221-0.071-0.443-0.104-0.666c-0.03-0.202-0.061-0.403-0.087-0.607c-0.031-0.24-0.055-0.483-0.08-0.725 c-0.02-0.189-0.042-0.377-0.058-0.567c-0.024-0.278-0.04-0.558-0.056-0.839c-0.009-0.158-0.022-0.314-0.029-0.472 C8.511,29.889,8.5,29.446,8.5,29s0.011-0.889,0.029-1.33c0.007-0.158,0.02-0.315,0.029-0.472c0.016-0.28,0.032-0.561,0.056-0.839 c0.016-0.19,0.038-0.378,0.058-0.567c0.025-0.242,0.05-0.484,0.08-0.725c0.026-0.203,0.057-0.405,0.087-0.607 c0.033-0.223,0.066-0.445,0.104-0.666c0.035-0.207,0.074-0.412,0.114-0.617c0.041-0.215,0.084-0.429,0.129-0.642 c0.044-0.204,0.09-0.406,0.138-0.608c0.05-0.211,0.102-0.422,0.156-0.631c0.051-0.198,0.104-0.395,0.159-0.591 c0.06-0.213,0.123-0.425,0.188-0.636c0.057-0.186,0.114-0.371,0.174-0.555c0.074-0.225,0.152-0.448,0.231-0.671 c0.058-0.164,0.115-0.328,0.176-0.49c0.095-0.252,0.194-0.501,0.295-0.749c0.052-0.128,0.102-0.257,0.156-0.384 c0.135-0.318,0.276-0.632,0.421-0.943c0.025-0.053,0.047-0.107,0.072-0.159c2.713-5.718,7.172-10.19,12.549-12.466 c0.136-0.057,0.274-0.108,0.411-0.162c0.201-0.08,0.402-0.162,0.606-0.236c0.251-0.091,0.505-0.173,0.76-0.255 c0.091-0.029,0.181-0.061,0.273-0.089c0.298-0.091,0.6-0.174,0.903-0.251C26.902,2.648,26.951,2.633,27,2.621 c0.325-0.081,0.653-0.153,0.984-0.219c0.029-0.006,0.057-0.012,0.085-0.018c0.34-0.066,0.683-0.123,1.029-0.172 c0.053-0.008,0.107-0.016,0.16-0.023l0.387-0.054C30.42,2.047,31.205,2,32,2c12.958,0,23.5,12.112,23.5,27S44.958,56,32,56z' />{' '}
      <path d='M32,4C20.145,4,10.5,15.215,10.5,29c0,8.618,3.77,16.232,9.493,20.729l0.413-0.758c0.597-1.094,1.453-2.028,2.475-2.701 l6.21-3.753c0.1-0.06,0.169-0.19,0.169-0.316v-1.218c-2.642-1.305-4.486-3.725-5.49-7.207c-1.52-0.727-2.54-2.315-2.54-4.041v-1.73 c0-1.457,0.703-2.767,1.867-3.541c0.208-1.645,0.594-3.159,1.149-4.508c0.236-0.573,0.436-0.998,0.599-1.343 c0.496-1.053,0.525-1.116,0.17-3.027c-0.132-0.71-0.238-1.433-0.315-2.147c-0.042-0.382,0.072-0.744,0.318-1.019 c0.536-0.597,1.609-0.502,2.081,0.198c0.369,0.547,0.918,1.135,1.633,1.746c1.828,1.566,3.814,1.965,5.159,2.023 c0.287,0.012,0.579,0.038,0.875,0.077c5.95,0.785,9.175,3.845,9.848,9.35c0.834,0.767,1.337,1.926,1.337,3.135v1.438 c0,1.461-0.718,2.768-1.833,3.422c-0.769,3.041-2.246,5.273-4.399,6.649v1.182c0,0.073,0.022,0.115,0.03,0.125l4.691,2.415 c0.909,0.458,1.647,1.247,2.125,2.279l0.278,0.601C50.94,42.506,53.5,36.096,53.5,29C53.5,15.215,43.855,4,32,4z' />
    
                  </svg>
                  <div
                    class="c36 c37"
                  >
                    Private Round NFTs
                  </div>
                </a>
              </div>
              <div
                class="c38"
              >
                <div
                  class="c33"
                  role="button"
                >
                  <svg
                    class="c40"
                    color="text"
                    fill="none"
                    height="24"
                    viewBox="0 0 24 24"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 3V18C3 19.6569 4.34315 21 6 21H21"
                      fill="none"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                    <path
                      d="M6.24365 21L6.24365 10.25C6.24365 9.55964 6.8033 9 7.49365 9V9C8.18401 9 8.74365 9.55964 8.74365 10.25L8.74365 21"
                      fill="none"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                    <path
                      d="M11.7437 21L11.7437 13.25C11.7437 12.5596 12.3033 12 12.9937 12V12C13.684 12 14.2437 12.5596 14.2437 13.25L14.2437 21"
                      fill="none"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                    <path
                      d="M17.2437 21L17.2437 15.25C17.2437 14.5596 17.8033 14 18.4937 14V14C19.184 14 19.7437 14.5596 19.7437 15.25L19.7437 21"
                      fill="none"
                      opacity="0.5"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                  </svg>
                  <div
                    class="c36"
                  >
                    Analytics
                  </div>
                  <svg
                    class="c15"
                    color="text"
                    fill="none"
                    height="8"
                    viewBox="0 0 13 8"
                    width="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2218 1.35108L7.22183 6.35108C6.83131 6.7416 6.19814 6.7416 5.80762 6.35107L0.807617 1.35107"
                      fill="none"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                  </svg>
                </div>
                <div
                  class="c39"
                />
              </div>
              <div
                class="c38"
              >
                <div
                  class="c33"
                  role="button"
                >
                  <svg
                    class="c40"
                    color="text"
                    height="6"
                    viewBox="0 0 20 6"
                    width="24px"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      fill="none"
                      height="3.5"
                      rx="1.25"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      width="3.5"
                      x="0.764648"
                      y="1.24756"
                    />
                    <rect
                      fill="none"
                      height="3.5"
                      rx="1.25"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      width="3.5"
                      x="7.76465"
                      y="1.24756"
                    />
                    <rect
                      fill="none"
                      height="3.5"
                      opacity="0.5"
                      rx="1.25"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      width="3.5"
                      x="14.7646"
                      y="1.24756"
                    />
                  </svg>
                  <div
                    class="c36"
                  >
                    More
                  </div>
                  <svg
                    class="c15"
                    color="text"
                    fill="none"
                    height="8"
                    viewBox="0 0 13 8"
                    width="13"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12.2218 1.35108L7.22183 6.35108C6.83131 6.7416 6.19814 6.7416 5.80762 6.35107L0.807617 1.35107"
                      fill="none"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                    />
                  </svg>
                </div>
                <div
                  class="c39"
                />
              </div>
              <div
                class="c33"
                role="button"
              >
                <a
                  class="c41"
                  href="https://yetichain.art"
                >
                  <svg
                    class="c15"
                    color="text"
                    fill="none"
                    height="25"
                    style="fill: transparent; margin-right: 8px;"
                    viewBox="0 0 24 25"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <rect
                      height="18.5"
                      rx="3.25"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      width="22.5"
                      x="0.75"
                      y="3.74756"
                    />
                    <path
                      d="M12.2251 21.9975L7.03396 15.0759L2.27539 21.4207"
                      stroke="#8990A5"
                      stroke-linecap="square"
                      stroke-width="1.5"
                    />
                    <path
                      d="M22.3032 20.6917L15.2931 11.345L10.4668 17.7801"
                      stroke="#8990A5"
                      stroke-linecap="square"
                      stroke-width="1.5"
                    />
                    <rect
                      height="4.5"
                      rx="2.25"
                      stroke="#8990A5"
                      stroke-linecap="round"
                      stroke-width="1.5"
                      width="4.5"
                      x="4.75"
                      y="6.74756"
                    />
                  </svg>
                  <div
                    class="c36 c37"
                  >
                    YETI NFT
                  </div>
                  <span
                    class="c42"
                  >
                    New
                  </span>
                </a>
              </div>
            </div>
          </div>
          <div
            class="c43"
          >
            <a
              class="c44"
              href="https://github.com/yetichain"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://t.me/yetichain_ann"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://twitter.com/yetichain"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://medium.com/@yetichain"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://www.coingecko.com/en/coins/yeti-chain"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://bscscan.com/address/0xC631d214F68e5FD97Fe610736c6692C5533a2F20"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://www.dextools.io/app/pancakeswap/pair-explorer/0x4d50b71370a3253ebf99a35b13dcbc650429d870"
              rel="noopener noreferrer"
              target="_blank"
            />
            <a
              class="c44"
              href="https://coinmarketcap.com/currencies/yeti-chain/"
              rel="noopener noreferrer"
              target="_blank"
            />
          </div>
        </div>
        <div
          class="c45"
        >
          body
        </div>
        <div
          class="c46 c47"
          role="presentation"
        />
      </div>
    </DocumentFragment>
  `)
})
