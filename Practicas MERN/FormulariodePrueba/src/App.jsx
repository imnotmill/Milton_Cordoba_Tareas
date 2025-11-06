import { useState } from 'react'
import './App.css'
import Tarjetaformulario from './components/Tarjetaformulario.jsx'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Tarjetaformulario />
    </>
  )
}

export default App
