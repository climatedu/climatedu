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
import { navigate } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../../components/layout'
import PageHeader from '../../components/pageheader'
import Container from '../../components/container'
import RequiredLabel from '../../components/requiredlabel'
import Link from '../../components/link'

import DatePicker from 'react-date-picker'

import getFirebase from '../../firebase'

const CampRegister = ({ data }) => {
  const firebaseApp = getFirebase()

  const [state, setState] = useState({})
  const [ethnicity, setEthnicity] = useState({})
  const [parentSignDate, setParentSignDate] = useState(new Date())

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

  // eslint-disable-next-line eqeqeq
  const checkFieldMissing = v => v == undefined || v === ''

  const register = useCallback(
    async e => {
      e.preventDefault()

      console.log(ethnicity)

      if (
        checkFieldMissing(state.youth_firstname) ||
        checkFieldMissing(state.youth_lastname) ||
        checkFieldMissing(state.youth_pronouns) ||
        checkFieldMissing(state.youth_phone) ||
        checkFieldMissing(state.youth_email) ||
        checkFieldMissing(state.youth_school) ||
        checkFieldMissing(state.youth_grade) ||
        checkFieldMissing(state.parent_name) ||
        checkFieldMissing(state.parent_email) ||
        checkFieldMissing(state.parent_phone) ||
        checkFieldMissing(state.parent_consent) ||
        checkFieldMissing(state.parent_signature) ||
        Object.values(ethnicity).every(e => e === false) ||
        checkFieldMissing(parentSignDate)
      ) {
        toast.error('Missing a required field.')
      }

      if (!/\S+@\S+\.\S+/.test(state.youth_email)) {
        toast.error('Invalid youth email.')
        return
      }

      if (!/\S+@\S+\.\S+/.test(state.parent_email)) {
        toast.error('Invalid parent email.')
        return
      }

      state.ethnicity = ethnicity
      state.parentSignDate = parentSignDate.getTime() / 1000

      firebaseApp
        .firestore()
        .collection('camp_registration')
        .add(state)
        .then(() => {
          toast.success('Successfully registered!')
          navigate('/')
        })
        .catch(() => {
          toast.error(
            'Something went wrong. Let us know at hello@climatedu.org.'
          )
        })
    },
    [state, ethnicity, parentSignDate, firebaseApp]
  )

  return (
    <Layout>
      <PageHeader primary='CAMP CLIMATEDU 2021 Registration' />
      <Container>
        <Box sx={{ mb: 4 }}>
          <Link
            to='/camp/'
            sx={{
              color: 'text',
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          >
            We&apos;re so excited to have you join us this summer! If you&apos;d
            like to learn more about the camp first, check out our information
            page here.
          </Link>
        </Box>
        <Box
          as='form'
          onSubmit={register}
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
              <RequiredLabel htmlFor='youth_firstname' text='First name' />
              <Input
                aria-label='First Name'
                name='youth_firstname'
                value={state.youth_firstname || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box sx={{ mr: 4 }}>
              <RequiredLabel htmlFor='youth_lastname' text='Last name' />
              <Input
                aria-label='Last Name'
                name='youth_lastname'
                value={state.youth_lastname || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <RequiredLabel htmlFor='youth_pronouns' text='Pronouns' />
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
              <RequiredLabel htmlFor='youth_phone' text='Phone Number' />
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
              <RequiredLabel htmlFor='youth_email' text='Email' />
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
              <RequiredLabel
                htmlFor='youth_school'
                text='School (2021-2022 School Year)'
              />
              <Input
                aria-label='School (2021-2022 School Year)'
                name='youth_school'
                value={state.youth_school || ''}
                onChange={handleInputChange}
                sx={{ mb: 4 }}
              />
            </Box>

            <Box sx={{ width: '49%' }}>
              <RequiredLabel
                htmlFor='youth_grade'
                text='Grade (2021-2022 School Year)'
              />
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

          <RequiredLabel htmlFor='youth_enthnicity' text='Ethnicity' />
          <Box sx={{ mb: 4, position: 'relative' }}>
            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='asian'
                id='youth_ethnicity_asian'
                onChange={handleCheckboxChange}
                checked={ethnicity.asian || false}
              />
              <Label htmlFor='youth_ethnicity_asian'>Asian</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='pacific_islander'
                id='youth_ethnicity_pacific_islander'
                onChange={handleCheckboxChange}
                checked={ethnicity.pacific_islander || false}
              />
              <Label htmlFor='youth_ethnicity_pacific_islander'>
                Pacific Islander
              </Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='hispanic_latino'
                id='youth_ethnicity_hispanic_latino'
                onChange={handleCheckboxChange}
                checked={ethnicity.hispanic_latino || false}
              />
              <Label htmlFor='youth_ethnicity_hispanic_latino'>
                Hispanic / Latino
              </Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='white'
                id='youth_ethnicity_white'
                onChange={handleCheckboxChange}
                checked={ethnicity.white || false}
              />
              <Label htmlFor='youth_ethnicity_white'>White</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='american_indian_native_american'
                id='youth_ethnicity_american_indian_native_american'
                onChange={handleCheckboxChange}
                checked={ethnicity.american_indian_native_american || false}
              />
              <Label htmlFor='youth_ethnicity_american_indian_native_american'>
                American Indian / Native American
              </Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='black_african_american'
                id='youth_ethnicity_black_african_american'
                onChange={handleCheckboxChange}
                checked={ethnicity.black_african_american || false}
              />
              <Label htmlFor='youth_ethnicity_black_african_american'>
                Black / African-American
              </Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='multi_racial'
                id='youth_ethnicity_multi_racial'
                onChange={handleCheckboxChange}
                checked={ethnicity.multi_racial || false}
              />
              <Label htmlFor='youth_ethnicity_multi_racial'>Multi-Racial</Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='noanswer'
                id='youth_ethnicity_noanswer'
                onChange={handleCheckboxChange}
                checked={ethnicity.noanswer || false}
              />
              <Label htmlFor='youth_ethnicity_noanswer'>
                Prefer not to answer
              </Label>
            </Label>

            <Label>
              <Checkbox
                name='youth_ethnicity'
                value='other'
                id='youth_ethnicity_other'
                onChange={handleCheckboxChange}
                checked={ethnicity.other || false}
              />
              <Label htmlFor='youth_ethnicity_other'>Other</Label>
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
              <RequiredLabel
                htmlFor='parent_name'
                text='Parent / Legal Guardian Name'
              />
              <Input
                aria-label='Parent / Legal Guardian Name'
                name='parent_name'
                value={state.parent_name || ''}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box sx={{ mr: 4 }}>
              <RequiredLabel
                htmlFor='parent_email'
                text='Parent / Legal Guardian Email'
              />
              <Input
                aria-label='Parent / Legal Guardian Email'
                name='parent_email'
                value={state.parent_email}
                onChange={handleInputChange}
                sx={{ mb: 3 }}
              />
            </Box>

            <Box>
              <RequiredLabel
                htmlFor='parent_phone'
                text='Parent / Legal Guardian Cell Phone'
              />
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
            <RequiredLabel
              sx={{ mb: 2 }}
              htmlFor='parent_consent'
              text="I grant permission to climatedu, to use my
              child's image or work for use in climatedu publications, for educational,
              promotional, documentation, and other related purposes in any
              media. I hereby waive any right to inspect or approve the finished
              photographs or electronic matter that may be used in conjunction
              with them now or in the future, whether that use is known to me or
              unknown, and I waive any right to royalties or other compensation
              arising from or related to the use of the image."
            />
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
            <Flex sx={{ flexWrap: 'wrap', justifyContent: 'space-between' }}>
              <Flex sx={{ flexWrap: 'nowrap', width: 'auto' }}>
                <Label
                  htmlFor='parent_signature'
                  sx={{
                    position: 'sticky',
                    bottom: 0,
                  }}
                >
                  <RequiredLabel
                    sx={{ paddingRight: 2 }}
                    text='Parent Electronic Signature (First and Last Name)'
                  />
                </Label>
                <Input
                  aria-label='Parent Electronic Signature (First and Last Name)'
                  name='parent_signature'
                  value={state.parent_signature || ''}
                  onChange={handleInputChange}
                  sx={{ mb: 4 }}
                />
              </Flex>
              <Box>
                <DatePicker
                  sx={{
                    py: 2,
                    paddingLeft: 2,
                    paddingRight: 1,
                    fontFamily: 'body',
                    color: 'text',
                    fontSize: 3,
                  }}
                  onChange={setParentSignDate}
                  value={parentSignDate}
                />
                <span style={{ color: 'red' }}>*</span>
              </Box>
            </Flex>
          </Box>

          <Box sx={{ paddingBottom: 3 }}>
            <span style={{ color: 'red' }}>*</span>Required fields
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
