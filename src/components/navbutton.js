/** @jsx jsx */
import { Box, Flex, NavLink as ThemeUINavLink, jsx } from 'theme-ui'
import { Link as GatsbyLink } from 'gatsby'
import { useState } from 'react'
import { BsCaretDownFill } from 'react-icons/bs'

const InnerNavLink = props =>
  <GatsbyLink activeClassName='active' {...props} />

const NavLink = props =>
  <ThemeUINavLink as={InnerNavLink} {...props} sx={{}}/>

function NavButton (props) {
  const [open, setState] = useState(false);
  return (
    <Box
      mx='auto'
      onBlur={e=>{
        if (!e.currentTarget.contains(e.relatedTarget)) {
          setState(false);
        }
      }}
    >
      <Flex
        sx={{
          alignItems:'center',
          justifyContent:'center'
        }}
      >
        <NavLink
          to={props.location}
          activeClassName='active'
          className={open?'open':''}
        >
          {props.text}
          {props.icon&&jsx(props.icon,{
            sx:{
              top:'0.15em',
              position:'relative'
            }
          })}
          {props.dropdown&&(
            <BsCaretDownFill
              onClick={e=>{e.preventDefault();setState(!open)}}
              sx={{
                transform: open?'rotate(180deg)':''
              }}
            />
          )}
        </NavLink>
      </Flex>
      {props.dropdown&&open&&(
        <Box
          bg='secondary'
          sx={{
            position: 'absolute',
            borderRadius: '0 10px 10px 10px',
            zIndex: 10
          }}
        >
          {props.dropdown.map(({location,text},i)=>{
            return (
              <Box key={i}>
                <NavLink to={location}>
                  {text}
                </NavLink>
              </Box>
            )
          })}
        </Box>
      )}
    </Box>
  )
}

export default NavButton