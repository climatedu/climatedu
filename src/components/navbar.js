/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Box, Image, Flex, Text, jsx } from 'theme-ui'
import useAuth from '../util/auth'
import logo from '../../static/climatedu.png'
import NavButton from './navbutton'
import { BsPerson } from 'react-icons/bs'

const links = [
  {
    'location':_=>'/',
    'text':_=>'Home'
  },
  {
    'location':_=>'/about',
    'text':_=>'About',
    'dropdown':_=>[
      {'location':'/about/team','text':'Our Team'},
      {'location':'/about/mission','text':'Our Mission'}
    ]
  },
  {
    'location':_=>'/contact',
    'text':_=>'Contact Us'
  },
  {
    'location':user=>user?'/profile':'/login',
    'text':user=>user?'Welcome '+user.displayName+'!':'Log in',
    'icon':_=>BsPerson
  },
];

import useFirebase from '../firebase/useFirebase'

const Navbar = () => {
  const firebaseApp = useFirebase()
  const user = useAuth()

  const [error, setError] = useState(null)

  const handleLogout = useCallback(async () => {
    if (!firebaseApp) return
    try {
      await firebaseApp.auth().signOut()
    } catch (e) {
      setError(e.message)
    }
  }, [firebaseApp])
  return (
    <Flex
      sx={{
        backgroundColor: 'background',
        alignContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        fontSize: '24px',
        maxWidth: '960px',
        margin: 'auto',
        padding: '5px'
      }}
    >
      <Box
        sx={{
          flexBasis: '7em',
          marginRight: 'auto'
        }}
      >
        <Image
          src={logo}
          alt='climatedu logo'
        />
      </Box>
      {links.map(({location,text,icon,dropdown}) => {
        const loc = location(user);
        const active = window.location.pathname == loc;
        return (
          <NavButton
            loc={loc}
            text={text(user)}
            icon={icon&&icon(user)}
            active={active}
            dropdown={dropdown?dropdown(user):undefined}
          />
        )
      })}
    </Flex>
  )
}

export default Navbar
