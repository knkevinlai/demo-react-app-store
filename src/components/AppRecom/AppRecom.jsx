/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  useEffect,
  useContext,
} from 'react'
import Box from '@material-ui/core/Box'
import LinearProgress from '@material-ui/core/LinearProgress'
import Skeleton from '@material-ui/lab/Skeleton'
import Typography from '@material-ui/core/Typography'
import MoodBadIcon from '@material-ui/icons/MoodBad'
import useTheme from '@material-ui/core/styles/useTheme'
import Color from 'color'
import useMediaQuery from '@material-ui/core/useMediaQuery'

import AppCardCompact from '../AppCard/AppCardCompact'
import DataStoreContext from '../../contexts/data-store'

import * as styles from './AppRecom.style'

const AppSkeleton = props => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  return (
    <Box m={1} {...props}>
      <Skeleton
        variant='rect'
        width={matches ? 120 : 90}
        height={matches ? 120 : 90}
      />
      <Box py={1}>
        <Skeleton/>
        <Skeleton width='60%'/>
      </Box>
    </Box>
  )
}

const AppRecom = () => {
  const theme = useTheme()
  const matches = useMediaQuery(theme.breakpoints.up('md'));
  const {
    appRecom,
    appRecomFiltered,
    updateAppRecom,
    isFetchingAppRecom,
  } = useContext(DataStoreContext)

  useEffect(() => {
    updateAppRecom()
  }, [ updateAppRecom ])

  const isEmptySearchResult = appRecomFiltered.length === 0 && appRecom.length > 0

  return (
    <Box css={styles.root}
      // bgcolor='primary.main'
    >
      {isFetchingAppRecom && (
        <Box>
          <LinearProgress />
        </Box>
      )}
      <Box py={1} px={2}>
        <Typography variant='h5'>推介</Typography>
      </Box>
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
            <MoodBadIcon fontSize='inherit' />
          </Box>
          <Typography>未有符合推介</Typography>
        </Box>
      )}
      {!isEmptySearchResult && (
        <Box css={styles.scroller}>
          <Box css={styles.container}>
            {appRecomFiltered.map((_appFeed, _appIdx) => {
              return (
                <Box
                  m={1}
                  {..._appIdx === 0 ? { ml: 2 } : {}}
                  {..._appIdx === appRecomFiltered.length - 1 ? { mr: 2 } : {}}
                  css={css`
                    ${styles.card.wrap}
                  `}
                  key={_appIdx}
                >
                  <AppCardCompact
                    cover={_appFeed.artworkUrl100}
                    name={_appFeed.name}
                    author={_appFeed.artistName}
                    genres={_appFeed.genres.map(({ name }) => name)}
                  />
                </Box>
              )
            })}
            {isFetchingAppRecom && [ ...new Array(matches ? 10 : 4) ].map((item, idx, items) => {
              return <AppSkeleton
                key={idx}
                {...idx === 0 ? { ml: 2 } : {}}
                {...idx === items.length - 1 ? { mr: 2 } : {}}
              />
            })}
          </Box>
        </Box>
      )}
    </Box>
  )
}

export default AppRecom
