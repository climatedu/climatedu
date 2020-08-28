/** @jsx jsx */
import { Box, Styled, jsx } from 'theme-ui'
import { Global } from '@emotion/core'

import Navbar from './navbar'

const Layout = ({ children }) => {
  return (
    <Styled.root
      sx={{
        '&, *': {
          scrollbarColor: theme => `${theme.colors.primary} ${theme.colors.darkBackground}`,
          scrollbarWidth: 'thin',
        },
        '::-webkit-scrollbar, *::-webkit-scrollbar': {
          bg: 'darkBackground',
        },
        '::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb': {
          bg: 'primary',
        },
      }}
    >
      <Global
        styles={{
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%'
          },
        }}
      />
      <Navbar />
      <Box>{children}</Box>
    </Styled.root>
  )
}

export default Layout
