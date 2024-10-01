const usermodel = require('../modal/userSchema');
const router=require('express').Router();
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken')

router.post('/signin',async (req,res)=>{
    try {
        const { username }= req.body
    const { email }= req.body
    const userNameExist= await usermodel.findOne({username})
    const emailExist= await usermodel.findOne({email})
    if(userNameExist){
        res.json({message:"Username already exist"})
    }
    if(emailExist){
        res.json({message:"Email already exist"})
    }
     else{
        const hashPass=await bcrypt.hash(req.body.password,10)
        const newUserData={username,email,password:hashPass}
        const response= new usermodel(newUserData)
        await response.save();
        res.status(200).json({message:"Sign in success"})
     } 
    } catch (error) {
        console.log(error)
    }
})
router.post('/login', async (req,res)=>{
    try {
        const {username,password}=req.body
    const response=await usermodel.findOne({username})
    if(!response){
       return res.json({message:"Invalid credentials"})
    }
    const validPass=await bcrypt.compare(password,response.password)
    if(!validPass){
        res.json({msg:"Invalid credentials"})
    }
    const token = jwt.sign({id:response._id},"secret")
    return res.json({token,Id:response._id})
    } catch (error) {
        console.log(error)
    }
})
module.exports=router



