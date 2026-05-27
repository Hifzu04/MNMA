import express from "express"
import user from "../models/user.js"
import jwt from "jsonwebtoken"
const authroute = express.Router()

authroute.post("/register" , async(req,res)=>{
    const {name , email , password} = req.body
    try {
       
 let checkuser =  await user.findOne({email})
 if( checkuser) {
return res.status(400).json({message:"User already exists"})
 }
     checkuser = new user({name , email , password})
   await checkuser.save()
   res.status(201).json({
    userobj:{
        _id: checkuser._id , name : checkuser.name, email: checkuser.email , role: checkuser.role
    }
   })
} 

    catch (error) {
        console.log(error)
        res.status(500).send("Server error")
    }
})
export default authroute