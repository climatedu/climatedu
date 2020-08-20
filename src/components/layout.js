/** @jsx jsx */
import { Link } from 'gatsby'
import { Box, Styled, Text, jsx } from 'theme-ui'

import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <Styled.root>
      <Navbar />
      <main
        sx={{
          m: 'auto',
          maxWidth: 960,
          width: '90%',
        }}
      >
        {children}
      </main>
    </Styled.root>
  )
}

export default Layout