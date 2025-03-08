const http = require('http');
const express = require('express');
const { dbController } = require('./controllers/utils'); // Import the database controller
const { auth } = require('./middleware/utils'); // Import the auth middleware
const { userRoutes, lostItemRoutes, foundItemRoutes, apiRoutes } = require('./routes/utils'); // Import all routes
require('dotenv').config(); // Load environment variables from .env file

const app = express();
const server = http.createServer(app);

const PORT = process.env.PORT || 3000;

// Use the auth middleware
app.use(auth);

// Use JSON middleware
app.use(express.json());

// Use the routers
app.use('/api/user', userRoutes);
app.use('/api/lost-items', lostItemRoutes);
app.use('/api/found-items', foundItemRoutes);
app.use('/api', apiRoutes);

// Connect to MongoDB
dbController.connectDB().then(() => {
    // Start the server after successful connection
    server.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(err => {
    console.error('Failed to start the server', err);
});

