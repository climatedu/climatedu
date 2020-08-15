import { Link } from 'gatsby'
import { Box, Text, jsx } from 'theme-ui'
import useAuth from '../util/auth'
/** @jsx jsx */

export default () => {
  const user = useAuth()
  return (
    <Box>
      {user === null ? (
        <Link to='/login'>login and register</Link>
      ) : (
        <Text>welcome {user.displayName}</Text>
      )}
    </Box>
  )
}
