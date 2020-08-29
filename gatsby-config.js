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
  ],
  siteMetadata: {
    socials: [
      {
        icon: 'IoLogoInstagram',
        href: 'https://instagram.com/darinmao',
      },
      {
        icon: 'IoLogoTwitter',
        href: 'https://twitter.com/darinmao_',
      },
      {
        icon: 'IoLogoGithub',
        href: 'https://github.com/DarinMao',
      },
      {
        icon: 'FaDiscord',
        href: 'https://discord.gg/w5xapGP',
      },
      {
        icon: 'MdEmail',
        href: 'mailto:maodarin@gmail.com',
      },
      {
        icon: 'IoLogoYoutube',
        href: 'https://youtube.com/watch?v=dQw4w9WgXcQ',
      },
    ],
  },
}
