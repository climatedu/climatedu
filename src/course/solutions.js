/** @jsx jsx **/
import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import Unit from '../components/unit'

const Solutions = ({ data }) => {
  return (
    <Unit {...data.markdownRemark}>
      <img
        src={data.protest.publicURL}
        sx={{
          width: '100vw',
          position: 'relative',
          mt: '2em',
        }}
      />
    </Unit>
  )
}

export default Solutions

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
    protest: file(absolutePath: { glob: "**/course/footers/protest.svg" }) {
      publicURL
    }
  }
`
