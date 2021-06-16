/** @jsx jsx */
import { graphql, navigate } from 'gatsby'
import { jsx, Box, Button, Grid, Image } from 'theme-ui'
import poster from '../../../data/media/campclimatedu.png'
import invertedPoster from '../../../data/media/campclimatedu_inverted.png'
import vivian from '../../../data/people/avatars/vivian.jpg'
import bracklinn from '../../../data/people/avatars/bracklinn.jpg'
import michelle from '../../../data/people/avatars/michelle.png'
import emily from '../../../data/people/avatars/emily.jpg'

import Layout from '../../components/layout'
import PageHeader from '../../components/pageheader'
import Container from '../../components/container'

const Camp = ({ data }) => {
  const onRegister = () => {
    navigate('/camp/register/')
  }

  return (
    <Layout>
      <PageHeader
        primary='CAMP CLIMATEDU 2021'
        secondary='A 10-week adventure into sustainability'
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
          Register for camp!
        </Button>
      </PageHeader>
      <Container>
        Want to take our course with a community of excited fellow learners?
        Here&apos;s your opportunity to become a Sustainabuddy. This summer,
        we&apos;ll be hosting CAMP CLIMATEDU, and you&apos;re invited!
        We&apos;ll develop a deeper understanding of the climate together,
        through pondering discussion questions as a class, playing educational
        games, and getting active with independent projects.
        <p>
          <strong>WHAT</strong>: a 10-week, action-packed adventure into
          sustainability
        </p>
        <p>
          <strong>WHO</strong>: middle and high school students (but anyone is
          welcome to join us!)
        </p>
        <p>
          <strong>WHEN</strong>: from June 23 to August 25, Wednesdays @ 4:30-6
          PM Eastern Time
        </p>
        <p>
          <strong>WHERE</strong>: anywhere, virtually over Zoom
        </p>
        <p>
          <strong>WHY</strong>: to name a few of the many reasons...
        </p>
        <ul>
          <li>
            students (you!) are incredibly valuable in saving our planet from a
            climate disaster—the first step is to learn more!{' '}
          </li>
          <li>attending CAMP CLIMATEDU is completely free :)</li>
          <li>
            if you complete the course with us, you&#39;ll receive a sustainable
            gift (such as solar-charging power banks, reusable straws, plantable
            pencils, climate-positive notebooks, or anything else students
            suggest!)
          </li>
        </ul>
        <h1 sx={{ mt: 5, color: 'primary' }}>
          CAMP CLIMATEDU Course Instructors
        </h1>
        <Grid gap={1} columns={[1, 2, 4]}>
          <Container sx={{ maxWidth: '100%', textAlign: 'center' }}>
            <Image src={vivian} sx={{ p: 2, borderRadius: 99999 }} />
            <h2 sx={{ my: 0 }}>Vivian Li</h2>
            <i sx={{ fontSize: 1 }}>University of Southern California</i>
          </Container>
          <Container sx={{ maxWidth: '100%', textAlign: 'center' }}>
            <Image src={bracklinn} sx={{ p: 2, borderRadius: 99999 }} />
            <h2 sx={{ my: 0 }}>Bracklinn Williams</h2>
            <i sx={{ fontSize: 1 }}>Princeton University</i>
          </Container>
          <Container sx={{ maxWidth: '100%', textAlign: 'center' }}>
            <Image src={michelle} sx={{ p: 2, borderRadius: 99999 }} />
            <h2 sx={{ my: 0 }}>Michelle Wong</h2>
            <i sx={{ fontSize: 1 }}>Richard Montgomery HS</i>
          </Container>
          <Container sx={{ maxWidth: '100%', textAlign: 'center' }}>
            <Image src={emily} sx={{ p: 2, borderRadius: 99999 }} />
            <h2 sx={{ my: 0 }}>Emily Johns</h2>
            <i sx={{ fontSize: 1 }}>Montgomery Blair HS</i>
          </Container>
        </Grid>
        <Box
          dangerouslySetInnerHTML={{
            __html: data.markdownRemark.html,
          }}
          sx={{
            h1: {
              color: 'primary',
            },
          }}
        />
        <Grid gap={4} columns={[1, 2, 2]} sx={{ p: 4 }}>
          <Image src={poster} />
          <Image src={invertedPoster} />
        </Grid>
        <Button
          sx={{
            fontSize: 4,
            my: 4,
            mx: 'auto',
            p: 3,
            display: 'block',
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
          Register for camp!
        </Button>
      </Container>
    </Layout>
  )
}

export const query = graphql`
  {
    markdownRemark(fileAbsolutePath: { glob: "**/camp.md" }) {
      html
    }
  }
`

export default Camp
