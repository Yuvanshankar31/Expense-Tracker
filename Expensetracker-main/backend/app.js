const express = require('express');
const cors = require('cors');
const { db } = require('./db/db');
const app = express();
const { readdirSync } = require('fs');
require('dotenv').config();

const PORT = process.env.PORT || 3000; // Use default port 3000 if PORT is not defined

// Middlewares
app.use(express.json());
app.use(cors());

// Routes
readdirSync('./routes').forEach((route) => {
    app.use('/api/v1', require(`./routes/${route}`));
});

// Start the server
const server = () => {
    db();
    app.listen(PORT, () => {
        console.log(`Listening to port: ${PORT}`);
    });
};

server();
