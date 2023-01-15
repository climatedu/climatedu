/** @jsx jsx */
import { Box, Themed, jsx } from 'theme-ui'
import { css } from '@theme-ui/css'
import { Global } from '@emotion/react'
import SEO from './seo'

const Course = ({ children, bg }) => {
  return (
    <Themed.root
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
        overflowY: 'auto',
      }}
    >
      <Global
        styles={css({
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%',
            overflowX: 'hidden',
          },
        })}
      />
      <SEO />
      <Box
        as='main'
        sx={{
          flex: '1 0 auto',
          bg: bg,
          mt: '3',
        }}
      >
        {children}
      </Box>
    </Themed.root>
  )
}

export default Course
