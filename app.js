require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const { connectMongoDB } = require('./connect');
const urlRoute = require('./routes/url_routes');
const authRoute = require('./routes/auth_routes');
const url = require('./models/url_db');

const app = express();
const PORT = process.env.PORT || 8000;

// Middleware
app.use(express.json());
app.use(cookieParser());

// API Routes
app.use('/auth', authRoute);
app.use('/url', urlRoute);

// Static files
app.use(express.static(path.join(__dirname, 'public')));

// Redirect short URL
app.get('/:short_id', async (req, res) => {
    const short_id = req.params.short_id;
    try {
        const entry = await url.findOneAndUpdate(
            { short_id },
            { $push: { visits: { timestamp: Date.now() } } },
            { new: true }
        );
        if (!entry) return res.status(404).sendFile(path.join(__dirname, 'public', 'index.html'));
        res.redirect(entry.redirecturl);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Server error' });
    }
});

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI;
connectMongoDB(MONGO_URI)
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
    console.log(`Server started at Port: ${PORT}`);
});
