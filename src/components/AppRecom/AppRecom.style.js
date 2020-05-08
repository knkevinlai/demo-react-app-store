import { css } from '@emotion/core'

export const root = css``

export const scroller = css`
  overflow-x: auto;
  display: flex;
  min-height: 175px;
`

export const container = css`
  display: flex;
`

export const card = {
  wrap: css``,
}

export const loading = {
  wrap: css`
    flex-grow: 1;
  `,
}

export const emptyResult = {
  wrap: css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 175px;
    flex-direction: column;
  `,
}