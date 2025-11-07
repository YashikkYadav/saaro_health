const express = require('express');
const { 
  bookAppointment,
  createAppointmentForDoctor,
  getUpcomingAppointmentsForDoctor,
  getLatestAppointmentForPatient,
  getAppointmentsForPatient,
  updateAppointmentStatus,
  updateAppointment,
  getAppointment,
  deleteAppointmentController,
  getSharedBookings,
  getLocations,
  getDates,
  getTimeSlots
} = require('./appointment.controller');

// Import validation schemas
const {
  bookAppointmentSchema,
  createAppointmentSchema,
  updateAppointmentStatusSchema,
  updateAppointmentSchema,
} = require('./appointment.validation');

// Import validation middleware
const { validate } = require('../../middlewares/validation.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Appointments
 *   description: Appointment management
 */

/**
 * @swagger
 * /api/appointments/{doctorId}/book-appointment:
 *   post:
 *     summary: Book an appointment for a doctor
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - date
 *               - time
 *               - location
 *               - type
 *               - mode
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Appointment date and time
 *               time:
 *                 type: string
 *                 description: Appointment time
 *               location:
 *                 type: string
 *                 description: Appointment location
 *               type:
 *                 type: string
 *                 description: Appointment type
 *               mode:
 *                 type: string
 *                 enum: [Online, Offline]
 *                 description: Appointment mode
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *               fees:
 *                 type: number
 *                 description: Appointment fees
 *               reason:
 *                 type: string
 *                 description: Appointment reason
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Patient email
 *               source:
 *                 type: string
 *                 enum: [manual, public_booking, qr_code, whatsapp]
 *                 description: Appointment source
 *     responses:
 *       201:
 *         description: Appointment booked successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// POST /:doctorId/book-appointment - Book an appointment for a doctor
router.post('/:doctorId/book-appointment', validate(bookAppointmentSchema), bookAppointment);

/**
 * @swagger
 * /api/appointments/{doctorId}:
 *   post:
 *     summary: Create an appointment for a doctor (admin/doctor)
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - patientId
 *               - date
 *               - time
 *               - location
 *               - type
 *               - mode
 *             properties:
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *               date:
 *                 type: string
 *                 format: date-time
 *                 description: Appointment date and time
 *               time:
 *                 type: string
 *                 description: Appointment time
 *               location:
 *                 type: string
 *                 description: Appointment location
 *               type:
 *                 type: string
 *                 description: Appointment type
 *               mode:
 *                 type: string
 *                 enum: [Online, Offline]
 *                 description: Appointment mode
 *               notes:
 *                 type: string
 *                 description: Additional notes
 *               fees:
 *                 type: number
 *                 description: Appointment fees
 *               status:
 *                 type: string
 *                 description: Appointment status
 *               reason:
 *                 type: string
 *                 description: Appointment reason
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Patient email
 *               source:
 *                 type: string
 *                 enum: [manual, public_booking, qr_code, whatsapp]
 *                 description: Appointment source
 *     responses:
 *       201:
 *         description: Appointment created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// POST /:doctorId - Create an appointment for a doctor (admin/doctor)
router.post('/:doctorId',validate(createAppointmentSchema), createAppointmentForDoctor);

/**
 * @swagger
 * /api/appointments/{doctorId}/get-upcoming-appointments:
 *   get:
 *     summary: Get upcoming appointments for a doctor
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Upcoming appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:doctorId/get-upcoming-appointments - Get upcoming appointments for a doctor
router.get('/:doctorId/get-upcoming-appointments', getUpcomingAppointmentsForDoctor);

/**
 * @swagger
 * /api/appointments/{patientId}/latest:
 *   get:
 *     summary: Get latest appointment for a patient
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Latest appointment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:patientId/latest - Get latest appointment for a patient
router.get('/:patientId/latest', getLatestAppointmentForPatient);

/**
 * @swagger
 * /api/appointments/{patientId}:
 *   get:
 *     summary: Get all appointments for a patient
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     responses:
 *       200:
 *         description: Appointments retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:patientId - Get all appointments for a patient (with query validation)
router.get('/:patientId',  getAppointmentsForPatient);

/**
 * @swagger
 * /api/appointments/update-status:
 *   patch:
 *     summary: Update appointment status
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - appointmentId
 *               - status
 *             properties:
 *               appointmentId:
 *                 type: string
 *                 description: Appointment ID
 *               status:
 *                 type: string
 *                 description: New appointment status
 *     responses:
 *       200:
 *         description: Appointment status updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// PATCH /update-status - Update appointment status
router.patch('/update-status', validate(updateAppointmentStatusSchema), updateAppointmentStatus);

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   patch:
 *     summary: Update appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               date:
 *                 type: string
 *                 format: date-time
 *               time:
 *                 type: string
 *               location:
 *                 type: string
 *               notes:
 *                 type: string
 *               fees:
 *                 type: number
 *               status:
 *                 type: string
 *               reason:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               source:
 *                 type: string
 *                 enum: [manual, public_booking, qr_code, whatsapp]
 *               type:
 *                 type: string
 *               mode:
 *                 type: string
 *                 enum: [Online, Offline]
 *     responses:
 *       200:
 *         description: Appointment updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       400:
 *         description: Bad request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// PATCH /:appointmentId - Update appointment
router.patch('/:appointmentId', validate(updateAppointmentSchema), updateAppointment);

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   get:
 *     summary: Get appointment by ID
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointment:
 *                   $ref: '#/components/schemas/Appointment'
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:appointmentId - Get appointment by ID
router.get('/:appointmentId', getAppointment);

/**
 * @swagger
 * /api/appointments/{appointmentId}:
 *   delete:
 *     summary: Delete appointment
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: appointmentId
 *         required: true
 *         schema:
 *           type: string
 *         description: Appointment ID
 *     responses:
 *       200:
 *         description: Appointment deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *       404:
 *         description: Appointment not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// DELETE /:appointmentId - Delete appointment
router.delete('/:appointmentId', deleteAppointmentController);

/**
 * @swagger
 * /api/appointments/{doctorId}/locations:
 *   get:
 *     summary: Get appointment locations for a doctor
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Locations retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 locations:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       name:
 *                         type: string
 *                       address:
 *                         type: string
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:doctorId/locations - Get appointment locations for a doctor
router.get('/:doctorId/locations', getLocations);

/**
 * @swagger
 * /api/appointments/{doctorId}/dates:
 *   get:
 *     summary: Get appointment dates for a doctor
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Dates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 dates:
 *                   type: array
 *                   items:
 *                     type: string
 *                     format: date
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:doctorId/dates - Get appointment dates for a doctor
router.get('/:doctorId/dates', getDates);

/**
 * @swagger
 * /api/appointments/{doctorId}/location/{locationName}/date/{date}:
 *   get:
 *     summary: Get appointment time slots for a doctor at a location on a specific date
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: locationName
 *         required: true
 *         schema:
 *           type: string
 *         description: Location name
 *       - in: path
 *         name: date
 *         required: true
 *         schema:
 *           type: string
 *           format: date
 *         description: Date (YYYY-MM-DD)
 *     responses:
 *       200:
 *         description: Time slots retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 timeSlots:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       time:
 *                         type: string
 *                       isBooked:
 *                         type: boolean
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:doctorId/location/:locationName/date/:date - Get appointment time slots for a doctor at a location on a specific date
router.get('/:doctorId/location/:locationName/date/:date', getTimeSlots);

/**
 * @swagger
 * /api/appointments/{doctorId}/shared-bookings:
 *   get:
 *     summary: Get shared bookings for a doctor
 *     tags: [Appointments]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Shared bookings retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 appointments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Appointment'
 *       500:
 *         description: Internal server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 */

// GET /:doctorId/shared-bookings - Get shared bookings for a doctor
router.get('/:doctorId/shared-bookings', getSharedBookings);

module.exports = router;