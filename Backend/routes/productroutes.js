import express from "express"
import product from "../models/product.js"
import protect from "../middleware/authmiddleware.js"

const productroute = express.Router();
productroute.post("/" , protect , async(req, res)=>{
try {
    const {name , description , price , discountprice , countinstock , category , brand , sizes, colors , collections , material , gender,
        images , isfeatured , ispublised , tags , dimensions , weight , sku } = req.body

 const user= req.user._id;
 console.log(user)

const creatingproduct = new product({name , description , price , discountprice , countinstock , category , brand , sizes, colors , collections , material , gender,
        images , isfeatured , ispublised , tags , dimensions , weight , sku , user })
        console.log(creatingproduct)

const newproduct =  await creatingproduct.save();
res.status(201).json(newproduct)

} catch (error) {
    console.log(error)
    res.status(500).send("Server error")
}
})

export default productroute