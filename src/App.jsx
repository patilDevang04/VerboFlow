import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FileDisplay from './components/FileDisplay'


function App() {

  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)

  const isAudioAvailable = file || audioStream

  function handleAudioReset() { 
    setFile(null); 
    setAudioStream(null);
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    console.log('submission completed ...');
  }

  return (
    <>
      <Header /> 
      {isAudioAvailable ? <FileDisplay file={file} audioStream={audioStream} handleAudioReset = {handleAudioReset} handleFormSubmission = {handleFormSubmission}/> 
      : <HomePage  setFile={setFile} setAudioStream={setAudioStream}/>}
      
    </>
  )
}

export default App
