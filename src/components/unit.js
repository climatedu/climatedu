/** @jsx jsx **/
import React, { useState, useCallback, useEffect } from 'react'
import { Box, IconButton, Styled, jsx } from 'theme-ui'
import { css } from '@theme-ui/css'
import { Global } from '@emotion/core'
import 'react-toastify/dist/ReactToastify.min.css'
import { useStaticQuery, graphql, Link } from 'gatsby'
import { GiHamburgerMenu } from 'react-icons/gi'
import seedrandom from 'seedrandom'
import { IoIosArrowForward } from 'react-icons/io'
import { AiFillHome } from 'react-icons/ai'

import SEO from './seo'
import Container from './container'
import SideNav, { getColor } from './sidenav'
import AppendHead from 'react-append-head'

import firebase from 'firebase/app'

import useAuth from '../util/auth'

import getFirebase from '../firebase'

const Unit = ({ html, frontmatter, children }) => {
  const firebaseApp = getFirebase()
  const data = useStaticQuery(graphql`
    {
      site {
        siteMetadata {
          socials {
            icon
            href
            name
          }
        }
      }
      allMarkdownRemark(
        filter: { fileAbsolutePath: { glob: "**/course/*.md" } }
      ) {
        edges {
          node {
            ...Unit
          }
        }
      }
      courseYaml {
        sections {
          location
          doodles {
            left
            right
            offsetY
            offsetX
            width
            file {
              publicURL
            }
            rotation
            scale
            sticky
          }
        }
        questions {
          unit
        }
      }
    }
  `)

  const doodles = data.courseYaml.sections
    .filter(s => s.location.split('.')[0] === frontmatter.unit.toString())
    .map(s => {
      return {
        index: parseInt(s.location.split('.')[1]) - 1,
        doodles: s.doodles.map(d => {
          return Object.assign(d, {
            url: d.file.publicURL,
          })
        }),
      }
    })

  const units = data.allMarkdownRemark.edges
    .map(n => n.node)
    .sort((a, b) => a.frontmatter.unit - b.frontmatter.unit)

  const [answeredProgress, setAnsweredProgress] = React.useState(0)
  const [navOpen, setNavOpen] = useState(false)
  const [scrollLocation, setScrollLocation] = useState({
    percent: 0,
    colorPercent: 0,
    progress: answeredProgress,
  })

  const unitRef = React.createRef()
  const [contentRef, setContentRef] = useState({ current: null })
  const navButtonRef = React.createRef()
  const [sectionHeights, setSectionHeights] = useState([])
  const contentCallbackRef = useCallback(
    content => {
      setContentRef({ current: content })
      if (sectionHeights.length === 0 && content != null) {
        let sections = Array.from(content.querySelectorAll('h2'))
        sections = sections.map((s, i) => [
          (s.offsetTop + s.offsetHeight * 2) / content.scrollHeight,
          (sections[i + 1]
            ? sections[i + 1].offsetTop / content.scrollHeight
            : 1) -
            (s.offsetTop + s.offsetHeight * 2) / content.scrollHeight,
        ])
        setSectionHeights(sections)
      }
    },
    [sectionHeights.length]
  )
  const opacify = (text, opacity) =>
    ((a, p) =>
      `rgba(${p(a, 0)}, ${p(a, 2)}, ${p(a, 4)}, ${opacity})`)(
      text.slice(1),
      (a, n) => parseInt(a.slice(n, n + 2), 16)
    )
  function scrollColor() {
    if (unitRef.current) {
      setScrollLocation({
        percent: scrollLocation.percent,
        colorPercent: frontmatter.scrollcolorbottom
          ? unitRef.current.scrollTop >
            unitRef.current.scrollHeight - unitRef.current.offsetHeight * 2
            ? (unitRef.current.scrollTop -
                (unitRef.current.scrollHeight -
                  unitRef.current.offsetHeight * 2)) /
              unitRef.current.offsetHeight
            : 0
          : unitRef.current.scrollTop /
            (unitRef.current.scrollHeight - unitRef.current.offsetHeight),
        progress: answeredProgress,
      })
    }
    setTimeout(() => {
      if (typeof requestAnimationFrame !== 'undefined')
        requestAnimationFrame(scrollColor)
    }, 100)
  }

  const saveAnsweredProgress = async () => {
    if (firebase.auth().currentUser == null) return

    const unitResponses = (
      await firebaseApp
        .firestore()
        .collection('accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('responses')
        .doc(frontmatter.unit.toString())
        .get()
    ).data()

    if (unitResponses == null) return

    let answerCount = 0

    for (const y of Object.entries(unitResponses)) {
      if (y[1] !== '') {
        answerCount++
      }
    }

    let questionCount = 0

    for (const x of data.courseYaml.questions) {
      if (x.unit === frontmatter.unit) {
        questionCount++
      }
    }

    if (unitRef.current !== null) {
      const percentAnswered = Math.ceil((answerCount / questionCount) * 100)

      // if (answeredProgress === 0) {
      //   const d = await firebaseApp
      //     .firestore()
      //     .collection('accounts')
      //     .doc(firebase.auth().currentUser.uid)
      //     .collection('progress')
      //     .doc(frontmatter.unit.toString())
      //     .get()

      //   if (d.data() !== undefined) {
      //     setAnsweredProgress(d.data().percent)

      //     // if (percentRead <= d.data().percent) return (change variable name to "answered" if using later)
      //   }
      // }

      // if (percentRead <= readProgress) return (change variable name to "answered" if using later)

      setAnsweredProgress(percentAnswered)

      firebaseApp
        .firestore()
        .collection('accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('progress')
        .doc(frontmatter.unit.toString())
        .set({
          progressPercent: percentAnswered,
        })
    }
  }
  useAuth(null)

  useEffect(() => {
    saveAnsweredProgress()
    window.addEventListener('click', saveAnsweredProgress, true)

    return () => {
      window.removeEventListener('click', saveAnsweredProgress, true)
    }
  })

  if (frontmatter.scrollcolor) scrollColor()

  return (
    <Styled.root
      sx={{
        '&, *': {
          scrollbarColor: theme =>
            `${theme.colors.primary} ${theme.colors.darkBackground}`,
          scrollbarWidth: 'thin',
        },
        '::-webkit-scrollbar, *::-webkit-scrollbar': {
          bg: frontmatter.scrollcolor
            ? getColor(
                frontmatter.background,
                frontmatter.scrollcolor,
                scrollLocation
              )
            : frontmatter.background,
          transition: 'background-color 0.5s',
        },
        '::-webkit-scrollbar-thumb, *::-webkit-scrollbar-thumb': {
          bg: frontmatter.text,
        },
      }}
      ref={unitRef}
    >
      <Global
        styles={css({
          'html, body, #___gatsby, #gatsby-focus-wrapper': {
            height: '100%',
            overflowX: 'hidden',
          },
          '.Toastify__toast-body': {
            mx: 2,
          },
          '.Toastify__toast--success': {
            bg: 'text',
          },
          a: {
            color: frontmatter.text,
            '&:active, &:focus': {
              color: frontmatter.highlight,
            },
          },
        })}
      />
      <SEO />
      <AppendHead>
        <script
          order='0'
          name='firebase-app'
          src='https://www.gstatic.com/firebasejs/8.2.2/firebase-app.js'
        />
        <script
          order='1'
          name='firebase-auth'
          src='https://www.gstatic.com/firebasejs/8.2.2/firebase-auth.js'
        />
        <script
          order='2'
          name='firebase-firestore'
          src='https://www.gstatic.com/firebasejs/8.2.2/firebase-firestore.js'
        />
        <script order='3' name='handleresponse' src='/handleresponse.js' />
      </AppendHead>
      <SideNav
        open={navOpen}
        setOpen={setNavOpen}
        frontmatter={frontmatter}
        scrollLocation={scrollLocation}
        contentRef={contentRef}
        unitRef={unitRef}
        navButtonRef={navButtonRef}
        units={units}
      />
      <Box
        as='main'
        sx={{
          flex: '1 0 auto',
          bg: frontmatter.scrollcolor
            ? getColor(
                frontmatter.background,
                frontmatter.scrollcolor,
                scrollLocation
              )
            : frontmatter.background,
          transition: 'background-color 0.5s',
          color: frontmatter.text,
        }}
      >
        <IconButton
          ref={navButtonRef}
          sx={{
            position: 'fixed',
            top: [2, 2, 3],
            left: [2, 2, 3],
            borderRadius: 5,
            p: 2,
            boxSizing: 'content-box',
            boxShadow: '2px 2px 24px rgba(0,0,0,.15)',
            fontSize: '3em',
            height: '1em',
            width: '1em',
            color: frontmatter.text,
            backgroundColor: frontmatter.scrollcolor
              ? getColor(
                  frontmatter.background,
                  frontmatter.scrollcolor,
                  scrollLocation
                )
              : frontmatter.background,
            transition: 'background-color 0.5s',
            '&:active': {
              borderColor: frontmatter.highlight,
              color: frontmatter.highlight,
            },
            zIndex: 997,
          }}
          onClick={() => {
            setScrollLocation({
              colorPercent: scrollLocation.colorPercent,
              percent:
                unitRef.current.scrollTop /
                (unitRef.current.scrollHeight - unitRef.current.offsetHeight),
              progress: answeredProgress,
            })
            setNavOpen(true)
          }}
        >
          <GiHamburgerMenu size='100%' />
        </IconButton>
        <h2
          sx={{
            display:
              typeof window !== 'undefined' &&
              firebase.auth().currentUser !== null
                ? 'block'
                : 'none',
            fontSize: '1.5em',
            textAlign: 'right',
            mx: 5,
            mt: 4,
          }}
        >
          <Box
            sx={{
              display: ['none', 'block', 'block'],
            }}
          >
            <Link
              sx={{
                textDecoration: 'none',
              }}
              to='/dashboard/'
            >
              Back to dashboard&nbsp;
            </Link>
            <IoIosArrowForward
              sx={{ position: 'relative', top: '0.2em', size: '1.1em' }}
            />
          </Box>
          <Box
            sx={{
              display: ['block', 'none', 'none'],
            }}
          >
            <AiFillHome
              sx={{ position: 'relative', top: '-0.5em', size: '2em' }}
            />
          </Box>
        </h2>
        <Container
          sx={{
            position: 'relative',
            zIndex: 0,
            mt: ['2em', '6em', '6em'],
            mb: '2em',
            textarea: {
              boxSizing: 'border-box',
              margin: '0px 0px 16px',
              minWidth: '0px',
              display: 'block',
              width: '100%',
              appearance: 'none',
              lineHeight: 'inherit',
              borderStyle: 'solid',
              borderImage: 'initial',
              resize: 'none',
              borderWidth: '3px',
              borderRadius: '10px',
              borderColor: frontmatter.text,
              backgroundColor: opacify(frontmatter.text, 0.05),
              fontFamily: 'Manrope, system-ui, sans-serif',
              padding: '8px 16px',
              color: frontmatter.text,
              fontSize: '20px',
              '&:focus': {
                outline: 'none',
              },
              '&::placeholder': {
                color: opacify(frontmatter.text, 0.7),
              },
              height: '8em',
            },
            figcaption: {
              fontStyle: 'italic',
              textAlign: 'center',
            },
            iframe: {
              display: 'block',
              margin: 'auto',
              maxWidth: '100%',
            },
          }}
        >
          <Box
            sx={{
              '& > img': {
                margin: 'auto',
                display: 'block',
                width: '500px',
                maxWidth: '100%',
              },
            }}
            ref={contentCallbackRef}
            dangerouslySetInnerHTML={{
              __html: html,
            }}
          />
          {units[frontmatter.unit] ? (
            <h2 sx={{ textAlign: 'right' }}>
              <Link
                sx={{ textDecoration: 'none' }}
                to={`/course/${units[frontmatter.unit].frontmatter.slug}/`}
              >
                Next: {units[frontmatter.unit].frontmatter.title}
              </Link>
            </h2>
          ) : null}
          {sectionHeights.length
            ? doodles.map(section => {
                /* eslint-disable */
                const random = new seedrandom(
                  frontmatter.unit + '.' + section.index
                )
                /* eslint-enable */

                return section.doodles.map((doodle, index) => {
                  const width = doodle.width || 100
                  const left = doodle.right
                    ? false
                    : doodle.left
                    ? true
                    : !((index % 3) % 2)

                  const rotation = doodle.rotation || 0
                  const scale = doodle.scale || 1
                  if (doodle.sticky) {
                    return (
                      <Box
                        key={index}
                        sx={{
                          position: 'absolute',
                          top: `calc(${
                            ((sectionHeights[section.index][1] / 10) *
                              random() +
                              sectionHeights[section.index][0] +
                              (sectionHeights[section.index][1] * index) /
                                section.doodles.length) *
                              100 +
                            '%'
                          } + ${doodle.offsetY || '0px'})`,
                          left: left
                            ? `calc(-${width + 50}px + ${
                                doodle.offsetX || '0px'
                              })`
                            : 'auto',
                          right: left
                            ? 'auto'
                            : `calc(-${width + 50}px - ${
                                doodle.offsetX || '0px'
                              })`,
                          zIndex: -1,
                          height: sectionHeights[section.index][1] * 100 + '%',
                        }}
                      >
                        <img
                          key={index}
                          src={doodle.url}
                          sx={{
                            width: width,
                            transform: `rotate(${rotation}deg) scaleX(${scale}) scaleY(${scale})`,
                            position: 'sticky',
                            top: '50%',
                          }}
                        />
                      </Box>
                    )
                  }

                  return (
                    <img
                      key={index}
                      src={doodle.url}
                      sx={{
                        position: 'absolute',
                        top: `calc(${
                          ((sectionHeights[section.index][1] / 10) * random() +
                            sectionHeights[section.index][0] +
                            (sectionHeights[section.index][1] * index) /
                              section.doodles.length) *
                            100 +
                          '%'
                        } + ${doodle.offsetY || '0px'})`,
                        left: left
                          ? `calc(-${width + 50}px + ${
                              doodle.offsetX || '0px'
                            })`
                          : 'auto',
                        right: left
                          ? 'auto'
                          : `calc(-${width + 50}px - ${
                              doodle.offsetX || '0px'
                            })`,
                        width: width,
                        zIndex: -1,
                        transform: `rotate(${rotation}deg) scaleX(${scale}) scaleY(${scale})`,
                      }}
                    />
                  )
                })
              })
            : null}
        </Container>
        {children}
      </Box>
    </Styled.root>
  )
}

export const query = graphql`
  fragment Unit on MarkdownRemark {
    html
    frontmatter {
      slug
      title
      background
      scrollcolor
      scrollcolorbottom
      text
      highlight
      sections
      unit
    }
  }
`

export default Unit
