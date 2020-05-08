/** @jsx jsx */
import { jsx } from '@emotion/core'
import { memo, useEffect, useState, useContext } from 'react'
import ButtonBase from '@material-ui/core/ButtonBase'
import Brightness2OutlinedIcon from '@material-ui/icons/Brightness2Outlined'
import Brightness2Icon from '@material-ui/icons/Brightness2'
import yellow from '@material-ui/core/colors/yellow'
import useTheme from '@material-ui/core/styles/useTheme'

import ThemeContext from '../../contexts/theme'

const ThemeSwitch = memo(props => {
  const theme = useTheme()
  const { setPreset, PRESET, preset } = useContext(ThemeContext)

  const [ isDarkMode, setIsDarkMode ] = useState(preset === PRESET.DARK)

  useEffect(() => {
    setPreset(isDarkMode ? PRESET.DARK : PRESET.DEFAULT)
  }, [
    isDarkMode, PRESET, setPreset
  ])

  return (
    <ButtonBase
      onClick={() => setIsDarkMode(!isDarkMode)}
      style={{ color: !isDarkMode ? theme.palette.text.disabled : yellow[600] }}
      {...props}
    >
      {!isDarkMode ? <Brightness2OutlinedIcon/> : <Brightness2Icon/>}
    </ButtonBase>
  )
})
ThemeSwitch.displayName = 'ThemeSwitch'

export default ThemeSwitch
