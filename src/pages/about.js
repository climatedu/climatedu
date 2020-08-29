/** @jsx jsx */
import { jsx, Box, Heading, Grid } from 'theme-ui'
import { TeamProfile } from '../components/teamProfile'
import { graphql } from 'gatsby'
import Layout from '../components/layout'

const nCols = [1, 4]

const calcColumnStart = pos =>
  nCols
    .map(n => ({ n, i: (pos - 1) % (2 * n - 1) }))
    .map(({ n, i }) => 2 * (i % n) + (i >= n ? 2 : 1))

const about = ({ data }) => {
  return (
    <Layout>
      <Box>
        <Heading
          sx={{
            mb: 5,
            fontSize: [6, 7],
            textAlign: 'center',
            color: 'primary',
          }}
        >
          Our Team
        </Heading>
        <Grid
          sx={{
            mt: 2,
            mx: [4, 5],
            gridTemplateColumns: nCols.map(n => `repeat(${n * 2}, 1fr)`),
            columnGap: 4,
            rowGap: 4,
          }}
        >
          {data.allPeopleYaml.edges.map(({ node }) => (
            <TeamProfile
              key={node.pos}
              sx={{
                gridColumnStart: calcColumnStart(node.pos),
                gridColumnEnd: calcColumnStart(node.pos).map(c => c + 2),
              }}
              data={node}
            />
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
          pos
          ...TeamProfileInformation
        }
      }
    }
  }
`
