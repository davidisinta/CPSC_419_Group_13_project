import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [cas_ticket, setCasTicket] = useState(null);

  // Function to handle CAS login
  const handleCasLogin = async () => {
    if (email.endsWith('@yale.edu')) {
      try {
        const response = await casLogin();
        console.log(response);
        if (response.login_url) {
          // Redirect the user to CAS login page
          window.location.href = response.login_url;
        } else {
          console.error("No login URL received in response.");
        }
      } catch (error) {
        console.error("Error during CAS login:", error);
      }
    } else {
      setEmailError("Please enter a valid Yale email!");
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

  // Check for a CAS ticket in the URL when component mounts
  useEffect(() => {
    console.log("ticket validator called")
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    console.log("the ticket is:", ticket);
    if (ticket) {
      validateCasTicket(ticket);
    }
  }, []);

  // Validate CAS ticket

    async function validateCasTicket(ticket) {
          console.log("tryna validate cas ticket")

  try {
    const response = await fetch(`http://localhost:5000/cas/login?ticket=${ticket}`);
    //data represents the username
    const data = await response.json();
    console.log(data); // Assuming the response contains user data or error messages

    if (response.ok) {

      console.log("Been waveeyyyyyy!!!!")

    } else {
      console.error("Error validating ticket:", data.error);
    }
  } catch (error) {
    console.error("Error validating ticket:", error);
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
            <input
                value={email}
                placeholder="Yale email"
                onChange={(ev) => {
                  setEmail(ev.target.value);
                  setEmailError('');
                }}
                className={'inputBox'}
            />
            {emailError && <label className="errorLabel">{emailError}</label>}


            <div className={'inputContainer'}>
              <input className={'inputButton'} type="button" onClick={handleCasLogin} value={'Next'}/>
            </div>
          </div>
      )}
    </div>
  );
};

export default Profile;
