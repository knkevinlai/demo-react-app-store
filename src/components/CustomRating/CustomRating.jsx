/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import PropTypes from 'prop-types'
import { memo } from 'react'
import Box from '@material-ui/core/Box'
import StarIcon from '@material-ui/icons/Star'
import amber from '@material-ui/core/colors/amber'
import grey from '@material-ui/core/colors/grey'

const FillableStar = memo(props => {
  const { value } = props
  return (
    <Box
      display='inline'
      css={css`
        position: relative;
        vertical-align: middle;
        line-height: 0;
        color: ${grey[500]};
      `}
    >
      <StarIcon fontSize='inherit' style={{ opacity: 0.5 }}/>
      <Box
        css={css`
          position: absolute;
          top: 0;
          left: 0;
          color: ${amber[600]};
          height: 100%;
          overflow: hidden;
        `}
        style={{ width: `${value * 100}%` }}
      >
        <StarIcon fontSize='inherit' color='inherit'/>
      </Box>
    </Box>
  )
})
FillableStar.displayName = 'FillableStar'
FillableStar.propTypes = { value: PropTypes.number }

const CustomRating = memo(props => {
  const { value } = props
  return (
    <Box
      alignItems='center'
      display='inline-flex'
      style={{
        verticalAlign: 'middle',
        fontSize: 18,
      }}
    >
      <FillableStar value={value < 1 ? (value > 0 ? value : 0) : 1} />
      <FillableStar value={value < 2 ? (value > 1 ? value - 1 : 0) : 1} />
      <FillableStar value={value < 3 ? (value > 2 ? value - 2 : 0) : 1} />
      <FillableStar value={value < 4 ? (value > 3 ? value - 3 : 0) : 1} />
      <FillableStar value={value < 5 ? (value > 4 ? value - 4 : 0) : 1} />
    </Box>
  )
})
CustomRating.displayName = 'CustomRating'
CustomRating.propTypes = {
  value: PropTypes.number,
  precision: PropTypes.number,
}

export default CustomRating
