import { useState } from 'react'
import { Redirect } from '@reach/router'
import { jsx, Box, Text, Heading } from 'theme-ui'
import Button from '../components/button'

import { AiFillGoogleCircle } from 'react-icons/ai'

import firebase from 'firebase/app'
import useFirebase from '../firebase'
import useAuth from '../util/auth'
/** @jsx jsx */

export default function login() {
  const firebaseApp = useFirebase()
  const [error, setError] = useState(null)

  const handleGoogleLogin = async () => {
    if (!firebaseApp) return
    const provider = new firebase.auth.GoogleAuthProvider()
    try {
      await firebaseApp.auth().signInWithPopup(provider)
    } catch (e) {
      setError(e.message)
      return
    }
  }

  const user = useAuth()
  if (user !== null) {
    return <Redirect to='/' noThrow />
  }

  return (
    <Box sx={{ height: '100vh', display: 'grid' }}>
      <Box
        sx={{ margin: 'auto', width: '100%', maxWidth: 300, display: 'grid' }}
      >
        <Heading
          as='h1'
          sx={{ textAlign: 'center', color: 'primary', marginBottom: 20 }}
        >
          Log In
        </Heading>
        <Button onClick={handleGoogleLogin} sx={{ cursor: 'pointer' }}>
          Sign in with Google
          <AiFillGoogleCircle
            size='1.5em'
            sx={{
              color: 'primary',
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
