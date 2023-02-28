import { getMainDomain } from 'alium-uikit/src/util/getMainDomain'
import { Link, LinkExternal } from '../../components/Link'
import { renderWithTheme } from '../../testHelpers'

it('renders link correctly', () => {
  const href = `https://${getMainDomain}`
  const { asFragment } = renderWithTheme(<Link href={href}>Link</Link>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      color: #6C5DD3;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
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
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
    }

    .c1:hover {
      color: #6c5dd3;
    }

    .c1 svg > * {
      -webkit-transition: stroke 200ms ease-in-out;
      transition: stroke 200ms ease-in-out;
    }

    .c1:hover > svg:last-child > * {
      stroke: #6c5dd3;
    }

    <a
        class="c0 c1"
        color="primary"
        href="https://() => {
      const host = process.browser && typeof window !== 'undefined' ? window.location.host : 'alium.finance';
      const arr = host.split('.');
      return arr.length === 1 ? arr[0] : \`\${arr[arr.length - 2]}.\${arr[arr.length - 1]}\`;
    }"
      >
        Link
      </a>
    </DocumentFragment>
  `)
})

it('renders link external link correctly', () => {
  const href = `https://${getMainDomain}`
  const { asFragment } = renderWithTheme(<LinkExternal href={href}>Link</LinkExternal>)
  expect(asFragment()).toMatchInlineSnapshot(`
    <DocumentFragment>
      .c0 {
      color: #6C5DD3;
      font-size: 16px;
      font-weight: 400;
      line-height: 1.5;
      -webkit-letter-spacing: 0.3px;
      -moz-letter-spacing: 0.3px;
      -ms-letter-spacing: 0.3px;
      letter-spacing: 0.3px;
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
      width: -webkit-fit-content;
      width: -moz-fit-content;
      width: fit-content;
      -webkit-transition: color 200ms ease-in-out;
      transition: color 200ms ease-in-out;
    }

    .c1:hover {
      color: #6c5dd3;
    }

    .c1 svg > * {
      -webkit-transition: stroke 200ms ease-in-out;
      transition: stroke 200ms ease-in-out;
    }

    .c1:hover > svg:last-child > * {
      stroke: #6c5dd3;
    }

    .c2 {
      fill: #6C5DD3;
      -webkit-flex-shrink: 0;
      -ms-flex-negative: 0;
      flex-shrink: 0;
      margin-left: 8px;
      padding-bottom: 2px;
    }

    <a
        class="c0 c1"
        color="primary"
        href="https://() => {
      const host = process.browser && typeof window !== 'undefined' ? window.location.host : 'alium.finance';
      const arr = host.split('.');
      return arr.length === 1 ? arr[0] : \`\${arr[arr.length - 2]}.\${arr[arr.length - 1]}\`;
    }"
        rel="noreferrer noopener"
        target="_blank"
      >
        Link
        <svg
          class="c2"
          color="primary"
          fill="none"
          viewBox="0 0 24 24"
          width="20px"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18 13V19C18 19.5304 17.7893 20.0391 17.4142 20.4142C17.0391 20.7893 16.5304 21 16 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V8C3 7.46957 3.21071 6.96086 3.58579 6.58579C3.96086 6.21071 4.46957 6 5 6H11"
            fill="none"
            stroke="#8990A5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M15 3H21V9"
            fill="none"
            opacity="0.5"
            stroke="#8990A5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
          <path
            d="M10 14L21 3"
            fill="none"
            opacity="0.5"
            stroke="#8990A5"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="1.5"
          />
        </svg>
      </a>
    </DocumentFragment>
  `)
})
