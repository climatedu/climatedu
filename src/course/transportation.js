/** @jsx jsx **/
import { graphql } from 'gatsby'
import { Box, jsx } from 'theme-ui'

import Unit from '../components/unit'

const Transportation = ({ data }) => {
  return <Unit {...data.markdownRemark} />
}

export default Transportation

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
  }
`
