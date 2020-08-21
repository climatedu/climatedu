/** @jsx jsx */
import { Box, Text, Image, Grid, NavLink, jsx } from 'theme-ui'
import useAuth from '../util/auth'
import Link from './link'
import logo from '../../static/climatedu.png'

const links = [
  {
    'location':_=>'/',
    'text':_=>'Home'
  },
  {
    'location':_=>'/about',
    'text':_=>'About',
    'dropdown':['Our Team','Our Mission']
  },
  {
    'location':_=>'/contact',
    'text':_=>'Contact Us'
  },
  {
    'location':user=>user?'/profile':'/login',
    'text':user=>user?'Welcome '+user.displayName+'!':'Log in'
  },
];

const Navbar = () => {
  const user = useAuth()
  return (
    <Grid
      gap={0}
      columns={['repeat(2,1fr)','repeat(5,1fr)']}
      sx={{
        backgroundColor: 'background',
        justifyItems: 'center',
        alignItems: 'center',
        textAlign: 'center',
        fontSize: '24px',
        maxWidth: '960px',
        margin: 'auto',
        padding: '5px'
      }}
    >
      <Image
        src={logo}
        alt='climatedu logo'
        sx={{
          minHeight:'3em',
          maxHeight:'6em',
          justifySelf:'start'
        }}
      />
      {links.map(({location,text}) => {
        const cur = window.location.pathname.endsWith(location())
        return (<Box sx={{
          display: 'inline-block',
          padding: '2px 8px',
          borderRadius: '10px',
          background: cur?'#dfd':'inherit',
          border: cur?'3px solid green':'0px',
        }}>
          <NavLink
            href={location()}
          >
            {text()}
          </NavLink>
        </Box>)
      })}
    </Grid>
  )
}

export default Navbar