import React from 'react'
import './style.css'

const Header = () => {

  function logoutFun() {
    alert("Logout!");
  }
  
  return (
    <div className='navbar'>
      <p className='logo'>Financly.</p>
      <p className='logoutLink' onClick={logoutFun}>logout</p>
    </div>
  )
}

export default Header