import React from 'react'
import { Helmet } from 'react-helmet'

export default function Application() {
  return (
    <>
      <Helmet
        style={[
          {
            cssText: `
                    html { 
                        margin: 0; 
                        height: 100%; 
                        overflow: hidden; 
                    } 
                    iframe { 
                        position: absolute; 
                        left:0; 
                        right:0; 
                        bottom:0; 
                        top:0; 
                        border:0; 
                    }
                `,
          },
        ]}
      >
        <title>climatedu application</title>
        <link rel='shortcut icon' type='image/png' href='/climatedumini.png' />
      </Helmet>
      <main>
        <iframe
          id='typeform-full'
          width='100%'
          height='100%'
          frameBorder='0'
          allow='camera; microphone; autoplay; encrypted-media;'
          src='https://form.typeform.com/to/nksESU1J?typeform-medium=embed-snippet'
        />
      </main>
    </>
  )
}
