const express = require('express');
const db = require('./config/db')
const cors = require('cors')

const app = express();
const  PORT = 3000;

app.use(cors());
app.use(express.json())

//app.get stuff here

// Route to get everything from the users table
app.get('/', function (req, res) {
    res.send();
  });
    //app.post stuff here
    
    //For testing reasons
    app.get('/', (req, res) => {
        res.send('Hello World!');
      });
//Routing for Dashboard
app.get("/Dashboard", (req,res)=>{
    db.query("SELECT DISTINCT date FROM dashTable", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    }); });


app.post("/Dashboard", (req, res)=>{

    const { date, calText, actText } = req.body;
    db.query("INSERT INTO dashTable(date, calIntake, actType) VALUES (?, ?, ?)", [date, calText, actText], (err,result)=>{
        if(err) {
        console.log(err)
        res.status(500).send("Error occurred while adding data to dashboard");
        }
        else{
            res.status(200).send("Data added to dashboard successfully");
        }
    }); });

app.post("/Dashboard/clear", (req, res)=>{

    const { date, calText, actText } = req.body;
    db.query("DELETE FROM dashTable", (err,result)=>{
        if(err) {
        console.log(err)
        res.status(500).send("Error occurred while clearing data");
        }
        else{
            res.status(200).send("Data successfully deleted");
        }
    }); });

//Routing for Settings page
app.get("/SettingsPage", (req,res)=>{
    db.query("SELECT * FROM dashTable", (err,result)=>{
        if(err) {
        console.log(err)
        } 
    res.send(result)
    });   });

    app.get("/Recipes", (req,res)=>{
        db.query("SELECT * FROM Users", (err,result)=>{
            if(err) {
            console.log(err)
            } 
        res.send(result)
        });   });
    
//Start the server
app.listen(PORT, ()=>{
    console.log(`Server is running on ${PORT}`)
})