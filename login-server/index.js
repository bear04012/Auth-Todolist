const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const session = require('express-session');
const  bodyParser = require('body-parser')


app.use(cookieParser());

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
})); 

app.use(session({
    secret: 'my name is',
    resave: false,
    saveUninitialized: true
}));

// app.get('/', (req, res) => 
//     {res.send('Hello World!')});

app.use('/', require('./routes/index'));

app.listen(8081, () => console.log('Example app listening on port 8081!'));