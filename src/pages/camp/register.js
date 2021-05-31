/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Button, Box, Input, Flex, jsx, Label, Heading, Select } from 'theme-ui'
import { navigate, Link as GatsbyLink } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../../components/layout'
import PageHeader from '../../components/pageheader'
import Container from '../../components/container'

// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import firebase from 'firebase/app'
import useAuth from '../../util/auth'
import getFirebase from '../../firebase'

const Register = ({ data }) => {
  const user = useAuth()

  if (user) {
    navigate('/dashboard/')
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
      <PageHeader primary='CAMP CLIMATEDU 2021 Registration' />
      <Container>
        <Box
          as='form'
          onSubmit={normalLogin}
          sx={{
            m: 'auto',
            flexDirection: 'column',
          }}
        >
          <Heading
            as='h1'
            sx={{
              fontSize: 5,
              mb: 3,
              color: 'text',
            }}
          >
            Youth Information
          </Heading>

          <Flex
            sx={{
              justifyContent: 'flex-start',
              mb: 3,
            }}
          >
            <Box sx={{ mr: 4 }}>
              <Label htmlFor='name'>First Name</Label>
              <Input
                aria-label='firstname'
                name='firstname'
                value={name}
                onChange={handleSetName}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box sx={{ mr: 4 }}>
              <Label htmlFor='name'>Last Name</Label>
              <Input
                aria-label='lastname'
                name='lastname'
                value={name}
                onChange={handleSetName}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Label htmlFor='passwordConfirm'>Pronouns</Label>
              <Input
                aria-label='Confirm Password'
                name='passwordConfirm'
                type='password'
                value={passwordConfirm}
                onChange={handleSetPasswordConfirm}
                sx={{ mb: 4 }}
              />
            </Box>
          </Flex>

          <Flex
            sx={{
              justifyContent: 'flex',
              mb: 3,
            }}
          >
            <Box sx={{ mr: 4 }}>
              <Label htmlFor='email'>Phone Number</Label>
              <Input
                aria-label='Email'
                name='email'
                value={email}
                type='tel'
                onChange={handleSetEmail}
                sx={{ mb: 3, width: '100%' }}
              />
            </Box>

            <Box>
              <Label htmlFor='password'>Youth Email</Label>
              <Input
                aria-label='Password'
                name='password'
                type='password'
                value={password}
                onChange={handleSetPassword}
                sx={{ mb: 3 }}
              />
            </Box>
          </Flex>

          <Label htmlFor='passwordConfirm'>Location / Address</Label>
          <Input
            aria-label='Confirm Password'
            name='passwordConfirm'
            type='password'
            value={passwordConfirm}
            onChange={handleSetPasswordConfirm}
            sx={{ mb: 4 }}
          />

          <Flex
            sx={{
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Box sx={{ width: '48%' }}>
              <Label htmlFor='passwordConfirm'>
                School (2021-2022 School Year)
              </Label>
              <Input
                aria-label='Confirm Password'
                name='passwordConfirm'
                type='password'
                value={passwordConfirm}
                onChange={handleSetPasswordConfirm}
                sx={{ mb: 4 }}
              />
            </Box>

            <Box sx={{ width: '49%' }}>
              <Label htmlFor='passwordConfirm'>
                Grade (2021-2022 School Year)
              </Label>
              <Select
                aria-label='Confirm Password'
                name='passwordConfirm'
                type='password'
                value={passwordConfirm}
                onChange={handleSetPasswordConfirm}
                sx={{ mb: 4 }}
              >
                <option value='Kindergarten'>Kindergarten</option>
                <option value='1'>1</option>
                <option value='2'>2</option>
                <option value='3'>3</option>
                <option value='4'>4</option>
                <option value='5'>5</option>
                <option value='6'>6</option>
                <option value='7'>7</option>
                <option value='8'>8</option>
                <option value='9'>9</option>
                <option value='10'>10</option>
                <option value='11'>11</option>
                <option value='12'>12</option>
                <option value='Educator'>Educator</option>
                <option value='Other'>Other</option>
                <option value='' selected disabled hidden>
                  Select here
                </option>
              </Select>
            </Box>
          </Flex>

          <Flex sx={{ width: '100%' }}>
            <Button sx={{ mb: 4, marginLeft: 'auto' }}>Let&apos;s go!</Button>
          </Flex>
        </Box>
      </Container>
    </Layout>
  )
}

export default Register
