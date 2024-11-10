const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(cors()); // Enable CORS for all requests
app.use(express.json());

// Connect to MongoDB
mongoose.connect(
    'mongodb+srv://ngophuc29:phuc29112003@reactmongo.szdzq.mongodb.net/reactMongo?retryWrites=true&w=majority&appName=reactMongo',
    { useNewUrlParser: true, useUnifiedTopology: true }
);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Define User schema
const userSchema = new mongoose.Schema({
    username: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    avatar: String,
});

const User = mongoose.model('User', userSchema);

// Get list of users
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json({ users });
    } catch (err) {
        console.error('Error fetching users:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Register user
app.post('/api/register', async (req, res) => {
    const { username, email, password, avatar } = req.body;

    try {
        const user = new User({ username, email, password, avatar });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', userId: user._id });
    } catch (err) {
        if (err.code === 11000) {
            return res.status(400).json({ message: 'Username or email already exists' });
        }
        console.error('Error inserting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Login user
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username, password });
        if (user) {
            return res.json({ avatar: user.avatar, username: user.username });
        } else {
            return res.status(401).json({ message: 'Invalid username or password' });
        }
    } catch (err) {
        console.error('Error logging in:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Get user by ID
app.get('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error('Error fetching user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Update user information
app.put('/api/users/:id', async (req, res) => {
    const { id } = req.params;
    const { username, email, avatar } = req.body;

    try {
        const user = await User.findByIdAndUpdate(
            id,
            { username, email, avatar },
            { new: true, runValidators: true }
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User updated successfully' });
    } catch (err) {
        console.error('Error updating user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Delete user
app.delete('/api/users/:id', async (req, res) => {
    const { id } = req.params;

    try {
        const user = await User.findByIdAndDelete(id);
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json({ message: 'User deleted successfully' });
    } catch (err) {
        console.error('Error deleting user:', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Start server
app.listen(4000, () => {
    console.log('App listening on port 4000');
});
