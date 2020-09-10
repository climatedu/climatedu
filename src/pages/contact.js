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
import { toast } from 'react-toastify';

import getFirebase from '../firebase'

export default function login() {
  const firebaseApp = getFirebase()

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

      if (name === '' || email === '' || type === '' || comment === '') {
        toast.error('One or more fields are missing.')
        return
      }

      if (!/\S+@\S+\.\S+/.test(email)) {
        toast.error('Invalid email.')
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
          toast.success('Successfully submitted!')
          setEmail('')
          setName('')
          setComment('')
        })
        .catch(() => {
          toast.error('Something went wrong. Let us know at hello@climatedu.org.')
        })
    },
    [name, email, type, comment]
  )

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

          <Label htmlFor='email'>
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

          <Label htmlFor='type'>
            I&apos;m a...
          </Label>
          <Select
            sx={{
              width: ['100%', '50%', '25%'],
              mb: 3,
            }}
            name='type'
            value={type}
            onChange={handleSetType}
            required='required'
          >
            <option>Student</option>
            <option>Teacher</option>
          </Select>

          <Label htmlFor='comment'>
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
            }}
          >
            Submit
          </Button>
        </Box>
      </Container>
    </Layout>
  )
}
