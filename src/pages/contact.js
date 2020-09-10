/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Redirect } from '@reach/router'
import {
  Button,
  Text,
  Box,
  Label,
  Input,
  Select,
  Textarea,
  jsx,
} from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

import getFirebase from '../firebase'

export default function login() {
  const firebaseApp = getFirebase()

  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(null)

  const [name, setName] = useState('')
  const handleSetName = useCallback(e => setName(e.target.value), [name])

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback(e => setEmail(e.target.value), [email])

  const [type, setType] = useState('Student')
  const handleSetType = useCallback(e => setType(e.target.value), [type])

  const [comment, setComment] = useState('')
  const handleSetComment = useCallback(e => setComment(e.target.value), [
    comment,
  ])

  const [formSubmit, setFormSubmit] = useState(false)

  const submitContactForm = useCallback(
    e => {
      if (!firebaseApp) return
      
      e.preventDefault()

      setError('')

      if (name === '' || email === '' || type === '' || comment === '') {
        setError('One or more fields are missing.')
        return
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Invalid email.')
        return
      }

      firebaseApp
        .firestore()
        .collection('contact')
        .add({
          name: name,
          email: email,
          type: type,
          comment: comment,
        })
        .then(() => {
          setSuccess('Successfully submitted contact form!')
          setTimeout(setFormSubmit.bind(null, true), 1500)
        })
        .catch(() => {
          setError('Firebase error, please try again.')
        })
    },
    [name, email, type, comment]
  )

  if (formSubmit) {
    return <Redirect to='/' noThrow />
  }

  return (
    <Layout>
      <PageHeader primary='Contact Us' />
      <Container>
        <Box as='form'>
          <Label htmlFor='name'>
            Name
          </Label>
          <Input
            sx={{
              width: ['100%', null, '50%'],
              mb: 3,
            }}
            name='name'
            value={name}
            onChange={handleSetName}
            required='required'
          />

          <Label htmlFor='email' sx={{ fontSize: [4, 5] }}>
            Email
          </Label>
          <Input
            sx={{
              width: ['100%', null, '50%'],
              mb: 3,
            }}
            name='email'
            value={email}
            onChange={handleSetEmail}
            required='required'
            type='email'
          />

          <Label htmlFor='type' sx={{ fontSize: [4, 5] }}>
            I&apos;m a...
          </Label>
          <Select
            sx={{
              width: ['100%', '50%', '25%'],
              mb: 3,
              fontSize: [3, 4],
            }}
            name='type'
            value={type}
            onChange={handleSetType}
            required='required'
          >
            <option sx={{ fontSize: [3, 4] }}>Student</option>
            <option sx={{ fontSize: [3, 4] }}>Teacher</option>
          </Select>

          <Label htmlFor='comment' sx={{ fontSize: [4, 5] }}>
            Tell us your thoughts
          </Label>
          <Textarea
            name='comment'
            rows={8}
            value={comment}
            onChange={handleSetComment}
            sx={{
              mb: 3,
            }}
            required='required'
          />
          <Button
            onClick={submitContactForm}
            sx={{
              cursor: 'pointer',
              fontSize: [4, 5],
            }}
          >
            Submit
          </Button>
          <Text
            sx={{
              fontSize: [4, 5],
              color: 'red',
              marginTop: [1, 2],
              marginBottom: [3, 4],
              textAlign: 'left',
            }}
          >
            {error}
          </Text>
          <Text
            sx={{
              fontSize: [4, 5],
              color: 'success',
              marginTop: [1, 2],
              marginBottom: [3, 4],
              textAlign: 'left',
            }}
          >
            {success}
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}
