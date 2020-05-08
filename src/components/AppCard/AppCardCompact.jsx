/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { memo, Fragment } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import ButtonBase from '@material-ui/core/ButtonBase'
import Typography from '@material-ui/core/Typography'
import useTheme from '@material-ui/core/styles/useTheme'

import * as styles from './AppCardCompact.style'

const AppCardCompact = memo(props => {
  const theme = useTheme()
  const {
    cover,
    name,
    // author,
    genres,
    onClick,
  } = props

  return (
    <ButtonBase
      onClick={onClick}
      disabled={!onClick}
    >
      <Box css={css`
        ${styles.root}
        ${theme.breakpoints.up('md')} {
          ${styles.rootScreenUpMD}
        }
      `}>
        <Box css={styles.image.wrap}>
          <img
            css={styles.image.image}
            src={cover}
            alt={name}
          />
        </Box>
        <Box mt={0.5}>
          <Typography variant='body2'>{name}</Typography>
          <Box>
            {(genres || [])
              // FILTER OUT HIGHLY COMMON GENRES TO DISPLAY
              .filter(genre => !['遊戲', '娛樂'].includes(genre))
              .map((genre, idx) => (
                <Fragment key={genre}>
                  {idx > 0 && <Typography variant='caption' display='inline'>, </Typography>}
                  <Typography
                    color='textSecondary'
                    variant='caption'
                    display='inline'
                  >
                    {genre}
                  </Typography>
                </Fragment>
              ))}
          </Box>
        </Box>
      </Box>
    </ButtonBase>
  )
})
AppCardCompact.propTypes = {
  cover: PropTypes.string,
  name: PropTypes.string,
  // author: PropTypes.string,
  genres: PropTypes.array,
  onClick: PropTypes.func,
}
AppCardCompact.displayName = 'AppCardCompact'

export default AppCardCompact
