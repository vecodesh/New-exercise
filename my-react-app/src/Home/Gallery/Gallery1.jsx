import React from 'react';
import "./Gallery.css"
import image1 from './image5.jpeg'; // Adjust the path based on your project structure
import image2 from './image6.jpeg';
import image3 from './image7.jpeg';
import image4 from './image8.jpeg';
const Gallery1 = () => {
  return (
    <div>
      <h1>Restaurant 3</h1>
      <div className="image-container">
        <img src={image1} alt="Scenic mountain view" />
        <img src={image2} alt="Sunset over the ocean" />
        <img src={image3} alt="Forest path surrounded by trees" />
        <img src={image4} alt="Forest path surrounded by trees" />

      </div>
      <h1>Restaurant 4</h1>
      <div className="image-container">
        <img src={image1} alt="Scenic mountain view" />
        <img src={image2} alt="Sunset over the ocean" />
        <img src={image3} alt="Forest path surrounded by trees" />
        <img src={image4} alt="Forest path surrounded by trees" />

      </div>
    </div>
  );
}

export default Gallery1;
