/** @jsx jsx */
import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { jsx, Box, Heading } from 'theme-ui'

export const TeamProfile = ({ data }) => (
  <Box>
    <Image
      fixed={data.avatar.childImageSharp.fixed}
      sx={{ borderRadius: '999em' }}
    />
    <Heading as="h1">{data.name}</Heading>
  </Box>
)

export default TeamProfile

export const query = graphql`
  fragment TeamProfileInformation on PeopleYaml {
    name
    team
    avatar {
      childImageSharp {
        fixed(width: 200, height: 200) {
          ...GatsbyImageSharpFixed
        }
      }
    }
  }
`
