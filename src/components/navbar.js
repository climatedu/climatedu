/** @jsx jsx */
import { Box, Text, jsx } from 'theme-ui'
import useAuth from '../util/auth'
import Link from './link'

const Navbar = () => {
  const user = useAuth()
  return (
    <Box
      sx={{
        backgroundColor: 'background',
        mb: 4,
      }}
    >
      this will be replaced with the real navbar
      {user === null ? (
        <Link to='/login'>login and register</Link>
      ) : (
        <Text>welcome {user.displayName}</Text>
      )}
    </Box>
  )
}

export default Navbar