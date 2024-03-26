const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3000;
app.use(cors());
app.use(express.json())

//app.get stuff here

// Route to get everything from the users table
app.get("/", (req,res)=>{
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