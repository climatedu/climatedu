/** @jsx jsx */
import { Flex, Box, jsx } from 'theme-ui'
import { useState } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'

import Link from './link'

const DesktopNavLink = props => (
  <Link
    {...props}
    activeClassName='active'
    sx={{
      color: 'inherit',
      textDecoration: 'none',
      fontWeight: 'bold',
      display: 'inline-block',
      whiteSpace: 'nowrap',
      px: 3,
      py: 2,
      textAlign: 'center',
      borderRadius: 10,
      fontSize: 3,
      '&.active': {
        bg: 'secondary',
      },
      '&:hover, &:focus, &.active': {
        color: 'primary',
      },
    }}
  />
)

const MobileNavLink = props => (
  <Link
    {...props}
    sx={{
      textDecoration: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      width: '100%',
      p: 4,
      fontSize: 3,
      whiteSpace: 'nowrap',
      '&.active': {
        backgroundColor: 'darkBackground',
      },
    }}
  />
)

const DesktopNavButton = ({ location, text, dropdown, children, ...props }) => {
  const [open, setOpen] = useState(false)

  const setDropdown = state => () => {
    setOpen(state)
  }

  return (
    <Box
      onMouseEnter={dropdown && setDropdown(true)}
      onMouseLeave={dropdown && setDropdown(false)}
      sx={{
        position: 'relative',
        /* eslint-disable prettier/prettier */
        '&:hover > .active:first-of-type': dropdown
          ? {
              borderBottomLeftRadius: 0,
              borderBottomRightRadius: 0,
            }
          : {},
        /* eslint-enable prettier/prettier */
        '& > .active:first-of-type + div': {
          borderTopLeftRadius: 0,
        },
      }}
      {...props}
    >
      <DesktopNavLink
        to={location}
        partiallyActive={dropdown}
        onClick={
          dropdown &&
          (e => {
            e.preventDefault()
          })
        }
        sx={{
          width: '100%',
          transition: 'border-radius .3s ease',
        }}
      >
        {text}
        {dropdown && (
          <BsCaretDownFill
            sx={{
              transform: open ? 'rotate(-180deg)' : '',
              verticalAlign: 'middle',
              transition: 'transform .3s ease',
              ml: 2,
            }}
          />
        )}
        {children}
      </DesktopNavLink>
      {dropdown && (
        <Box
          bg='secondary'
          sx={{
            position: 'absolute',
            top: '100%',
            borderRadius: 10,
            visibility: open ? 'visible' : 'hidden',
            opacity: open ? 1 : 0,
            transition: 'opacity .3s',
            minWidth: '100%',
          }}
        >
          {dropdown.map(({ location, text }, i) => {
            return (
              <DesktopNavLink key={i} to={location}>
                {text}
              </DesktopNavLink>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

const MobileNavButton = ({ location, text, dropdown, children, ...props }) => {
  const [open, setOpen] = useState(false)
  const toggleOpen = e => {
    e.preventDefault()
    setOpen(!open)
  }

  return (
    <Box {...props}>
      <MobileNavLink
        to={location}
        partiallyActive={dropdown !== undefined}
        onClick={dropdown && toggleOpen}
      >
        {text}
        {(dropdown || children) && (
          <Flex sx={{ width: '1.5em', justifyContent: 'center' }}>
            {dropdown && (
              <BsCaretDownFill
                sx={{
                  transform: open ? 'rotate(0deg)' : 'rotate(-90deg)',
                  transition: 'transform .3s ease',
                }}
              />
            )}
            {children}
          </Flex>
        )}
      </MobileNavLink>
      {open &&
        dropdown?.map(({ location, text }, i) => (
          <MobileNavLink key={i} to={location} sx={{ pl: 5 }}>
            {text}
          </MobileNavLink>
        ))}
    </Box>
  )
}

export { DesktopNavButton, MobileNavButton }
