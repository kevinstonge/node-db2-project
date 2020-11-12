const express = require('express');
const server = express();
const cors = require('cors');
server.use(cors());
server.use(express.json());
server.get('/', (req, res) => { res.status(200).json({ message: "api online!" }) });

const carsRouter = require('./data/cars.js');

server.use('/api/cars', carsRouter);

module.exports = server;