const express = require('express')
const app = express()
app.use(express.json())
require('dotenv').config()
const mongo = require('mongoose')
const PORT = process.env.PORT

app.use('/user', require('./routes/userRoutes'))
app.use('/category', require('./routes/categoryRoutes'))
app.use('/product', require('./routes/productRoutes'))


app.listen(PORT,()=>{
    mongo.connect(process.env.MONGOURL).then(()=>{
        console.log("Mongo DB Connected")
    })
    .catch(()=>{
        console.log("Failed to Connect MOngoDB")
    })
    console.log(`App Started at ${PORT}`)
})