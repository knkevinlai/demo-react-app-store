/** @jsx jsx */
// import { jsx, css } from '@emotion/core'
import { jsx } from '@emotion/core'
import PropTypes from 'prop-types'
import { memo } from 'react'
import Box from '@material-ui/core/Box'
import Typography from '@material-ui/core/Typography'
import Fade from 'react-reveal/Fade'

import * as styles from './AppListItem.style'

import AppDetailDialog from '../AppDetailDialog/AppDetailDialog'
import { AppCardHorizontalViewPort } from '../AppCard/AppCardHorizontal'

const AppListItem = memo(props => {
  const {
    count,
    name,
    cover,
    author,
    genres,
    screenshots,
    rating,
    ratingCount,
    price,
    description,
  } = props

  return (
    <Fade>
      <Box
        mx={1}
        my={1}
        css={styles.card.wrap}
      >
        <Box css={styles.card.count}>
          <Typography color='textSecondary'>
            {count}
          </Typography>
        </Box>
        <Box css={styles.card.container}>
          <AppDetailDialog
            title={name}
            cover={cover}
            genres={genres}
            screenshots={screenshots || []}

            rating={rating}
            ratingCoun={ratingCount}
            price={price}
            description={description}
            trigger={({ handleOpen }) => (
              <AppCardHorizontalViewPort
                onClick={handleOpen}
                {...(count - 1) % 2 !== 0
                  ? {
                    coverVariant: 'circle',
                  } : {}}
                cover={cover}
                name={name}
                author={author}
                genres={genres}
                rating={rating}
                ratingCount={ratingCount}
              />
            )}
          />

        </Box>
      </Box>
    </Fade>
  )
})
AppListItem.displayName = 'AppListItem'
AppListItem.propTypes = {
  id: PropTypes.any,
  count: PropTypes.number,
  name: PropTypes.string,
  author: PropTypes.string,
  cover: PropTypes.string,
  genres: PropTypes.array,
  screenshots: PropTypes.array,
  rating: PropTypes.number,
  ratingCount: PropTypes.number,
  price: PropTypes.string,
  description: PropTypes.string,
}

export default AppListItem
