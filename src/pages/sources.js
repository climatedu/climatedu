/** @jsx jsx **/
import { graphql } from 'gatsby'
import { Box, jsx } from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

const Sources = ({ data }) => {
  return (
    <Layout>
      <PageHeader primary='Sources' />
      <Container>
        <Box
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
          sx={{
            li: {
              color: 'primary',
            },
            a: {
              color: 'primary',
              '&:visited, &:hover': {
                color: 'text',
              },
            },
          }}
        />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    markdownRemark(fileAbsolutePath: { glob: "**/sources.md" }) {
      html
    }
  }
`

export default Sources
