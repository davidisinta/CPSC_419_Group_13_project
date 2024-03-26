import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Profile = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const log_out = async () =>
  {
    try {
      // Call the logout endpoint
      await axios.post('http://127.0.0.1:5000/logout', {}, { withCredentials: true });
      // Successfully logged out
      setIsLoggedIn(false);
      navigate('/login'); // Redirect to login page
    } catch (error) {
      console.error('Logout error:', error);
      // Handle logout error
    }
  }

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Adjust the URL to where your Flask backend is hosted
        const response = await axios.get('http://127.0.0.1:5000/is_logged_in', { withCredentials:true });
        if (response.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          navigate('/login'); // Redirect to login if not logged in
        }
      } catch (error) {
        console.error('Error checking login status:', error);
        navigate('/login'); // Redirect to login on error
      } finally {
        setIsLoading(false); // Ensure loading state is updated
      }
    };

    checkLoginStatus();
  }, [navigate]);

  if (isLoading) {
    return <div>Loading...</div>; // Show a loading message or spinner while checking
  }

  if (!isLoggedIn) {
    // Redirect has already been handled by useEffect, but you could handle additional logic here if needed
    return null; // or a fallback UI until the redirect takes effect
  }

  // User is logged in if this part of the component is rendered
  return (
    <div>
      <p>Profile</p>
      <p>Task One</p>
      <p>Task Two</p>
      <p>...</p>
      <br/>
      <span onClick={log_out} className={"log-out"} style={{cursor: 'pointer'}}> Log Out</span>
    </div>
  );
};

export default Profile;
