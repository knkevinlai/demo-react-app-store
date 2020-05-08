import { css } from '@emotion/core'

export const root = css`
  display: grid;
  min-height: 100vh;
  grid-template-rows: auto auto 1fr;
  grid-template-columns: minmax(0, auto);
`

export const search = {
  wrap: css`
    position: -webkit-sticky; /* Safari */
    position: sticky;
    top: 0;
    z-index: 10;
  `,
}
