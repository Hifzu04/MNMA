import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectdb from "./Config/db.js"
import authroute from "./routes/userroutes.js"
import productroute from "./routes/productroutes.js"
import cartroute from "./routes/cartroutes.js"
import { uploadroute } from "./routes/uploadroutes.js"
dotenv.config()

const app = express()
app.use(express.json())
app.use(cors())

const port = process.env.PORT || 5000;
connectdb()

app.use("/api/user", authroute)
app.use("/api/products", productroute)
app.use("/api/cart", cartroute)
app.use("/api/upload" ,uploadroute )
app.get("/", (req, res) => {
    res.send("WELCOME")
})

app.listen(port, () => {
    console.log(`server at ${port} started`)
})

