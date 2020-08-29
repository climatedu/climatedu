/** @jsx jsx */
import { useCallback, useState } from 'react'
import { Box, Image, Flex, Text, jsx } from 'theme-ui'
import useAuth from '../util/auth'
import logo from '../../static/climatedu.png'
import NavButton from './navbutton'
import { BsPerson } from 'react-icons/bs'

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
  const links = [
    {
      'location':'/',
      'text':'Home'
    },
    {
      'location':'/about',
      'text':'About',
      'dropdown':[
        {'location':'/about/team','text':'Our Team'},
        {'location':'/about/mission','text':'Our Mission'}
      ]
    },
    {
      'location':'/contact',
      'text':'Contact Us'
    },
    {
      'location':user?'/profile':'/login',
      'text':user?'Welcome '+user.displayName+'!':'Log in',
      'icon':BsPerson
    },
  ];
  return (
    <Flex
      m='auto'
      p='5px'
      sx={{
        alignContent: 'flex-start',
        alignItems: 'center',
        flexWrap: 'wrap',
        justifyContent: 'flex-end',
        fontSize: '24px',
        maxWidth: '960px'
      }}
    >
      <Box
        mr='auto'
        sx={{
          flexBasis: '7em'
        }}
      >
        <Image
          src={logo}
          alt='climatedu logo'
        />
      </Box>
      {links.map((props,i) => (
        <NavButton key={i} {...props} />
      ))}
    </Flex>
  )
}

export default Navbar
