import React, { forwardRef } from 'react';
import './About.css';

const About = forwardRef((props, ref) => {
  return (
    <div className="about-us" ref={ref}>
      <h1 className="h1o">About Us</h1>
      <p className="para">
        Welcome to our company, where we prioritize excellence and customer satisfaction. Our journey began with a simple mission:
        to provide exceptional services and products that meet the highest standards of quality. 
        <br /><br />
        Over the years, we have grown and evolved, always staying true to our core values of integrity, innovation, and community.
        We believe that success is built on strong relationships, and we strive to foster meaningful connections with our clients and partners.
        <br /><br />
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        <br /><br />
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        <br /><br />
        Thank you for being part of our story, and we look forward to continuing this journey together.
      </p>
    </div>
  );
});

export default About;
