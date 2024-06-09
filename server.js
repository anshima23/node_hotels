const express = require('express');
const db = require('./db');  // Ensure db.js is in the same directory or adjust the path accordingly
const bodyParser = require('body-parser');
const Person = require('./models/person');
const MenuItem = require('./models/MenuItem');

const app = express();  // Initialize the app before using it

app.use(bodyParser.json());

app.get('/', function (req, res) {
    res.send('welcome');
});

app.get('/Person', async (req,res) => {
    try{
        const data = await Person.find();
        console.log('data fetched');
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal Server Error'});
    }
})


app.post('/Person', async (req,res) => {
   try{
    const data = req.body
    const newPerson = new Person(data);
   const response = await newPerson.save();
   console.log('data saved');
   res.status(200).json(response); 
   }catch(err){
       console.log(err);
       res.status(500).json({error: 'Internal server Error'});
   }
})

app.get('/menu', async (req,res) => {
    try{
        const data = await MenuItem.find();
        console.log("data find");
        res.status(200).json(data);
    }catch(err){
        console.log(err);
        res.status(500).json({error: 'Internal server error'});
    }
})

app.post('/menu', async(req,res) =>{
    try{
        const data = req.body;
        const newmenu = new MenuItem(data);
        const response = await newmenu.save();
        console.log("saved data");
        res.status(200).json(response);
    }catch(err){
        console.log("error occured");
        res.status(500).json(err);
    }
})

const PORT = process.env.PORT || 3000;  // Use an environment variable or default to 4000

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
