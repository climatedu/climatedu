/** @jsx jsx */
import { useState } from 'react'
import { Box, Styled, jsx } from 'theme-ui'
import { Global } from '@emotion/core'

import Navbar from './navbar'

const Layout = ({ children }) => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  return (
    <Styled.root
      sx={{
        '&, *': {
          scrollbarColor: theme =>
            `${theme.colors.primary} ${theme.colors.darkBackground}`,
          scrollbarWidth: 'thin',
        },
        '::-webkit-scrollbar, *::-webkit-scrollbar': {
          bg: 'darkBackground',
        },
        '::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb': {
          bg: 'primary',
        },
        overflowY: navbarOpen ? 'hidden' : 'auto',
      }}
    >
      <Global
        styles={{
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%',
            overflowX: 'hidden',
          },
        }}
      />
      <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <Box>{children}</Box>
    </Styled.root>
  )
}

export default Layout
