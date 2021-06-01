/** @jsx jsx */
import { useCallback, useState } from 'react'
import {
  Button,
  Box,
  Input,
  Flex,
  jsx,
  Label,
  Heading,
  Select,
  Checkbox,
  Radio,
} from 'theme-ui'
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

const CampRegister = ({ data }) => {
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

    toast.error('not implemented yet :)')
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
                defaultvalue={-1}
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
                <option value='-1' disabled hidden>
                  Select here
                </option>
              </Select>
            </Box>
          </Flex>

          <Label>Ethnicity</Label>

          <Box sx={{ mb: 4 }}>
            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Asian
            </Label>
            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Pacific Islander
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Hispanic / Latino
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> White
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} />American Indian / Native American
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Black / African-American
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Multi-Racial
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Prefer not to answer
            </Label>

            <Label>
              <Checkbox onChange={() => { console.log(1) }} /> Other
            </Label>
          </Box>

          <Heading
            as='h1'
            sx={{
              fontSize: 5,
              mb: 3,
              color: 'text',
            }}
          >
            Parent Information
          </Heading>

          <Flex
            sx={{
              justifyContent: 'flex-start',
              mb: 3,
            }}
          >
            <Box sx={{ mr: 4 }}>
              <Label htmlFor='name'>Parent / Legal Guardian Name</Label>
              <Input
                aria-label='firstname'
                name='firstname'
                value={name}
                onChange={handleSetName}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box sx={{ mr: 4 }}>
              <Label htmlFor='name'>Parent / Legal Guardian Email</Label>
              <Input
                aria-label='lastname'
                name='lastname'
                value={name}
                onChange={handleSetName}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Label htmlFor='passwordConfirm'>
                Parent / Legal Guardian Cell Phone
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
          </Flex>

          <Heading
            as='h1'
            sx={{
              fontSize: 5,
              mb: 3,
              color: 'text',
            }}
          >
            Parent Permission and Consent
          </Heading>
          <Box sx={{ mb: 3 }}>
            <Label htmlFor='name' sx={{ mb: 2 }}>
              I grant permission to climatedu, to use my child's image or work for use in climatedu publications, for educational, promotional, documentation, and other related purposes in any media. I hereby waive any right to inspect or approve the finished photographs or electronic matter that may be used in conjunction with them now or in the future, whether that use is known to me or unknown, and I waive any right to royalties or other compensation arising from or related to the use of the image.
            </Label>
            <Label>
              <Radio name='dark-mode' value='yes' />
              YES, I give consent for climatedu to use photos, videos, and stories of my child for the purposes described above.
            </Label>
            <Label>
              <Radio name='dark-mode' value='no' />
              NO, I do not give consent for climatedu to use photos, videos, and stories of my child for the purposes described above.
            </Label>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Label htmlFor='name' sx={{ mb: 2 }}>
              By signing this form, I give permission for my child to enroll in climatedu's Climate Camp and participate in extracurricular activities that are part of the summer program during June 2021 through August 2021.
            </Label>
            <Box>
              <Label htmlFor='passwordConfirm'>
                Parent Electronic Signature (First and Last Name)
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
          </Box>
          <Flex sx={{ width: '100%' }}>
            <Button sx={{ mb: 4, marginLeft: 'auto' }}>Let&apos;s go!</Button>
          </Flex>
        </Box>
      </Container>
    </Layout>
  )
}

export default CampRegister
