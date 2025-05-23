const AppointmentModel = require("../models/Appointment")

const createAppointment = async (req, res) => {
    try {
        const { groomerId } = req.body
        const userId = req.user._id
        const newAppointment = new AppointmentModel({
            user: userId,
            groomer: groomerId,
            ...req.body
        })
        await newAppointment.save()
        res.status(200).json({
            success: true,
            message: "Appointment created successfully",
            appointment: newAppointment
        })
    } catch (error) {
        {
            console.log(error)
            res.status(500).json({
                success: false,
                message: "Internal server error",
                error: error.message
            })
        }
    }
}
const updateAppointment = async (req, res) => {
    const { appointmentId } = req.params
    const { status } = req.body
    try{
        const appointment = await AppointmentModel.findOneAndUpdate(
            {_id: appointmentId},
            {status: status},
            {new: true}

        )
        if(!appointment){
            return res.status(404).json({
                success: false,
                message: "Appointment not found"
            })
        }
 
        res.status(200).json({
            success: true,
            message: "Appointment updated successfully",
            appointment
        })
    }catch(error){
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
const getAllAppointments = async (req, res) => {
    try {
        const appointments = await AppointmentModel.find()
            .populate('user', 'name email')
            .populate('groomer', 'name email')
        res.status(200).json({
            success: true,
            appointments
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            success: false,
            message: "Internal server error",
            error: error.message
        })
    }
}
module.exports = {createAppointment,updateAppointment,getAllAppointments}