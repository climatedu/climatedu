/** @jsx jsx */
import { jsx } from "theme-ui"
import React from "react"
import { Button, Textarea } from 'theme-ui'

export default function Home() {
  return <div
    sx={{
        padding: 4,
        backgroundColor: "primary",
      }} 

      style={{
        height: "100vh",
        textAlign: "center",
      }}
  >
    <div sx={{
      backgroundColor: "background",
      padding: 5,
      width: "50vw",
      margin: "0 auto",
      borderRadius: "10px",
      boxShadow: "10px 10px 5px 0px rgba(0,0,0,0.2)"
    }}>
      <h1>Feedback</h1>
      <Textarea sx={{marginBottom: 3}}/>
      <Button>Submit</Button>
    </div>
    
  </div>
}
