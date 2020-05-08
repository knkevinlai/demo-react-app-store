/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import {
  Fragment,
  useEffect,
  useContext,
  useState,
} from 'react'
import Box from '@material-ui/core/Box'
import Snackbar from '@material-ui/core/Snackbar'
import Button from '@material-ui/core/Button'
import FlareIcon from '@material-ui/icons/Flare'
import useTheme from '@material-ui/core/styles/useTheme'
import CircularProgress from '@material-ui/core/CircularProgress'

import ServiceWorkderContext from '../../contexts/service-worker'

const ServiceWorkderHandler = () => {
  const theme = useTheme()

  const {
    serviceWorkerInitialized,
    serviceWorkerUpdated,
    serviceWorkerRegistration,
    updateServiceWorker,
  } = useContext(ServiceWorkderContext)

  const [ isInitSnackbarOpen, setIsInitSnackbarOpen ] = useState(false)
  const [ isUpdateSnackbarOpen, setIsUpdateSnackbarOpen ] = useState(false)
  const [ isUpdatingAwaitingReg, setIsUpdatingAwaitingReg ] = useState(false)

  useEffect(() => {
    if (serviceWorkerInitialized) {
      setIsInitSnackbarOpen(true)
    }
  }, [ serviceWorkerInitialized ])

  useEffect(() => {
    if (serviceWorkerUpdated) {
      setIsUpdateSnackbarOpen(true)
    }
  }, [ serviceWorkerUpdated ])

  return (
    <Fragment>
      <Snackbar
        open={isInitSnackbarOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        onClose={() => setIsInitSnackbarOpen(false)}
        message={(
          <Box css={css`
            display: flex;
            align-items: center;
          `}>
            <Box>已成功安裝本網頁的離線程式</Box>
            <FlareIcon
              fontSize='small'
              style={{
                marginLeft: theme.spacing(1),
              }}
            />
          </Box>
        )}
      />      
      <Snackbar
        open={isUpdateSnackbarOpen}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        action={(
          <Box>
            {serviceWorkerRegistration && (
              <Button
                onClick={() => {
                  updateServiceWorker()
                  setIsUpdatingAwaitingReg(true)
                }}
                disabled={!serviceWorkerRegistration || isUpdatingAwaitingReg}
                size='small'
                style={{ color: theme.palette.background.default }}
              >
                {!isUpdatingAwaitingReg && '更新'}
                {isUpdatingAwaitingReg && (
                  <CircularProgress size={24} />
                )}
              </Button>
            )}
            <Button
              onClick={() => setIsUpdateSnackbarOpen(false)}
              size='small'
              style={{ color: theme.palette.background.default }}
            >關閉</Button>
          </Box>
        )}
        message={(
          <Box css={css`
            display: flex;
            align-items: center;
          `}>
            <Box>本網頁的離線程式有新版本</Box>
            <FlareIcon
              fontSize='small'
              style={{
                marginLeft: theme.spacing(1),
              }}
            />
          </Box>
        )}
      />      
    </Fragment>
  )

}

export default ServiceWorkderHandler
