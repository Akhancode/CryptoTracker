const express = require('express')
const mongoose = require('mongoose');
const dotenv = require('dotenv');
require('dotenv').config();


/*
    PLEASE USE POSTMAN TO GET ALL RESULTS .WITH CERTAIN METHODS .

    1. ADDING A OBJECT OF NEW COIN 
       
        POST method 
        URL:  http://localhost:8000/crypto/AddCoin
        Body (json): {
                        "cryptoName":"BNB",
                        "about":"CryptoPrice"
                     } 
    
    2. UPDATE AND STORE LATEST PRICE TO DATABASE AND DETAILS (OHCL) ALL COINS
        PUT method
        URL : http://localhost:8000/crypto/DetailUpdate



    
    3. UPDATE AND CONSOLE OUTPUT OF  LIVE PRICE AND OHCL OF ALL COINS
        PUT method
        URL : http://localhost:8000/crypto/live



    4. GET RES DATA OF ALL COINS
        GET method
        URL : http://localhost:8000/crypto/price
    


        5. UPDATE SINGLE COIN'S CURRENT PRICE WITH QUERY :
        PUT method
        URL : http://localhost:8000/crypto/singlePrice?coin=BTC


*/

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



