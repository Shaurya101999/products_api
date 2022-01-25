const express = require('express');

const app = express();
const port = process.env.PORT || 8000 ;
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const path = require('path');


// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// to use routes
app.use('/', require('./routes'));

// Setting up the view engine
app.set('view engine', 'ejs');
app.set('views',path.join(__dirname,'views'));

app.use(express.urlencoded());

app.listen(port, (err)=>{
    if(err){
        console.log(`Error in running the server : ${err}`);
        return ;
    }
    console.log(`Server is running on port : ${port}`);
})