/** @jsx jsx **/
import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import Unit from '../components/unit'

const Impacts = ({ data }) => {
  return <Unit {...data.markdownRemark} />
}

export default Impacts

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
  }
`
