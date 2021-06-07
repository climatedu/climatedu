/** @jsx jsx **/
import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import Image from 'gatsby-image'

import Unit from '../components/unit'

const Energy = ({ data }) => {
  return (
    <Unit {...data.markdownRemark}>
      <Image
        fluid={{ ...data.pwImage.fluid }}
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

export default Energy

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
    pwImage: imageSharp(fluid: { originalName: { eq: "Powerlines.png" } }) {
      fluid(maxWidth: 2560, traceSVG: {}) {
        ...GatsbyImageSharpFluid_tracedSVG
      }
    }
  }
`
