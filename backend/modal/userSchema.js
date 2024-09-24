const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
    username:{
        type:String,
        unique:true,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    task:[{
        type:mongoose.Types.ObjectId,
        ref:"task"
    }]
})
const usermodel=mongoose.model("user",userSchema)
module.exports=usermodel;