import React from 'react';
import './footer.css';
import { Link } from 'react-router-dom';


export default function Footer() {
  return (
      <div className="footer-container">
          <section className="footer-subscription">
              <p className="footer-subscription-heading"></p>
      <div className='social-media-wrap'>
        <div className='footer-logo text-white'>
          <Link to='/' className='social-logo font-bold'>
              Student Technology Collaborative
          </Link>
        </div>
        <small className='website-rights text-white font-bold'>STC©2024</small>
              </div>
    </section>
      </div>
  );
}
