/** @jsx jsx **/
import { graphql } from 'gatsby'
import { jsx } from 'theme-ui'

import Unit from '../components/unit'

const Urbanization = ({ data }) => {
  return (
    <Unit {...data.markdownRemark}>
      <img
        src={data.file.publicURL}
        sx={{
          width: '100vw',
          position: 'relative',
          bottom: '-10px',
          mt: '2em',
        }}
      />
    </Unit>
  )
}

export default Urbanization

export const pageQuery = graphql`
  query ($slug: String!) {
    markdownRemark(frontmatter: { slug: { eq: $slug } }) {
      ...Unit
    }
    file(absolutePath: { glob: "**/course/footers/town.svg" }) {
      publicURL
    }
  }
`
