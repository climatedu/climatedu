import { graphql } from 'gatsby'
import { Box, Embed, Flex, Grid, Heading, Image, Text, jsx } from 'theme-ui'
/** @jsx jsx */

import Glider from 'react-glider'
import 'glider-js/glider.min.css'

import Layout from '../components/layout'
import Link from '../components/link'

import useAuth from '../util/auth'

import iconArrowRight from '../icons/arrow_right.svg'

// TODO: put this somewhere else, maybe pull in with graphql? or just js is fine too
const facts = [
  {
    title: 'Basically like the USACO Guide.',
    text:
      "I thought you guys were joking, but it's literally pretty much what we're want.",
    icon: iconArrowRight,
  },
  {
    title: 'Fact 2',
    text: "I guess we'll just try to make it prettier!",
    icon: iconArrowRight,
  },
  {
    title: 'Gink gink gink gink.',
    text: 'Gink gink gink gink gink gink gink gink gink gink gink gink gink.',
    icon: iconArrowRight,
  },
  {
    title: 'Fact 4',
    text: "We're using different icons, I just dunno what our facts will be.",
    icon: iconArrowRight,
  },
]

const faq = [
  {
    question: 'Is this course only intended for middle school students?',
    answer:
      'No!! If your kid is taking this course, you should probably take it too!!!!!!! This is stuff everybody needs to know xoxo sorry devs just trying to fill up space!',
  },
  {
    question: 'Is Tux cool?',
    answer:
      "Yes, in fact, he is. He's pretty legendary, too. Petition to bring back legendary tux/viv role back. not that viv==tux but that i would be honored to have that role.",
  },
  {
    question:
      'How much wood would a wood chuck chuck if a wood chuck could chuck wood?',
    answer:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commado consequat.',
  },
]

const Home = ({ data }) => {
  const user = useAuth()
  return (
    <Layout>
      <Box
        sx={{
          textAlign: 'center',
          mt: 6,
          mb: 5,
        }}
      >
        <Heading
          as="h1"
          sx={{
            color: 'primary',
            fontSize: [5, 6],
            mb: 3,
          }}
        >
          Welcome to climatEDU!
        </Heading>
        <Heading
          as="h2"
          sx={{
            color: 'secondary',
            fontWeight: 500,
            fontSize: [4, 5],
          }}
        >
          Climate education made by students, for students.
        </Heading>
      </Box>
      <Flex
        sx={{
          mb: 5,
          flexWrap: 'wrap',
          '& > div': {
            flex: '1 1',
            flexBasis: ['auto', null, 0],
            mx: [0, null, 3],
            my: [2, null, 0],
          },
        }}
      >
        <Box>
          <Embed src="https://www.youtube-nocookie.com/embed/fv2vijLQroo" />
        </Box>
        <Flex
          sx={{
            flexDirection: 'column',
            justifyContent: 'center',
          }}
        >
          <Text
            sx={{
              mb: 10,
              fontSize: 3,
            }}
          >
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </Text>
          <Link
            to="/login"
            sx={{
              fontSize: 4,
              textDecoration: 'none',
              color: 'primary',
              fontWeight: 600,
            }}
          >
            {user === null ? 'Register today!' : 'Go to dashboard'}
            <Image
              src={iconArrowRight}
              sx={{
                height: '0.5em',
                verticalAlign: 'middle',
                ml: 10,
              }}
            />
          </Link>
        </Flex>
      </Flex>
      <Grid
        gap={4}
        columns={[1, 2]}
        sx={{
          backgroundColor: 'darkBackground',
          borderRadius: 30,
          p: 4,
          mb: 5,
        }}
      >
        {facts.map(({ icon, title, text }, i) => {
          return (
            <Flex key={i}>
              <Image
                src={icon}
                sx={{
                  height: '1.5em',
                  mr: '1em',
                  flex: '0 0 auto',
                }}
              />
              <Box>
                <Heading
                  as="h2"
                  sx={{
                    color: 'primary',
                    mb: 2,
                  }}
                >
                  {title}
                </Heading>
                <Text>{text}</Text>
              </Box>
            </Flex>
          )
        })}
      </Grid>
      <Box
        sx={{
          textAlign: 'center',
          mb: 5,
        }}
      >
        <Heading
          as="h1"
          sx={{
            color: 'primary',
            fontSize: [5, 6],
          }}
        >
          Our Course
        </Heading>
      </Box>
      <Box
        sx={{
          px: 4,
          mb: 5,
        }}
      >
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
                itemWidth: 250,
              },
            },
          ]}
        >
          {data.allMarkdownRemark.edges.map(({ node }, i) => {
            return (
              <Box
                key={i}
                sx={{
                  p: 4,
                  mx: 3,
                  borderRadius: 30,
                  backgroundColor: node.frontmatter.background,
                  color: node.frontmatter.text,
                }}
              >
                <Heading
                  as="h3"
                  sx={{
                    mb: 3,
                  }}
                >
                  {node.frontmatter.title}
                </Heading>
                {node.frontmatter.description}
              </Box>
            )
          })}
        </Glider>
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          mb: 5,
        }}
      >
        <Heading
          as="h1"
          sx={{
            color: 'primary',
            fontSize: [5, 6],
          }}
        >
          FAQ
        </Heading>
      </Box>
      <Box
        sx={{
          columnCount: [1, 2],
          columnGap: '2em',
          mb: 5,
        }}
      >
        {faq.map(({ question, answer }, i) => {
          return (
            <Box
              key={i}
              sx={{
                marginBottom: 4,
              }}
            >
              <Heading
                sx={{
                  color: 'secondary',
                  mb: 2,
                }}
              >
                {question}
              </Heading>
              <Text
                sx={{
                  color: 'secondary',
                }}
              >
                {answer}
              </Text>
            </Box>
          )
        })}
      </Box>
      <Box
        sx={{
          textAlign: 'center',
          mb: 5,
        }}
      >
        <Heading
          as="h1"
          sx={{
            color: 'primary',
            fontSize: [5, 6],
          }}
        >
          You can probably imagine other stuff that fills this space!
        </Heading>
      </Box>
    </Layout>
  )
}

export const query = graphql`
  {
    allMarkdownRemark(
      filter: { fields: { sourceInstanceName: { eq: "course" } } }
    ) {
      edges {
        node {
          frontmatter {
            background
            description
            text
            title
          }
        }
      }
    }
  }
`

export default Home
