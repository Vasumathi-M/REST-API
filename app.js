const express = require('express'); //use express

// to use storage
const storage = require('node-persist');
storage.init(); //initialiaze storage


const UserController = require('./routes/userRoutes');
const app = express(); //create app using express

//in-built middleware to parse data
app.use(express.json()) //JSON Parser

app.use('/api/v1/user',UserController)

app.listen(5000, ()=>console.log('App is running on port 5000')); //run on port


//to access user API use below Path
//http://localhost:5000/api/v1/user (get & post)
//http://localhost:5000/api/v1/user/anyid (delete & put)

// v1 - version 1