const express=require("express");
const app=express();
const router=express.Router();
const userRouter=require("./user");
const appointmentRouter=require("./appointment");
const checkupRouter=require('./checkup')
router.use('/user',userRouter);
router.use('/appointment', appointmentRouter);
router.use('/checkup',checkupRouter)
module.exports=router