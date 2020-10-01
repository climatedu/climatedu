/** @jsx jsx */
import { Button, Box, jsx } from 'theme-ui'
import { Redirect } from '@reach/router'
import { toast } from 'react-toastify'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

import useAuth from '../util/auth'

const Account = ({ data }) => {
  const user = useAuth()

  const logout = async e => {
    e.preventDefault()
    try {
      await user.signOut()
      console.log(1)
      toast.success('Logged out!')
    } catch (e) {
      toast.error('aaasa')
    }
  }

  if (user === null) {
    return <Redirect to='/' noThrow />
  }

  return (
    <Layout>
      <PageHeader primary='Account' />
      <Container>
        <Box
          sx={{
            maxWidth: 'container',
            m: 'auto',
            flexDirection: 'column',
          }}
        >
          <Button
            variant='danger'
            sx={{ width: '50%', m: 'auto 0' }}
            onClick={logout}
          >
            Logout {user.displayName}
          </Button>
        </Box>
      </Container>
    </Layout>
  )
}

export default Account
