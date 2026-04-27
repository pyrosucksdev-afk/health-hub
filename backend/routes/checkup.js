const express=require("express");
const { Checkup } = require("../config/db");
const authMiddleware = require("../middleware/authentication");
const router=express.Router();
router.post('/', authMiddleware, async (req, res) => {
  if(req.user.role !== 'doctor') return res.status(403).json({ msg: 'Not authorized' });
  const checkup = await Checkup.create(req.body);
  res.json({checkup});
});

router.get('/', authMiddleware, async (req, res) => {
  const checkups = await Checkup.find({ patientId: req.user.id }).populate('doctorId', 'name');
  res.json(checkups);
});
module.exports=router