import { useState ,useRef, useEffect} from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FileDisplay from './components/FileDisplay'
import { MessageTypes } from './utils/constants'
import TranscribedText from './components/TranscribedText'
import Information from './components/Information'

function App() {

  const [file, setFile] = useState(null)
  const [audioStream, setAudioStream] = useState(null)
  const [output, setOutput] = useState(null);
 
  const isAudioAvailable = file || audioStream

  function handleAudioReset() { 
    setFile(null); 
    setAudioStream(null);
  }

  const worker = useRef(null)

  useEffect(() => {
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/transcribe.worker.js', import.meta.url), {
        type: 'module'
      })
    }

    const onMessageReceived = async (e) => {
      switch (e.data.type) {
        case 'DOWNLOADING':
          console.log('DOWNLOADING')
          break;
        case 'LOADING':
          console.log('LOADING')
          break;
        case 'RESULT':
          const text = e.data.results[0].text;
          console.log(text)
          setOutput(text);
          break;
        case 'INFERENCE_DONE':
          console.log("DONE")
          break;
      }
    }

    worker.current.addEventListener('message', onMessageReceived)

    return () => worker.current.removeEventListener('message', onMessageReceived)
  })

  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({ sampleRate: sampling_rate })
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  async function handleFormSubmission() {
    if (!file && !audioStream) { return }

    console.log('submission completed ...');

    let audio = await readAudioFrom(file ? file : audioStream)

    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({
      type: MessageTypes.INFERENCE_REQUEST,
      audio,
      model_name
    })
  }

  return (
    <>
      <Information/>
      
    </>
  )
}

export default App
