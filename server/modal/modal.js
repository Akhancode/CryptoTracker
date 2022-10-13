const mongoose = require('mongoose');
var schema = new mongoose.Schema({
    cryptoName:{
        type:'string',
        required: false,  
        unique:true  
    },
    USDprice:{
        type:Number,
        required: false,
        unique: false
    },
    GBPprice:{
        type:Number,
        required: false,
        unique: false
    },
    
    about:{
        type:String,
        required: false,
        unique: false
    },

    high:{
        type:Number,
    },

    low:{
        type:Number,
    },

    
    open:{
        type:Number,
    },
    
    close:{
        type:Number,
    },
})

const coinDB = mongoose.model('coinDB',schema)

module.exports = coinDB;