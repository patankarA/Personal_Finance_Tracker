import React, { useState } from 'react'
import './style.css'
import Input from '../Input'
import Button from '../Button/index'
import { toast } from 'react-toastify'
import { GoogleAuthProvider, createUserWithEmailAndPassword, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, db, provider } from '../../firebase'
import { useNavigate } from 'react-router-dom'
import { doc, setDoc, getDoc } from "firebase/firestore"

const SignUpSignInComponent = () => {
  const[name, setName] = useState("")
  const[email, setEmail] = useState("")
  const[password, setPassword] = useState("")
  const[confirmPassword, setConfirmPassword] = useState("")
  const[loading, setLoading] = useState(false)
  const[loginForm, setLoginForm] = useState(false)
  const navigate = useNavigate()


  async function createDoc(user) {
    if (!user?.uid) {
      toast.error("Invalid user data!");
      return;
    }
  
    try {
      const userRef = doc(db, "users", user.uid);
      const userData = await getDoc(userRef);
  
      console.log("Document exists:", userData.exists());
  
      if (!userData.exists()) {
        await setDoc(userRef, {
          displayName: user.displayName || user.email,
          email: user.email,
          photoURL: user.photoURL || "",
          createdAt: new Date(),
        });
  
        toast.success("Doc Created!");
        console.log("Document successfully created!");
      } else {
        toast.error("Doc Already Exists!");
      }
    } catch (e) {
      console.error("Error creating document:", e);
      toast.error(e.message);
    }
  }

  function signupWithEmial(){
    
    // Authenticate to user, or create a new account using email and password
    setLoading(true)
    if(name != "" && email != "" && password != "" && confirmPassword != "" ){
      if(password == confirmPassword){
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed up 
          const user = userCredential.user;
          toast.success("User Created")
          // After user creation make states empty
          setLoading(false)
          setName("")
          setEmail("")
          setPassword("")
          setConfirmPassword("")
          // Create A doc with user id as the following id
          createDoc(user)
          // Navigate to dashboard
          navigate("/dashboard")

          // ...
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          toast.error(errorMessage)
          setLoading(false)

          // ..
        });
      }
      else{
        toast.error("Password and Confirm Password don't match!")
        setLoading(false)
      }
    }
    else{
      toast.error("All fields are mandatory!")
      setLoading(false)
    } 
  }

  function loginUsingEmail(){
    // Authenticate to user, or create a new account using email and password
    setLoading(true)
    if(email != "" && password != ""){
      signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        toast.success("User Logged In!")
        setLoading(false)
        // Navigate to dashboard
        navigate("/dashboard")
        // ...
      })
      .catch((error) => {
        toast.error(error.message)
        setLoading(false)
      });
    }
    else{
      toast.error("All fields are mandatory!")
      setLoading(false)
    }
  }

    // google login or sign up function
    const googleAuth = () => {
      setLoading(true);
      try {
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. you can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            createDoc(user);
            navigate("/dashboard");
            toast.success("Login successfully");
            // IdP data available using getAdditionlUserInfo(result)
            setLoading(false);
          })
          .catch((error) => {
            toast.error(error.message);
            setLoading(false);
          });
      } catch (error) {
        toast.error(error.message);
      }
    };

  return (
    <>{loginForm ? (
      // Login
      <div className='signup-wrapper'>
      <h2 className='title'>Login on <span style={{color: "var(--theme"}}>Financely</span>
      </h2>
      <form>
        <Input
        type={"email"} 
        label={"Email"} 
        placeholder={"JohnDoe@gmail.com"} 
        state={email} 
        setState={setEmail}
        />
        <Input
        type={"password"} 
        label={"Password"} 
        placeholder={"Example@123"} 
        state={password} 
        setState={setPassword}
        />
        <Button 
          disabled = {loading} // disable button when loading state is true
          text={loading ? "Loading..." : "Login Using Email and Password"}  
          onClick={loginUsingEmail}
        />
        <p style={{textAlign: "center", fontSize:"0.8rem"}}>or</p>
        <Button 
          text={loading ? "Loading..." : "Login Using Google"} 
          onClick={googleAuth}
          blue={true}
        />
        <p style={{textAlign: "center", fontSize:"0.8rem", cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Don't Have An Account Already? Click Here</p>
      </form>

    </div>
    ) : (
      // Signup
      <div className='signup-wrapper'>
      <h2 className='title'>Sign Up on <span style={{color: "var(--theme"}}>Financely</span>
      </h2>
      <form>
        <Input
        type={"text"} 
        label={"Full Name"} 
        placeholder={"John Doe"} 
        state={name} 
        setState={setName}
        />
        <Input
        type={"email"} 
        label={"Email"} 
        placeholder={"JohnDoe@gmail.com"} 
        state={email} 
        setState={setEmail}
        />
        <Input
        type={"password"} 
        label={"Password"} 
        placeholder={"Example@123"} 
        state={password} 
        setState={setPassword}
        />
        <Input
        type={"password"} 
        label={"confirmPassword"} 
        placeholder={"Example@123"} 
        state={confirmPassword} 
        setState={setConfirmPassword}
        />
        <Button 
          disabled = {loading} // disable button when loading state is true
          text={loading ? "Loading..." : "Signup Using Email and Password"}  
          onClick={signupWithEmial}
        />
        <p style={{textAlign: "center", fontSize:"0.8rem"}}>or</p>
        <Button 
          text={loading ? "Loading..." : "Signup Using Google"} 
          blue={true}
          onClick={googleAuth}
        />
        <p style={{textAlign: "center", fontSize:"0.8rem", cursor:"pointer"}} onClick={()=>setLoginForm(!loginForm)}>Or Have An Account Already? Click Here</p>
      </form>

    </div>
    )}
    </>

  )
}

export default SignUpSignInComponent