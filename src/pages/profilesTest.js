import React from 'react'
import { graphql } from 'gatsby'
import TeamProfile from '../components/teamProfile'

const ProfilesTest = ({ data }) =>
  data.allPeopleYaml.edges.map(({ node }) =>
    <TeamProfile key={node.id} data={node} />
  )

export default ProfilesTest

export const query = graphql`
  query {
    allPeopleYaml {
      edges {
        node {
          id
          ...TeamProfileInformation
        }
      }
    }
  }
`
