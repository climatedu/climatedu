/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Button, Box, Input, Flex, jsx, Label } from 'theme-ui'
import { navigate, Link as GatsbyLink } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import firebase from 'firebase/app'
import useAuth from '../util/auth'
import getFirebase from '../firebase'

const Register = ({ data }) => {
  const user = useAuth()

  if (user) {
    navigate('/account/')
  }

  const firebaseApp = getFirebase()

  const [type, setType] = useState('Student')
  const handleSetType = useCallback(e => {
    e.preventDefault()

    setType(e.target.value)
  }, [])

  const [name, setName] = useState('')
  const handleSetName = useCallback(e => setName(e.target.value), [])

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback(e => setEmail(e.target.value), [])

  const [password, setPassword] = useState('')
  const handleSetPassword = useCallback(e => setPassword(e.target.value), [])

  const [passwordConfirm, setPasswordConfirm] = useState('')
  const handleSetPasswordConfirm = useCallback(
    e => setPasswordConfirm(e.target.value),
    []
  )

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

      const userNew = firebase.auth().currentUser

      await userNew.updateProfile({
        displayName: name,
      })

      console.log(name)
      console.log(userNew.uid)

      await firebaseApp
        .firestore()
        .collection('accounts')
        .doc(userNew.uid)
        .set({
          type: type,
          name: name,
        })

      toast.success('Signed up!')

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
          <Label htmlFor='typeSelection'>I&apos;m a...</Label>
          <Flex
            sx={{
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Button
              variant={type === 'Student' ? 'darkened' : 'looksLikeAnInput'}
              sx={{
                fontSize: 3,
                cursor: 'pointer',
              }}
              onClick={handleSetType}
              value='Student'
            >
              Student
            </Button>

            <Button
              variant={type === 'Teacher' ? 'darkened' : 'looksLikeAnInput'}
              sx={{
                fontSize: 3,
                cursor: 'pointer',
              }}
              onClick={handleSetType}
              value='Teacher'
            >
              Teacher
            </Button>
          </Flex>

          <Label htmlFor='name'>Name</Label>
          <Input
            aria-label='Name'
            name='email'
            value={name}
            onChange={handleSetName}
            sx={{ mb: 3 }}
          />

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

          <Label htmlFor='passwordConfirm'>Confirm Password</Label>
          <Input
            aria-label='Confirm Password'
            name='passwordConfirm'
            type='password'
            value={passwordConfirm}
            onChange={handleSetPasswordConfirm}
            sx={{ mb: 4 }}
          />

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
