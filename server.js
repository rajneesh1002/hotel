const express = require('express');
const app = express();
const db = require('./db');
const bodyparse = require('body-parser');
app.use(bodyparse.json()); //store data in req.body
require('dotenv').config();


const { round } = require('lodash');

app.get('/', function (req, res) {
    res.send('hey sir, welcome to our hotel.. what would you like to eat?  ')
})

//import the router file
const personRoutes=require('./routes/PersonRoutes')
const menuItemRoutes=require('./routes/menuItemRoutes');

//use the routers
app.use('/person',personRoutes);
app.use('/menu',menuItemRoutes);

const port=process.env.port || 3006;

app.listen(port, () => {
    console.log('server is running');
});

