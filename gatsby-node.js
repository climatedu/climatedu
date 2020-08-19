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
        name: `sourceInstanceName`,
        value: sourceInstanceName
      })
    }
}