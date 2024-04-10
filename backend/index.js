const express = require('express');
const db = require('./config/db')
const cors = require('cors')
var oAuth = require('./middleware/oAuth');

const app = express();
const  PORT = 3000;
app.use(cors());
app.use(express.json())

//const budgetbodAPIEndpoint = "http://localhost:8080/home";

app.use(oAuth);

//app.get stuff here

// Route to get everything from the users table
app.get("/", (req,res)=>{
    const axios = require("axios");

    const options = { 
        method: "GET",
        url: "http://www.budgetbodauth-api.com/",
        headers: { "authorization": "Bearer TOKEN" },
        };

    axios(options)
        .then(response => {
            console.log(response.data);
        })
        .catch(error => {
            console.log(error);
        });

    db.query("SELECT * FROM Users", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });
//app.post stuff here

//For testing reasons
app.get('/', (req, res) => {
    res.send('Hello World!');
  });

//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})