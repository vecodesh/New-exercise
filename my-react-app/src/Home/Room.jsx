import React, { useState, useEffect } from 'react';
import { FaHome } from 'react-icons/fa';
import axios from 'axios';
import './Room.css';

const Room = ({ isser }) => {
  const [hotels, setHotels] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newHotel, setNewHotel] = useState({
    name: '',
    location: '',
    rooms: '',
    services: '',
    image: ''  // Added image field here
  });

  useEffect(() => {
    axios.get('http://localhost:5001/hotels')
      .then((response) => {
        setHotels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching hotels:', error);
      });
  }, []);

  const filteredHotels = hotels.filter(hotel =>
    hotel.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewHotel({ ...newHotel, [name]: value });
  };

  const addHotel = () => {
    if (!newHotel.name || !newHotel.location || !newHotel.rooms || !newHotel.services || !newHotel.image) {
      alert("Please fill in all fields.");
      return;
    }

    axios.post('http://localhost:5001/hotels', newHotel)
      .then((response) => {
        setHotels([...hotels, response.data]);
        setNewHotel({ name: '', location: '', rooms: '', services: '', image: '' });
      })
      .catch((error) => {
        console.error('Error adding hotel:', error);
        alert("Failed to add hotel. Please check server logs for details.");
      });
  };

  return (
    <div className="room-container">
      <video autoPlay loop muted playsInline>
        <source src={require('./Hotel room.mp4')} type="video/mp4" />
        Your browser does not support the video tag.
      </video>
      <div className="room-search">
        <input
          type="text"
          placeholder="Search for hotels..."
          value={searchQuery}
          onChange={handleSearchChange}
        />
        <button type="button" className="search-button">Search</button>
      </div>

      <div className="home-button-container">
        <button className="home-button" onClick={isser}>
          <FaHome /> Home
        </button>
      </div>

      <div className="hotel-list">
        {filteredHotels.map((hotel, index) => (
          <div key={index} className="hotel-card">
           {hotel.image && <img src={hotel.image} alt={hotel.name} className="hotel-image" />}
            <h2>{hotel.name}</h2>
            <p><strong>Location:</strong> {hotel.location}</p>
            <p><strong>Rooms:</strong> {hotel.rooms}</p>
            <p><strong>Services:</strong> {hotel.services}</p>
            <p><button className='upButton'>Book now:</button></p>
          </div>
        ))}
      </div>

      <div className="add-hotel-form">
        <h2>Add a New Hotel</h2>
        <input
          type="text"
          name="name"
          placeholder="Hotel Name"
          value={newHotel.name}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="location"
          placeholder="Location"
          value={newHotel.location}
          onChange={handleInputChange}
        />
        <input
          type="number"
          name="rooms"
          placeholder="Number of Rooms"
          value={newHotel.rooms}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="services"
          placeholder="Services (e.g., Free WiFi, Spa)"
          value={newHotel.services}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="image"
          placeholder="Base64 Image String"
          value={newHotel.image}
          onChange={handleInputChange}
        />
        <button type="button" className="add-button" onClick={addHotel}>Add Hotel</button>
      </div>
    </div>
  );
};

export default Room;
