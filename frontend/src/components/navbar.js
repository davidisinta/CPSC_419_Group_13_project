import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './navbar.css';

export default function NavBar() {
    // Default setting for burger menu
    const [click, setClick] = useState(false);
    const [button, setButton] = useState(true);
    //  Menu onClick function
    const handleClick = () => setClick (!click);
    const closeMobileMenu = () =>  setClick(false);
    // Display button on mobile
    const showButton = () => {
        if (window.innerWidth <= 960) {
            setButton(false);
        }
        else{
            setButton(true);
        }
    }
    // Prevent button from showing up everytime page is refreshed
    useEffect(() => {
        showButton ()
    }, []);
    window.addEventListener('resize', showButton);
    return (
        <>
            <nav className="navbar">
                <div className="navbar-container">
                    <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
                        STC Inventory App
                    </Link>
                    <div className="menu-icon" onClick={handleClick}>
                        <i className={click? "fas fa-times" : "fas fa-bars"}/>
                    </div>
                    <ul className={click ? "nav-menu active" : "nav-menu"}>
                        <li className="nav-item">
                            <Link to="/" className="nav-links" onClick={closeMobileMenu}>
                                Home
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/about" className="nav-links" onClick={closeMobileMenu}>
                                About
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/report" className="nav-links" onClick={closeMobileMenu}>
                                Report
                            </Link>
                        </li>

                        <li className="nav-item">
                            <Link to="/login" className="nav-links" onClick={closeMobileMenu}>
                                Profile
                            </Link>
                        </li>


                    </ul>
                </div>
            </nav>
        </>
    )
}

