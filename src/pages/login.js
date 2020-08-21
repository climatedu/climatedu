import { useCallback, useState } from 'react'
import { Redirect } from '@reach/router'
import { jsx, Box, Text, Heading, Image } from 'theme-ui'
import Button from '../components/button'
import { Google } from '../icons'

import firebase from 'firebase/app'
import useFirebase from '../firebase/useFirebase'
import useAuth from '../util/auth'
/** @jsx jsx */

export default function login() {
  const firebaseApp = useFirebase()
  const [error, setError] = useState(null)

  const handleGoogleLogin = useCallback(async () => {
    if (!firebaseApp) return
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebaseApp.auth().signInWithPopup(provider)
    } catch (e) {
      setError(e.message)
      return
    }
  }, [firebaseApp])

  const user = useAuth()
  if (user !== null) {
    return <Redirect to="/" noThrow />
  }

  return (
    <Box sx={{ height: '100vh', display: 'grid' }}>
      <Box
        sx={{ margin: 'auto', width: '100%', maxWidth: 300, display: 'grid' }}
      >
        <Heading
          as="h1"
          sx={{ textAlign: 'center', color: 'primary', marginBottom: 20 }}
        >
          Log In
        </Heading>
        <Button onClick={handleGoogleLogin} sx={{ cursor: 'pointer' }}>
          Sign in with Google
          <Google
            sx={{
              fill: 'primary',
              height: '1.5em',
              verticalAlign: 'middle',
              marginLeft: 10,
            }}
          />
        </Button>
        <Text sx={{ color: 'highlight', marginTop: 20, textAlign: 'center' }}>
          {error}
        </Text>
      </Box>
    </Box>
  )
}
