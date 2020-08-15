import { useCallback, useState } from 'react'
import { Redirect } from '@reach/router'
import { jsx, Box, Text, Heading, Image } from 'theme-ui'
import Button from '../components/button'
import iconGoogle from '../icons/google.svg'
import firebaseAuth from '../util/firebase-auth'
import useAuth from '../util/auth'
/** @jsx jsx */

export default () => {
  const [error, setError] = useState(null)
  const handleGoogleLogin = useCallback(async () => {
    const provider = new firebaseAuth.GoogleAuthProvider()
    try {
      await firebaseAuth().signInWithPopup(provider)
    } catch (e) {
      setError(e.message)
      return
    }
  }, [])

  const user = useAuth()
  if (user !== null) {
    return <Redirect to='/' noThrow />
  }

  return (
    <Box sx={{ height: '100vh', display: 'grid' }}>
      <Box sx={{ margin: 'auto', width: '100%', maxWidth: 300, display: 'grid' }}>
        <Heading as='h1' sx={{ textAlign: 'center', color: 'primary', marginBottom: 20 }}>Log In</Heading>
        <Button onClick={handleGoogleLogin}>
          Sign in with Google
          <Image sx={{ height: '1.5em', verticalAlign: 'middle', marginLeft: 10 }} src={iconGoogle} />
        </Button>
        <Text sx={{ color: 'highlight', marginTop: 20, textAlign: 'center' }}>{error}</Text>
      </Box>
    </Box>
  )
}
