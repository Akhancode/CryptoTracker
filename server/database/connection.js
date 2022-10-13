const dotenv = require('dotenv');
const mongoose = require('mongoose');
dotenv.config()

const connect_DB = async()=>{
    try{
        console.log('connecting Database')
        const con = await mongoose.connect(process.env.DATABASE_URL)
        console.log(`Mongodb connected`)
    }catch(err){
            console.log(err)
            process.exit(1)
    }
}

module.exports = connect_DB