const express = require('express');
const app = express();
const path = require('path')
const handleJokeFetch = require('../adapters/handleJokeFetch')

const port = 8080;

app.listen(port);


// Static Assets filepath 
const filepath = path.join(__dirname, '../vite-project/dist')


// Middleware controllers 
const logRoutes = (req, res, next) => {
    const time = new Date().toLocaleString();
    console.log(`${req.method}: ${req.originalUrl} - ${time}`);
    next();
}
const serveStatic = express.static(filepath);

// Server MiddleWare. 
app.use(serveStatic);
app.use(logRoutes);


// Server Controllers 
const servePicture = (req,res,next) => {
    console.log("You reached the picture endpoint");
    res.send({src : "https://static-cdn.jtvnw.net/jtv_user_pictures/meowntain-profile_banner-71b7a6d0d943dc9e-480.jpeg"})
}

const serveJoke = (req,res,next) => {
    console.log("You reached the joke endpoint");

    // Fetches a random joke via the Jokes AP - API Ninjas. 
    const fetchJoke = async () => {
    const jokeData = await handleJokeFetch(); 
    if(jokeData[0]) {
        const randomJoke = jokeData[0][0].joke;
        res.send(randomJoke);
    } else {
        // Sends a default joke. 
        res.send('When putting cheese in a mousetrap, always leave room for the mouse.');
    }
    } 
    fetchJoke();
}

const serveRoll = (req,res,next) => {
    const diceRolls = [];
    //Destructres the query parameter that specifies the number of roles. 
    let { quantity} = req.query;
    //If a query parameter isn't specified - only roll the die once.
    if(!quantity) quantity = 1;
    // Rolls the die based on the specified quantity.
    for (let i = 0; i < quantity; i++)  {
        const roll = (Math.floor((Math.random() * 6) + 1));
        diceRolls.push(roll) 
    }
    res.send(diceRolls);
}

// Server Endpoints
app.get('/api/picture',servePicture); 
app.get('/api/joke',serveJoke);
app.get('/api/rollDie',serveRoll);
