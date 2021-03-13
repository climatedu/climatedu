/** @jsx jsx */
import { Button, Box, Input, jsx, Textarea, Flex } from 'theme-ui'
import { toast } from 'react-toastify'
import { graphql, useStaticQuery } from 'gatsby'
import React from 'react'

import Course from '../components/course'
import PageHeader from '../components/pageheader'
import Container from '../components/container'
import Progress from '../components/progress'
import Dropdown from '../components/dropdown'

import db from '../util/db'

const Dashboard = () => {
  const { user, account, classroom, students } = db.useAuth(true)

  const data = useStaticQuery(graphql`
    {
      allMarkdownRemark(
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
      }
    }
  `)

  const units = data.allMarkdownRemark.edges
    .map(n => n.node)
    .sort((a, b) => a.frontmatter.unit - b.frontmatter.unit)

  const classCode = React.useRef()

  const handleJoinClass = async e => {
    e.preventDefault()
    try {
      await db.joinClass(user, classCode.current.value)
      classCode.current.value = ''
      toast.success('Successfully joined class!')
    } catch (err) {
      toast.error('Class does not exist.')
    }
  }

  const feedbackBox = React.useRef()

  const handleLeaveFeedback = async e => {
    e.preventDefault()
    try {
      await db.leaveFeedback(user, feedbackBox.current.value)
      feedbackBox.current.value = ''
      toast.success("We've received your feedback!")
    } catch (err) {
      toast.error(
        'Error leaving feedback, please try again later or manually contact us.'
      )
    }
  }

  const teacherClassTitle = React.useRef()
  const teacherClassCode = React.useRef()

  const handleCreateClass = async e => {
    e.preventDefault()
    try {
      await db.createClass(
        user,
        teacherClassTitle.current.value,
        teacherClassCode.current.value
      )
      await db.joinClass(user, teacherClassCode.current.value)
      teacherClassTitle.current.value = ''
      teacherClassCode.current.value = ''
      toast.success('Classroom created!')
    } catch (err) {
      toast.error(
        'A classroom is already using that code. Please choose a different one.'
      )
    }
  }

  const classInput = (
    <Box onSubmit={handleJoinClass} as='form'>
      {classroom === null ? <h1 sx={{ mb: 3 }}>Join a class</h1> : <h1 />}
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
  )

  console.log()

  return (
    <Course>
      <PageHeader primary='Welcome to your dashboard!' />
      <Container>
        <Box
          sx={{
            maxWidth: 'container',
            m: 'auto',
            mb: 4,
            flexDirection: 'column',
          }}
        >
          {user !== null && account !== null ? (
            account.type === 'Student' ? (
              <>
                <h1 sx={{ mb: 3 }}>Course progress</h1>
                <Progress data={units} account={account} />
                <h1 sx={{ mb: 3 }}>Announcements</h1>
                <Box>No announcements for now!</Box>
                <Flex sx={{ display: ['block', 'block', 'flex'] }}>
                  <Box
                    onSubmit={handleLeaveFeedback}
                    as='form'
                    sx={{ flex: '1 1 0', mr: [0, 0, 4] }}
                  >
                    <h1 sx={{ mb: 3 }}>Give us feedback</h1>
                    <Textarea
                      sx={{
                        width: ['100%'],
                        mb: 3,
                      }}
                      name='feedback'
                      id='feedback'
                      placeholder='Feedback'
                      required='required'
                      ref={feedbackBox}
                    />
                    <Button
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      Send
                    </Button>
                  </Box>
                  <Box sx={{ flex: '1 1 0', ml: [0, 0, 4] }}>
                    {classroom === null ? (
                      classInput
                    ) : (
                      <>
                        <h1 sx={{ mb: 3 }}>{classroom.title}</h1>
                        <Dropdown
                          text='Switch classes?'
                          textStyle={{ fontSize: 4, whiteSpace: 'pre-line' }}
                          contents={classInput}
                        />
                      </>
                    )}
                  </Box>
                </Flex>
              </>
            ) : account.type === 'Teacher' ? (
              classroom === null ? (
                <Box as='form' onSubmit={handleCreateClass}>
                  <h1 sx={{ mb: 3 }}>Create a classroom to get started.</h1>
                  <Input
                    sx={{
                      width: ['100%'],
                      mb: 3,
                    }}
                    name='classtitle'
                    id='classtitle'
                    placeholder='Class Title'
                    required='required'
                    ref={teacherClassTitle}
                  />
                  <Input
                    sx={{
                      width: ['100%'],
                      mb: 3,
                    }}
                    name='coursecode'
                    id='coursecode'
                    placeholder='Class Join Code'
                    required='required'
                    ref={teacherClassCode}
                  />
                  <p>
                    Make sure your class code is not guessable, so only your
                    students should be able to join.
                  </p>
                  <Button
                    sx={{
                      cursor: 'pointer',
                    }}
                  >
                    Create Class
                  </Button>
                </Box>
              ) : (
                <>
                  <h1>{classroom.title}</h1>
                  <h2 sx={{ fontWeight: 'normal' }}>
                    Join Code: {classroom.code}
                  </h2>
                  <h1>Students</h1>
                  {students
                    ? students.map(s => (
                        <Dropdown
                          key={s.id}
                          contents={<Progress data={units} account={s} />}
                          text={s.name}
                          textStyle={{ fontSize: 4, mb: 3 }}
                        />
                      ))
                    : null}
                  <h1 sx={{ mb: 3 }}>Announcements</h1>
                  <Box>No announcements for now!</Box>
                  <Box onSubmit={handleLeaveFeedback} as='form'>
                    <h1 sx={{ mb: 3 }}>Give us feedback</h1>
                    <Textarea
                      sx={{
                        width: ['100%'],
                        mb: 3,
                      }}
                      name='feedback'
                      id='feedback'
                      placeholder='Feedback'
                      required='required'
                      ref={feedbackBox}
                    />
                    <Button
                      sx={{
                        cursor: 'pointer',
                      }}
                    >
                      Send
                    </Button>
                  </Box>
                </>
              )
            ) : null
          ) : null}
        </Box>
      </Container>
    </Course>
  )
}

export default Dashboard
