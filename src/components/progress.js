/** @jsx jsx */
import React, { useEffect, useState } from 'react'
import { Box, Flex, Grid, jsx } from 'theme-ui'
import { navigate } from 'gatsby'
import { HiChatAlt } from 'react-icons/hi'

import firebase from 'firebase/app'

import useAuth from '../util/auth'

import useFirebase from '../firebase'

const Progress = ({ data, account }) => {
  if (account === null) return null

  const firebaseApp = useFirebase()

  const [unitProgress, setUnitProgress] = useState(new Array(data.length).fill(0))
  const [loaded, setLoaded] = useState(false)

  if (!loaded) {
    const f = async () => {
      const collection = await firebaseApp
        .firestore()
        .collection('accounts')
        .doc(firebase.auth().currentUser.uid)
        .collection('progress')
        .get()

      const temp = new Array(data.length).fill(0)
      
      collection.docs.map((doc, idx) => {
        temp[idx] = (doc.data().percent)/100 | 0
      })

      setUnitProgress(temp)
      setLoaded(true)
    }
    f()
  }

  return (
    <Grid
      sx={{
        gridGap: '0 8px',
        gridTemplateColumns: 'auto min-content min-content',
        fontSize: 3,
      }}
    >
      {data.map(({ frontmatter }) => {
        frontmatter.percent = unitProgress[frontmatter.unit-1]
        let goToUnit = () => navigate('/course/' + frontmatter.slug + '/')
        return (
          <React.Fragment key={frontmatter.unit}>
            <Flex
              tabIndex='0'
              onClick={goToUnit}
              sx={{
                cursor: 'pointer',
                '&:focus, &:hover': {
                  color: frontmatter.text,
                  outline: 'none',
                },
                gridColumn: 1,
                width: '100%',
                color: frontmatter.highlight,
                fontWeight: 'bold',
                lineHeight: 1.3,
              }}
            >
              <Box>
                {frontmatter.slug[0].toUpperCase() + frontmatter.slug.slice(1)}
              </Box>
              <Box
                sx={{
                  flexGrow: 1,
                  ml: 2,
                  bg: frontmatter.background,
                  height: '0.8em',
                  position: 'relative',
                  top: '0.25em',
                  borderRadius: '10px',
                }}
              >
                <Box
                  sx={{
                    width: `${frontmatter.percent * 100}%`,
                    bg: frontmatter.highlight,
                    height: '100%',
                    position: 'absolute',
                    borderRadius: '10px',
                  }}
                />
              </Box>
            </Flex>
            <HiChatAlt
              onClick={() => {
                navigate(
                  '/responses/?unit=' +
                    frontmatter.unit +
                    '&student=' +
                    account.id
                )
              }}
              tabIndex='0'
              sx={{
                alignSelf: 'center',
                gridColumn: 2,
                color: frontmatter.highlight,
                cursor: 'pointer',
                '&:focus, &:hover': {
                  color: frontmatter.text,
                  outline: 'none',
                },
              }}
            />
            <Box
              sx={{
                gridColumn: 3,
                color: frontmatter.highlight,
                fontWeight: 'bold',
              }}
            >
              {Math.round(frontmatter.percent * 100)}%
            </Box>
          </React.Fragment>
        )
      })}
    </Grid>
  )
}

export default Progress
