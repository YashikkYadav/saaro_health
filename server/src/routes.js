const express = require("express");
const userRoutes = require("./modules/user/user.routes");
const patientRoutes = require("./modules/patient/patient.routes");
const doctorRoutes = require("./modules/doctor/doctor.routes");
const appointmentRoutes = require("./modules/appointment/appointment.routes");
const invoiceRoutes = require("./modules/invoice/invoice.routes");
const prescriptionRoutes = require("./modules/prescription/prescription.routes");
const prescriptionSectionRoutes = require("./modules/prescriptionSection/prescriptionSection.routes");
const dashboardRoutes = require("./modules/dashboard/dashboard.routes");
const reviewRoutes = require("./modules/review/review.routes");
const templateLibraryRoutes = require("./modules/templateLibrary/templateLibrary.routes");
const medicineLibraryRoutes = require("./modules/medicineLibrary/medicineLibrary.routes");
const dropdownRoutes = require("./modules/dropdown/dropdown.routes");
const dropdownLibraryRoutes = require("./modules/dropdownLibrary/dropdownLibrary.routes");

const router = express.Router();

router.use("/users", userRoutes);
router.use("/doctors", doctorRoutes);
router.use("/patients", patientRoutes);
router.use("/appointments", appointmentRoutes);
router.use("/invoices", invoiceRoutes);
router.use("/prescriptions", prescriptionRoutes);
router.use("/prescription-section", prescriptionSectionRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/reviews", reviewRoutes);
router.use("/templates", templateLibraryRoutes);
router.use("/medicines", medicineLibraryRoutes);
router.use("/dropdown", dropdownRoutes);
router.use("/", dropdownLibraryRoutes);

module.exports = router;