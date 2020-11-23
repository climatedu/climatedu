const path = require(`path`)

exports.onCreateNode = ({ node, getNode, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === 'MarkdownRemark') {
    const sourceNode = getNode(node.parent)
    let sourceInstanceName = 'unknown'
    if (sourceNode.internal.type === 'File') {
      sourceInstanceName = sourceNode.sourceInstanceName
    }

    createNodeField({
      node,
      name: 'sourceInstanceName',
      value: sourceInstanceName,
    })
  }
}

exports.createPages = async ({ graphql, actions, reporter }) => {
  const { createPage } = actions
  // Query for markdown nodes to use in creating pages.
  const result = await graphql(
    `
      {
        allMarkdownRemark(
          filter: { fileAbsolutePath: { glob: "**/course/*.md" } }
        ) {
          edges {
            node {
              frontmatter {
                slug
              }
            }
          }
        }
      }
    `
  )
  // Handle errors
  if (result.errors) {
    reporter.panicOnBuild(`Error while running GraphQL query.`)
    return
  }
  // Create pages for each markdown file.
  result.data.allMarkdownRemark.edges.forEach(({ node }) => {
    const page = path.resolve(`src/course/${node.frontmatter.slug}.js`)
    createPage({
      path: `/course/${node.frontmatter.slug}/`,
      component: page,
      // In your blog post template's graphql query, you can use pagePath
      // as a GraphQL variable to query for data from the markdown file.
      context: {
        slug: node.frontmatter.slug,
      },
    })
  })
}
