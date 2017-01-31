// Load environment variables
require('dotenv').config();

const PORT = process.env.port || process.env.PORT || 8080;

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const serveStatic = require('serve-static');
const morgan = require('morgan')


// Initialize server
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(morgan('combined'))
let server = require('./server/entry');

// Serve built client
app.use(serveStatic('build'))

// server
app.use(server)

// Redirect remaining requests to client root
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
})

app.listen(PORT, function() {
    console.log("Now listening on port " + PORT + " :)");
}) 