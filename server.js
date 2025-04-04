const express = require('express');
const app = express();
const db = require('./db');
const bodyparse = require('body-parser');
app.use(bodyparse.json()); //store data in req.body
require('dotenv').config();
const passport=require('./auths')
//const { round } = require('lodash');


const logRequest=(req,res,next)=>{
    console.log(`[${new Date().toLocaleString()}] Request made to: ${req.originalUrl}`);
    next();
}

app.use(logRequest)



app.use(passport.initialize());
const localAuthMiddleware=passport.authenticate('local',{session: false})

app.get('/', (req, res) => {
        res.send('hey sir, welcome to our hotel.. what would you like to eat?  ');
    })

//import the router file
const personRoutes=require('./routes/PersonRoutes')
const menuItemRoutes=require('./routes/menuItemRoutes');
const person = require('./models/person');



//use the routers
app.use('/person',localAuthMiddleware,personRoutes);
app.use('/menu',menuItemRoutes);

const port=process.env.port || 3006;

app.listen(port, () => {
    console.log('server is running');
});

