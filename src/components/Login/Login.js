import {
   getAuth,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    updateProfile,
    FacebookAuthProvider ,
    signInWithPopup

} from "firebase/auth";
import './Login.css'
// import {  signInWithPopup, FacebookAuthProvider } from "firebase/auth";

import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';

import firebaseConfig from './firebase.config';
import { useState } from 'react';
firebase.initializeApp(firebaseConfig)


function Login() {
  const [newUser,setNewUser]=useState(false);
 const [user,setUser]=useState({
   isSingedIn:false,
   name:"",
   email:"",
   password:"",
   photo:"",
   error:'',
   success:false

 })
 const provider= new firebase.auth.GoogleAuthProvider();
 const fbprovider = new FacebookAuthProvider();
  const handleSingnIn=()=>{
  firebase.auth().signInWithPopup(provider)
  .then(res=>{
    const {displayName,photoURL,email}=res.user
    const signedInUswe={
      isSingedIn:true,
      name:displayName,
      email:email,
      photo:photoURL
    }
    setUser(signedInUswe)
    console.log(displayName,email,photoURL);
  })
  .catch(err=>{
    console.log(err);
    console.log(err.message);
  })
}
const habdleFbsignIn=()=>{

const auth = getAuth();
signInWithPopup(auth, fbprovider)
  .then((result) => {
    // The signed-in user info.
    const user = result.user;
    console.log("fb user",user);
    // This gives you a Facebook Access Token. You can use it to access the Facebook API.
    const credential = FacebookAuthProvider.credentialFromResult(result);
    const accessToken = credential.accessToken;
  
    // ...
  })
  .catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.email;
    // The AuthCredential type that was used.
    const credential = FacebookAuthProvider.credentialFromError(error);

    // ...
  });
}

const handleSingOut=()=>{
  firebase.auth().signOut()
  .then(res=>{
    const signedOutUser={
      isSingedIn:false,
      name:"",
      email:"",
      password:'',
      photo:""
    }
    setUser(signedOutUser);
    console.log(res);
  })
  .catch(err=>{

    
  })
}
const handleBlur =(event)=>{
//   console.log(event.target.name);
// console.log(event.target.value);
let isFromValid;
if(event.target.name ==='email'){
   isFromValid=/\S+@\S+\.\S+/.test(event.target.value)
  // console.log(isEmailValid);
}
  if(event.target.name==='password'){
    const isPasswordValid=event.target.value.length > 6;
    const passwordHasNumber= /\d{1}/.test(event.target.value);
    isFromValid=isPasswordValid && passwordHasNumber;
  } 

  if(isFromValid){
    const newUserInfo={...user};
    newUserInfo[event.target.name]=event.target.value;
    setUser(newUserInfo);
  }
}
 const handleSubmit=(event)=>{
   console.log(user.email, user.password);
  if(newUser && user.email && user.password){
    // console.log('submitting');


    const auth = getAuth();
    createUserWithEmailAndPassword(auth, user.email, user.password)
      // .then((userCredential) => {
      //   // Signed in 
      //   const user = userCredential.user;
      //   // ...
      .then(res => {
        const newUserInfo={...user};
        newUserInfo.error="";
        newUserInfo.success=true;
        setUser(newUserInfo);
        updateUserName(user.name)
        // console.log(res);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        // const errorMessage = error.message;
        // console.log(errorCode,errorMessage);
        
        setUser(newUserInfo);
        // ..
      });
    

  }

  if(!newUser&& user.email && user.password){
    const auth = getAuth();
    signInWithEmailAndPassword(auth, user.email,user.password)
      // .then((userCredential) => {
      //   // Signed in 
      //   const user = userCredential.user;
      //   // ...
      .then(res => {
        const newUserInfo={...user};
        newUserInfo.error="";
        newUserInfo.success=true;
        setUser(newUserInfo);
        console.log('sign in user info ', res.user);
      })
      .catch((error) => {
        // const errorCode = error.code;
        const newUserInfo={...user};
        newUserInfo.error=error.message;
        newUserInfo.success=false;
        // const errorMessage = error.message;
        // console.log(errorCode,errorMessage);
        
        setUser(newUserInfo);
        // ..
      });
  }
  event.preventDefault();
  // event.preventDefault();

 }

 const updateUserName =name =>{
  const auth = getAuth();
updateProfile(auth.currentUser, {
  displayName: name 
  // Profile updated!
  // ...
})
.then(function(){
  console.log("user name update successfully");
})
.catch(function(error)  {
  console.log(error);
});

 }
  return (
    <div className="login">
      { 
      user.isSingedIn ? <button onClick={handleSingOut}>Sing out</button>:  
      <button onClick={handleSingnIn}>Sing In</button>

      }    
      <br />

      <button onClick={habdleFbsignIn}> Sing in Using facebook</button>

  {
        user.isSingedIn &&  <div>
          <p>welcome,{user.name}</p>
          <p>Your email:{user.email}</p>
          <img src={user.photo} alt=" tutul" />
        </div> 
      }


      <h1>Our Own Authentication</h1>
      <input type="checkbox" onChange={()=>setNewUser(!newUser)} name="newUser" id="" />
      <label htmlFor="newUser"> newUserSing up</label>
       <form onSubmit={handleSubmit}>
        {newUser && <input type="text" name='name' onBlur={handleBlur} placeholder='Your name' />}
          <br />
          <input type="text" name='email' onBlur={handleBlur} placeholder='Your Email Address' required />
          <br />
          <input type="password" onBlur={handleBlur} name="password"placeholder='Your Password' required />
          <br />
          <input type="submit" value={newUser ?"sign up ":'sing in'} />
       </form>
       <p style={{color:'red'}}>{user.error}</p>
       {
         user.success &&  <p style={{color:'green'}}>user {newUser ? 'created':"Logges In"} created success</p>
       }
       
    </div>
  );
}

export default Login;
