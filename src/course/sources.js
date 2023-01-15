/** @jsx jsx **/
import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import Unit from '../components/unit'

const Sources = ({ data }) => {
  return (
    <Unit {...data.markdownRemark}>
      <img
        src={data.forest.publicURL}
        sx={{
          width: '100vw',
          position: 'relative',
          mt: '2em',
        }}
      />
    </Unit>
  )
}

export default Sources

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
    forest: file(absolutePath: { glob: "**/course/footers/Forest.png" }) {
      publicURL
    }
  }
`
