// import Transcriber from 
import React from 'react';
const Transcriber = React.lazy(() => import('./components/Transcriber'))
import './App.css'

export const ORIGIN = import.meta.env.VITE_ORIGIN;

function App() {


  return (
    <>
        <Transcriber />
    </>
  )
}

export default App
