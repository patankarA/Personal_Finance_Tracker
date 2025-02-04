import React from 'react'
import Header from '../components/Header/index'
import SignUpSignInComponent from '../components/SignupSignin/index'
const Signup = () => {
  return (
    <>
      <Header/>
      <div className="wrapper">
        <SignUpSignInComponent/>
      </div>
    </>
  )
}

export default Signup