import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Toolbar} from "./components/Toolbar.tsx";

function App() {
  const [count, setCount] = useState(0)

  return (
    <div >
      <Toolbar />
    </div>
  )
}

export default App
