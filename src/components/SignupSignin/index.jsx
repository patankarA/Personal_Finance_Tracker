import React, { useState } from 'react'
import './style.css'
import Input from '../Input'
import Button from '../Button/index'

const SignUpSignInComponent = () => {
  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")

  return (
    <div className='signup-wrapper'>
      <h2 className='title'>Sign Up on <span style={{color: "var(--theme"}}>Financely</span>
      </h2>
      <form>
        <Input 
        label={"Full Name"} 
        placeholder={"John Doe"} 
        state={name} 
        setState={setName}
        />
        <Input 
        label={"Email"} 
        placeholder={"JohnDoe@gmail.com"} 
        state={email} 
        setState={setEmail}
        />
        <Input 
        label={"Password"} 
        placeholder={"Example@123"} 
        state={password} 
        setState={setPassword}
        />
        <Input 
        label={"confirmPassword"} 
        placeholder={"Example@123"} 
        state={confirmPassword} 
        setState={setConfirmPassword}
        />
        <Button text={"Signup Using Email and Password"}/>
        <p style={{textAlign: "center", fontSize:"0.8rem"}}>or</p>
        <Button text={"Signup Using Google"} blue={true}/>
      </form>

    </div>
  )
}

export default SignUpSignInComponent