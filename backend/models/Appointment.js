const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const appointmentSchema=new Schema({
    user:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    groomer:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    date:{type:Date,required:true},
    serviceType:{type:String,required:true,enum:['grooming','boarding','training']},
    status:{type:String,enum:['pending','completed','cancelled'],default:'pending'},
    pet:{type:String,required:true,enum:['dog','cat','other']},
    note:{type:String},
},{
    timestamps:true
});
const AppointmentModel=mongoose.model('Appointment',appointmentSchema);
module.exports=AppointmentModel;