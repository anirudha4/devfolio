const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();

// Enable CORS for all origins
app.use(cors());

// Parse incoming JSON data
app.use(bodyParser.json());

const routes = require('./routes');
app.use('/api/v1', routes);

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server listening on port ${port}`));
