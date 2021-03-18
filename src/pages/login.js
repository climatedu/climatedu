/** @jsx jsx */
import { useState, useCallback } from 'react'
import { Button, Input, Flex, jsx, Box, Label } from 'theme-ui'
import { navigate, Link as GatsbyLink } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

// import firebase from 'firebase/app'

import useAuth from '../util/auth'
import getFirebase from '../firebase'

// import { IoLogoGoogle } from 'react-icons/io'

const Login = ({ data }) => {
  const user = useAuth()

  if (user) {
    navigate('/dashboard/')
  }

  const firebaseApp = getFirebase()

  /*
  const onSubmit = async e => {
    e.preventDefault()
    if (!firebaseApp) return

    if (!/\S+@\S+\.\S+/.test(email)) {
      toast.error('Invalid email.')
      return
    }

    try {
      await firebaseApp.firestore().collection('reminders').add({ email })
      toast.success('Submitted!')
      navigate('/')
    } catch (e) {
      toast.error('Something went wrong. Let us know at hello@climatedu.org.')
    }
  }
  */

  const [email, setEmail] = useState('')

  const handleSetEmail = useCallback(e => setEmail(e.target.value), [])

  const [password, setPassword] = useState('')
  const handleSetPassword = useCallback(e => setPassword(e.target.value), [])

  const normalLogin = async e => {
    e.preventDefault()
    if (!firebaseApp) return
    try {
      await firebaseApp.auth().signInWithEmailAndPassword(email, password)
      toast.success('Logged in!')

      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  /*
  const googleLogin = async e => {
    e.preventDefault()

    const provider = new firebase.auth.GoogleAuthProvider()

    try {
      await firebaseApp.auth().signInWithPopup(provider)
      toast.success('Logged in!')

      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }
  */

  return (
    <Layout>
      <PageHeader primary='Login' />
      <Container>
        <Box
          as='form'
          onSubmit={normalLogin}
          sx={{
            maxWidth: 'smallContainer',
            m: 'auto',
            flexDirection: 'column',
          }}
        >
          <Label htmlFor='email'>Email</Label>
          <Input
            aria-label='Email'
            name='email'
            value={email}
            onChange={handleSetEmail}
            sx={{ mb: 3 }}
          />

          <Label htmlFor='password'>Password</Label>
          <Input
            aria-label='Password'
            name='password'
            type='password'
            value={password}
            onChange={handleSetPassword}
            sx={{ mb: 3 }}
          />

          <Flex sx={{ width: '100%' }}>
            <Button sx={{ mb: 4, marginLeft: 'auto' }}>Let&apos;s go!</Button>
          </Flex>
          <Box sx={{ mb: 3 }}>
            <GatsbyLink
              to='/resetpassword/'
              sx={{
                color: 'primary',
              }}
            >
              Forgot password?
            </GatsbyLink>
          </Box>
          <Box sx={{ mb: 3 }}>
            <GatsbyLink
              to='/register/'
              sx={{
                color: 'primary',
              }}
            >
              Don&apos;t have an account? Sign up
            </GatsbyLink>
          </Box>
        </Box>
      </Container>
    </Layout>
    /*
    <Layout>
      <PageHeader
        primary='Login'
        secondary="We're still building this course. Come back and join us soon!"
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
          onSubmit={onSubmit}
          sx={{
            maxWidth: 'smallContainer',
            m: 'auto',
            flexDirection: 'column',
          }}
        >
          <Input
            aria-label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <Button>Submit</Button>
        </Flex>
      </Container>
    </Layout>
    */
  )
}

export default Login
