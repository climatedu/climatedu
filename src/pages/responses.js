/** @jsx jsx */
import { Button, Box, Label, Input, jsx, Textarea, Flex, Grid } from 'theme-ui'
import { toast } from 'react-toastify'
import { navigate, useStaticQuery } from 'gatsby'
import React from 'react'

import Course from '../components/course'
import PageHeader from '../components/pageheader'
import Container from '../components/container'
import getFirebase from '../firebase'
import Dropdown from '../components/dropdown'

import db from '../util/db'

const Responses = ({ location }) => {
  const params = new URLSearchParams(location.search)
  const { user, account, classroom, students } = db.useAuth(true)
  const firebaseApp = getFirebase()

  const data = useStaticQuery(graphql`
    {
      courseYaml {
        questions {
          unit
          key
          prompt
        }
      }
    }
  `)

  const questions = data.courseYaml.questions

  let responses = db.useResponses(params.get('student'), params.get('unit'))

  const handleLeaveFeedback = async function (e) {
    e.preventDefault()

    try {
      await db.teacherFeedback(
        params.get('student'),
        params.get('unit'),
        this.key,
        e.target.elements.feedback.value
      )
      toast.success('The student can now see your feedback!')
    } catch (err) {
      toast.error('Error leaving feedback.')
    }
  }

  return (
    <Course>
      <PageHeader primary={'Unit ' + params.get('unit') + ' Responses'} />
      <Container>
        <Box
          sx={{
            maxWidth: 'container',
            m: 'auto',
            mb: 4,
            flexDirection: 'column',
          }}
        >
          {user !== null && account !== null
            ? account.type === 'Student' || account.type === 'Teacher'
              ? questions
                  .filter(q => q.unit == params.get('unit'))
                  .map(question => (
                    <React.Fragment
                      key={question.key}
                    >
                      <h3 sx={{ mb: 4 }}>{question.prompt}</h3>
                      <Flex sx={{ display: ['block', 'block', 'flex'] }}>
                        <Box sx={{ flex: '1 1 0', mr: [0, 0, 4], mb: 4 }}>
                          {responses?.[question.key] ? (
                            <Box as='span' sx={{ whiteSpace: 'pre-wrap' }}>
                              <strong sx={{ display: 'block', mb: 2 }}>
                                {account.type === 'Student'
                                  ? 'Your'
                                  : 'Student'}{' '}
                                response:
                              </strong>
                              {responses?.[question.key]}
                            </Box>
                          ) : (
                            <em>No student response.</em>
                          )}
                        </Box>
                        <Box sx={{ flex: '1 1 0', ml: [0, 0, 4], mb: 4 }}>
                          {account.type === 'Teacher' ? (
                            <Box
                              onSubmit={handleLeaveFeedback.bind({
                                key: question.key,
                              })}
                              as='form'
                              sx={{
                                display: 'flex',
                                height: '100%',
                                flexDirection: 'column',
                              }}
                            >
                              <Textarea
                                sx={{
                                  width: ['100%'],
                                  minHeight: '10em',
                                  flexGrow: 1,
                                  mb: 3,
                                }}
                                name='feedback'
                                id='feedback'
                                defaultValue={responses.feedback[question.key]}
                                placeholder="Leave your feedback here"
                              />
                              <Button
                                sx={{
                                  cursor: 'pointer',
                                }}
                              >
                                Save
                              </Button>
                            </Box>
                          ) : (
                            <>
                              {responses?.feedback?.[question.key] ? (
                                <Box as='span' sx={{ whiteSpace: 'pre-wrap' }}>
                                  <strong sx={{ display: 'block', mb: 2 }}>
                                    Teacher Feedback:
                                  </strong>
                                  {responses?.feedback?.[question.key]}
                                </Box>
                              ) : (
                                <em>No teacher feedback.</em>
                              )}
                            </>
                          )}
                        </Box>
                      </Flex>
                    </React.Fragment>
                  ))
              : null
            : null}
        </Box>
      </Container>
    </Course>
  )
}

export default Responses
