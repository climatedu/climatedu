/** @jsx jsx */
import { Button, Flex, Input, Heading, jsx } from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

const Login = ({ data }) => {
  return (
    <Layout>
      <PageHeader
        primary='Login'
        secondary="We're still building this course. Come back and join us in October!"
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
            placeholder='Email'
            sx={{
              mb: 3,
            }}
          />
          <Button>Submit</Button>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Login
