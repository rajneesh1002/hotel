const mongoose=require('mongoose');
require('dotenv').config();

//define the mongodb connection url


//const mongoURL= process.env.local_db_url;
const mongoURL= process.env.db_url


//set up mongodb connection
mongoose.connect(mongoURL,{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//get the default connection
// mongoose maintains a default connection object representing the MongoDB connection.
const db= mongoose.connection;

//define event listeners for database connection

db.on('connected', () => {
    console.log('connected to mongodb server');
});

db.on('error', () => {
    console.log('mongodb connection erro');
});

db.on('disconnected', () => {
    console.log('disconnected to mongodb server');
});

//export the database connection
module.exports = db;