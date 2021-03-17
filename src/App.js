import React, { useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config";
import "./App.css";

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

function App() {
  const [user, setUser] = useState({});
  const googleProvider = new firebase.auth.GoogleAuthProvider();
  const fbProvider = new firebase.auth.FacebookAuthProvider();
  const githubProvider = new firebase.auth.GithubAuthProvider();

  //Google
  const handleGoogleSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(googleProvider)
      .then((result) => {
        var credential = result.credential;

        var token = credential.accessToken;

        var user = result.user;
        console.log("google user", user, token);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, email, errorMessage, credential);
      });
  };

  // Facebook
  const handleFbSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(fbProvider)
      .then((result) => {
        var credential = result.credential;

        var user = result.user;

        var accessToken = credential.accessToken;
        console.log("fb user sign in", user, accessToken);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, email, errorMessage, credential);
      });
  };

  // Git Hub
  const handleGithubSignIn = () => {
    firebase
      .auth()
      .signInWithPopup(githubProvider)
      .then((result) => {
        var credential = result.credential;

        var token = credential.accessToken;

        var user = result.user;
        console.log("Git hub User", user, token);
        setUser(user);
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        var email = error.email;
        var credential = error.credential;
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  return (
    <div className="App">
      <h1>Fire Base</h1>
      <button onClick={handleGoogleSignIn}>Sign In using Google</button>
      <br />
      <button onClick={handleFbSignIn}>Sign In using Facebook </button>
      <br />
      <button onClick={handleGithubSignIn}>Sign In using Git Hub</button>
      <h3>Email: {user.email}</h3>
      <img src={user.photoURL} alt="" />
    </div>
  );
}

export default App;
