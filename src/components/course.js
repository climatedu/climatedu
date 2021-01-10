/** @jsx jsx */
import { useState } from 'react'
import { Box, Flex, Heading, IconButton, Styled, jsx } from 'theme-ui'
import { css } from '@theme-ui/css'
import { Global } from '@emotion/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { useStaticQuery, graphql, navigate } from 'gatsby'
import Image from 'gatsby-image'
import { toast } from 'react-toastify'

import Navbar from './navbar'
import SEO from './seo'
import useAuth from '../util/auth'
import getFirebase from '../firebase'

import {
  IoMdExit,
} from 'react-icons/io'

const Course = ({ children, bg }) => {
  const user = useAuth(true)
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


  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          socials {
            icon
            href
            name
          }
        }
      }
    }
  `)

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
      <h1 sx={{ fontSize: '2em', textAlign: 'right', mx: 5, mt: 4}}><Box as='span' onClick={logout} sx={{cursor: 'pointer'}}>Log out <IoMdExit sx={{ position: 'relative', top: '0.4em', size: '1.6em' }}/></Box></h1>
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
