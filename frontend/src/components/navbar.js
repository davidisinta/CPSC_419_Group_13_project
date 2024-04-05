import { React, useState, useEffect } from "react";
import { Link } from 'react-router-dom';

export default function NavBar() {
    // Default setting for burger menu
    const [click, setClick] = useState(false);
    //  Menu onClick function
    const handleClick = () => setClick (!click);
    return (
        <>
            <nav className="bg-gray-800">
                <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-shrink-0">
                            <Link to="/"><img src={process.env.PUBLIC_URL + 'logo.jpeg'} alt="STC Logo" className="h-11" /></Link>
                        </div>
                        <div className="flex-shrink-0">
                            <Link to="/" className="text-white text-4xl font-extrabold">STC Inventory</Link>
                        </div>
                        <div className="flex items-center">
                            <div className="hidden md:block">
                                <div className="ml-10 flex items-baseline space-x-4">
                                    <Link to="/about" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">About</Link>
                                    <Link to="/report" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Report</Link>
                                    <Link to="/login" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Profile</Link>
                                    <Link to="/map" className="text-white hover:border-b border-white px-3 py-2 rounded-md text-sm font-medium">Map</Link>
                                </div>
                            </div>
                        </div>
                        {/* Mobile menu button */}
                        <div className="-mr-2 flex md:hidden">
                            <button onClick={handleClick} type="button" className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                <span className="sr-only">Open main menu</span>
                                <svg className={`${click ? 'hidden' : 'block'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                                </svg>
                                <svg className={`${click ? 'block' : 'hidden'} h-6 w-6`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile menu, show/hide based on menu state */}
                <div className={`${click ? 'block' : 'hidden'} md:hidden`}>
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link to="/about" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">About</Link>
                        <Link to="/report" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">Report</Link>
                        <Link to="/login" className="text-white block px-3 py-2 rounded-md text-base font-medium hover:border-b border-white">Profile</Link>
                    </div>
                </div>
            </nav>
        </>
    )
}

