const mongoose = require('mongoose')

const db = async () => {
    try{
        mongoose.set('strictQuery', false)
        await mongoose.connect(process.env.MONGO_URL)
        console.log('mongodb is connected')
    }catch(error)
    {
        console.log('mongodb connection Error')
    }
}

module.exports  = {db}