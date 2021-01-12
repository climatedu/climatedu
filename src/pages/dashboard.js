/** @jsx jsx */
import { Button, Box, Label, Input, jsx, Textarea, Flex } from 'theme-ui'
import { toast } from 'react-toastify'
import { navigate, useStaticQuery } from 'gatsby'
import React from 'react'

import Course from '../components/course'
import PageHeader from '../components/pageheader'
import Container from '../components/container'
import getFirebase from '../firebase'
import Progress from '../components/progress'

import db from '../util/db'

const Dashboard = () => {
  const {user, account} = db.useAuth(true)
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

  const data = useStaticQuery(graphql`
    {allMarkdownRemark(
      filter: { fileAbsolutePath: { glob: "**/course/*.md" } }
    ) {
      edges {
        node {
          frontmatter {
            unit
            title
            slug
            text
            highlight
            background
          }
        }
      }
    }}
  `)

  const units = data.allMarkdownRemark.edges
    .map(n => n.node)
    .sort((a, b) => a.frontmatter.unit - b.frontmatter.unit)

  const classCode = React.createRef()

  const handleJoinClass = async e => {
    e.preventDefault()
    try {
      await db.joinClass(user, classCode.current.value)
      classCode.current.value = ''
    } catch (err) {
      toast.error('Class does not exist.')
    }
  }

  return (
    <Course>
      <PageHeader primary='Welcome to your dashboard!' />
      <Container>
        {user !== null && account !== null ? (
          <Box
            sx={{
              maxWidth: 'container',
              m: 'auto',
              flexDirection: 'column',
            }}
          >
            <h1 sx={{mb: 3}}>Course progress</h1>
            <Progress data={units}/>
            <h1 sx={{mb: 3}}>Announcements</h1>
            <Box>fdsa</Box>
            <Flex sx={{display: ['block', 'block', 'flex']}}>
            <Box as='form' sx={{flex: '1 1 0', mr: [0, 0, 4]}}>
              <h1 sx={{mb: 3}}>Give us feedback</h1>
              <Textarea
                sx={{
                  width: ['100%'],
                  mb: 3,
                }}
                name='feedback'
                id='feedback'
                placeholder='Feedback'
                required='required'
              />
              <Button
                sx={{
                  cursor: 'pointer',
                }}
              >
                Send
              </Button>
            </Box>
            <Box onSubmit={handleJoinClass} as='form' sx={{flex: '1 1 0', ml: [0, 0, 4]}}>
              <h1 sx={{mb: 3}}>Join a class</h1>
              <Input
                sx={{
                  width: ['100%'],
                  mb: 3,
                }}
                name='coursecode'
                id='coursecode'
                placeholder='Class Code'
                required='required'
                ref={classCode}
              />
              <Button
                sx={{
                  cursor: 'pointer',
                }}
              >
                Join Class
              </Button>
            </Box>
            </Flex>
          </Box>
        ) : null}
      </Container>
    </Course>
  )
}

export default Dashboard
