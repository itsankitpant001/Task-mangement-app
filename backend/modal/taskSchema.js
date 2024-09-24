const mongoose=require('mongoose')
const taskSchema=new mongoose.Schema({
    title:{
        type:String, 
        required:true,
        unique:true
    },
    disc:{
        type:String,
        required:true,
    },
    important:{
            type:Boolean,
            default:false
        },
    complete:{
        type:Boolean,
        default:false
    }

},{timestamps:true})
const taskmodel=mongoose.model("task",taskSchema)
module.exports=taskmodel;