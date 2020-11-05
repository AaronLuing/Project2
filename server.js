// DEPENDENCIES
const express = require('express');
const methodOverride  = require('method-override');
const mongoose = require ('mongoose');
const app = express ();
const db = mongoose.connection;
const session = require('express-session');
require('dotenv').config()
// PORT
const PORT = process.env.PORT || 3000;

// DATABASE
// How to connect to the database either via heroku or locally
const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/'+ 'project_2';
// Connect to Mongo
mongoose.connect(MONGODB_URI ,  { useNewUrlParser: true});
// Error / Success
db.on('error', (err) => console.log(err.message + ' is Mongod not running?'));
db.on('connected', () => console.log('mongo connected: ', MONGODB_URI));
db.on('disconnected', () => console.log('mongo disconnected'));
// Open the connection to Mongo
db.on('open' , ()=>{});

// MIDDLEWARE
// Use public folder for static assets
app.use(express.static('public'));
// Populates req.body with parsed info from forms - if no data from forms will return an empty object {}
app.use(express.urlencoded({ extended: false }));// extended: false - does not allow nested objects in query strings
app.use(express.json());// returns middleware that only parses JSON - may or may not need it depending on your project

//use method override
app.use(methodOverride('_method'));// allow POST, PUT and DELETE from a form

app.use(
    session({
      secret: process.env.SECRET, //a random string do not copy this value or your stuff will get hacked
      resave: false, // default more info: https://www.npmjs.com/package/express-session#resave
      saveUninitialized: false // default  more info: https://www.npmjs.com/package/express-session#resave
    })
)

// CONTROLLERS
const forumController = require('./controllers/forum_controller.js');
app.use(forumController)

const userController = require('./controllers/user_controller.js');
app.use('/user', userController)

const sessionController = require('./controllers/session_controller.js');
app.use('/session', sessionController)


// ROUTES
app.use('/', forumController)


//___________________
//Listener
//___________________
app.listen(PORT, () => console.log( 'Listening on port:', PORT));