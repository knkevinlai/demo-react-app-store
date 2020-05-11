/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { Fragment, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import Box from '@material-ui/core/Box'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import Zoom from 'react-medium-image-zoom'
import DialogTitle from '@material-ui/core/DialogTitle'
import useTheme from '@material-ui/core/styles/useTheme'

import CustomRating from '../CustomRating/CustomRating'

import * as styles from './AppDetailDialog.style'
import { Typography } from '@material-ui/core'

const AppDetailDialog = props => {
  const theme = useTheme()
  const {
    trigger,
    title,
    cover,
    screenshots,
    author,
    rating,
    ratingCount,
    price,
    description,
    genres,
  } = props

  const [ isDialogOpen, setIsDialogOpen ] = useState(false)

  const handleOpen = useCallback(() => setIsDialogOpen(true), [])
  const handleClose = useCallback(() => setIsDialogOpen(false), [])
  return (
    <Fragment>
      {trigger && trigger({
        handleOpen,
        handleClose,
      })}
      {!trigger && (
        <Button
          onClick={() => setIsDialogOpen(true)}
        >OPEN</Button>
      )}
      <Dialog
        // fullScreen
        fullWidth
        open={isDialogOpen}
        onClose={handleClose}
        scroll='paper'

      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent dividers>
          <Box>
            <Box css={css`
              ${styles.upperSection.wrap}
              ${theme.breakpoints.up('md')} {
                ${styles.upperSection.wrapScreenUpMD}
              }
            `}>
              <Box
                mb={2}
                display='flex'
                justifyContent='center'
              >
                <Box css={styles.cover.wrap}>
                  <img
                    css={styles.cover.image}
                    src={cover}
                    alt={title}
                  />
                </Box>
              </Box>
              <Box my={2}>
                {author && (
                  <Typography>{author}</Typography>
                )}
                {rating && (
                  <Box
                    display='flex'
                    alignItems='center'
                  >
                    <Typography
                      variant='caption'
                      style={{ lineHeight: 1 }} // VERTICALLY ALIGNED MIDDLE
                    >{rating.toFixed(1)}</Typography>
                    <CustomRating value={rating} />
                    {ratingCount != null && (
                      <Typography
                        variant='caption'
                        style={{ marginLeft: theme.spacing(0.5) }}
                      >({ratingCount})</Typography>
                    )}
                  </Box>
                )}
                {price && (
                  <Typography>{price}</Typography>
                )}
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
              </Box>
            </Box>


            {screenshots && (
              <Box my={2}>
                <Box css={styles.screenshots.scroller}>
                  <Box css={styles.screenshots.container}>
                    {screenshots.map((screenshot, idx) => (
                      <Box m={1} key={screenshot}>
                        <Zoom key={screenshot}>
                          <img
                            src={screenshot}
                            alt={`截圖${idx + 1}`}
                            css={styles.screenshots.image}
                          />
                        </Zoom>
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            )}
            {description && (
              <Box my={2}>
                {description.split('\n').map((paragraph, idx) => (
                  <Typography gutterBottom key={idx}>{paragraph}</Typography>
                ))}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>關閉</Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  )
}
AppDetailDialog.propTypes = {
  trigger: PropTypes.func,
  title: PropTypes.string,
  cover: PropTypes.string,
  screenshots: PropTypes.array,
  author: PropTypes.string,
  price: PropTypes.string,
  description: PropTypes.string,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  genres: PropTypes.array,
}
AppDetailDialog.displayName = 'AppDetailDialog'

export default AppDetailDialog
