import { css } from '@emotion/core'

export const buttonBase = css`
  display: block;
  width: 100%;
`

export const root = css`
  display: flex;
  align-items: center;
`

export const image = {
  wrap: css`
    border-radius: 25%;
    overflow: hidden;
    flex-shrink: 0;
  `,
  wrapCircle: css`
    border-radius: 50%;
  `,
  image: css`
    object-fit: cover;
    width: 80px;
    height: auto;
    display: block;
  `,
}


export const info = {
  wrap: css`
    flex-grow: 1;
  `,
}

export const rating = {
  wrap: css`
    min-height: 19px;
  `,
}