import React, { useState } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import axios from 'axios';

const Login = (props) => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [nameError, setNameError] = useState('')
  const [emailError, setEmailError] = useState('')
  const [passwordError, setPasswordError] = useState('')
  const [loginScreen, setLoginScreen] = useState(true);

  const navigate = useNavigate()

  const login_authenticator = async () => 
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

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/authenticate', { email:email, password:password }, { withCredentials:true });
      if (response.status === 200) {
        navigate("/profile");
      } else {
        // Handle login failure
        setEmailError('Login failed');
      }
    } catch (error) {
      // Handle error (e.g., network error)
      console.error('Login error:', error);
    }
  };

  const register_authenticator = async () =>
  {
    // Set initial error values to empty
    setNameError('')
    setEmailError('')
    setPasswordError('')

    // Check if the user has entered all fields correctly
    if ('' === firstName || '' === lastName) {
      setNameError('Please enter your name')
      return
    }

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

    if (password.length < 7) {
      setPasswordError('The password must be 8 characters or longer')
      return
    }

    try {
      const response = await axios.post('http://127.0.0.1:5000/register', { first_name:firstName, last_name:lastName, email:email, password:password }, { withCredentials:true });
      if (response.status === 201) {
        navigate('/profile');
      } else {
        // Handle login failure
        setEmailError('Login failed');
      }
    } catch (error) {
      // Handle error (e.g., network error)
      console.error('Login error:', error);
    }

  }

  if (loginScreen) {
    return (
      <div className={'mainContainer'}>
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
      <div className={'inputContainer'}>
        <input
            type = "password"
          value={password}
          placeholder="Password"
          onChange={(ev) => setPassword(ev.target.value)}
          className={'inputBox'}
        />
        <label className="errorLabel">{passwordError}</label>
      </div>
      <br />
        <div className={'inputContainer'}>
            <input className={'inputButton'} type="button" onClick={login_authenticator} value={'Log in'}/>

            <div> Don't have an account?

              <span onClick={() => setLoginScreen(false)} className={"sign-up"} style={{cursor: 'pointer'}}> Sign Up</span>

            </div>


        </div>
    </div>
    );
  } else {
    return (
      <div className={'mainContainer'}>
        <div className={'titleContainer'}>
          <div>Sign Up</div>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={firstName}
            placeholder="First Name"
            onChange={(ev) => setFirstName(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{nameError}</label>
        </div>
        <br />
        <div className={'inputContainer'}>
          <input
            value={lastName}
            placeholder="Last Name"
            onChange={(ev) => setLastName(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{nameError}</label>
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
        <div className={'inputContainer'}>
          <input
              type = "password"
            value={password}
            placeholder="Password"
            onChange={(ev) => setPassword(ev.target.value)}
            className={'inputBox'}
          />
          <label className="errorLabel">{passwordError}</label>
        </div>
        <br />
          <div className={'inputContainer'}>
              <input className={'inputButton'} type="button" onClick={register_authenticator} value={'Register'}/>

              <div> Hve an account?

                <span onClick={() => setLoginScreen(true)} className={"sign-in"} style={{cursor: 'pointer'}}> Sign In</span>

              </div>


          </div>


      </div>
    )
  }
}

export default Login;