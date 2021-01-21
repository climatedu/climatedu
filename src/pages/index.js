import { graphql, navigate } from 'gatsby'
import { Box, Button, Flex, Grid, Heading, Text, jsx } from 'theme-ui'
/** @jsx jsx */

import Glider from 'react-glider'
import 'glider-js/glider.min.css'

import Layout from '../components/layout'
import PageHeader from '../components/pageheader'
import Container from '../components/container'

import { IoIosMegaphone, IoIosPaper } from 'react-icons/io'
import { FaBrain } from 'react-icons/fa'
import { MdLaptopMac } from 'react-icons/md'

import Link from '../components/link'

const icons = { IoIosMegaphone, IoIosPaper, FaBrain, MdLaptopMac }

const Section = ({ header, children, ...props }) => {
  return (
    <Box as='section' {...props}>
      <Box
        sx={{
          textAlign: 'center',
          p: 4,
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
      <Box>{children}</Box>
    </Box>
  )
}

const Home = ({ data }) => {
  const onRegister = () => {
    navigate('/login')
  }

  return (
    <Layout bg='darkBackground'>
      <PageHeader
        primary='Welcome to climatedu!'
        secondary='Climate education made by students, for students.'
      >
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
              background:
                'linear-gradient(93.23deg, #FFD959 5.32%, rgba(255, 255, 255, 0) 118.45%), #ACD28A',
            },
            '&:active': {
              color: 'white',
            },
            color: 'white',
            border: 'none',
          }}
          onClick={onRegister}
        >
          Register today!
        </Button>

        <Heading
          as='h2'
          sx={{
            fontSize: 4,
            mt: 3,
            mb: 2,
          }}
        >
          <Link
            to='https://preview.climatedu.org/course/intro'
            sx={{
              color: 'text',
              textDecoration: 'none',
              ':hover': {
                textDecoration: 'underline',
              },
            }}
          >
            While our site is under construction, check out our preview here &gt;
          </Link>
        </Heading>
      </PageHeader>
      <Container pt={4}>
        <Grid
          gap={4}
          columns={[1, 2]}
          sx={{
            bg: 'background',
            borderRadius: 30,
            p: 4,
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
                    bg: unit.frontmatter.background,
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
              px: 4,
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
      </Container>
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
