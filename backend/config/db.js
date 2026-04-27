const mongoose=require("mongoose");
const { date } = require("zod");
mongoose.connect("mongodb://localhost:27017/hospital_management")
.then(()=>{
    console.log("connected to mongodb")
})
.catch((err)=>{
    console.log("Error connecting to mongoose")
})

const userSchema=new mongoose.Schema({
 name:{
    type:String,
    required:true
 },
 email:{
    type:String,
    unique:true
 },
 password:String,
 role:{type:String,
    enum:['doctor','patient'],
    default:'patient'},

    dateOfBirth:{
        type:Date
    },

    address:{
           street: String,
        city: String,
        state: String,
        zipCode: String
    }
})




const appointmentSchema = new mongoose.Schema({
    patientId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    doctorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    timeSlot: {
        type: String,
       
    },
    reason: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['confirmed', 'pending', 'cancelled', 'completed'],
        default: 'pending'
    },
    notes: {
        type: String,
        trim: true
    }
}, {
    timestamps: true
});

const CheckupSchema = new mongoose.Schema({
  patientId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  doctorId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  date: { type: Date, default: Date.now },
  notes: String,
  prescriptions: [String]
});

const Checkup=mongoose.model('Checkup', CheckupSchema)

const User=mongoose.model('User',userSchema);
const Appointment=mongoose.model('Appointment', appointmentSchema);
module.exports={User,Appointment,Checkup}