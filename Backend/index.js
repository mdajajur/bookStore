import express from 'express'
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import cors from 'cors'

import bookRoute from '../Backend/routes/book.route.js'
import userRoute from '../Backend/routes/user.route.js'

const app = express()
app.use(cors())

app.use(express.json())
dotenv.config()


const PORT=process.env.PORT || 4000
const URI=process.env.MongoDBURI;

try{
  mongoose.connect(URI,{
    useNewUrlParser:true,
    UseUnifiedTopology:true
  });
  console.log("Connencted to mongoDB")

  }catch(error){
    console.error("error Connencted to mongoDB", error.message)
  }


// Connencting Routes
app.use('/book', bookRoute)
app.use('/user', userRoute)

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})