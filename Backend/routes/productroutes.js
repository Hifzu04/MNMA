import express from "express"
import product from "../models/product.js"
import {protect , admin} from "../middleware/authmiddleware.js"
const productroute = express.Router();
productroute.post("/" , protect , admin , async(req, res)=>{
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


productroute.put("/:id", protect, admin, async(req,res)=>{

    try {

        const {
            name, description,price,discountprice,countinstock, category,
            brand,
            sizes,
            colors,
            collections,
            material,
            gender,images,isfeatured,ispublised,tags,dimensions, weight,sku
        } = req.body

        const findingproduct = await product.findById(req.params.id)

        if(findingproduct){

            findingproduct.name = name || findingproduct.name
            findingproduct.description = description || findingproduct.description
            findingproduct.price = price || findingproduct.price
            findingproduct.discountprice = discountprice || findingproduct.discountprice
            findingproduct.countinstock = countinstock || findingproduct.countinstock
            findingproduct.category = category || findingproduct.category
            findingproduct.brand = brand || findingproduct.brand
            findingproduct.sizes = sizes || findingproduct.sizes
            findingproduct.colors = colors || findingproduct.colors
            findingproduct.collections = collections || findingproduct.collections
            findingproduct.material = material || findingproduct.material
            findingproduct.gender = gender || findingproduct.gender
            findingproduct.images = images || findingproduct.images
            findingproduct.isfeatured = isfeatured !== undefined ? isfeatured :  findingproduct.isfeatured
            findingproduct.ispublised =  ispublised !== undefined ? ispublised :  findingproduct.ispublised
            findingproduct.tags = tags || findingproduct.tags
            findingproduct.dimensions = dimensions || findingproduct.dimensions
            findingproduct.weight = weight || findingproduct.weight
            findingproduct.sku = sku || findingproduct.sku

            const updatedproduct = await findingproduct.save()

            res.json(updatedproduct)

        } else {

            return res.status(404).json({message:"Product not found"})
        }

    } catch (error) {

        res.status(500).json({message:error.message})

    }
})


productroute.delete("/:id" , protect , admin , async(req,res)=>{
    try {
        const deletingproduct = await product.findById(req.params.id)
        if(deletingproduct){
            await deletingproduct.deleteOne();
            res.json({message:"Product removed"})
        }
        else{
return res.status(404).json({message:"Product not found"})
        }
    } catch (error) {
          res.status(500).json({message:error.message})
    }
})


// get / api/products 
// get all products  with optional query filters 

productroute.get("/" , async(req,res)=>{  // collection - variable 
    // collections -- db 
    try {
        const  {collection , size , color , gender , minprice , maxprice , sortby , search , category , material , brand , limit} = req.query
        let query = {}

if(collection && collection.toLowerCase()!=="all"){
    query.collections = collection
}
if(category && category.toLowerCase()!=="all"){
    query.category = category
}
 if(material){
    query.material = {$in:material.split(",")}
 }
 if(brand){
    query.brand = {$in:brand.split(",")}
 } 
 if(size){
    query.sizes = {$in:size.split(",")}
 } 
 if(color){
    query.colors= {$in:[color]}
 } 
 if(gender){
    query.gender = gender
 }


 if(minprice || maxprice){
    query.price = {}
    if(minprice){
        query.price.$gte = Number(minprice)
    }
       if(maxprice){
        query.price.$lte = Number(maxprice)
    }
 }
 if(search){
    query.$or = [
        {name:{$regex:search , $options:"i"}},
         {description:{$regex:search , $options:"i"}}
    ]
 }
 let sort = {}
 if(sortby){
    switch(sortby){
        case "priceAsc":
            sort={price:1}
            break;
               case "priceDesc":
            sort={price:-1}
            break;
               case "popularity":
            sort={rating:-1}
            break;
  default:break
    }
 }

 let products = await product.find(query).sort(sort).limit(Number(limit)|| 0)
res.json(products)

    } 
    
    catch (error) {
        console.error(error)
        res.status(500).send("Server error")
    }
})

productroute.get("/:id" , async(req,res)=>{
    try {
       const productgot = await product.findById(req.params.id)
       if(productgot){
        res.json(productgot)
       }
       else{
        res.status(404).json({message:"Product not found"})
       } 
    } catch (error) {
         console.error(error)
        res.status(500).send("Server error")
    }
})







export default productroute