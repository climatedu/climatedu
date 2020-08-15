import React from 'react'
import { AuthProvider } from './src/util/auth'

export const wrapRootElement = ({ element }) => (
  <AuthProvider>{element}</AuthProvider>
)
