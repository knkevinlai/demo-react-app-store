/** @jsx jsx */
import { jsx, css, ClassNames } from '@emotion/core'
import { memo, useState, useContext, useEffect } from 'react'
import Box from '@material-ui/core/Box'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import SearchIcon from '@material-ui/icons/Search'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import BackspaceOutlinedIcon from '@material-ui/icons/BackspaceOutlined'

import ThemeSwitch from '../ThemeSwitch/ThemeSwitch'

import DataStoreContext from '../../contexts/data-store'

import * as styles from './AppSearch.style'

const AppSearch = memo(() => {
  const { setSearchText, clearSearchText } = useContext(DataStoreContext)

  const [ searchValue, setSearchValue ] = useState('')

  // ON SERACH CHANGE SIDE EFFECT TO THE CONTEXT TO PROCEED FURTHER APP DATA FILTERING
  useEffect(() => {
    setSearchText(searchValue)
  }, [ searchValue, setSearchText ])
  return (<ClassNames>{({ css: cssX }) => (

    <Paper square css={styles.paper}>
      <Box
        m={1}
        css={styles.textField.wrap}
        // bgcolor={theme.palette.background.paper}
      >
        <TextField
          variant='filled'
          size='small'
          fullWidth
          value={searchValue}
          onChange={event => {
            setSearchValue(event.target.value)
          }}
          InputLabelProps={{
            classes: {
              animated: cssX(css`
                transition: color 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                            transform 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                            left 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms,
                            top 200ms cubic-bezier(0.0, 0, 0.2, 1) 0ms;
              `),
              marginDense: cssX(css`
              `),
              filled: cssX(css`
                &.MuiInputLabel-marginDense	{
                  left: 50%;
                  top: 50%;
                  transform: translate(-50%, -50%);
                }
              `),
              shrink: cssX(css`
                &.MuiInputLabel-filled.MuiInputLabel-marginDense	{
                  left: 50%;
                  top: 0%;
                  transform: translate(-50%, 0);
                }
              `),
            },
          }}
          InputProps={{
            ...(searchValue || '').length > 0
              ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      // onClick={() => setSearchValue('')}
                      onClick={() => { 
                        setSearchValue('')
                        clearSearchText() // TO TRIGGER RESET UI IMMEDIATELY
                      }}
                      edge="end"
                    >
                      <BackspaceOutlinedIcon/>
                    </IconButton>
                  </InputAdornment>              
                ),
              } : {},
          }}
          css={styles.textField.root}
          label={(
            <Box
              // display='flex'
              // alignItems='center'
              // justifyContent='center'
              css={css`
                line-height: 0;
              `}
            >
              <SearchIcon  style={{ verticalAlign: 'middle' }} fontSize='small'/>
              <Typography display='inline' style={{ lineHeight: 'inherit', verticalAlign: 'middle' }}>搜尋</Typography>
            </Box>
          )}
        />
      </Box>
      <Box m={1} ml={0}>
        <ThemeSwitch/>
      </Box>
    </Paper>
  )}</ClassNames>)
})
AppSearch.displayName = 'AppSearch'

export default AppSearch
