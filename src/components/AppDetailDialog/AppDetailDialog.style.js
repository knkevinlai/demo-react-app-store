import { css } from '@emotion/core'
export const upperSection = {
  wrap: css`

  `,
  wrapScreenUpMD: css`
    display: flex;
    justify-content: space-around;
  `,
}

export const cover = {
  wrap: css`
    border-radius: 25%;
    overflow: hidden;
    width: 120px;
    height: 120px;
    display: flex;
    justify-content: center;
  `,
  image: css`
    display: block;
    object-fit: cover;
    width: 100%;
    height: 100%;
  `,
}

export const screenshots = {
  scroller: css`
    overflow-x: auto;
    display: flex;
  `,
  container: css`
    display: flex;
  `,
  image: css`
    height: 175px;
    width: auto;
  `,
}
