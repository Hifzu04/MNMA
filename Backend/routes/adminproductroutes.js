import express from "express"
import product from "../models/product.js"
import { protect, admin } from "../middleware/authmiddleware.js"

const adminprorouter = express.Router()
adminprorouter.get("/" , protect , admin , async(req,res)=>{
    try {
        const gettingpro = await product.find({})
        res.json(gettingpro)
    } catch (error) {
        console.error(error)
        res.status(500).json({message:"Server error"})
    }
})

export default adminprorouter