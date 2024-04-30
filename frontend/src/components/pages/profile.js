import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = (props) => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  // Function to handle CAS login
  const handleCasLogin = async () => {
    if (email.endsWith('@yale.edu')) {
      try {
        const response = await casLogin();
        console.log(response);
        if (response.login_url) {
          // If login_url is received in response, redirect the user to CAS login page
          window.open(response.login_url, "_blank");
          // Additional logic after initiating CAS login, if needed
        } else {
          console.error("No login URL received in response.");
        }
      } catch (error) {
        console.error("Error during CAS login:", error);
      }
    } else {
      console.log("Please enter a valid Yale email!!");
    }
  };

  // Function to initiate CAS login
  async function casLogin() {
    try {
      const response = await fetch("http://127.0.0.1:5000/cas/login");
      const data = await response.json();
      return data;
    } catch (error) {
      throw new Error("Error during CAS login:", error);
    }
  }

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
              placeholder="Yale email"
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
