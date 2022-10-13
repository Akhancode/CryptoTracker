const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();
const mongoString = process.env.DATABASE_URL

const CurrentPrice = require('./server/routes/CurrentPrice')

const connectDB = require('./server/database/connection.js')

const app  = express()


const port = process.env.PORT||3000

app.use(express.urlencoded({extended: true}));
app.use(express.json());

connectDB();

app.get('/',(req,res)=>{
    res.send('Hello world')
})

app.use('/crypto',CurrentPrice)


app.listen(port,()=>{
    console.log(`listening on port ${port}`)
})


