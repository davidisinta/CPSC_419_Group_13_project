import React from 'react';
import { VscGithub } from "react-icons/vsc";
import { TiSocialLinkedinCircular } from "react-icons/ti";
import { LuLinkedin } from "react-icons/lu";




const About = () => {
    return (
        <div className="mainContainer">

            <div className="pt-20 pb-10 border-spacing-2.5">
                <div className="bg-gray-100 py-10">
                    <div className="max-w-4xl mx-auto px-4">
                        <h1 className="text-4xl font-bold text-gray-800 mb-4">About Our App</h1>
                        <p className="text-lg text-gray-700 mb-8">Our web application streamlines inventory management
                            and
                            technician assignments for campus clusters. By automating location assignments based on
                            factors
                            like recent visits and proximity, we optimize resource allocation and save time for cluster
                            technicians. With a user-friendly interface and a robust tech stack including React JS,
                            PostgreSQL, and Flask, our app empowers users at every level to efficiently manage inventory
                            and
                            assignments.</p>
                    </div>
                </div>
                <div className="max-w-4xl mx-auto px-4 py-8">
                    <h2 className="text-3xl font-bold text-gray-800 mb-4">Meet Our Team</h2>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">

                        {/* Profile 1 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">
                            <img src={process.env.PUBLIC_URL + 'David_Nyakawa_photo.png'} alt="David Nyakawa Photo"
                                 className="w-300 h-320 rounded-full mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">David Nyakawa</h3>

                            <div className="mt-4 socials-container">
                                <a href="https://github.com/davidisinta" className="text-gray-600 hover:text-blue-500 mr-4 h-5 github"> <VscGithub size={30}/></a>
                                <a href="https://www.linkedin.com/in/davidnyakawa/" className="text-gray-600 hover:text-blue-500 linkedin"> <LuLinkedin size={30}/></a>
                            </div>

                        </div>

                        {/* Profile 2 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">

                            <img src="profile2.jpg" alt="Tony Munene Photo" className="w-32 h-32 rounded-full mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Tony Munene</h3>

                            <div className="mt-4 socials-container">



                                <a href="#" className="text-gray-600 hover:text-blue-500 mr-4 h-50 github"> <VscGithub size={30}/> </a>
                                <a href="#" className="text-gray-600 hover:text-blue-500 linkedin"> <LuLinkedin size={30}/> </a>

                            </div>

                        </div>

                        {/* Profile 3 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">

                            <img src="profile3.jpg" alt="Fisher Marks Photo" className="w-32 h-32 rounded-full mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Fisher Marks</h3>

                            <div className="mt-4 socials-container">

                                <a href="#" className="text-gray-600 hover:text-blue-500 mr-4 github"> <VscGithub size={30} /> </a>
                                <a href="#" className="text-gray-600 hover:text-blue-500 linkedin"> <LuLinkedin size={30}/> </a>

                            </div>
                        </div>
                        {/* Profile 4 */}
                        <div className="bg-white p-6 rounded-lg shadow-md">

                            <img src="profile4.jpg" alt="Profile 4" className="w-32 h-32 rounded-full mx-auto mb-4"/>
                            <h3 className="text-xl font-bold text-gray-800 mb-2">Jinwoo Kim</h3>

                            <div className="mt-4 socials-container">
                                <a href="#" className="text-gray-600 hover:text-blue-500 mr-4 github"> <VscGithub size={30} /> </a>
                                <a href="#" className="text-gray-600 hover:text-blue-500 linkedin"> <LuLinkedin size={30}/> </a>
                            </div>

                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
};

export default About;
