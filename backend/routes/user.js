const express=require("express");
const router=express.Router();
const zod=require("zod");
const { User } = require("../config/db");
const bcrypt=require("bcrypt");
const jwt=require("jsonwebtoken")
const JWT_SECRET = require("../token");
const authMiddleware = require("../middleware/authentication");

const signupSchema=zod.object({
    name:zod.string().min(3),
    email:zod.email(),
    password:zod.string(),
    role:zod.enum(["patient","doctor"]).default('patient'),
    dateOfBirth:zod.string().optional(),
      address: zod.object({
      street: zod.string().optional(),
      city: zod.string().optional(),
      state: zod.string().optional(),
      zipCode: zod.string().optional(),
    })
    .optional()
})


router.post("/register",async(req,res)=>{
    const result=signupSchema.safeParse(req.body);
     if(!result.success){
        return res.status(400).json({
            msg:"Incorrect inputs"
        })
    }

    const {name,email,password,role,dateOfBirth,address}=result.data;
    const user=await User.findOne({
        email
    })
    console.log("User found", user)
    
    if(user){
          return res.status(400).json({
        msg:"Email already taken"
    })
    }

    const hashedPassword=await bcrypt.hash(password,10);
    const newUser=await User.create({
        email,
        password:hashedPassword,
        name,
        role,
        dateOfBirth,
        address
    })

    const userId=newUser._id;
    const userRole=newUser.role

    const token=jwt.sign({
        userId,userRole
    },JWT_SECRET, {expiresIn:'7d'})

    res.json({
        msg:"User created successfully",
        token:token,
        newUser:{
            _id:newUser._id,
            name:newUser.name,
            email:newUser.email
        }
    })
})



const loginSchema=zod.object({
    email:zod.email(),
    password:zod.string()
})

router.post('/login',async(req,res)=>{
const result=loginSchema.safeParse(req.body);
if(!result.success){
    return res.status(403).json({
        msg:"Invalid inputs"
    }) 

}
try{
   const {email,password}=result.data;

    const findUser= await User.findOne({
        email
    })

    if(!findUser){
        return res.status(404).json({
            msg:"User not found"
        })
    }

    const isMatch=await bcrypt.compare(password,findUser.password);
    if(!isMatch){
        return res.status(401).json({
            msg:"Invalid  username or password"
        })
    }

    const token=jwt.sign({userId:findUser._id, role: findUser.role},JWT_SECRET, {expiresIn:'7d'})
    res.json({
        msg:"Logged in",
        token,
            user: {
        name: findUser.name,
        role: findUser.role,
        email: findUser.email
    }
    })

} catch(err){
    console.log(err);
        res.status(500).json({ msg: "Server error" });
}

})

router.get('/me',authMiddleware, async(req,res)=>{
  try{ 
    const user=await User.findById(req.user.userId).select('-password')
    if(!user){
        return res.status(403).json({
            msg:"User not found"
        })
    }

    res.json({
        msg:'User fetched successfully',
        user
    })

  } catch(err){

    console.error(err)
    res.status(500).json({
        msg:"Server error"
    })
  }
})
module.exports=router