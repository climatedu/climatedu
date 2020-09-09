/** @jsx jsx */
import { useState } from 'react'
import { Button, Flex, Input, Heading, Text, jsx } from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

import getFirebase from '../firebase'

const Login = ({ data }) => {
  const firebaseApp = getFirebase()

  const [error, setError] = useState('')
  const [email, setEmail] = useState('')

  const onSubmit = async e => {
    e.preventDefault()
    if (!firebaseApp) return

    /* TODO: use toasts? */
    try {
      await firebaseApp.firestore().collection('reminders').add({ email })
      setError('Submitted!')
    } catch (e) {
      setError(e.message)
    }
  }

  return (
    <Layout>
      <PageHeader
        primary='Login'
        secondary="We're still building this course. Come back and join us soon!"
      />
      <Container>
        <Heading
          sx={{
            textAlign: 'center',
            mb: 3,
          }}
        >
          Leave your email, and we&apos;ll remind you:
        </Heading>
        <Flex
          as='form'
          sx={{
            maxWidth: 300,
            m: 'auto',
            flexDirection: 'column',
          }}
        >
          <Input
            aria-label='Email'
            value={email}
            onChange={e => setEmail(e.target.value)}
            sx={{ mb: 3 }}
          />
          <Button onClick={onSubmit} sx={{ mb: 3 }}>
            Submit
          </Button>
          <Text sx={{ color: 'red' }}>{error}</Text>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Login
