import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FileDisplay from './components/FileDisplay'


function App() {

  const [audioStream, setAudioStream] = useState(null)

  return (
    <>
      <Header /> 
      <HomePage/>
    </>
  )
}

export default App
