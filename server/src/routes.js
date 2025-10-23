const express = require("express");
const userRoutes = require("./modules/user/user.routes");
const patientRoutes = require("./modules/patient/patient.routes");
const doctorRoutes = require("./modules/doctor/doctor.routes");
const appointmentRoutes = require("./modules/appointment/appointment.routes");
const invoiceRoutes = require("./modules/invoice/invoice.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/invoices", invoiceRoutes);

module.exports = router;