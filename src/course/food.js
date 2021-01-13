/** @jsx jsx **/
import { graphql } from 'gatsby'
import { Box, jsx } from 'theme-ui'
import Image from 'gatsby-image'

import Unit from '../components/unit'

const Food = ({ data }) => {
  return (
    <Unit {...data.markdownRemark}>
      <Box sx={{ mb: '20em' }}>
        <span />
      </Box>
      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          right: 0,
          width: '80vw',
          pointerEvents: 'none',
        }}
      >
        <Image
          fluid={{ ...data.imageSharp.fluid }}
          sx={{
            maxWidth: '600px',
            ml: 'auto',
          }}
        />
      </Box>
    </Unit>
  )
}

export default Food

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
    imageSharp(fluid: { originalName: { eq: "Barn.png" } }) {
      fluid(maxWidth: 600, traceSVG: {}) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`
