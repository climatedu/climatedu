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

  const visitDashboard = async e => {
    e.preventDefault()
    navigate('/dashboard/')
  }

  return (
    <Layout>
      <PageHeader primary='Account' />
      <Container>
        {user !== null ? (
          <Box>
            <Box
              sx={{
                maxWidth: 'container',
                m: 'auto',
                flexDirection: 'column',
              }}
            >
              <Button
                sx={{ width: '100%', m: 'auto 0'}}
                onClick={visitDashboard}
              >
                Visit course dashboard
              </Button>
            </Box>
          </Box>
        ) : null}
      </Container>
    </Layout>
  )
}

export default Account
