import jwt from "jsonwebtoken"
import user from "../models/user.js"
const protect = async(req,res , next)=>{
    let token ;
    if(req.headers.authorization && req.headers.authorization.startsWith("Bearer") )
        try {
            token = req.headers.authorization.split(" ")[1]
            const decode  = jwt.verify(token , process.env.JWT_SECRET)
            console.log(decode);
            req.user = await user.findById(decode.user.id).select("-password") 
            next()
        } catch (error) {
            console.error("Token verification failed",error)
            res.status(401).json({message:"not authorized , no token provided"})
        }

        if(!token){
  return res.status(401).json({
  success:false,
  error:"Not authorized , no token" ,
  statuscode:401
  })
}
}
export default protect