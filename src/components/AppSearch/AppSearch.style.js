import { css } from '@emotion/core'


export const paper = css`
  display: flex;
  align-items: center;
`

export const textField = {
  wrap: css`
    display: flex;
    justify-content: center;

    flex-grow: 1;
  `,
  root: css`
    max-width: 500px;
  `,
}