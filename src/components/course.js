/** @jsx jsx */
import { Box, Styled, jsx } from 'theme-ui'
import { css } from '@theme-ui/css'
import { Global } from '@emotion/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { navigate, Link } from 'gatsby'
import { toast } from 'react-toastify'

import SEO from './seo'
import getFirebase from '../firebase'

import { IoMdExit } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'

const Course = ({ children, bg }) => {
  const firebaseApp = getFirebase()

  const logout = async e => {
    e.preventDefault()
    try {
      await firebaseApp.auth().signOut()
      toast.success('Logged out!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

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
        overflowY: 'auto',
      }}
    >
      <Global
        styles={css({
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%',
            overflowX: 'hidden',
          },
          '.Toastify__toast-body': {
            mx: 2,
          },
          '.Toastify__toast--success': {
            bg: 'text',
          },
        })}
      />
      <SEO />
      <div sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <h1 sx={{ fontSize: '1.5em', mx: 5, mt: 4 }}>
          <Link sx={{ textDecoration: 'none' }} to='/'>
            <AiFillHome
              sx={{
                position: 'relative',
                top: '0.4em',
                size: '1.6em',
                color: 'text',
              }}
            />
          </Link>
        </h1>
        <h1 sx={{ fontSize: '1.5em', mx: 5, mt: 4 }}>
          <Box as='span' onClick={logout} sx={{ cursor: 'pointer' }}>
            Log out{' '}
            <IoMdExit
              sx={{ position: 'relative', top: '0.4em', size: '1.6em' }}
            />
          </Box>
        </h1>
      </div>
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
    </Styled.root>
  )
}

export default Course
