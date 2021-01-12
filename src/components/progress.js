/** @jsx jsx */
import { Box, Flex, Grid, jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import React from 'react'

const Progress = ({data}) => {
  return (
  <Grid sx={{gridGap: '0 8px', gridTemplateColumns: 'auto min-content', fontSize: 3}}>
  {data.map(({frontmatter}) => {
    frontmatter.percent = Math.random()
    let goToUnit = () => navigate('/course/'+frontmatter.slug+'/')
    return (
      <React.Fragment key={frontmatter.unit}><Flex onClick={goToUnit} sx={{cursor: 'pointer', gridColumn: 1, width: '100%', color: frontmatter.highlight, fontWeight: 'bold', lineHeight: 1.3}}>
          <Box>{frontmatter.slug[0].toUpperCase()+frontmatter.slug.slice(1)}</Box>
          <Box sx={{flexGrow: 1, ml: 2, bg: frontmatter.background, height: '0.8em', position: 'relative', top: '0.25em', borderRadius: '10px'}}>
            <Box sx={{width: `${frontmatter.percent*100}%`, bg: frontmatter.highlight, height: '100%', position: 'absolute', borderRadius: '10px'}}/>
          </Box>
        </Flex>
      <Box onClick={goToUnit} sx={{cursor: 'pointer', gridColumn: 2, color: frontmatter.highlight, fontWeight: 'bold'}}>{Math.round(frontmatter.percent*100)}%</Box></React.Fragment>
    )
  })}
  </Grid>
  )
}

export default Progress
