const path = require('path')

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  plugins: [
    'gatsby-plugin-sharp',
    'gatsby-plugin-react-helmet',
    'gatsby-transformer-sharp',
    'gatsby-transformer-yaml',
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        excerpt_separator: '<!-- end -->',
      },
    },
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'people',
        path: path.resolve(__dirname, 'data/people/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'course',
        path: path.resolve(__dirname, 'data/course/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'config',
        path: path.resolve(__dirname, 'data/config/'),
      },
    },
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'media',
        path: path.resolve(__dirname, 'data/media/'),
      },
    },
  ],
  siteMetadata: {
    title: 'Climate education made by students, for students',
    titleTemplate: '%s · climatedu.org',
    description:
      'Led by a group of high school students from MCPS, climatedu is a climate science ' +
      'and sustainability online mini-course geared toward middle and high school students. ' +
      "Climate education is often lacking from today’s science curriculums, and we're " +
      'dedicated establishing that foundation of knowledge to build a robust future of changemakers.',
    image: '/climatedumini.png',
    url: 'https://climatedu.org',
    socials: [
      {
        icon: 'IoMdMail',
        href: 'mailto:hello@climatedu.org',
        name: 'Email',
      },
      {
        icon: 'IoLogoInstagram',
        href: 'https://instagram.com/climateduteam',
        name: 'Instagram',
      },
      {
        icon: 'IoLogoTwitter',
        href: 'https://twitter.com/climateduteam',
        name: 'Twitter',
      },
      {
        icon: 'IoLogoYoutube',
        href: 'https://www.youtube.com/channel/UCmImqBAZqWWXPzmeArLJ-4Q',
        name: 'YouTube',
      },
    ],
    navLinks: [
      {
        location: '/',
        text: 'Home',
      },
      {
        location: '/about/',
        text: 'About',
        dropdown: [
          { location: '/about/team', text: 'Our Team' },
          { location: '/about/mission', text: 'Our Mission' },
        ],
      },
      {
        location: '/contact',
        text: 'Contact Us',
      },
    ],
  },
}
