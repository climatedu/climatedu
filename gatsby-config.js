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
      resolve: `gatsby-plugin-redirect-to`,
      options: {
        force: true,
        isPermanent: true,
        redirectInBrowser: true,
      },
    },
    {
      resolve: 'gatsby-transformer-remark',
      options: {
        plugins: [
          {
            resolve: 'gatsby-remark-images',
            options: {
              maxWidth: 500,
              tracedSVG: true,
            },
          },
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-unwrap-images',
        ],
      },
    },
    'gatsby-plugin-theme-ui',
    {
      resolve: 'gatsby-source-filesystem',
      options: {
        name: 'course',
        path: path.resolve(__dirname, 'data/course/'),
      },
    },
  ],
  siteMetadata: {
    title: 'Climate education made by students, for students',
    titleTemplate: '%s · climatedu.org',
    description:
      'Led by a group of high school students from Montgomery County Public Schools, ' +
      'climatedu is a climate science and sustainability online mini-course geared ' +
      'toward middle and high school students.',
    image: '/climatedumini.png',
    url: 'https://climatedu.org',
    socials: [
      {
        icon: 'IoLogoInstagram',
        href: 'https://instagram.com/climateduteam',
        name: 'Instagram',
      },
    ],
  },
}
