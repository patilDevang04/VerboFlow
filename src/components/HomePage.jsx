import React from 'react'
import { useState, useRef , useEffect} from 'react';

export default function HomePage(props) {

    const mimeType = 'audio/webm'
    const [audioChunks, setAudioChunks] = useState([])
    const [recordingStatus, setRecordingStatus] = useState('inactive')
    const [duration, setDuration] = useState(0)
    const mediaRecorder = useRef(null)

    async function startRecording() { 

        let tempStream
        console.log('Start recording')

        try {
            const streamData = await navigator.mediaDevices.getUserMedia({
                audio: true,
                video: false
            })
            tempStream = streamData
        } catch (err) {
            console.log(err.message)
            return
        }
        setRecordingStatus('recording')
        const media = new MediaRecorder(tempStream, { type: mimeType })
        mediaRecorder.current = media

        mediaRecorder.current.start()
        let localAudioChunks = []
        mediaRecorder.current.ondataavailable = (event) => {
            if (typeof event.data === 'undefined') { 
                console.log('undefined event')
                return 
            }
            if (event.data.size === 0) { 
                console.log('no audio date')
                return 
            }
            console.log(event.data)
            localAudioChunks.push(event.data)
            console.log(localAudioChunks)
        }
        setAudioChunks(localAudioChunks)
        
    }

    async function stopRecording() {
        setRecordingStatus('inactive')
        console.log('Stop recording')

        mediaRecorder.current.stop()
        mediaRecorder.current.p
        mediaRecorder.current.onstop = () => {
            const audioBlob = new Blob(audioChunks, { type: mimeType })
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioChunks([]);
            setDuration(0);
        }
    }

    useEffect(() => {
        if (recordingStatus === 'inactive') { return }

        const interval = setInterval(() => {
            setDuration(curr => curr + 1)
        }, 1000)

        return () => clearInterval(interval)
    })


    

    return (
        <main className='flex-1  p-4 flex flex-col gap-3 text-center sm:gap-4  justify-center pb-20'>
            <h1 className='font-semibold text-5xl sm:text-6xl md:text-7xl'>Verbo<span className='text-blue-400 bold'>Flow</span></h1>
            <h3 className='font-medium md:text-lg'>Record <span className='text-blue-400'>&rarr;</span> Transcribe <span className='text-blue-400'>&rarr;</span> Translate</h3>
            <button onClick = {recordingStatus === 'recording' ? stopRecording : startRecording} className='flex specialBtn px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4'>
            <p className='text-blue-400'>{recordingStatus === 'inactive' ? 'Record' : `Stop recording`}</p>
                <div className='flex items-center gap-2'>
                    <span> {duration} </span>
                    <i className={"fa-solid duration-200 fa-microphone " + (recordingStatus === 'recording' ? ' text-rose-300' : "")}></i>
                </div>
            </button>
            <p className='text-base'>Or <label className='text-blue-400 cursor-pointer hover:text-blue-600 duration-200'>upload <input className='hidden' type='file' accept='.mp3,.wave' /></label> a mp3 file</p>
        </main>
    )
}
