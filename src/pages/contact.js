/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Button, Text, Box, Input, Select, Textarea, jsx } from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

import firebase from 'firebase/app'
import useFirebase from '../firebase/useFirebase'
import useAuth from '../util/auth'

export default function login() {
  const firebaseApp = useFirebase()
  const [error, setError] = useState(null)

  const [name, setName] = useState('')
  const handleSetName = useCallback(e => setName(e.target.value), [])

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback(e => setEmail(e.target.value), [])

  const [type, setType] = useState('')
  const handleSetType = useCallback(e => setType(e.target.value), [])

  const [comment, setComment] = useState('')
  const handleSetComment = useCallback(e => setComment(e.target.value), [])

  const submitContactForm = useCallback(() => {})

  return (
    <Layout>
      <PageHeader primary='Contact Us' />
      <Container>
        <Box as='form'>
          <Input
            sx={{
              width: ['100%', null, '50%'],
              mb: 3,
            }}
            name='name'
            placeholder='Name'
            value={name}
            onChange={handleSetName}
          />

          <Input
            sx={{
              width: ['100%', null, '50%'],
              mb: 3,
            }}
            name='email'
            placeholder='Email'
            value={email}
            onChange={handleSetEmail}
          />

          <Select
            sx={{
              width: ['100%', '50%', '25%'],
              mb: 3,
            }}
            name='type'
            value={type}
            onChange={handleSetType}
          >
            <option value=''>I&apos;m a...</option>
            <option>Student</option>
            <option>Teacher</option>
          </Select>

          <Textarea
            name='comment'
            placeholder='Tell us your thoughts'
            rows={8}
            value={comment}
            onChange={handleSetComment}
            sx={{
              mb: 3,
            }}
          />
          <Button
            onClick={submitContactForm}
            sx={{
              cursor: 'pointer',
              mb: 3,
            }}
          >
            Submit
          </Button>
          <Text sx={{ color: 'error', marginTop: 20, textAlign: 'center' }}>
            {error}
          </Text>
        </Box>
      </Container>
    </Layout>
  )
}
