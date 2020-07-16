const express = require('express');
const path = require('path');

const moment = require('moment');

const app = express(); // Create an instance of the node server

// Create a route for the app to get the index page
// Can then handle the response and request objects
/*app.get('/', (req, res) => {
  // Get the path to the index page and do something with it
  //res.send('<h1>Hello World!</h1>'); // Send something to the browser

  // Get a file from path and send it to the browser
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});*/

// Middleware function
// Will be executed as requests are made
// Help to execute something as something runs/executes in the app
// Have access to the same request and response objects
const logger = (req, res, next) => {
  console.log('Middleware...');
  console.log(
    req.protocol +
      '/' +
      req.get('host') +
      req.originalUrl +
      ': ' +
      moment().format()
  ); // displays the request url
  next();
};

// Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// call the logger middleware function
app.use(logger);

// Set a static folder to reference for the app site
// Will reference any html pages that are within
// can access the files from the url path
app.use(express.static(path.join(__dirname, 'public')));

// Bring in the use of a Route that will access the member data api
app.use('/api/members', require('./Routes/api/membersAPI'));

const PORT = process.env.PORT || 5000; // Check environment variables or use port 5000
app.listen(PORT, () => {
  console.log('Server Running...');
}); // Run the web server instance
