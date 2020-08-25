/** @jsx jsx */
import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { jsx, Flex, Box, Grid, Heading, Text } from 'theme-ui'

export const TeamProfile = ({ data, ...props }) => (
  <Box {...props}>
    <Flex
      sx={{
        justifyContent: 'center',
      }}
    >
      <Image
        fluid={{ ...data.avatar.childImageSharp.fluid, aspectRatio: 1 }}
        sx={{
          borderRadius: '999em',
          width: '100%',
          maxWidth: '200px',
        }}
      />
    </Flex>
    <Grid gap={1} mt={2} sx={{ textAlign: 'center' }}>
      <Heading sx={{ fontSize: [3, 4] }}>{data.name}</Heading>
      <Text sx={{ fontSize: 2, fontStyle: 'italic' }}>{data.school}</Text>
      <Text sx={{ fontSize: 2 }}>{data.team}</Text>
    </Grid>
  </Box>
)

export default TeamProfile

export const query = graphql`
  fragment TeamProfileInformation on PeopleYaml {
    name
    avatar {
      childImageSharp {
        fluid(maxHeight: 400, maxWidth: 400, traceSVG: { color: "#1F724033" }) {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
    school
    team
  }
`
