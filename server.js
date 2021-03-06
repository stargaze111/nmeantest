// Get dependencies
const express = require('express');
const path = require('path');
const http = require('http');
const bodyParser = require('body-parser');
const AuthModule = require('./src/app/modules/AuthModule');
const authCtrl   = require('./src/app/controllers/auth.ctrl');

// Get our API routes
const api = require('./server/routes/api');

const app = express();


// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));


// Set our api routes

app.use('/api', api);
app.use('/', api);
app.use('/bears', api);
app.use('/bears/:bear_id', api);
app.use('/inventory', api);
app.use('/inventory/:barcode', api);
app.use('/inventory/validate/:barcode', api);
app.use('/shopper', api);
app.use('/shopper/email/:email', api);
app.use('/shopper/:crn', api);
app.use('/wishList', api);
app.use('/wishList/:itemBarcode', api);
app.use('/cart', api);
app.use('/cart/:itemBarcode', api);
app.use('/posts', api);
app.use('/users', api);
app.use('/oauth/token', api);


// Catch all other routes and return the index file

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});


app.post('/auth/facebook',
    authCtrl.facebookAuth, authCtrl.retrieveUser, authCtrl.generateToken, (req, res) => {
    res.json({token: req.genertedTokenn});
});


/**
 * Get port from environment and store in Express.
 */
const port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Create HTTP server.
 */
const server = http.createServer(app);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, () => console.log(`API running on localhost:${port}`));