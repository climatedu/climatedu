import { useEffect } from 'react'
import { navigate } from 'gatsby'

const Index = () => {
  useEffect(() => {
    navigate('/course')
  }, [])
  return null
}

export default Index
