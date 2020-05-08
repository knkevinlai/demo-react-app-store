import { css } from '@emotion/core'

export const root = css``

export const list = {
  wrap: css``,
  wrapScreenUpMD: css`
    display: grid;
    grid-template-columns: 1fr 1fr;
  `,
  wrapScreenUpLG: css`
    grid-template-columns: 1fr 1fr 1fr;
  `,
}

export const card = {
  wrap: css`
    display: flex;
    align-items: center;
  `,
  count: css`
    width: 2.4em;
    flex-shrink: 0;
    text-align: center;
  `,
  container: css`
    flex: grow: 1;
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