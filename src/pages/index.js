import { graphql } from 'gatsby'
import { Box, Button, Flex, Grid, Heading, Text, jsx } from 'theme-ui'
/** @jsx jsx */

import Glider from 'react-glider'
import 'glider-js/glider.min.css'

import Layout from '../components/layout'

import { IoIosMegaphone, IoIosPaper } from 'react-icons/io'
import { FaBrain } from 'react-icons/fa'
import { MdLaptopMac } from 'react-icons/md'

const icons = { IoIosMegaphone, IoIosPaper, FaBrain, MdLaptopMac }

const Section = ({ header, children, ...props }) => {
  return (
    <Box as='section' {...props}>
      <Box
        sx={{
          textAlign: 'center',
          mb: [4, 5],
        }}
      >
        <Heading
          as='h1'
          sx={{
            fontSize: [5, 6],
          }}
        >
          {header}
        </Heading>
      </Box>
      <Box
        sx={{
          px: 4,
          mb: 5,
        }}
      >
        {children}
      </Box>
    </Box>
  )
}

const Home = ({ data }) => {
  return (
    <Layout>
      <Box
        sx={{
          textAlign: 'center',
          mt: 6,
          mb: 4,
          px: [4, 5],
        }}
      >
        <Heading
          as='h1'
          sx={{
            fontSize: [5, 6],
            mb: 3,
          }}
        >
          Welcome to climatedu!
        </Heading>
        <Heading
          as='h2'
          sx={{
            fontSize: [4, 5],
            mb: 4,
          }}
        >
          Climate education made by students, for students.
        </Heading>
        <Button
          sx={{
            fontSize: 4,
            p: 3,
            background:
              'linear-gradient(93.23deg, #FFD959 5.32%, rgba(255, 255, 255, 0) 118.45%), #ACD28A',
            boxShadow: '0px 0px 8px 5px rgba(161, 192, 137, 0.3)',
            borderRadius: 20,
            fontWeight: 'bold',
            '&:hover': {
              boxShadow: '0px 0px 8px 5px rgb(119 156 90 / 30%)',
            },
          }}
        >
          Register today!
        </Button>
      </Box>
      <Box
        sx={{
          backgroundColor: 'darkBackground',
          p: [4, 5],
        }}
      >
        <Grid
          gap={4}
          columns={[1, 2]}
          sx={{
            backgroundColor: 'background',
            borderRadius: 30,
            p: 4,
            mb: 5,
          }}
        >
          {data.configYaml.facts.map(({ icon, title, text }, i) => {
            const Icon = icons[icon]
            return (
              <Flex key={i}>
                <Icon
                  size='2.5em'
                  sx={{
                    color: 'primary',
                    mr: '1em',
                    flex: '0 0 auto',
                  }}
                />
                <Box>
                  <Heading
                    as='h2'
                    sx={{
                      color: 'primary',
                      mb: 2,
                    }}
                  >
                    {title}
                  </Heading>
                  <Text dangerouslySetInnerHTML={{ __html: text }} />
                </Box>
              </Flex>
            )
          })}
        </Grid>
        <Section header='Our Course'>
          <Glider
            draggable
            dragVelocity={1}
            hasArrows
            slidesToShow={1}
            slidesToScroll={1}
            responsive={[
              {
                breakpoint: 640,
                settings: {
                  slidesToShow: 'auto',
                  slidesToScroll: 'auto',
                  itemWidth: 275,
                },
              },
            ]}
          >
            {data.allMarkdownRemark.edges.map(({ node: unit }, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    p: 4,
                    mx: 3,
                    borderRadius: 30,
                    backgroundColor: unit.frontmatter.background,
                    color: unit.frontmatter.text,
                  }}
                >
                  <Heading
                    as='h3'
                    sx={{
                      mb: 3,
                      color: unit.frontmatter.text,
                    }}
                  >
                    {unit.frontmatter.title}
                  </Heading>
                  <Text
                    dangerouslySetInnerHTML={{
                      __html: unit.excerpt,
                    }}
                  />
                </Box>
              )
            })}
          </Glider>
        </Section>
        <Section header='FAQ'>
          <Box
            sx={{
              columnCount: [1, 2],
              columnGap: '4em',
              px: [4, 4, 5],
              mb: 5,
            }}
          >
            {data.configYaml.faq.map(({ question, answer }, i) => {
              return (
                <Box
                  key={i}
                  sx={{
                    marginBottom: 4,
                    breakInside: 'avoid',
                  }}
                >
                  <Heading
                    sx={{
                      mb: 2,
                    }}
                  >
                    {question}
                  </Heading>
                  <Text>{answer}</Text>
                </Box>
              )
            })}
          </Box>
        </Section>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  {
    configYaml {
      facts {
        title
        text
        icon
      }
      faq {
        question
        answer
      }
    }
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "course" } } }
      sort: { fields: frontmatter___unit }
    ) {
      edges {
        node {
          frontmatter {
            background
            text
            title
          }
          excerpt(format: HTML)
        }
      }
    }
  }
`

export default Home
