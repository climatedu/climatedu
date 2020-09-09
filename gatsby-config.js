const path = require('path')

/**
 * Configure your Gatsby site with this file.
 *
 * See: https://www.gatsbyjs.org/docs/gatsby-config/
 */

module.exports = {
  /* Your site config here */
  plugins: [
    'gatsby-plugin-sharp',
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
  },
}
