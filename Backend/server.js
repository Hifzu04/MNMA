import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectdb from "./Config/db.js"
import authroute from "./routes/userroutes.js"
import productroute from "./routes/productroutes.js"
const app = express()
app.use(express.json())
app.use(cors())
dotenv.config()
 const  port = process.env.PORT;
connectdb()

app.use("/api/user" , authroute)
app.use("/api/products" ,productroute )
app.get("/" , (req,res)=>{
    res.send("WELCOME")
})
app.listen(port, ()=>{
    console.log(`server  at ${port} started `)
})

