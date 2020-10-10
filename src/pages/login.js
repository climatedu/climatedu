/** @jsx jsx */
import { useState } from 'react'
import { Button, Box, Input, Flex, Label, jsx } from 'theme-ui'
import { navigate, Link as GatsbyLink } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

import firebase from 'firebase/app'
import getFirebase from '../firebase'

import { IoLogoGoogle } from 'react-icons/io'

const Login = ({ data }) => {
  const firebaseApp = getFirebase()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

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
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Label htmlFor='password'>Password</Label>
          <Input
            aria-label='Password'
            name='password'
            type='password'
            value={password}
            onChange={e => setPassword(e.target.value)}
            sx={{ mb: 3 }}
          />

          <Flex sx={{ width: '100%' }}>
            <Button sx={{ mb: 4, marginLeft: 'auto' }}>Let&apos;s go!</Button>
          </Flex>

          <Button
            variant='looksLikeAnInput'
            sx={{
              width: '100%',
              fontSize: 4,
              cursor: 'pointer',
              mb: 4,
            }}
            onClick={googleLogin}
          >
            <IoLogoGoogle
              aria-hidden
              sx={{
                position: 'relative',
                top: 1,
                left: -2,
              }}
            />
            Sign in with Google
          </Button>

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

          <Box>
            <GatsbyLink
              to='#'
              sx={{
                color: 'primary',
              }}
            >
              Forgot password?
            </GatsbyLink>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Login
