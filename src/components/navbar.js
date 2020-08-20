/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Box, Button, Text, jsx } from 'theme-ui'
import useAuth from '../util/auth'
import Link from './link'

import useFirebase from '../firebase/useFirebase'

const Navbar = () => {
  const firebaseApp = useFirebase()
  const user = useAuth()

  const [error, setError] = useState(null)

  const handleLogout = useCallback(async () => {
    if (!firebaseApp) return
    try {
      await firebaseApp.auth().signOut()
    } catch (e) {
      setError(e.message)
    }
  }, [firebaseApp])

  return (
    <Box
      sx={{
        backgroundColor: 'background',
        mb: 4,
      }}
    >
      this will be replaced with the real navbar
      {user === null ? (
        <Link to="/login">login and register</Link>
      ) : (
        <Box>
          <Text>welcome {user.displayName}</Text>
          <Link to="/" onClick={handleLogout}>
            Logout
          </Link>
          <Text sx={{ color: 'highlight' }}>{error}</Text>
        </Box>
      )}
    </Box>
  )
}

export default Navbar
