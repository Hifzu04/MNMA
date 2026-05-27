import mongoose from "mongoose"
import bcrypt from "bcryptjs"

const userschema = new mongoose.Schema({
    name:{
        type:String,
        required: true,
        trim: true
    } ,
    email:{
          type:String,
        required: true,
        unique:true, 
         trim: true,
         match:[/.+\@.+\..+/, "Please enter a valid email address "]
    } ,
    password:{
         type:String,
        required: true, 
        minLength :6
    } ,
    role:{
        type:String,
        enum:["customer" , "admin"],
        default:"customer"
    }
} , {timestamps:true})

