/** @jsx jsx */
import { Box, Styled, jsx } from 'theme-ui'

import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <Styled.root>
      <Navbar />
      <Box>{children}</Box>
    </Styled.root>
  )
}

export default Layout
