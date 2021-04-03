import React from 'react'
import { Button, Flex } from 'theme-ui'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

const Page404 = () => {
  return (
    <Layout>
      <PageHeader primary='404: page not found' />
      <Container>
        Whoops! Something is broken. This page does not exist, but you can
        navigate back to our homepage if you like seeing us so much :)
        <Flex sx={{ width: '100%', my: 4 }}>
          <Button sx={{ margin: 'auto' }}>Take me home!</Button>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Page404
