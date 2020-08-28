/** @jsx jsx */
import { Box, Heading, jsx } from 'theme-ui'

const PageHeader = ({ primary, secondary, children }) => {
  return (
    <Box
      sx={{
        textAlign: 'center',
        mt: 6,
        mb: 4,
        px: [4, 5],
      }}
    >
      <Heading
        as='h1'
        sx={{
          fontSize: [5, 6],
          mb: 3,
        }}
      >
        {primary}
      </Heading>
      {secondary && (
        <Heading
          as='h2'
          sx={{
            fontSize: [4, 5],
            mb: 4,
          }}
        >
          {secondary}
        </Heading>
      )}
      {children}
    </Box>
  )
}

export default PageHeader
