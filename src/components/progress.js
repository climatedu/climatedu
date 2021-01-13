/** @jsx jsx */
import { Box, Flex, Grid, jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import React from 'react'
import { HiChatAlt } from 'react-icons/hi'

const Progress = ({data}) => {
  return (
  <Grid sx={{gridGap: '0 8px', gridTemplateColumns: 'auto min-content min-content', fontSize: 3}}>
  {data.map(({frontmatter}) => {
    frontmatter.percent = Math.random()
    let goToUnit = () => navigate('/course/'+frontmatter.slug+'/')
    return (
      <React.Fragment key={frontmatter.unit}><Flex tabIndex="0" onClick={goToUnit} sx={{cursor: 'pointer', '&:focus, &:hover': {color: frontmatter.text, outline: 'none'}, gridColumn: 1, width: '100%', color: frontmatter.highlight, fontWeight: 'bold', lineHeight: 1.3}}>
          <Box>{frontmatter.slug[0].toUpperCase()+frontmatter.slug.slice(1)}</Box>
          <Box sx={{flexGrow: 1, ml: 2, bg: frontmatter.background, height: '0.8em', position: 'relative', top: '0.25em', borderRadius: '10px'}}>
            <Box sx={{width: `${frontmatter.percent*100}%`, bg: frontmatter.highlight, height: '100%', position: 'absolute', borderRadius: '10px'}}/>
          </Box>
        </Flex>
      <HiChatAlt tabIndex="0" sx={{alignSelf: 'center', gridColumn: 2, color: frontmatter.highlight, cursor: 'pointer', '&:focus, &:hover': {color: frontmatter.text, outline: 'none'}}}/>
      <Box sx={{gridColumn: 3, color: frontmatter.highlight, fontWeight: 'bold'}}>{Math.round(frontmatter.percent*100)}%</Box></React.Fragment>
    )
  })}
  </Grid>
  )
}

export default Progress
