const express=require('express')
const taskmodel = require('../modal/taskSchema')
const usermodel = require('../modal/userSchema')
const verifyToken = require('./auth')

const router=express.Router()

//Create task
router.post("/",verifyToken,async (req,res)=>{
   try {
    const body=req.body
    const newTask= await taskmodel(body)
    const response=await newTask.save();
    const user= await usermodel.findById(req.body.userid)
    user.task.push(response)
    await user.save()
   //to update the task table instantly i have
   //to send the updated task list from here
   //basiclly to not refresh page every time i create a task
   const updatedTask=await usermodel.findById(req.body.userid).populate({
      path:"task",
      options:{sort:{createdAt:-1}},
   })
    res.status(200).json({updatedTask})
   } catch (error) {
    console.log(error)
   }
})
//Get all task
router.get('/getalltask/',verifyToken,async (req,res)=>{
  try {
   const id=req.headers.id
   const response=await usermodel.findById(id).populate(
      {
      path:"task",
      options:{sort:{createdAt:-1}},
   })
   res.status(200).json(response)
  } catch (error) {
   console.log(error)
  }
})
//Delete Task
router.delete('/delete/task/:id',verifyToken,async (req,res)=>{
   try {
   const id=req.params.id;
   const userid=req.headers.id;
   await taskmodel.findByIdAndDelete(id)
   await usermodel.findByIdAndUpdate(userid,{$pull:{task:id}})
   //to update the task table instantly i have
   //to send the updated task list from here
   //basiclly to not refresh page every time i delete a task
   const updatedTask=await usermodel.findById(userid).populate({
      path:"task",
      options:{sort:{createdAt:-1}}
   })
   res.status(200).json(updatedTask)
  
   } catch (error) {
      console.log(error)
   }
})
//Update task
router.put("/update/task/:id",verifyToken, async (req,res)=>{
   try {
      const id=req.params.id;
   const updatedTask=req.body
   await taskmodel.findByIdAndUpdate(id,updatedTask)
   const UpdatedTask=await usermodel.findById(req.body.userid).populate({
      path:"task",
      options:{sort:{createdAt:-1}}
   })
   res.status(200).json(UpdatedTask)
   } catch (error) {
      console.log(error)
   }
})
//Update important task
router.put("/update/imp/task/:id", async (req,res)=>{
   try {
      const id=req.params.id;
      const taskData=await taskmodel.findById(id)
      const impData=taskData.important
      await taskmodel.findByIdAndUpdate(id,{important:!impData})
      const UpdatedTask=await usermodel.findById(req.body.userid).populate({
         path:"task",
         options:{sort:{createdAt:-1}}
      })
      res.status(200).json(UpdatedTask)
   } catch (error) {
      console.log(error)
   }
})
//Update Complete task
router.put("/update/comp/task/:id", async (req,res)=>{
   try {
      const id=req.params.id;
      const taskData=await taskmodel.findById(id)
      const compData=taskData.complete
     await taskmodel.findByIdAndUpdate(id,{complete:!compData}) 
     const UpdatedTask=await usermodel.findById(req.body.userid).populate({
      path:"task",
      options:{sort:{createdAt:-1}}
   })
   res.status(200).json(UpdatedTask)
   
   
   } catch (error) {
      console.log(error)
   }
})
//Get all important task 
router.get('/getallImptask/',async (req,res)=>{
   try {
    const id=req.headers.id
    const response=await usermodel.findById(id).populate(
       {
       path:"task",
       match:{important:true},
       options:{sort:{createdAt:-1}},
    })
    const impData=response.task
    res.status(200).json({impData})
   } catch (error) {
    console.log(error)
   }
 })
 //Get all complete task 
router.get('/getallComptask/',async (req,res)=>{
   try {
    const id=req.headers.id
    const response=await usermodel.findById(id).populate(
       {
       path:"task",
       match:{complete:true},
       options:{sort:{createdAt:-1}}
    })
    const comData=response.task
    res.status(200).json({comData})
   } catch (error) {
    console.log(error)
   }
 })
 //Get all incomplete task 
 router.get('/getallInComptask/',async (req,res)=>{
   try {
    const id=req.headers.id
    const response=await usermodel.findById(id).populate(
       {
       path:"task",
       match:{complete:false},
       options:{sort:{createdAt:-1}}
    })
    const inComData=response.task
    res.status(200).json({inComData})
   } catch (error) {
    console.log(error)
   }
 })
module.exports=router