import React from 'react'
import Helmet from 'react-helmet'
import { graphql, useStaticQuery } from 'gatsby';

const seoQuery = graphql`
query SEO {
  site {
    buildTime (formatString: "YYYY-MM-DD")
    siteMetadata {
      siteTitle
      siteTitleAlt
      siteDescription
      siteUrl
      siteLogo
    }
  }
}
`

const SEO = () => {

  const {
    site: {
      buildTime,
      siteMetadata: {
        siteTitle,
        siteTitleAlt,
        siteDescription,
        siteUrl,
        siteLogo,
      }
    }
  } = useStaticQuery(seoQuery)

  return (
  <Helmet titleTemplate={`%s | ${siteTitle}`} defaultTitle={siteTitle}>
    <meta name="description" content={siteDescription} />

    <meta property="og:url" content={siteUrl} />
    <meta property="og:type" content="website" />
    <meta property="og:locale" content="en" />
    <meta property="og:site_name" content={siteTitle} />
  </Helmet>
  )
}

export default SEO
