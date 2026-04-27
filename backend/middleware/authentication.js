const jwt=require("jsonwebtoken");
const JWT_SECRET = require("../token");
const { User } = require("../config/db");

async function authMiddleware(req,res,next){
      console.log("Auth middleware called")
    const authHeader=req.headers.authorization;
    if(!authHeader || !authHeader.startsWith('Bearer')){
        return res.status(401).json({msg:"No token provided"})
    
    }
    const token=authHeader.split(' ')[1];
    try{
        const decoded=jwt.verify(token,JWT_SECRET);
        
        
    req.user={
         userId: decoded.id || decoded.userId,
            role: decoded.role
       
    }
    next()

    } catch(err){
         return res.status(403).json({msg:"Invalid or expired token"});

    }
}

module.exports=authMiddleware