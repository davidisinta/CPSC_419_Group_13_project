import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';


const Profile = () => {
    const navigate = useNavigate();

    // Function to check if the user is authenticated
    function isAuthenticated() {
        return !!Cookies.get('username');
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

            console.log("User authenticated, proceeding...");
        }
    }, [navigate]);




    const logout = () => {
        console.log('Logging out...');
        // Add your logout logic here, such as clearing cookies or local storage

         Cookies.remove('username');
         navigate("/login")
    };


    // Main component content for authenticated users
    return (
        <div className={'mainContainer'}>



            heyyy there, welcome to your profile {Cookies.get('username')}


        </div>
    );
};

export default Profile;
