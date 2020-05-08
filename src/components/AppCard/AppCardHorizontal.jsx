/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { memo, Fragment } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Fade from '@material-ui/core/Fade';
import Rating from '@material-ui/lab/Rating'
import useTheme from '@material-ui/core/styles/useTheme'

import * as styles from './AppCardHorizontal.style'

const AppCardHorizontal = memo(props => {
  const theme = useTheme()
  const {
    cover,
    coverVariant,
    name,
    genres,
    rating,
    ratingCount,
  } = props

  return (
    <Box css={styles.root}>
      <Box css={css`
          ${styles.image.wrap}
          ${coverVariant === 'circle' ? styles.image.wrapCircle : ''}
        `}>
        <img
          css={styles.image.image}
          src={cover}
          alt={name}
        />
      </Box>
      <Box
        ml={1}
        py={1}
        px={1.5}
        css={styles.info.wrap}
      >
        <Typography>{name}</Typography>
        {(genres || []).map((genre, idx) => (
          <Fragment key={genre}>
            {idx > 0 && <Typography variant='caption' display='inline'>, </Typography>}
            <Typography
              display='inline'
              variant='caption'
              color='textSecondary'
            >
              {genre}
            </Typography>
          </Fragment>
        ))}
        <Box css={styles.rating.wrap}>
          {rating != null && (
            <Fade in>
              <Box
                display='flex'
                alignItems='center'
              >
                <Rating
                  value={rating}
                  name={`rating-for-${name}`}
                  size='small'
                />
                {ratingCount != null && (
                  <Typography
                    variant='caption'
                    style={{ marginLeft: theme.spacing(0.5) }}
                  >({ratingCount})</Typography>
                )}
              </Box>
            </Fade>
          )}
        </Box>
      </Box>
    </Box>
  )
})
AppCardHorizontal.propTypes = {
  cover: PropTypes.string,
  coverVariant: PropTypes.string,
  name: PropTypes.string,
  genres: PropTypes.array,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
}
AppCardHorizontal.displayName = 'AppCardHorizontal'

export default AppCardHorizontal
