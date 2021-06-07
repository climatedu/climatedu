import React from 'react'
import { Label } from 'theme-ui'

const RequiredLabel = ({ text, ...props }) => {
  return (
    <Label {...props}>
      <span>
        <span>{text}</span>
        <span style={{ color: 'red' }}>*</span>
      </span>
    </Label>
  )
}

export default RequiredLabel
