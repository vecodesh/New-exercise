import React from 'react';
import "./Gallery.css"
import image1 from './image1.jpeg'; // Adjust the path based on your project structure
import image2 from './image2.jpeg';
import image3 from './image3.jpeg';
import image4 from './image4.jpeg';
const Gallery = () => {
  return (
    <div>
      <h1>Restaurant 1</h1>
      <div className="image-container">
        <img src={image1} alt="Scenic mountain view" />
        <img src={image2} alt="Sunset over the ocean" />
        <img src={image3} alt="Forest path surrounded by trees" />
        <img src={image4} alt="Forest path surrounded by trees" />
      </div>
      <div>
        <button className="custom-button">Book restaurant 1</button>
      </div>
      <h1>Restaurant 2</h1>
      <div className="image-container">
        <img src={image1} alt="Scenic mountain view" />
        <img src={image2} alt="Sunset over the ocean" />
        <img src={image3} alt="Forest path surrounded by trees" />
        <img src={image4} alt="Forest path surrounded by trees" />
      </div>
      <button className="custom-button">Book restaurant 2</button>
    </div>
  );
}

export default Gallery;
