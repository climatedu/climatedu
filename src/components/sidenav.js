/** @jsx jsx */
import { Box, IconButton, Flex, jsx, Grid } from 'theme-ui'
import { navigate } from 'gatsby'
import React, { useState } from 'react'

import { IoIosArrowBack } from 'react-icons/io'
import { BsGrid3X3Gap } from 'react-icons/bs'

// https://stackoverflow.com/a/46543292/9749629
function hexToRgb(hex) {
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
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
  var startRGB = hexToRgb(startColour)
  var endRGB = hexToRgb(endColour)

  var diffRed = endRGB.r - startRGB.r
  var diffGreen = endRGB.g - startRGB.g
  var diffBlue = endRGB.b - startRGB.b

  diffRed = diffRed * percentFade + startRGB.r
  diffGreen = diffGreen * percentFade + startRGB.g
  diffBlue = diffBlue * percentFade + startRGB.b

  var result =
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
            ml: '2em',
            mb: '1.34em',
          }}
        >
          <IconButton
            sx={{
              mx: '1em',
              height: '3.5em',
              width: '3.5em',
              color: frontmatter.text,
              '&:active': {
                borderColor: frontmatter.highlight,
                color: frontmatter.highlight,
              },
              float: 'right',
            }}
            onClick={() => {
              setOpen(false)
            }}
          >
            <IoIosArrowBack size='100%' />
          </IconButton>
          <h1 sx={{ display: 'inline' }}>{frontmatter.title}</h1>
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
        <Box
          sx={{
            width: '80%',
            mx: 'auto',
            my: '1em',
            backgroundColor: frontmatter.highlight + '50',
            height: '10px',
            borderRadius: '10px',
          }}
        >
          <Box
            sx={{
              width: `${scrollLocation.percent * 100}%`,
              mr: 'auto',
              backgroundColor: frontmatter.text,
              height: '100%',
              borderRadius: '10px',
            }}
          />
        </Box>
        <Box sx={{ textAlign: 'center', fontSize: '1.2em', mb: '1em' }}>
          {Math.round(scrollLocation.percent * 100)}%
        </Box>
        <IconButton
          sx={{
            mx: '1em',
            mb: '1em',
            alignSelf: 'flex-end',
            mt: 'auto',
            height: '3.5em',
            width: '3.5em',
            color: frontmatter.text,
            '&:active': {
              borderColor: frontmatter.highlight,
              color: frontmatter.highlight,
            },
          }}
          onClick={() => {
            setUnitNavOpen(true)
          }}
        >
          <BsGrid3X3Gap size='100%' />
        </IconButton>
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
            mt: '2em',
            ml: '2em',
            justifyContent: 'space-between',
          }}
        >
          <h1
            sx={{
              mt: 0,
              textDecoration: 'underline',
              cursor: 'pointer',
            }}
            onClick={() => {
              navigate('/')
            }}
          >
            climatedu
          </h1>
          <IconButton
            sx={{
              mx: '1em',
              height: '3.5em',
              width: '3.5em',
              color: frontmatter.text,
              '&:active': {
                borderColor: frontmatter.highlight,
                color: frontmatter.highlight,
              },
              flex: '0 0 auto',
            }}
            onClick={() => {
              setUnitNavOpen(false)
            }}
          >
            <IoIosArrowBack size='100%' />
          </IconButton>
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
                    navigate('/course/' + unit.frontmatter.slug + '/')
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
