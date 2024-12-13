const fs = require('fs');
const express = require('express');
const cors = require('cors'); // Add CORS at the top

const app = express();

// Use CORS to allow requests from different origins
app.use(cors());
app.use(express.json());

// GET endpoint to retrieve hotels
app.get('/hotels', (req, res) => {
  fs.readFile('Hotel.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Server error');
    }
    res.json(JSON.parse(data || '[]')); 
  });
});

// POST endpoint to add a new hotel
app.post('/hotels', (req, res) => {
  const newHotel = req.body;

  fs.readFile('Hotel.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading file:', err);
      return res.status(500).send('Failed to read Hotel.json');
    }

    const hotels = JSON.parse(data || '[]');
    hotels.push(newHotel);

    fs.writeFile('Hotel.json', JSON.stringify(hotels, null, 2), (err) => {
      if (err) {
        console.error('Error writing file:', err);
        return res.status(500).send('Failed to write to Hotel.json');
      }
      res.json(newHotel);
    });
  });
});

// Start the server on port 5000
app.listen(5001, () => console.log('Server running on port 5001'));
