/** @jsx jsx */
import React from 'react'
import { graphql } from 'gatsby'
import Image from 'gatsby-image'
import { jsx, Box, Heading, Text } from 'theme-ui'

const smallscreen = [
  [1, 3],
  [3, 5],
  [5, 7],
  [2, 4],
  [4, 6],
]

const bigscreen = [
  [1, 3],
  [3, 5],
  [5, 7],
  [7, 9],
  [2, 4],
  [4, 6],
  [6, 8],
]

export const TeamProfile = ({ data }) => (
  <Box
    sx={{
      gridColumnStart: [
        smallscreen[(data.pos - 1) % 5][0],
        bigscreen[(data.pos - 1) % 7][0],
      ],
      gridColumnEnd: [
        smallscreen[(data.pos - 1) % 5][1],
        bigscreen[(data.pos - 1) % 7][1],
      ],
      textAlign: 'center',
    }}
  >
    <Image
      fluid={{ ...data.avatar.childImageSharp.fluid, aspectRatio: 1 }}
      sx={{ borderRadius: '999em' }}
    />
    <Heading
      sx={{ fontSize: [2, 3, 4, 5], marginTop: ['0.5em', '0.75em', '1em'] }}
    >
      {data.name}
    </Heading>
    <Text sx={{ fontSize: [1, 1, 2, 3], fontStyle: 'italic' }}>
      {data.school}
    </Text>
    <Text sx={{ fontSize: [1, 2, 3, 4] }}>{data.team}</Text>
  </Box>
)

export default TeamProfile

export const query = graphql`
  fragment TeamProfileInformation on PeopleYaml {
    name
    pos
    avatar {
      childImageSharp {
        fluid(maxHeight: 400, maxWidth: 400) {
          ...GatsbyImageSharpFluid
        }
      }
    }
    school
    team
  }
`
