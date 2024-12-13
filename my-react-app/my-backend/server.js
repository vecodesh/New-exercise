const express = require('express');
const fs = require('fs');
const cors = require('cors');
const path = require('path');

const app = express();
const port = 5000;

// Use CORS to allow requests from your frontend
app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());

const filePath = path.join(__dirname, '..', 'src', 'Users.json');

// GET route to fetch users data
app.get('/Users', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading file', error: err });
        }

        let users;
        try {
            users = JSON.parse(data);
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ message: 'Error parsing JSON', error: parseError });
        }

        res.json(users);
    });
});

// POST route to add new user
app.post('/Users', (req, res) => {
    const newUser = req.body;

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading file:', err);
            return res.status(500).json({ message: 'Error reading file', error: err });
        }

        let users;
        try {
            users = data ? JSON.parse(data) : [];
        } catch (parseError) {
            console.error('Error parsing JSON:', parseError);
            return res.status(500).json({ message: 'Error parsing JSON', error: parseError });
        }

        users.push(newUser);

        fs.writeFile(filePath, JSON.stringify(users, null, 2), (err) => {
            if (err) {
                console.error('Error writing file:', err);
                return res.status(500).json({ message: 'Error writing file', error: err });
            }

            console.log('Updated users:', users);
            res.send('User added successfully');
        });
    });
});

// Default route
app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
