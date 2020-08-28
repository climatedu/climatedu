/** @jsx jsx **/
import { graphql } from 'gatsby'
import { Box, jsx } from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

const Mission = ({ data }) => {
  return (
    <Layout>
      <PageHeader primary='Our Mission' secondary='A Letter From Our Founder' />
      <Container>
        <Box
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
        />
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    markdownRemark(fileAbsolutePath: { glob: "**/mission.md" }) {
      html
    }
  }
`

export default Mission
