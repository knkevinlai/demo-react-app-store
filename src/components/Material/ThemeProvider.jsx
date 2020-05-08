import React, {
  useContext,
  useMemo,
} from 'react'
import PropTypes from 'prop-types'
import CssBaseline from '@material-ui/core/CssBaseline'
import MuiThemeProvider from '@material-ui/styles/ThemeProvider'

import ThemeContext from '../../contexts/theme'

const ThemeProvider = props => {
  const {
    createMuiTheme,
    preset,
    PRESET,
    themeOptions,
  } = useContext(ThemeContext)

  const theme = useMemo(() => {
    return createMuiTheme(themeOptions.get(preset) || themeOptions.get(PRESET.DEFAULT))
  }, [
    preset,
    PRESET,
    themeOptions,
    createMuiTheme,
  ])

  return (
    <MuiThemeProvider
      theme={theme}
      {...props}
    >
      <CssBaseline/>
      {props.children}
    </MuiThemeProvider>
  )
}
ThemeProvider.propTypes = { children: PropTypes.node }

export default ThemeProvider
