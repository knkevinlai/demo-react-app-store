/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  Fragment,
  useEffect,
  useState,
  useContext,
} from 'react'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import useTheme from '@material-ui/core/styles/useTheme'
import InfiniteScroll from 'react-infinite-scroll-component'
import Color from 'color'
import Fade from 'react-reveal/Fade'

import DataStoreContext from '../../contexts/data-store'

import AppCardHorizontal from '../AppCard/AppCardHorizontal'

import * as styles from './AppList.style'

const AppList = () => {
  const theme = useTheme()
  const {
    appListing,
    updateAppListing,
    isFetchingAppListing,

    appListingFiltered,

    appDetails,
  } = useContext(DataStoreContext)

  const itemPerPage = 10
  const [ displayLimit, setDisplayLimit ] = useState(itemPerPage)
  const [ displayMax ] = useState(itemPerPage * 10)

  useEffect(() => {
    updateAppListing({ limit: displayLimit })
  }, [ displayLimit, updateAppListing ])

  const isFetchToEnd = displayLimit >= displayMax

  const isEmptySearchResult = appListingFiltered.length === 0 && appListing.length > 0

  return (
    <Box css={styles.root}>
      {isEmptySearchResult && (
        <Box
          css={styles.emptyResult.wrap}
        >
          <Box
            // m={1}
            style={{
              color: Color(theme.palette.text.primary).alpha(0.1).toString(),
              fontSize: '6rem',
              lineHeight: 0,
            }}
          >
            <EmojiPeopleIcon fontSize='inherit' />
          </Box>
          <Typography>未有符合的搜尋結果</Typography>
        </Box>
      )}
      {!isEmptySearchResult && appListingFiltered && (
        <InfiniteScroll
          dataLength={appListingFiltered.length}
          loader={null}
          next={() => {
            setDisplayLimit(displayLimit + itemPerPage)
          }}
          hasMore={!isFetchingAppListing && !isFetchToEnd}
        >
          <Box  
            css={css`
              ${styles.list.wrap}
              ${theme.breakpoints.up('md')} {
                ${styles.list.wrapScreenUpMD}
              }
              ${theme.breakpoints.up('lg')} {
                ${styles.list.wrapScreenUpLG}
              }
            `}
          >
            {appListingFiltered.map((_appFeed, _appIdx) => {
              const appDetail = appDetails.get(_appFeed.id)
              return (
                <Fragment key={_appFeed.id}>
                  <Box>
                    <Divider/>
                    <Fade>
                      <Box
                        mx={1}
                        my={1}
                        css={styles.card.wrap}
                      >
                        <Box css={styles.card.count}>
                          <Typography color='textSecondary'>
                            {_appIdx + 1}
                          </Typography>
                        </Box>
                        <Box css={styles.card.container}>
                          <AppCardHorizontal
                            {..._appIdx % 2 !== 0
                              ? {
                                coverVariant: 'circle',
                              } : {}}
                            cover={_appFeed.artworkUrl100}
                            name={_appFeed.name}
                            author={_appFeed.artistName}
                            genres={_appFeed.genres.map(({ name }) => name)}
                            {...appDetail
                              ? {
                                rating: appDetail.averageUserRating,
                                ratingCount: appDetail.userRatingCount,
                              } : {}}
                          />
                        </Box>
                      </Box>
                    </Fade>
                  </Box>
                </Fragment>
              )
            })}
          </Box>
        </InfiniteScroll>
      )}
      {isFetchingAppListing && (
        <Box display='flex' justifyContent='center' p={3}>
          <CircularProgress/>
        </Box>
      )}
      {isFetchToEnd && !isFetchingAppListing && (
        <Box
          py={2} px={3}
          textAlign='center'
          color='text.disabled'
        >
          <Divider/>
          <Typography
            color='inherit'
            variant='caption'
          >
            已顯示所有資料
          </Typography>
        </Box>
      )}
    </Box>
  )
}
AppList.displayName = 'AppList'

export default AppList
