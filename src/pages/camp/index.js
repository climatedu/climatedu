import React from 'react'
import { Button, Flex } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'

import Layout from '../../components/layout'
import PageHeader from '../../components/pageheader'
import Container from '../../components/container'

const Camp = () => {
  return (
    <Layout>
      <PageHeader primary='CAMP CLIMATEDU 2021' />
      <Container>
        camp time oh yeah
        <Flex sx={{ width: '100%', my: 4, justifyContent: 'left' }}>
          <GatsbyLink to='/camp/register'>
            <Button> Register!</Button>
          </GatsbyLink>
        </Flex>
      </Container>
    </Layout>
  )
}

export default Camp
