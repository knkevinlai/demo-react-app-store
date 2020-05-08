/** @jsx jsx */
import { jsx } from '@emotion/core'
import Box from '@material-ui/core/Box'
import Divider from '@material-ui/core/Divider'

import AppSearch from '../AppSearch/AppSearch'
import AppRecom from '../AppRecom/AppRecom'
import AppList from '../AppList/AppList'

import * as styles from './Layout.style'

const Layout = () => {
  return (
    <Box css={styles.root}>
      <Box css={styles.search.wrap}>
        <AppSearch/>
      </Box>
      <Box>
        <AppRecom/>
        <Divider/>
      </Box>
      <Box>
        <AppList/>
      </Box>
    </Box>
  )
}

export default Layout
