import { useCallback, useState } from 'react'
import { Redirect } from '@reach/router'
import { jsx, Box, Text, Heading, Input, Select, Textarea, Label } from 'theme-ui'
import Button from '../components/button'
import { ReactComponent as Google } from '../icons/google.svg'

import firebase from 'firebase/app'
import useFirebase from '../firebase/useFirebase'
import useAuth from '../util/auth'
/** @jsx jsx */

export default function login() {
  const firebaseApp = useFirebase()
  const [error, setError] = useState(null)

  const [name, setName] = useState('')
  const handleSetName = useCallback(e => setName(e.target.value), [])

  const [email, setEmail] = useState('')
  const handleSetEmail = useCallback(e => setEmail(e.target.value), [])

  const [type, setType] = useState('Student')
  const handleSetType = useCallback(e => setType(e.target.value), [])
  
  const [comment, setComment] = useState('')
  const handleSetComment = useCallback(e => setComment(e.target.value), [])

  const submitContactForm = useCallback(() => {

  })


  return (
    <Box sx={{ height: '100vh', display: 'grid' }}>
      <Box
        sx={{ margin: 'auto', width: '100%', maxWidth: 600, display: 'grid' }}
      >
        <Heading
          as='h1'
          sx={{ textAlign: 'center', color: 'primary', marginBottom: 20 }}
        >
          Contact Us
        </Heading>
        <div sx={{ width: '50%' }}>
          <Label htmlFor='name'>Name</Label>
          <Input name='name' placeholder='Name' value={name} onChange={handleSetName} mb={1} />
          
          <Label htmlFor='email'>Email</Label>
          <Input name='email' placeholder='Email' value={email} onChange={handleSetEmail} mb={1} />

          <Label htmlFor='type'>I am...</Label>
          <Select sx={{ width: '50%' }} name='type' value={type} onChange={handleSetType} mb={3}>
            <option>Student</option>
            <option>Teacher</option>
          </Select>
        </div>

        <Label htmlFor='comment'>Comments</Label>
        <Textarea mb={3} name='comment' placeholder='Tell us your thoughts' rows={8} value={comment} onChange={handleSetComment}/>
        <Button onClick={submitContactForm} sx={{ cursor: 'pointer' }}>
          Submit
        </Button>
        <Text sx={{ color: 'highlight', marginTop: 20, textAlign: 'center' }}>
          {error}
        </Text>
      </Box>
    </Box>
  )
}
