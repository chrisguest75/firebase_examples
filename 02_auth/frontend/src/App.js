import { GoogleAuthProvider, getAuth, signInWithPopup, signOut } from "firebase/auth";
import logo from './logo.svg';
import { useState } from 'react';
import './App.css';

function App() {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");
  const auth = getAuth();

  const [authorizedUser,setAuthorizedUser] = useState(false || sessionStorage.getItem("accessToken"));

  function signInwithGoogle() {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        if(user){
          user.getIdToken().then((tkn)=>{
            // set access token in session storage
            sessionStorage.setItem("accessToken", tkn);
            setAuthorizedUser(true);
          })
        }
        console.log(user);
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
      });
  }
  function logoutUser(){
    signOut(auth).then(() => {      
      // clear session storage
      sessionStorage.clear();
      setAuthorizedUser(false);
      // window.location.replace("/");
      alert('Logged Out Successfully');
    }).catch((error) => {
      // An error happened.
      alert(error);
    });
  }  
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        {authorizedUser ? (
        <>
          <p>Authorized user</p>
          <button onClick={logoutUser}>Logout Button</button>
        </>
      ): (
        <>
          <button onClick={signInwithGoogle}>Sign-in&nbsp;with&nbsp;Google</button>
        </>
      )}        
      </header>
    </div>
  );
}

export default App;
