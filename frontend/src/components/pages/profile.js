import React, { useState, useEffect } from 'react';
import { Button } from '@tremor/react';
import axios from 'axios';
import Shift from './shift';

export default function Profile ({ setLoginStatus, loginStatus }) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');

  async function cas_login(url = "http://127.0.0.1:5000/login") {
    console.log("cas_login called");
    try {
      // Default options are marked with *
      axios.get(url)
        .then(response => {
          const data = response.data;
          // Extract the URL from the response
          const redirectUrl = data.login_url; 
          // Redirect the user to the obtained URL
          window.location.href = redirectUrl;
        })
        .catch(error => {
          console.error("Error during CAS login:", error);
          // Handle errors if needed
        });
    } catch (error) {
      console.error("Error during CAS login:", error);
      // Handle errors if needed
    }
  }

  const handleCasLogin = async () => {
    if (email.endsWith('@yale.edu')) {
      try {
        // Call cas_login asynchronously
        await cas_login() ;
      } catch (error) {
        console.error("CAS Login failed:", error);
      }
    }
    else {
      console.log("please enter a valid Yale email!!")
    }
  };

  useEffect(() => {
    try{
      // Create a URLSearchParams object with the query string of the current URL
      const params = new URLSearchParams(window.location.search);
      if (params.has('ticket')) {
        // If the URL has a 'ticket' query parameter, the user is logged in
        setLoginStatus(true);
      }
    }
    catch (error) {
      console.error("Error during CAS login (Profile page):", error);
    }
  },[]);

  return (
    <div className={'mainContainer'}>
      {loginStatus ? (
        <Shift />
      ) : (
        <div className='space-y-4'>
          <div className={'titleContainer'}>Login</div>
          <div className={'inputContainer'}>
            <input
              value={email}
              placeholder="yale email"
              onChange={(ev) => setEmail(ev.target.value)}
              className={'inputBox'}
            />
            <label className="errorLabel">{emailError}</label>
          </div>
          <div className="flex justify-center">
            <Button onClick={handleCasLogin}>Login with CAS</Button>
          </div>
        </div>
      )}
    </div>
  );
};

