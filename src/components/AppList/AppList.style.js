import { css } from '@emotion/core'

export const root = css`
  min-height: 100%;
`

export const infiniteScroll = {
  wrap: css``,
}

export const list = {
  wrap: css``,
  wrapScreenUpMD: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `,
  wrapScreenUpLG: css`
    grid-template-columns: 1fr 1fr 1fr;
  `,
  bottom: css`
    display: grid;
  `,
  bottomScreenUpMD: css`
    grid-column-start: 1;
    grid-column-end: span 2;
  `,
  bottomScreenUpLG: css`
    grid-column-start: 1;
    grid-column-end: span 3;
  `,
  /*
  */
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