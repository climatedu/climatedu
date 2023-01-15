/** @jsx jsx */
import { Box, IconButton, Flex, jsx, Grid } from 'theme-ui'
import { navigate } from 'gatsby'
import React, { useState } from 'react'

import { IoIosArrowBack, IoIosArrowForward, IoIosClose } from 'react-icons/io'

// https://stackoverflow.com/a/46543292/9749629
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16),
      }
    : null
}

export function getColor(startColour, endColour, percentFade) {
  percentFade = percentFade.colorPercent
  const startRGB = hexToRgb(startColour)
  const endRGB = hexToRgb(endColour)

  let diffRed = endRGB.r - startRGB.r
  let diffGreen = endRGB.g - startRGB.g
  let diffBlue = endRGB.b - startRGB.b

  diffRed = diffRed * percentFade + startRGB.r
  diffGreen = diffGreen * percentFade + startRGB.g
  diffBlue = diffBlue * percentFade + startRGB.b

  const result =
    'rgb(' +
    Math.round(diffRed) +
    ', ' +
    Math.round(diffGreen) +
    ', ' +
    Math.round(diffBlue) +
    ')'
  return result
}

const SideNav = ({
  open,
  setOpen,
  frontmatter,
  scrollLocation,
  contentRef,
  unitRef,
  navButtonRef,
  units,
}) => {
  const [unitNavOpen, setUnitNavOpen] = useState(false)

  return (
    <>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '100vw',
          zIndex: 998,
          pointerEvents: open ? 'auto' : 'none',
          backgroundColor: open ? 'rgba(0, 0, 0, .15)' : 'rgba(0, 0, 0, 0)',
          transition: 'background-color 0.35s',
        }}
        onClick={() => {
          setUnitNavOpen(false)
          setOpen(false)
        }}
      />
      <Flex
        sx={{
          position: 'fixed',
          flexDirection: 'column',
          top: 0,
          left: 0,
          height: '100vh',
          width: '400px',
          maxWidth: '100vw',
          backgroundColor: frontmatter.scrollcolor
            ? getColor(
                frontmatter.background,
                frontmatter.scrollcolor,
                scrollLocation
              )
            : frontmatter.background,
          color: frontmatter.text,
          boxShadow: '6px 4px 24px rgba(0,0,0,.15)',
          overflowX: 'hidden',
          overflowY: 'auto',
          transition: 'transform .35s',
          transform: `translateX(${open ? 0 : '-424px'})`,
          zIndex: 999,
        }}
      >
        <Box
          sx={{
            mt: '2em',
            mx: '2em',
            mb: '1em',
          }}
        >
          <Flex
            sx={{
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Flex
              onClick={() => {
                setUnitNavOpen(true)
              }}
            >
              <IconButton
                sx={{
                  pl: 0,
                  pr: 2,
                  height: '1.8em',
                  width: '1.8em',
                  color: frontmatter.text,
                  '&:active': {
                    borderColor: frontmatter.highlight,
                    color: frontmatter.highlight,
                  },
                }}
              >
                <IoIosArrowBack size='100%' />
              </IconButton>
              <p
                sx={{
                  m: 0,
                  cursor: 'pointer',
                }}
              >
                View all units
              </p>
            </Flex>
            <Flex
              onClick={() => {
                setOpen(false)
              }}
            >
              <p
                sx={{
                  m: 0,
                  cursor: 'pointer',
                }}
              >
                Close menu
              </p>
              <IconButton
                sx={{
                  p: 0,
                  height: '1.9em',
                  width: '1.9em',
                  color: frontmatter.text,
                  '&:active': {
                    borderColor: frontmatter.highlight,
                    color: frontmatter.highlight,
                  },
                }}
              >
                <IoIosClose size='100%' />
              </IconButton>
            </Flex>
          </Flex>
          <h1>{frontmatter.title}</h1>
        </Box>
        <Grid
          sx={{
            gridTemplateColumns: `max-content auto`,
            mx: '2em',
            gridGap: '0 16px',
          }}
        >
          {frontmatter.sections.map((section, index) => {
            return (
              <React.Fragment key={frontmatter.unit + '.' + index}>
                <h2 sx={{ gridColumn: 1, textAlign: 'right', my: '0.5em' }}>
                  {frontmatter.unit}.{index + 1}
                </h2>
                <h2
                  onClick={() => {
                    setOpen(false)
                    const to = contentRef.current.querySelectorAll('h2')[index]
                    unitRef.current.scrollTo(0, to.offsetTop)
                  }}
                  sx={{
                    gridColumn: 2,
                    cursor: 'pointer',
                    my: '0.5em',
                    '&:active, &:focus': { color: frontmatter.highlight },
                  }}
                >
                  {section}
                </h2>
              </React.Fragment>
            )
          })}
        </Grid>
      </Flex>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          height: '100vh',
          width: '400px',
          maxWidth: '100vw',
          backgroundColor: frontmatter.scrollcolor
            ? getColor(
                frontmatter.background,
                frontmatter.scrollcolor,
                scrollLocation
              )
            : frontmatter.background,
          color: frontmatter.text,
          boxShadow: '6px 4px 24px rgba(0,0,0,.15)',
          overflowX: 'hidden',
          overflowY: 'auto',
          transition: 'transform .35s',
          transform: `translateX(${unitNavOpen ? 0 : '-424px'})`,
          zIndex: 999,
        }}
      >
        <Flex
          sx={{
            pt: '2em',
            px: '2em',
            pb: '1em',
            flexDirection: 'column',
          }}
        >
          <Flex
            sx={{
              alignSelf: 'end',
            }}
            onClick={() => {
              setUnitNavOpen(false)
            }}
          >
            <p
              sx={{
                m: 0,
                cursor: 'pointer',
              }}
            >
              View current unit
            </p>
            <IconButton
              sx={{
                pl: 2,
                pr: 0,
                height: '1.8em',
                width: '1.8em',
                color: frontmatter.text,
                '&:active': {
                  borderColor: frontmatter.highlight,
                  color: frontmatter.highlight,
                },
              }}
            >
              <IoIosArrowForward size='100%' />
            </IconButton>
          </Flex>
          <h1>climatedu</h1>
        </Flex>
        <Grid
          sx={{
            gridTemplateColumns: `max-content auto`,
            mx: '2em',
            gridGap: '0 16px',
          }}
        >
          {units.map((unit, index) => {
            return (
              <React.Fragment key={unit.frontmatter.unit}>
                <h2 sx={{ gridColumn: 1, textAlign: 'right', my: '0.5em' }}>
                  {unit.frontmatter.unit}
                </h2>
                <h2
                  onClick={() => {
                    navigate('/' + unit.frontmatter.slug + '/')
                  }}
                  sx={{
                    gridColumn: 2,
                    cursor: 'pointer',
                    my: '0.5em',
                    '&:active, &:focus': { color: frontmatter.highlight },
                  }}
                >
                  {unit.frontmatter.title}
                </h2>
              </React.Fragment>
            )
          })}
        </Grid>
      </Box>
    </>
  )
}

export default SideNav
