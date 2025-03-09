const http = require('http');
const express = require('express');

const { auth } = require('./middleware/utils');
const { userRoutes, lostItemRoutes, foundItemRoutes } = require('./routes/utils');
const connectDB = require('./controllers/dbController');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

app.use(express.json()); // Ensure body parsing happens first
app.use(auth);

// Routes
app.use('/api/user', userRoutes);
app.use('/api/lost-items', lostItemRoutes);
app.use('/api/found-items', foundItemRoutes);

// Database Connection & Server Start
connectDB().then(() => {
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start the server', err);
});
