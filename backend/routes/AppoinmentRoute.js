const { createAppointment, updateAppointment, getAllAppointments } = require("../controllers/AppointmentController");
const verifyToken = require("../middlewares/verifyToken");

const router = require("express").Router();

router.post('/appointment',verifyToken,createAppointment);
router.get('/appointment',verifyToken,getAllAppointments);
router.patch('/appointment/:appointmentId',verifyToken,updateAppointment);


module.exports = router;