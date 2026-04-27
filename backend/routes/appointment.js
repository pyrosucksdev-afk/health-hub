const express=require("express");
const authMiddleware = require("../middleware/authentication");
const { Appointment } = require("../config/db");
const router=express.Router();

router.post('/',authMiddleware, async(req,res)=>{

try{
    const {doctorId,date,reason,timeSlot}=req.body;
     if (!doctorId || !date || !timeSlot) {
      return res.status(400).json({ msg: "Missing required fields" });
    }

     const appt = await Appointment.create({
      patientId: req.user.userId,  
      doctorId,
      date,
      timeSlot,
      reason,
    });
    

    console.log(req.user)

    res.json({appt})
}catch(err) {
       res.status(500).json({ msg: "Server error" });
}

})

router.get("/", authMiddleware, async (req, res) => {
  try {
    const appts = await Appointment.find({ patientId: req.user.userId })
      .populate("doctorId", "name email role");

    res.json({ appts });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Server error" });
  }
});
module.exports=router