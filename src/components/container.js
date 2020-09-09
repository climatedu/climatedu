/** @jsx jsx */
import { Box, jsx } from 'theme-ui'

const Container = ({ children, ...props }) => {
  return (
    <Box
      {...props}
      sx={{
        maxWidth: 'container',
        width: '90%',
        m: 'auto',
      }}
    >
      {children}
    </Box>
  )
}

export default Container
