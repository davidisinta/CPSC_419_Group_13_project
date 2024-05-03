import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';

const About = () => {

    // Main component content for authenticated users
    return (<div className={"about-container"}>

            <div className="row">
                <div className="column">
                    <div className="card">
                        <img src="../../../public/David_Nyakawa_photo.png" alt="Jane" style={{width: "100%"}}/>
                        <div className="container">
                            <h2>Jane Doe</h2>
                            <p className="title">CEO &amp; Founder</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>example@example.com</p>
                            <p>
                                <button className="button">Contact</button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src="img2.jpg" alt="Mike" style={{width: "100%"}}/>
                        <div className="container">
                            <h2>Mike Ross</h2>
                            <p className="title">Art Director</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>example@example.com</p>
                            <p>
                                <button className="button">Contact</button>
                            </p>
                        </div>
                    </div>
                </div>

                <div className="column">
                    <div className="card">
                        <img src="../../../public/David_Nyakawa_photo.png" alt="John" style={{width: "100%"}}/>
                        <div className="container">
                            <h2>John Doe</h2>
                            <p className="title">Designer</p>
                            <p>Some text that describes me lorem ipsum ipsum lorem.</p>
                            <p>example@example.com</p>
                            <p>
                                <button className="button">Contact</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </div>

    );
};

export default About;









