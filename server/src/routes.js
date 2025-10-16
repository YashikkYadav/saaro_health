const express = require("express");
const userRoutes = require("./modules/user/user.routes");
// const patientRoutes = require("./modules/patient/patient.routes");
// const doctorRoutes = require("./modules/doctor/doctor.routes");

const router = express.Router();

router.use("/users", userRoutes);
// router.use("/patients", patientRoutes);
// router.use("/doctors", doctorRoutes);

module.exports = router;
