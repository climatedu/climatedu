/** @jsx jsx */
import { Box, Flex, Heading, IconButton, Styled, jsx } from 'theme-ui'
import { Global } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'
import Image from 'gatsby-image'

import { IoLogoInstagram, IoLogoTwitter, IoLogoYoutube } from 'react-icons/io'

const icons = {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoYoutube,
}

import Navbar from './navbar'

const Layout = ({ children, bg }) => {
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          socials {
            icon
            href
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

  return (
    <Styled.root>
      <Global
        styles={{
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%',
          },
        }}
      />
      <Navbar
        sx={{
          flexShrink: 0,
        }}
      />
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
            {data.site.siteMetadata.socials.map(({ icon, href }, i) => {
              const Icon = icons[icon]
              return (
                <IconButton
                  key={i}
                  as='a'
                  href={href}
                  sx={{
                    borderRadius: 999,
                    p: ['8px', '12px'],
                    height: ['2em', '3em'],
                    width: ['2em', '3em'],
                    bg: 'background',
                    color: 'primary',
                    m: 2,
                    mt: 0,
                  }}
                >
                  <Icon size='100%' />
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
