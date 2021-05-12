/** @jsx jsx */
import { jsx, Box, Grid } from 'theme-ui'
import { TeamProfile, PartnerProfile } from '../../components/teamProfile'
import { graphql } from 'gatsby'
import Layout from '../../components/layout'
import PageHeader from '../../components/pageheader'

const nCols = [1, 4]

const calcColumnStart = pos =>
  nCols
    .map(n => ({ n, i: (pos - 1) % (2 * n - 1) }))
    .map(({ n, i }) => 2 * (i % n) + (i >= n ? 2 : 1))

const about = ({ data }) => {
  return (
    <Layout>
      <Box>
        <PageHeader primary='Our Team' />
        <Grid
          sx={{
            mt: 2,
            mx: [4, 5],
            mb: 5,
            gridTemplateColumns: nCols.map(n => `repeat(${n * 2}, 1fr)`),
            columnGap: 4,
            rowGap: 4,
          }}
        >
          {data.currentPeople.edges.map(({ node }) => (
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

        <PageHeader primary='Partners &amp; Organizations' />
        <Grid
          sx={{
            mt: 2,
            mx: [4, 5],
            mb: 5,
            gridTemplateColumns: nCols.map(n => `repeat(${n * 2}, 1fr)`),
            columnGap: 4,
            rowGap: 4,
          }}
        >
          {data.partners.edges.map(({ node }) => (
            <PartnerProfile
              key={node.pos}
              sx={{
                gridColumnStart: calcColumnStart(node.pos),
                gridColumnEnd: calcColumnStart(node.pos).map(c => c + 2),
              }}
              data={node}
            />
          ))}
        </Grid>

        <PageHeader primary='Past Contributors' />
        <Grid
          sx={{
            mt: 2,
            mx: [4, 5],
            gridTemplateColumns: nCols.map(n => `repeat(${n * 2}, 1fr)`),
            columnGap: 4,
            rowGap: 4,
          }}
        >
          {data.pastPeople.edges.map(({ node }) => (
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
    currentPeople: allCurrentPeopleYaml(sort: { fields: pos, order: ASC }) {
      edges {
        node {
          pos
          ...CurrentMemberProfileInformation
        }
      }
    }

    pastPeople: allPastPeopleYaml(sort: { fields: pos, order: ASC }) {
      edges {
        node {
          pos
          ...PastMemberProfileInformation
        }
      }
    }

    partners: allPartnersYaml(sort: { fields: pos, order: ASC }) {
      edges {
        node {
          pos
          ...PartnerProfileInformation
        }
      }
    }
  }
`
