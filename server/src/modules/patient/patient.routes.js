const express = require('express');
const { 
  register,
  checkExists,
  getAll,
  getPatient,
  getPatientByUidController,
  update,
  deletePatientController
} = require('./patient.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Patients
 *   description: Patient management
 */

/**
 * @swagger
 * /api/patients:
 *   post:
 *     summary: Register a new patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - uid
 *               - title
 *               - fullName
 *               - phoneNumber
 *               - dateOfBirth
 *               - age
 *               - gender
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: Doctor ID to associate with the patient
 *               uid:
 *                 type: string
 *                 description: Patient unique ID
 *               title:
 *                 type: string
 *                 description: Patient title (Mr., Mrs., etc.)
 *               fullName:
 *                 type: string
 *                 description: Patient full name
 *               phoneNumber:
 *                 type: number
 *                 description: Patient phone number
 *               spouseName:
 *                 type: string
 *                 description: Patient spouse name
 *               alternatePhoneNumber:
 *                 type: number
 *                 description: Patient alternate phone number
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *                 description: Patient date of birth
 *               age:
 *                 type: number
 *                 description: Patient age
 *               gender:
 *                 type: string
 *                 description: Patient gender
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Patient email
 *               address:
 *                 type: string
 *                 description: Patient address
 *               bloodGroup:
 *                 type: string
 *                 description: Patient blood group
 *               allergies:
 *                 type: string
 *                 description: Patient allergies
 *               tags:
 *                 type: string
 *                 description: Patient tags
 *               referredBy:
 *                 type: string
 *                 description: How the patient was referred
 *               category:
 *                 type: string
 *                 description: Patient category
 *     responses:
 *       201:
 *         description: Patient registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
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

// Register new patient
// POST /patient
router.post('/', register);

/**
 * @swagger
 * /api/patients/check:
 *   post:
 *     summary: Check if patient exists
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - phone
 *             properties:
 *               phone:
 *                 type: string
 *                 description: Patient phone number to check
 *     responses:
 *       200:
 *         description: Patient check completed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 exists:
 *                   type: boolean
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
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

// Check if patient exists
// POST /patient/check
router.post('/check', checkExists);

/**
 * @swagger
 * /api/patients/get-all:
 *   post:
 *     summary: Get all patients with pagination and search
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               page:
 *                 type: number
 *                 description: Page number
 *               limit:
 *                 type: number
 *                 description: Number of items per page
 *               searchQuery:
 *                 type: string
 *                 description: Search query
 *     responses:
 *       200:
 *         description: Patients retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 patients:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Patient'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: number
 *                     totalPages:
 *                       type: number
 *                     totalPatients:
 *                       type: number
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

// Get all patients with pagination and search
// POST /patient/get-all
router.post('/get-all', getAll);

/**
 * @swagger
 * /api/patients/{patientId}:
 *   get:
 *     summary: Get patient by ID
 *     tags: [Patients]
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
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
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

// Get patient by ID
// GET /patient/:patientId
router.get('/:patientId', getPatient);

/**
 * @swagger
 * /api/patients/uid/{uid}:
 *   get:
 *     summary: Get patient by UID
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: uid
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient UID
 *     responses:
 *       200:
 *         description: Patient retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
 *       404:
 *         description: Patient not found
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

// Get patient by UID
// GET /patient/uid/:uid
router.get('/uid/:uid', getPatientByUidController);

/**
 * @swagger
 * /api/patients/{patientId}:
 *   put:
 *     summary: Update patient
 *     tags: [Patients]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: patientId
 *         required: true
 *         schema:
 *           type: string
 *         description: Patient ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               fullName:
 *                 type: string
 *               phoneNumber:
 *                 type: number
 *               spouseName:
 *                 type: string
 *               alternatePhoneNumber:
 *                 type: number
 *               dateOfBirth:
 *                 type: string
 *                 format: date
 *               age:
 *                 type: number
 *               gender:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               address:
 *                 type: string
 *               bloodGroup:
 *                 type: string
 *               allergies:
 *                 type: string
 *               tags:
 *                 type: string
 *               referredBy:
 *                 type: string
 *               category:
 *                 type: string
 *     responses:
 *       200:
 *         description: Patient updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 patient:
 *                   $ref: '#/components/schemas/Patient'
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

// Update patient
// PUT /patient/:patientId
router.put('/:patientId', update);

/**
 * @swagger
 * /api/patients/{patientId}:
 *   delete:
 *     summary: Delete patient
 *     tags: [Patients]
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
 *         description: Patient deleted successfully
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
 *         description: Patient not found
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

// Delete patient
// DELETE /patient/:patientId
router.delete('/:patientId', deletePatientController);

module.exports = router;