/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Redirect } from '@reach/router'
import { Button, Flex, Input, Text, Heading, jsx } from 'theme-ui'
import { graphql } from 'gatsby'

import { AiFillGoogleCircle } from 'react-icons/ai'

import firebase from 'firebase/app'
import useFirebase from '../firebase/useFirebase'
import useAuth from '../util/auth'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

const Login = ({ data }) => {
  if (!data.configYaml.enableLogin) {
    return (
      <Layout>
        <PageHeader
          primary='Login'
          secondary="We're still building this course. Come back and join us in October!"
        />
        <Container>
          <Heading
            sx={{
              textAlign: 'center',
              mb: 3,
            }}
          >
            Leave your email, and we&apos;ll remind you:
          </Heading>
          <Flex
            as='form'
            sx={{
              maxWidth: 300,
              m: 'auto',
              flexDirection: 'column',
            }}
          >
            <Input
              placeholder='Email'
              sx={{
                mb: 3,
              }}
            />
            <Button>Submit</Button>
          </Flex>
        </Container>
      </Layout>
    )
  }
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

export const query = graphql`
  {
    configYaml {
      enableLogin
    }
  }
`

export default Login
