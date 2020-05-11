/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  memo,
  Fragment,
  useRef,
  useEffect,
  useState,
  useContext,
  useCallback,
  useMemo,
} from 'react'
import Box from '@material-ui/core/Box'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Divider from '@material-ui/core/Divider'
import Typography from '@material-ui/core/Typography'
import CircularProgress from '@material-ui/core/CircularProgress'
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople'
import useTheme from '@material-ui/core/styles/useTheme'
import InfiniteScroll from 'react-infinite-scroll-component'
import Color from 'color'
import uniq from 'lodash/uniq'

import DataStoreContext from '../../contexts/data-store'

import AppListItem from './AppListItem'

import * as styles from './AppList.style'


// const Fade = Fragment 

const AppList = memo(() => {
  const theme = useTheme()
  const isMatchedUpMD = useMediaQuery(theme.breakpoints.up('md'));
  const {
    appListing,
    updateAppListing,
    isFetchingAppListing,
    searchText,

    appListingFiltered,

    appDetails,
  } = useContext(DataStoreContext)

  const itemPerPage = isMatchedUpMD ? 20 : 10
  const itemPerPageRef = useRef(itemPerPage)
  itemPerPageRef.current = itemPerPage
  const [ displayLimit, setDisplayLimit ] = useState(itemPerPage)
  const displayLimitRef = useRef(displayLimit)
  const [ displayMax ] = useState(100)

  const [ isInfiniteScrollNotTriggered, setIsInfiniteScrollNotTriggered ] = useState(false)

  const isInfiniteScrollNotTriggeredRef = useRef(isInfiniteScrollNotTriggered)
  isInfiniteScrollNotTriggeredRef.current = isInfiniteScrollNotTriggered


  useEffect(() => {
    (async () => {
      await updateAppListing({ limit: displayLimit })
      // RESET TRIGGER, AND SIDE EFFECT NEXT DETECTION
      if (isInfiniteScrollNotTriggeredRef.current) {
        setIsInfiniteScrollNotTriggered(false)
      }
    })()
  }, [ displayLimit, updateAppListing ])

  const isFetchToEnd = displayLimit >= displayMax

  const isEmptySearchResult = appListingFiltered.length === 0 && appListing.length > 0

  const wrapGridRef = useRef()
  const gridRef = useRef()

  const wrapGridElement = wrapGridRef.current
  const gridElement = gridRef.current

  const setDisplayLimitAndRef = useCallback(limit => {
    const limitCapped = limit > displayMax ? displayMax : limit
    setDisplayLimit(limitCapped)
    displayLimitRef.current = limitCapped
  }, [ displayMax ])

  // COMPARE ELEMENT HEIGHT ON EVERY UPDATE TO DETERMINE TO TRIGGER FUTHER LAZY LOAD
  useEffect(() => {
    if (!isMatchedUpMD) { return }
    if (searchText) { return } // DISABLE TRIGGER FURTHER LAZY LOAD IF IN SEARCH TEXT MODE
    if (isFetchToEnd) { return }
    if (isInfiniteScrollNotTriggered) { return }
    if (!gridElement || !wrapGridElement) { return }

    const gridRect = gridElement.getBoundingClientRect()
    const wrapGridRect = wrapGridElement.getBoundingClientRect()

    // console.log(`wrapGridRect.height(${wrapGridRect.height}) > gridRect.height(${gridRect.height})`)

    if ([
      wrapGridRect.height > gridRect.height,
      wrapGridRect.height > 0,
      gridRect.height > 0,
    ].every(cond => cond)) {
      setIsInfiniteScrollNotTriggered(true)
    }
  }, [
    gridElement, wrapGridElement,
    isInfiniteScrollNotTriggered,
    isFetchToEnd,
    searchText,
    isMatchedUpMD,
  ])

  // FETCH MORE APPS WHEN DETECT LAZY LOAD NOT TRIGGERED ON LARGE SCREEN DEVICE
  useEffect(() => {
    if (!isInfiniteScrollNotTriggered) { return }

    setDisplayLimitAndRef(displayLimitRef.current + itemPerPageRef.current)
  }, [ isInfiniteScrollNotTriggered, setDisplayLimitAndRef ])

  const appListItems = useMemo(() => {
    return appListingFiltered.map((_appFeed, _appIdx) => {
      const appDetail = appDetails.get(_appFeed.id)
      const genres = uniq(_appFeed.genres.map(({ name }) => name))

      return (
        <Fragment key={_appFeed.id}>
          <Box>
            <Divider/>
            <AppListItem
              id={_appFeed.id}
              key={_appFeed.id}
              count={_appIdx + 1}
              name={_appFeed.name}
              cover={_appFeed.artworkUrl100}
              genres={genres}
              author={appDetail && appDetail.artistName}
              screenshots={appDetail && ([
                ...appDetail.screenshotUrls,
                ...appDetail.ipadScreenshotUrls,
                ...appDetail.appletvScreenshotUrls,
              ])}
              rating={appDetail && appDetail.averageUserRating}
              ratingCount={appDetail && appDetail.userRatingCount}
              price={appDetail && appDetail.formattedPrice}
              description={appDetail && appDetail.description}
            />
          </Box>
        </Fragment>
      )
    })
  }, [ appListingFiltered, appDetails ])

  return (
    <Box
      css={styles.root}
      ref={wrapGridRef}
    >
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
        <Box
          css={styles.infiniteScroll.wrap}
          id='wrap-grid-box'
        >
        <InfiniteScroll
          dataLength={appListingFiltered.length}
          loader={null}
          next={() => {
            setDisplayLimitAndRef(displayLimit + itemPerPage)
          }}
          hasMore={!isFetchingAppListing && !isFetchToEnd}
          // hasMore={!isFetchToEnd}
          // style={{ display: 'grid' }} // MAKE THE CHILD HAS THE SAME HEIGHT AS InfiniteScroll
        >
          <Box
            id='grid-box'
            ref={gridRef}
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
            {appListItems}
            <Box css={css`
              ${styles.list.bottom}
              ${theme.breakpoints.up('md')} {
                ${styles.list.bottomScreenUpMD}
              }
              ${theme.breakpoints.up('lg')} {
                ${styles.list.bottomScreenUpLG}
              }
            `}>
              {isFetchingAppListing && (
                <Box
                  textAlign='center'
                  py={2}
                  px={3}
                >
                  <CircularProgress
                    size={30}
                    color='primary'
                  />
                </Box>
              )}
              {[
                isFetchToEnd,
                appListingFiltered.length >= displayMax,
                !isFetchingAppListing,
              ].every(cond => cond) && (
                <Box
                  py={2}
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

          </Box>
        </InfiniteScroll>
        </Box>
      )}
    </Box>
  )
})
AppList.displayName = 'AppList'

export default AppList
