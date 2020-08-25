/** @jsx jsx */
import { jsx, Box, Heading, Grid } from 'theme-ui'
import { TeamProfile } from '../components/teamProfile'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const about = ({ data }) => {
  return (
    <Layout>
      <Box sx={{ marginBottom: '2em' }}>
        <Heading
          sx={{
            margin: '0 0 0.75em 0',
            fontSize: [5, 6, 7],
            textAlign: 'center',
            color: 'primary',
          }}
        >
          Our Team
        </Heading>
        <Grid
          sx={{
            margin: '0 auto',
            width: ['90%', '80%', '75%'],
            gridTemplateColumns: ['repeat(6, 1fr)', 'repeat(8, 1fr)'],
          }}
          gap={['1em', '3em', '4em']}
        >
          {data.allPeopleYaml.edges.map(({ node }) => (
            <TeamProfile key={node.id} data={node} />
          ))}
        </Grid>
      </Box>
    </Layout>
  )
}

export default about

export const query = graphql`
  query {
    allPeopleYaml(sort: { fields: pos, order: ASC }) {
      edges {
        node {
          id
          ...TeamProfileInformation
        }
      }
    }
  }
`
