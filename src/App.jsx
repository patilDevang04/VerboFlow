import { useState } from 'react'
import Header from './components/Header'
import HomePage from './components/HomePage'
import FileDisplay from './components/FileDisplay'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <FileDisplay/>
    </>
  )
}

export default App
