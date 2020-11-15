/** @jsx jsx */
import { Button, Box, jsx } from 'theme-ui'
import { toast } from 'react-toastify'
import { navigate } from 'gatsby'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'
import getFirebase from '../firebase'

import useAuth from '../util/auth'

const Account = ({ data }) => {
  const user = useAuth(true)
  const firebaseApp = getFirebase()

  const logout = async e => {
    e.preventDefault()
    try {
      await firebaseApp.auth().signOut()
      toast.success('Logged out!')
      navigate('/')
    } catch (e) {
      toast.error(e.message)
    }
  }

  return (
    <Layout>
      <PageHeader primary='Account' />
      <Container>
        {user !== null ? (
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
        ) : null}
      </Container>
    </Layout>
  )
}

export default Account
