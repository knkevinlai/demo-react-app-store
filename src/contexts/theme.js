import React, {
  useState,
  createContext,
} from 'react'
import createMuiThemeDefault from '@material-ui/core/styles/createMuiTheme'
import responsiveFontSizes from '@material-ui/core/styles/responsiveFontSizes'
import blueGrey from '@material-ui/core/colors/blueGrey'
import grey from '@material-ui/core/colors/grey'
import Color from 'color'

import useLocalStorage from '../hooks/useLocalStorage'

const PRESET = {
  LIGHT: { id: 'light', name: 'Light '},
  DARK: { id: 'dark', name: 'Dark' },
}
PRESET.DEFAULT = PRESET.LIGHT
Object.freeze(PRESET)


const commonTheme = {
  typography: {
    fontFamily: [
      'Noto Sans TC',
      'sans-serif',
    ].join(','),
    fontWeightRegular: 500, 
  }
}

export const options = new Map()
options.set(PRESET.LIGHT, {
  ...commonTheme,
  palette: {
    primary: blueGrey,
    secondary: grey,
    background: {
      paper2: Color("#ffffff").darken(0.1).toString(),
    },
  },
})
options.set(PRESET.DARK, {
  ...commonTheme,
  palette: {
    type: 'dark',
    primary: blueGrey,
    secondary: grey,
    background: {
      paper: "#424242",
      paper2: Color("#424242").lighten(0.1).toString(),
      // paper: "#ffeb3b",
      default: "#000000",
    },
  },
})

export const createMuiTheme = (_options = options.get(PRESET.DEFAULT)) => {
  return responsiveFontSizes(createMuiThemeDefault(_options))
}

export const defaultTheme = createMuiTheme()

const initialContext = (() => {
  const isDeviceDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches

  return {
    preset: isDeviceDarkMode
      ? PRESET.DARK
      : PRESET.DEFAULT
    }
})()

const ThemeContext = createContext(initialContext)

export const ThemeContextProvider = props => {
  const { keys, KEY, localStorage } = useLocalStorage()

  const userThemePresetId = localStorage.getItem(keys.get(KEY.PREFERENCE.THEME_PRESET_ID))

  const userThemePreset = userThemePresetId
    ? Object.keys(PRESET).reduce(( _presetFound, key) => {
      return PRESET[key].id === userThemePresetId
        ? PRESET[key]
        : _presetFound
    }, undefined)
    : undefined

  const [ preset, setPreset ] = useState(userThemePreset || initialContext.preset)

  function setPresetAndSaveToLocalStorage(_preset) {
    setPreset(_preset)
    localStorage.setItem(keys.get(KEY.PREFERENCE.THEME_PRESET_ID), _preset.id)
  }

  return (
    <ThemeContext.Provider
      value={{
        preset,
        setPreset: setPresetAndSaveToLocalStorage,
        PRESET,
        defaultTheme,
        themeOptions: options,
        createMuiTheme,
      }}
      {...props}
    />
  )
}




export default ThemeContext

