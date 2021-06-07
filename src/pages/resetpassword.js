/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Button, Box, Input, Flex, jsx, Label } from 'theme-ui'
import { navigate } from 'gatsby'
import { toast } from 'react-toastify'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import getFirebase from '../firebase'

const ResetPassword = () => {
  const firebaseApp = getFirebase()

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback(e => setEmail(e.target.value), [])

  const resetPassword = async e => {
    e.preventDefault()
    if (!firebaseApp) return
    const emailAddress = email
    try {
      await firebaseApp.auth().sendPasswordResetEmail(emailAddress)
      toast.success(
        'A password reset email has been sent to ' + emailAddress + '!'
      )

      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <Layout>
      <PageHeader primary='Reset Password' />
      <Container>
        <Box
          as='form'
          onSubmit={resetPassword}
          sx={{
            maxWidth: 'smallContainer',
            m: 'auto',
            flexDirection: 'column',
          }}
        >
          <Label htmlFor='email'>Email</Label>
          <Input
            aria-label='Email'
            name='email'
            value={email}
            onChange={handleSetEmail}
            sx={{ mb: 3 }}
          />

          <Flex sx={{ width: '100%' }}>
            <Button sx={{ mb: 4, marginLeft: 'auto' }}>Submit</Button>
          </Flex>
        </Box>
      </Container>
    </Layout>
  )
}

export default ResetPassword
