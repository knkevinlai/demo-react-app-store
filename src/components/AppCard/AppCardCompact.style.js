import { css } from '@emotion/core'

export const root = css`
  width: 90px;
`

export const rootScreenUpMD = css`
  width: 120px;
`

export const image = {
  wrap: css`
    border-radius: 25%;
    overflow: hidden;
  `,
  image: css`
    display: block;
    object-fit: cover;
    // max-width: 90px;
    width: 100%;
    height: auto;
  `,
}
