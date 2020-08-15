import React from 'react'
import { Button } from 'theme-ui'

export default (props) => (
  <Button
    sx={{
      borderColor: 'primary',
      border: 'solid 5px',
      borderRadius: 20,
      color: 'primary',
      padding: '10px 20px',
      fontSize: 20,
      backgroundColor: 'background'
    }}
    {...props}
  />
)
