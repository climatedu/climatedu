/** @jsx jsx */
import { Box, jsx } from 'theme-ui'
import { BsCaretDownFill } from 'react-icons/bs'
import React, { useState } from 'react'

const merge = (obj, other) => (other ? { ...obj, ...other } : obj)

const Dropdown = ({ text, textStyle, contents }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = e => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <React.Fragment>
      <Box
        sx={merge(
          {
            cursor: 'pointer',
          },
          textStyle
        )}
        onClick={toggleOpen}
      >
        {text}
        <BsCaretDownFill
          sx={{
            transform: open ? 'rotate(-180deg)' : '',
            verticalAlign: 'middle',
            transition: 'transform .3s ease',
            ml: 2,
          }}
        />
      </Box>
      {open ? contents : null}
    </React.Fragment>
  )
}

export default Dropdown
