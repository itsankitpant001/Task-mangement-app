const express=require('express')
const app=express()
const cors=require('cors')
const taskRoute=require('./routes/taskroute')
const userRoute=require('./routes/userroute')
require('dotenv').config()
const PORT=process.env.PORT || 3000
app.listen(PORT,()=>{
    console.log(`Server is running on ${PORT}`)
})
app.use(express.json())
app.use(cors())

const mongoose=require('mongoose')
const URL=process.env.URL;
mongoose.connect(URL).then(()=>{
    console.log("mongoDB is connected")
}).catch((err)=>{
    console.log(err)
})
app.use(taskRoute)
app.use(userRoute)