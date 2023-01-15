import React from 'react'
import { Button, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

import PageHeader from '../components/pageheader'
import Container from '../components/container'

const Page404 = () => {
  return (
    <>
      <PageHeader primary='404: page not found' />
      <Container>
        Whoops! Something is broken. This page does not exist, but you can
        navigate back to our homepage if you like seeing us so much :)
        <Flex sx={{ width: '100%', my: 4, justifyContent: 'center' }}>
          <GatsbyLink to='/'>
            <Button> Take me home!</Button>
          </GatsbyLink>
        </Flex>
      </Container>
    </>
  )
}

export default Page404
