const mongoose = require('mongoose');
require('dotenv').config();
const mongoURL = process.env.MONGODB_URL;

mongoose.connect(mongoURL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
})

const db = mongoose.connection;

db.on('connected', () =>{
    console.log('connected to mongodb');
})


db.on('error', (err) =>{
    console.log('connected',err);
})


db.on('disconnected', () =>{
    console.log('disconnected');
})

module.exports = db;
