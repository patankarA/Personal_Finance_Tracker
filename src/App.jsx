import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Dashboard  from './pages/Dashboard'
import  Signup  from './pages/Signup'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
