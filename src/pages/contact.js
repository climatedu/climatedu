/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Button, Box, Label, Input, Select, Textarea, jsx } from 'theme-ui'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'
import { toast } from 'react-toastify'

import getFirebase from '../firebase'

export default function Contact() {
  const firebaseApp = getFirebase()

  const [name, setName] = useState('')
  const handleSetName = useCallback(e => setName(e.target.value), [])

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback(e => setEmail(e.target.value), [])

  const [type, setType] = useState('Student')
  const handleSetType = useCallback(e => setType(e.target.value), [])

  const [comment, setComment] = useState('')
  const handleSetComment = useCallback(e => setComment(e.target.value), [])

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
          navigate('/')
        })
        .catch(() => {
          toast.error(
            'Something went wrong. Let us know at hello@climatedu.org.'
          )
        })
    },
    [firebaseApp, name, email, type, comment]
  )

  return (
    <Layout>
      <PageHeader primary='Contact Us' />
      <Container>
        <Box as='form' onSubmit={submitContactForm}>
          <Label htmlFor='name'>Name</Label>
          <Input
            sx={{
              width: ['100%', null, '50%'],
              mb: 3,
            }}
            name='name'
            id='name'
            value={name}
            onChange={handleSetName}
            required='required'
          />

          <Label htmlFor='email'>Email</Label>
          <Input
            sx={{
              width: ['100%', null, '50%'],
              mb: 3,
            }}
            name='email'
            id='email'
            value={email}
            onChange={handleSetEmail}
            required='required'
            type='email'
          />

          <Label htmlFor='type'>I&apos;m a...</Label>
          <Select
            sx={{
              width: ['100%', '50%', '25%'],
              mb: 3,
            }}
            name='type'
            id='type'
            value={type}
            onChange={handleSetType}
            required='required'
          >
            <option>Student</option>
            <option>Teacher</option>
          </Select>

          <Label htmlFor='comment'>Tell us your thoughts</Label>
          <Textarea
            name='comment'
            id='comment'
            rows={8}
            value={comment}
            onChange={handleSetComment}
            sx={{
              mb: 3,
            }}
            required='required'
          />
          <Button
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
