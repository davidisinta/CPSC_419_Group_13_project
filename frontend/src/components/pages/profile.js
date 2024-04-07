import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Profile = (props) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loggedIn, setLoggedIn] = useState(false)

  const navigate = useNavigate()


// Example POST method implementation:
async function cas_login(url = "") {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "GET", // *GET, POST, PUT, DELETE, etc.
    mode: "cors", // no-cors, *cors, same-origin
    cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
    credentials: "same-origin", // include, *same-origin, omit
    headers: {
      "Content-Type": "application/json",
      // 'Content-Type': 'application/x-www-form-urlencoded',
    },

  });
  return response.json();
}




  const login_authenticator = () =>
  {
     // Set initial error values to empty
  setEmailError('')
  setPasswordError('')

  // Check if the user has entered both fields correctly
  if ('' === email) {
    setEmailError('Please enter your email')
    return
  }

  if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
    setEmailError('Please enter a valid email')
    return
  }

  if ('' === password) {
    setPasswordError('Please enter a password')
    return
  }

  // if (password.length < 7) {
  //   setPasswordError('The password must be 8 characters or longer')
  //   return
  // }


      login_user("http://127.0.0.1:5000/login", {
          "email_address":email,
          "password":password
      }).then((data) => {
  console.log(data); // JSON data parsed by `data.json()` call
});
  }

  // Example POST method implementation:
async function login_user(url = "", data = {}) {
  // Default options are marked with *
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data), // body data type must match "Content-Type" header
  });

  console.log(response)

    if (response.status == 200){
        setLoggedIn(true)

      cas_login('http://localhost:5050/login');

    }

  return response.json(); // parses JSON response into native JavaScript objects
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
                      <br/>
                      <div className={'inputContainer'}>
                          <input
                              value={email}
                              placeholder="Email"
                              onChange={(ev) => setEmail(ev.target.value)}
                              className={'inputBox'}
                          />
                          <label className="errorLabel">{emailError}</label>
                      </div>
                      <br/>
                      <div className={'inputContainer'}>
                          <input
                              type="password"
                              value={password}
                              placeholder="Password"
                              onChange={(ev) => setPassword(ev.target.value)}
                              className={'inputBox'}
                          />
                          <label className="errorLabel">{passwordError}</label>
                      </div>
                      <br/>
                      <div className={'inputContainer'}>
                          <input className={'inputButton'} type="button" onClick={login_authenticator}
                                 value={'Log in'}/>

                      </div>

                  </div>
              )}
          </div>


  )
}

export default Profile