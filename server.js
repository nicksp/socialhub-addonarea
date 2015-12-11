'use strict';

// Call the packages
const express    = require('express');
const app        = express();
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const mongoose   = require('mongoose');
const db         = mongoose.connection;
const config     = require('./config');
const path       = require('path');

// App configuration

// Use body parser, so we can grab information from POST requests
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Configure our app to handle CORS requests
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
  next();
});

// Log all requests to the console
app.use(morgan('dev'));

// DB connection handlers
db.on('error', (error) => {
  console.error('mongoose connection:  ERROR');
  throw new Error(error);
});

mongoose.connection.on('open', () => {
  console.error('mongoose connection: OPEN');
});

// Connect to our database
mongoose.connect(config.database);

// Set static files location
app.use(express.static(__dirname + '/public'));

// API routes
const apiRoutes = require('./app/routes/api')(app, express);
app.use('/api', apiRoutes);

// Main catchall route
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname + '/public/app/templates/index.html'));
});

// Start the server
app.listen(config.port, () => {
  console.log(`Server running at http://${config.hostname}:${config.port}/`);
});
