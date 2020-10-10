/** @jsx jsx */
import { useState } from 'react'
import { Button, Box, Input, Flex, jsx, Label } from 'theme-ui'
import { navigate, Link as GatsbyLink } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import firebase from 'firebase/app'
import getFirebase from '../firebase'

const Register = ({ data }) => {
  const firebaseApp = getFirebase()

  const [type, setType] = useState('')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  // const [dateOfBirth, setDateOfBirth] = useState(new Date(2000, 0, 1, 0, 0))

  const [password, setPassword] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')

  const normalLogin = async e => {
    e.preventDefault()
    if (!firebaseApp) return

    if (
      name === '' ||
      email === '' ||
      password === '' ||
      passwordConfirm === ''
    ) {
      toast.error('One or more fields are missing.')
      return
    }

    if (password !== passwordConfirm) {
      toast.error('Passwords do not match.')
      return
    }

    try {
      await firebaseApp.auth().createUserWithEmailAndPassword(email, password)
      toast.success('Signed up!')
      await firebase.auth().currentUser.updateProfile({
        displayName: name,
      })
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <Layout>
      <PageHeader primary='Register' />
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
          <Label htmlFor='name'>Name</Label>
          <Input
            aria-label='Name'
            name='email'
            value={name}
            onChange={e => setName(e.target.value)}
            sx={{ mb: 3 }}
          />

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

          <Label htmlFor='password'>Confirm Password</Label>
          <Input
            aria-label='Confirm Password'
            name='passwordConfirm'
            type='password'
            value={passwordConfirm}
            onChange={e => setPasswordConfirm(e.target.value)}
            sx={{ mb: 4 }}
          />

          {/*
          <Label htmlFor='dateOfBirth'>Date of Birth</Label>
          <DatePicker
            aria-label='Date of Birth'
            name='dateOfBirth'
            selected={dateOfBirth}
            onChange={date => setDateOfBirth(date)}
            sx={{
              display: 'flex',
              mb: 4,
              fontFamily: 'body',
              bg: 'secondary',
              borderStyle: 'solid',
              borderWidth: 3,
              borderRadius: 10,
              borderColor: 'text',
              px: 3,
              py: 2,
              color: 'text',
              fontSize: 3,
              outline: 'none',
            }}
            showYearDropdown
            scrollableYearDropdown
          />
          */}

          <Flex sx={{ width: '100%' }}>
            <Button sx={{ mb: 4, marginLeft: 'auto' }}>Let&apos;s go!</Button>
          </Flex>

          <Box sx={{ mb: 3 }}>
            <GatsbyLink
              to='/login/'
              sx={{
                color: 'primary',
              }}
            >
              Already have an account? Log in
            </GatsbyLink>
          </Box>
        </Box>
      </Container>
    </Layout>
  )
}

export default Register
