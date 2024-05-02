import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';

const Profile = () => {
    const navigate = useNavigate();
    const [isLoggedIn, setLoginStatus] = useState(false);

    // Function to check if the user is authenticated
    function isAuthenticated() {
        return !!Cookies.get('username');  // Checks if the 'username' cookie exists
    }

    // Effect to check login status and redirect if not logged in
    useEffect(() => {
        console.log("Checking for login status");
        if (!isAuthenticated()) {


            // Redirect to the login page if not authenticated
            console.log("User not authenticated, redirecting to login page...");
            navigate('/login');
        } else {

            console.log("user is:", Cookies.get('username'))
            // Update state to reflect that user is logged in
            setLoginStatus(true);
            console.log("User authenticated, proceeding...");
        }
    }, [navigate]);  // Dependency array includes navigate to re-check when navigate changes

    if (!isLoggedIn) {
        // Optional: Render nothing or a loading indicator while checking authentication
        return <div>Loading...</div>;
    }


    const logout = () => {
        console.log('Logging out...');
        // Add your logout logic here, such as clearing cookies or local storage

         Cookies.remove('username');
    };

    // Main component content for authenticated users
    return (
        <div className={'mainContainer'}>
            heyyy there, welcome to your profile


            <button
                onClick={logout}
                style={{
                    backgroundColor: '#0090ff', // Bootstrap primary blue
                    color: 'white',
                    padding: '10px 20px',
                    fontSize: '16px',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    outline: 'none'
                }}
            >
                Logout
            </button>
        </div>
    );
};

export default Profile;
