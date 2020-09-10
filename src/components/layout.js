/** @jsx jsx */
import { useState } from 'react'
import { Box, Flex, Heading, IconButton, Styled, jsx } from 'theme-ui'
import { css } from '@theme-ui/css'
import { Global } from '@emotion/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import Navbar from './navbar'

import {
  IoMdMail,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
} from 'react-icons/io'

const icons = {
  IoMdMail,
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
}

const Layout = ({ children, bg }) => {
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
      imageSharp(fluid: { originalName: { eq: "Forest.png" } }) {
        fluid(maxWidth: 2560, traceSVG: { color: "#007439" }) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  `)

  const [navbarOpen, setNavbarOpen] = useState(false)
  return (
    // eslint-disable-next-line react/jsx-pascal-case
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
            bg: 'primary',
          },
        })}
      />
      <Navbar navbarOpen={navbarOpen} setNavbarOpen={setNavbarOpen} />
      <Box
        as='main'
        sx={{
          flex: '1 0 auto',
          bg: bg,
        }}
      >
        {children}
      </Box>
      <Flex
        sx={{
          flexShrink: 0,
          justifyContent: 'center',
          alignItems: 'stretch',
          flexDirection: 'column',
          bg: bg,
          pt: 4,
        }}
      >
        <Image
          fluid={data.imageSharp.fluid}
          sx={{
            bg: bg,
          }}
          imgStyle={{
            top: 2,
          }}
        />
        <Flex
          sx={{
            bg: '#007439',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            pb: 4,
          }}
        >
          <Heading
            as='h3'
            sx={{
              color: 'background',
              py: 3,
            }}
          >
            Have a question? Reach out to hello@climatedu.org!
          </Heading>
          <Box>
            {data.site.siteMetadata.socials.map(({ icon, href, name }, i) => {
              const Icon = icons[icon]
              return (
                <IconButton
                  key={i}
                  as='a'
                  href={href}
                  sx={{
                    p: ['8px', '12px'],
                    height: ['2em', '3em'],
                    width: ['2em', '3em'],
                    bg: 'background',
                    color: 'primary',
                    m: 2,
                    mt: 0,
                    transition: 'opacity 0.3s ease',
                    ':hover, :focus': {
                      opacity: 0.85,
                    },
                    ':active': {
                      opacity: 0.6,
                    },
                  }}
                  title={name}
                >
                  <Icon size='100%' aria-hidden />
                </IconButton>
              )
            })}
          </Box>
        </Flex>
      </Flex>
    </Styled.root>
  )
}

export default Layout
