import { useCallback, useState } from 'react'
import { Redirect } from '@reach/router'
import { jsx, Box, Text, Heading, Avatar, Badge } from 'theme-ui'
import Button from '../components/button'
/** @jsx jsx */

export default function about() {
  return (
    <Box sx={{ height: '100vh', width: '100vw', display: 'grid' }}>
      <Box
        sx={{
          margin: '5% auto',
          width: '100%',
          maxWidth: '90%',
          display: 'grid',
          gridTemplateColums:
            '11.1% 11.1% 11.1% 11.1% 11.1% 11.1% 11.1% 11.1% 11.1%',
          gridTemplateRows: '100px auto',
        }}
      >
        <Heading
          sx={{
            fontSize: '7',
            textAlign: 'center',
            color: 'primary',
            gridColumnStart: '1',
            gridColumnEnd: '9',
          }}
        >
          Our Team
        </Heading>

        <Box
          sx={{
            gridColumnStart: '1',
            gridColumnEnd: '3',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/anika.jpg" />
          <Box>
            <Text>Anika Seth</Text>
          </Box>
        </Box>

        <Box
          sx={{
            gridColumnStart: '3',
            gridColumnEnd: '5',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/chen-robert.jpg" />
        </Box>

        <Box
          sx={{
            gridColumnStart: '5',
            gridColumnEnd: '7',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/ginkoid.png" />
        </Box>

        <Box
          sx={{
            gridColumnStart: '7',
            gridColumnEnd: '9',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/josh.jpg" />
        </Box>

        <Box
          sx={{
            gridColumnStart: '2',
            gridColumnEnd: '4',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/kevinpfp.jpg" />
        </Box>

        <Box
          sx={{
            gridColumnStart: '4',
            gridColumnEnd: '6',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/viv.jpg" />
        </Box>

        <Box
          sx={{
            gridColumnStart: '6',
            gridColumnEnd: '8',
            height: '400px',
            textAlign: 'center',
          }}
        >
          <Avatar src="/bracklinn.jpeg" />
        </Box>
      </Box>
    </Box>
  )
}
