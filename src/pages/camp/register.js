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

  const [state, setState] = useState({})
  const [ethnicity, setEthnicity] = useState({})

  const handleInputChange = useCallback(e => {
    const target = e.target
    const name = target.name
    const value = target.value

    setState(o => ({
      ...o,
      [name]: value,
    }))
  }, [])

  const handleCheckboxChange = useCallback(e => {
    const target = e.target
    const value = target.value

    setEthnicity(o => ({
      ...o,
      [value]: target.checked,
    }))
  }, [])

  const normalLogin = async e => {
    e.preventDefault()
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
              <Label htmlFor='youth_firstname'>First Name</Label>
              <Input
                aria-label='First Name'
                name='youth_firstname'
                value={state.youth_firstname || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box sx={{ mr: 4 }}>
              <Label htmlFor='youth_lastname'>Last Name</Label>
              <Input
                aria-label='Last Name'
                name='youth_lastname'
                value={state.youth_lastname || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Label htmlFor='youth_pronouns'>Pronouns</Label>
              <Input
                aria-label='Pronouns'
                name='youth_pronouns'
                value={state.youth_pronouns || ''}
                onChange={handleInputChange}
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
              <Label htmlFor='youth_phone'>Phone Number</Label>
              <Input
                aria-label='Phone'
                name='youth_phone'
                value={state.youth_phone || ''}
                type='tel'
                onChange={handleInputChange}
                sx={{ mb: 3, width: '100%' }}
              />
            </Box>

            <Box>
              <Label htmlFor='youth_email'>Youth Email</Label>
              <Input
                aria-label='Email'
                name='youth_email'
                value={state.youth_email || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>
          </Flex>

          <Label htmlFor='youth_location'>Location / Address</Label>
          <Input
            aria-label='Location / Address'
            name='youth_location'
            value={state.youth_location || ''}
            onChange={handleInputChange}
            sx={{ mb: 4 }}
          />

          <Flex
            sx={{
              justifyContent: 'space-between',
              mb: 3,
            }}
          >
            <Box sx={{ width: '48%' }}>
              <Label htmlFor='youth_school'>
                School (2021-2022 School Year)
              </Label>
              <Input
                aria-label='School (2021-2022 School Year)'
                name='youth_school'
                value={state.youth_school || ''}
                onChange={handleInputChange}
                sx={{ mb: 4 }}
              />
            </Box>

            <Box sx={{ width: '49%' }}>
              <Label htmlFor='youth_grade'>Grade (2021-2022 School Year)</Label>
              <Select
                aria-label='Grade (2021-2022 School Year)'
                name='youth_grade'
                value={state.youth_grade || '-1'}
                onChange={handleInputChange}
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
                <option value='-1' disabled hidden>
                  Select here
                </option>
              </Select>
            </Box>
          </Flex>
          <Label>Ethnicity</Label>

          <Box sx={{ mb: 4, position: 'relative' }}>
            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='asian'
                onChange={handleCheckboxChange}
                checked={ethnicity.asian || false}
              />
              <Label htmlFor='youth_ethnicity'>Asian</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='pacific_islander'
                onChange={handleCheckboxChange}
                checked={ethnicity.pacific_islander || false}
              />
              <Label htmlFor='youth_ethnicity'>Pacific Islander</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='hispanic_latino'
                onChange={handleCheckboxChange}
                checked={ethnicity.hispanic_latino || false}
              />
              <Label htmlFor='youth_ethnicity'>Hispanic / Latino</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='white'
                onChange={handleCheckboxChange}
                checked={ethnicity.white || false}
              />
              <Label htmlFor='youth_ethnicity'>White</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='american_indian_native_american'
                onChange={handleCheckboxChange}
                checked={ethnicity.american_indian_native_american || false}
              />
              <Label htmlFor='youth_ethnicity'>
                American Indian / Native American
              </Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='black_african_american'
                onChange={handleCheckboxChange}
                checked={ethnicity.black_african_american || false}
              />
              <Label htmlFor='youth_ethnicity'>Black / African-American</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='multi_racial'
                onChange={handleCheckboxChange}
                checked={ethnicity.multi_racial || false}
              />
              <Label htmlFor='youth_ethnicity'>Multi-Racial</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='noanswer'
                onChange={handleCheckboxChange}
                checked={ethnicity.noanswer || false}
              />
              <Label htmlFor='youth_ethnicity'>Prefer not to answer</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='other'
                onChange={handleCheckboxChange}
                checked={ethnicity.other || false}
              />
              <Label htmlFor='youth_ethnicity'>Other</Label>
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
              <Label htmlFor='parent_name'>Parent / Legal Guardian Name</Label>
              <Input
                aria-label='Parent / Legal Guardian Name'
                name='parent_name'
                value={state.parent_name || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box sx={{ mr: 4 }}>
              <Label htmlFor='parent_email'>
                Parent / Legal Guardian Email
              </Label>
              <Input
                aria-label='Parent / Legal Guardian Email'
                name='parent_email'
                value={state.parent_email}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <Label htmlFor='passwordConfirm'>
                Parent / Legal Guardian Cell Phone
              </Label>
              <Input
                aria-label='Parent / Legal Guardian Cell Phone'
                name='parent_phone'
                value={state.parent_phone || ''}
                onChange={handleInputChange}
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
          <Box sx={{ mb: 3, position: 'relative' }}>
            <Box sx={{ mb: 2 }}>
              I grant permission to climatedu, to use my child&apos;s image or
              work for use in climatedu publications, for educational,
              promotional, documentation, and other related purposes in any
              media. I hereby waive any right to inspect or approve the finished
              photographs or electronic matter that may be used in conjunction
              with them now or in the future, whether that use is known to me or
              unknown, and I waive any right to royalties or other compensation
              arising from or related to the use of the image.
            </Box>
            <Label>
              <Radio
                name='parent_consent'
                value='yes'
                onChange={handleInputChange}
              />
              YES, I give consent for climatedu to use photos, videos, and
              stories of my child for the purposes described above.
            </Label>
            <Label>
              <Radio
                name='parent_consent'
                value='no'
                onChange={handleInputChange}
              />
              NO, I do not give consent for climatedu to use photos, videos, and
              stories of my child for the purposes described above.
            </Label>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Box sx={{ mb: 2 }}>
              By signing this form, I give permission for my child to enroll in
              climatedu&apos;sClimate Camp and participate in extracurricular
              activities that are part of the summer program during June 2021
              through August 2021.
            </Box>
            <Box>
              <Label htmlFor='parent_signature'>
                Parent Electronic Signature (First and Last Name)
              </Label>
              <Input
                aria-label='Parent Electronic Signature (First and Last Name)'
                name='parent_signature'
                value={state.parent_signature || ''}
                onChange={handleInputChange}
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
