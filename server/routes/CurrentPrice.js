const router  = require('express').Router();
const coinDB = require('../modal/modal')

const axios = require('axios');
const { json } = require('express');





//POST ADD COIN: 
router.post('/AddCoin',async (req, res) => {

    //adding new data to coinDB schema

    const crypto = new coinDB(req.body)
    const url = "https://min-api.cryptocompare.com/data/price?fsym=BTC&tsyms=USD,JPY,EUR"
  
    try{
        
        console.log("entered into add coin route")
        const savedCrypto = await crypto.save()
        res.status(200).json(savedCrypto)
    }catch(e){
        console.log(e)
        res.status(500).json(e)
    }
})

//Update and Store to DataBase ALL COIN Current price and OHLC: 
router.put('/DetailUpdate',async (req, res) => {
    const getPrice  = async(crypto) =>{
        try{
            const CurrentPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD,GBP,EUR`)
            const CurrentOHLC = await axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${crypto}&tsym=USD&limit=1`)
            // console.log(CurrentPrice.data.USD + `USD/${crypto}`)
            // console.log(CurrentPrice.data.GBP+ `GBP/${crypto}`)
            coinDB.updateOne({cryptoName:crypto},{
                $set:{
                    USDprice:CurrentPrice.data.USD,
                    GBPprice:CurrentPrice.data.GBP,
                    close:CurrentOHLC.data.Data.Data[1].close,
                    open:CurrentOHLC.data.Data.Data[1].open,
                    high:CurrentOHLC.data.Data.Data[1].high,
                    low:CurrentOHLC.data.Data.Data[1].low
                }
            }).then(
                ()=>{
                    console.log("Updated "+crypto)
                }
            )
            
        
            
        }catch(error){
            console.log(
                "error in getting price ."+ error
                )
            }
        }
        
    //Filter Only Data with About = "CryptoPrice"
    const coinsWithAbout = await coinDB.aggregate([{
        $match: { about: "CryptoPrice" }
    }])


    // Mapping All data and Setting Latest Price DB 
    coinsWithAbout.map(coin=>{
        
        getPrice(coin.cryptoName)
        
    })
    
    //Filter Latest price Data with About = "CryptoPrice"
    const LatestcoinsWithAbout = await coinDB.aggregate([{
        $match: { about: "CryptoPrice" }
    }])
    
    res.status(200).json(LatestcoinsWithAbout)
  
})


//GET PRICE OF ALL COINS
router.get('/price',async (req,res) =>{
   try{
       const CryptoData = await coinDB.find()
       res.status(200).json(CryptoData)
       CryptoData.map(Pricedata=>{            
           console.log(Pricedata.USDprice + `  USD/${Pricedata.cryptoName}`)
           console.log(Pricedata.GBPprice + `  GBP/${Pricedata.cryptoName}`)

        })

   }catch(e){
    console.log(e)
    
   }

})

//UPDATE ,STORE AND GET ALL PRICE DATA REALTIME .  : 
//REAL TIME storing of Data to database . For see Result CONSOLE OUTPUT RESULT .
router.put('/live',async (req, res) => {
    const getPrice  = async(crypto) =>{
        try{
            const CurrentPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD,GBP,EUR`)
            const CurrentOHLC = await axios.get(`https://min-api.cryptocompare.com/data/v2/histohour?fsym=${crypto}&tsym=USD&limit=1`)
            
            coinDB.updateOne({cryptoName:crypto},{
                $set:{
                    USDprice:CurrentPrice.data.USD,
                    GBPprice:CurrentPrice.data.GBP,
                    close:CurrentOHLC.data.Data.Data[1].close,
                    open:CurrentOHLC.data.Data.Data[1].open,
                    high:CurrentOHLC.data.Data.Data[1].high,
                    low:CurrentOHLC.data.Data.Data[1].low
                }
            }).then(
                ()=>{
                    console.log("Updated "+crypto)
                }
            )
            

        
            
        }catch(error){
            console.log(
                "error in getting price ."+ error
                )
            }
        }
        
    //Filter Only Data with About = "CryptoPrice"
    const coinsWithAbout = await coinDB.aggregate([{
        $match: { about: "CryptoPrice" }
    }])

    const updataAndGet = async ()=>{

        // Mapping All data and Setting Latest Price DB 
        coinsWithAbout.map(coin=>{
            
            getPrice(coin.cryptoName)
            
        })
        
        //Filter Latest price Data with About = "CryptoPrice"
        const LatestcoinsWithAbout = await coinDB.aggregate([{
            $match: { about: "CryptoPrice" }
        }])
        
        // console output of updated Data
        console.log(LatestcoinsWithAbout.map(coin=>({
            cryptos: coin.cryptoName,
            GBP : coin.GBPprice,
            USD : coin.USDprice,
            open:coin.open,
            close:coin.close,
            high:coin.high,
            low:coin.low
        })))
    }
    setInterval(updataAndGet,3000)
    res.send("Successfully Updated")
})













//####  OPTIONAL   #####

//Update Single coin Current price with query " [ ?coin=BTC ] ": 
router.put('/singlePrice',async (req, res) => {
    var coin = req.query.coin;
    let selectedCoin = await coinDB.findOne({cryptoName: coin});
    console.log(selectedCoin)
    const getPrice  = async(crypto) =>{
        try{
            const CurrentPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD,GBP,EUR`)
            console.log(CurrentPrice.data.USD + `USD/${crypto}`)
            console.log(CurrentPrice.data.GBP+ `GBP/${crypto}`)
            coinDB.updateOne({cryptoName:coin},{
                $set:{
                    USDprice:CurrentPrice.data.USD,
                    GBPprice:CurrentPrice.data.GBP
                }
            },
            function(err,result){
                if (err) throw err;
                
            }
            )
            
        
            
        }catch(error){
            console.log(
                "error in getting price ."+ error
                )
            }
        }
    
    
    getPrice(coin)
  
})


//Update ALL COIN Current price: 
router.put('/update',async (req, res) => {
    const getPrice  = async(crypto) =>{
        try{
            const CurrentPrice = await axios.get(`https://min-api.cryptocompare.com/data/price?fsym=${crypto}&tsyms=USD,GBP,EUR`)
            // console.log(CurrentPrice.data.USD + `USD/${crypto}`)
            // console.log(CurrentPrice.data.GBP+ `GBP/${crypto}`)
            coinDB.updateOne({cryptoName:crypto},{
                $set:{
                    USDprice:CurrentPrice.data.USD,
                    GBPprice:CurrentPrice.data.GBP
                }
            }).then(
                ()=>{
                    console.log("Updated "+crypto)
                }
            )
            
        
            
        }catch(error){
            console.log(
                "error in getting price ."+ error
                )
            }
        }
        
    //Filter Only Data with About = "CryptoPrice"
    const coinsWithAbout = await coinDB.aggregate([{
        $match: { about: "CryptoPrice" }
    }])


    // Mapping All data and Setting Latest Price DB 
    coinsWithAbout.map(coin=>{
        
        getPrice(coin.cryptoName)
        
    })
    
    //Filter Latest price Data with About = "CryptoPrice"
    const LatestcoinsWithAbout = await coinDB.aggregate([{
        $match: { about: "CryptoPrice" }
    }])
    
    res.status(200).json(LatestcoinsWithAbout)
  
})




module.exports = router;   