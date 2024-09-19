const express = require('express');
const User = require('./models/User'); // The User model defined above
const app = express();

app.use(express.json());

app.post('/signup', async (req, res) => {
    const { username, email, password } = req.body;

    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({ username, email, password });

    // Save the user
    await newUser.save();

    res.status(201).json({ message: 'User created successfully' });
});

app.listen(3000, () => console.log('Server running on port 3000'));
