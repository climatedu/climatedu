/** @jsx jsx */
import { Box, Flex, Heading, IconButton, Image, Styled, jsx } from 'theme-ui'
import { Global } from '@emotion/core'
import { useStaticQuery, graphql } from 'gatsby'

import {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoYoutube,
} from 'react-icons/io'
import { FaDiscord } from 'react-icons/fa'
import { MdEmail } from 'react-icons/md'

const icons = {
  IoLogoInstagram,
  IoLogoTwitter,
  IoLogoGithub,
  IoLogoYoutube,
  FaDiscord,
  MdEmail,
}

import Navbar from './navbar'

import Forest from '../media/Forest.png'

const Layout = ({ children, backgroundColor }) => {
  const data = useStaticQuery(graphql`
    {
      configYaml {
        socials {
          icon
          href
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
      <Navbar />
      <Box
        sx={{
          pb: theme => [
            `calc(${theme.sizes.footer} + 32px)`,
            null,
            'calc(50% + 32px)',
          ],
          backgroundColor: backgroundColor,
        }}
      >
        {children}
      </Box>
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
        }}
      >
        <Image
          src={Forest}
          sx={{
            position: 'absolute',
            bottom: 0,
            backgroundColor: backgroundColor,
            display: ['none', null, 'block'],
          }}
        />
        <Flex
          sx={{
            position: 'absolute',
            left: 0,
            bottom: 0,
            right: 0,
            flexDirection: 'column',
            alignItems: 'center',
            p: 3,
            textAlign: 'center',
            justifyContent: 'center',
            height: 'footer',
            backgroundColor: ['primary', null, 'transparent'],
          }}
        >
          <Heading
            as='h3'
            sx={{
              color: 'background',
              pb: 3,
            }}
          >
            Have a question? Reach out to hello@climatedu.org!
          </Heading>
          <Box>
            {data.configYaml.socials.map(({ icon, href }, i) => {
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
                    backgroundColor: 'background',
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
      </Box>
    </Styled.root>
  )
}

export default Layout
