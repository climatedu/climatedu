/** @jsx jsx **/
import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import Unit from '../components/unit'

const Solutions = ({ data }) => {
  return <Unit {...data.markdownRemark} />
}

export default Solutions

export const pageQuery = graphql`
  query($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
  }
`
