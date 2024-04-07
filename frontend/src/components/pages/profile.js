import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();

  // Example POST method implementation:
  async function cas_login(url = "http://127.0.0.1:5000/cas/login") {
  console.log("cas_login called");
  try {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data);
    // Extract the URL from the response
    const redirectUrl = data.login_url; // Replace 'redirectUrl' with the actual key in your response JSON

    // Redirect the user to the obtained URL
    window.location.href = redirectUrl;
  } catch (error) {
    console.error("Error during CAS login:", error);
    // Handle errors if needed
  }
}


  const login_authenticator = () => {
    // Set initial error values to empty
    setEmailError('');
    setPasswordError('');

    // Check if the user has entered both fields correctly
    if ('' === email) {
      setEmailError('Please enter your email');
      return;
    }

    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email');
      return;
    }

    if ('' === password) {
      setPasswordError('Please enter a password');
      return;
    }

    login_user("http://127.0.0.1:5000/login", {
      "email_address": email,
      "password": password
    }).then((data) => {
      console.log(data); // JSON data parsed by `data.json()` call
      if (data.status === 200) {
        setLoggedIn(true);
      }
    });
  };

  // Example POST method implementation:
  async function login_user(url = "", data = {}) {
    // Default options are marked with *
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data) // body data type must match "Content-Type" header
    });

    return response.json(); // parses JSON response into native JavaScript objects
  }

  const handleCasLogin = async () => {
    if(email.endsWith('@yale.edu'))
    {
      try {
      await cas_login(); // Call cas_login asynchronously
      // Additional logic after successful CAS login, if needed
    } catch (error) {
      console.error("CAS Login failed:", error);
    }

    }

    else{
      console.log("please enter a valid yale email!!")
    }



  };

  return (
    <div className={'mainContainer'}>
      {loggedIn ? (
        <div>Welcome {email}!!!</div>
      ) : (
        <div>
          <div className={'titleContainer'}>
            <div>Login</div>
          </div>
          <br />
          <div className={'inputContainer'}>
            <input
              value={email}
              placeholder="Email"
              onChange={(ev) => setEmail(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <br />
          <br />
          <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={handleCasLogin} value={'Next'} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Profile;
