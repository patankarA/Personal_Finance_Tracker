import { useState } from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import  Dashboard  from './pages/Dashboard'
import  Signup  from './pages/Signup'
import './App.css'
import { ToastContainer, toast } from 'react-toastify';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <ToastContainer />
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Signup/>}></Route>
        <Route path='/dashboard' element={<Dashboard/>}></Route>
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
