/** @jsx jsx **/
import { graphql } from 'gatsby'
import { Box, jsx } from 'theme-ui'
import Image from 'gatsby-image'

import Unit from '../components/unit'

const Transportation = ({ data }) => {
  return (
    <Unit {...data.markdownRemark}>
      <Image
        fluid={{ ...data.imageSharp.fluid }}
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          width: '100vw',
        }}
      />
    </Unit>
  )
}

export default Transportation

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
    imageSharp(fluid: { originalName: { eq: "TrainBackground.png" } }) {
      fluid(maxWidth: 2560, traceSVG: {}) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`
