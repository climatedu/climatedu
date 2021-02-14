/** @jsx jsx **/
import { graphql } from 'gatsby'
import { Box, jsx } from 'theme-ui'
import Image from 'gatsby-image'

import Unit from '../components/unit'

const Food = ({ data }) => {
  console.log(data)
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
          fluid={{ ...data.barnImage.fluid }}
          sx={{
            width: '40%',
            ml: 'auto',
          }}
        />
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
          fluid={{ ...data.chickenImage.fluid }}
          sx={{
            width: '6%',
            ml: 'auto',
          }}
        />
      </Box>

      <Box
        sx={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          width: '80vw',
          pointerEvents: 'none',
        }}
      >
        <Image
          fluid={{ ...data.cowImage.fluid }}
          sx={{
            position: 'relative',
            maxWidth: '15%',
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
    barnImage: imageSharp(fluid: { originalName: { eq: "Barn.png" } }) {
      fluid(maxWidth: 600, traceSVG: {}) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
    cowImage: imageSharp(fluid: { originalName: { eq: "strawberrycow.png" } }) {
      fluid(maxWidth: 600, traceSVG: {}) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
    chickenImage: imageSharp(fluid: { originalName: { eq: "chicken.png" } }) {
      fluid(maxWidth: 600, traceSVG: {}) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`
