import { React, useState, useEffect,  } from "react";
import { Link } from 'react-router-dom';
import { Select, SelectItem, Button } from '@tremor/react';
import { useLocation } from 'react-router-dom';
<<<<<<< HEAD
import { FaRegUser } from "react-icons/fa";
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


function isLoggedIn() {
    return !!Cookies.get('username');
}

export default function NavBar({ handleZoneChange }) {


    const navigate = useNavigate();
=======
import axios from "axios";


export default function NavBar({ handleZoneChange, setLoginStatus, loginStatus }) {
>>>>>>> main
    // Default setting for burger menu
    const [click, setClick] = useState(false);
    const [displayZone, setDisplayZone] = useState(false);
    //  Menu onClick function
    const handleClick = () => setClick(!click);
    // Selectively display zone dropdown
    const location = useLocation();
    // Handle CAS logout
    const handleCasLogout = async () => {
        try {
          axios.get("http://localhost:5000/logout")
          .then(() => {
            setLoginStatus(false);
          })
        }
        catch (error) {
          console.error("Error during CAS logout:", error);
        }};
    
    useEffect(() => {
        location.pathname === '/' ? setDisplayZone(true) : setDisplayZone(false);
<<<<<<< HEAD
    }, [location]);


    const logout = () => {
        console.log('Logging out...');
        // Add your logout logic here, such as clearing cookies or local storage

         Cookies.remove('username');
         navigate("/login")
    };



=======
    }, [location, loginStatus]);
>>>>>>> main
    return (
        <>
            <nav className="navbar fixed top-0 w-full z-50 bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link to="/"><img src={process.env.PUBLIC_URL + 'logo.jpeg'} alt="STC Logo"
                                              className="h-11"/></Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-white text-4xl font-extrabold">STC Inventory</Link>
                        </div>
                        <div className="flex items-center align-items-center">
                            <div className="hidden md:block">
<<<<<<< HEAD
                                <div className="ml-10 flex items-center space-x-2">
                                    {displayZone &&
                                        <Select className="tremor-content-emphasis nav-item" placeholder="All Zones"
                                                onValueChange={handleZoneChange}>
                                            <SelectItem value="all" className="cursor-pointer">All Zones</SelectItem>
                                            <SelectItem value="1" className="cursor-pointer">Zone 1</SelectItem>
                                            <SelectItem value="2" className="cursor-pointer">Zone 2</SelectItem>
                                            <SelectItem value="3" className="cursor-pointer">Zone 3</SelectItem>
                                            <SelectItem value="4" className="cursor-pointer">Zone 4</SelectItem>
                                        </Select>}


                                    <Link to="/map"
                                          className="nav-item text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Map</Link>
                                    <Link to="/about"
                                          className="nav-item text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                                    <Link to="/profile"
                                          className="nav-item text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium profile-icon flex-row">

                                        <div className="outer-div">
                                            <span className="welcome-user" style={{whiteSpace: 'nowrap'}}>
                                            welcome {Cookies.get('username')}
                                        </span>

                                        </div>


                                    </Link>

                                    <div>
                                        {isLoggedIn() ? (
                                            <button className="logout-button" onClick={logout}>
                                                Logout
                                            </button>
                                        ) : (
                                            <button className="login-button">
                                                Login
                                            </button>
                                        )}
                                    </div>


=======
                                <div className="ml-10 flex items-baseline space-x-4">
                                    {displayZone && <Select className="tremor-content-emphasis" placeholder="All Zones" onValueChange={handleZoneChange}>
                                        <SelectItem value="all" className="cursor-pointer">All Zones</SelectItem>
                                        <SelectItem value="1" className="cursor-pointer">Zone 1</SelectItem>
                                        <SelectItem value="2" className="cursor-pointer">Zone 2</SelectItem>
                                        <SelectItem value="3" className="cursor-pointer">Zone 3</SelectItem>
                                        <SelectItem value="4" className="cursor-pointer">Zone 4</SelectItem>
                                    </Select>}
                                    <Link to="/about" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                                    <Link to="/report" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Report</Link>
                                    <Link to="/profile" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                    <Link to="/map" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Map</Link>
                                    {loginStatus ?
                                        <Button variant="secondary" size="sm" onClick={handleCasLogout} className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Logout</Button>
                                        :
                                        <Link to="/profile"><Button variant="primary" size="sm" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Login</Button></Link>
                                    }
>>>>>>> main
                                </div>
                            </div>
                        </div>

                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button onClick={handleClick} type="button"
                                    className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <svg className={`${click ? 'hidden' : 'block'} h-6 w-6`}
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                                <svg className={`${click ? 'block' : 'hidden'} h-6 w-6`}
                                     xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                     stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                          d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu, show/hide based on menu state */}
                <div className={`${click ? 'block' : 'hidden'} md:hidden`}>
<<<<<<< HEAD
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/about"
                              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">About</Link>

                        <Link to="/profile"
                              className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">
                            <FaRegUser/> </Link>
=======
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex-col text-center">
                        <Link to="/about" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">About</Link>
                        <Link to="/report" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">Report</Link>
                        <Link to="/profile" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">Profile</Link>
                        <Link to="/map" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">Map</Link>
                        {loginStatus ?
                            <Button variant="secondary" size="sm" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Logout</Button>
                            :
                            <Link to="/profile"><Button variant="primary" size="sm" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Login</Button></Link>
                        }
>>>>>>> main
                    </div>
                </div>
            </nav>
        </>
    )
}

