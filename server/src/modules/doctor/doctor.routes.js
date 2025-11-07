const express = require('express');
const { 
  register, 
  login, 
  logout, 
  getFirst, 
  getDoctor, 
  changePasswordController, 
  updateProfileController, 
  deleteDoctorController, 
  getDoctors,
  getDoctorsByCityOrSpecialtyController,
  getAvailableDatesController,
  uploadAvatarController
} = require('./doctor.controller');

// Import multer config
const { upload, processImage } = require('./multer.config');

// Import validation
const { registerDoctorSchema, loginDoctorSchema, updateProfileSchema, changePasswordSchema } = require('./doctor.validation');
const { validate } = require('../../middlewares/validation.middleware');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Doctors
 *   description: Doctor management and authentication
 */

/**
 * @swagger
 * /api/doctors:
 *   post:
 *     summary: Register a new doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *               - rmcNumber
 *               - phoneNumber
 *               - city
 *             properties:
 *               name:
 *                 type: string
 *                 description: Doctor's full name
 *               email:
 *                 type: string
 *                 format: email
 *                 description: Doctor's email address
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Doctor's password
 *               rmcNumber:
 *                 type: string
 *                 description: Doctor's registration number
 *               phoneNumber:
 *                 type: string
 *                 description: Doctor's phone number
 *               city:
 *                 type: string
 *                 description: Doctor's city
 *               address:
 *                 type: string
 *                 description: Doctor's address
 *               clinicName:
 *                 type: string
 *                 description: Doctor's clinic name
 *     responses:
 *       201:
 *         description: Doctor registered successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *                 token:
 *                   type: string
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

// POST / - Register a new doctor
router.post('/', validate(registerDoctorSchema), register);

/**
 * @swagger
 * /api/doctors/access-token:
 *   post:
 *     summary: Login a doctor
 *     tags: [Doctors]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - identifier
 *               - password
 *             properties:
 *               identifier:
 *                 type: string
 *                 description: Doctor's email or phone number
 *               password:
 *                 type: string
 *                 format: password
 *                 description: Doctor's password
 *     responses:
 *       200:
 *         description: Doctor logged in successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *                 token:
 *                   type: string
 *       401:
 *         description: Unauthorized
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

// POST /access-token - Login doctor
router.post('/access-token', validate(loginDoctorSchema), login);

/**
 * @swagger
 * /api/doctors/logout:
 *   post:
 *     summary: Logout a doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Logged out successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
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

// POST /logout - Logout doctor
// no need of this lol
router.post('/logout', logout);

/**
 * @swagger
 * /api/doctors/first:
 *   get:
 *     summary: Get first doctor (for initialization)
 *     tags: [Doctors]
 *     responses:
 *       200:
 *         description: First doctor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
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

// GET /first - Get first doctor (for initialization)
router.get('/first', getFirst);

/**
 * @swagger
 * /api/doctors/{doctorId}:
 *   get:
 *     summary: Get doctor by ID
 *     tags: [Doctors]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Doctor retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
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

// GET /:doctorId - Get doctor info
router.get('/:doctorId', getDoctor);

/**
 * @swagger
 * /api/doctors/{doctorId}/change-password:
 *   put:
 *     summary: Change doctor password
 *     tags: [Doctors]
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
 *               - currentPassword
 *               - newPassword
 *             properties:
 *               currentPassword:
 *                 type: string
 *                 format: password
 *                 description: Current password
 *               newPassword:
 *                 type: string
 *                 format: password
 *                 description: New password
 *     responses:
 *       200:
 *         description: Password changed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
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

// PUT /:doctorId/change-password - Change password
router.put('/:doctorId/change-password', validate(changePasswordSchema), changePasswordController);

/**
 * @swagger
 * /api/doctors/{doctorId}/profile:
 *   put:
 *     summary: Update doctor profile
 *     tags: [Doctors]
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
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *                 format: email
 *               phoneNumber:
 *                 type: string
 *               city:
 *                 type: string
 *               address:
 *                 type: string
 *               clinicName:
 *                 type: string
 *               experience:
 *                 type: string
 *               education:
 *                 type: string
 *               bio:
 *                 type: string
 *               avatar:
 *                 type: string
 *               introduction:
 *                 type: string
 *               happyClients:
 *                 type: number
 *               about:
 *                 type: string
 *               qualification:
 *                 type: string
 *               gender:
 *                 type: string
 *               cashlessAvailable:
 *                 type: boolean
 *               rating:
 *                 type: string
 *               clinicAddress:
 *                 type: array
 *                 items:
 *                   type: string
 *               availableDates:
 *                 type: array
 *                 items:
 *                   type: string
 *               awards:
 *                 type: array
 *                 items:
 *                   type: string
 *               specialization:
 *                 type: string
 *               surgeries:
 *                 type: array
 *                 items:
 *                   type: string
 *               opdLocations:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     clinicName:
 *                       type: string
 *                     city:
 *                       type: string
 *                     address:
 *                       type: string
 *                     days:
 *                       type: object
 *                       properties:
 *                         Mon:
 *                           type: boolean
 *                         Tue:
 *                           type: boolean
 *                         Wed:
 *                           type: boolean
 *                         Thu:
 *                           type: boolean
 *                         Fri:
 *                           type: boolean
 *                         Sat:
 *                           type: boolean
 *                         Sun:
 *                           type: boolean
 *                     startTime:
 *                       type: string
 *                       format: time
 *                     endTime:
 *                       type: string
 *                       format: time
 *                     slotMins:
 *                       type: number
 *                     active:
 *                       type: boolean
 *                     mapLocation:
 *                       type: object
 *                       properties:
 *                         lat:
 *                           type: number
 *                         lng:
 *                           type: number
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
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

// PUT /:doctorId/profile - Update profile
// Support both JSON and multipart/form-data for avatar upload
router.put('/:doctorId/profile', 
  upload.single('avatar'), 
  processImage,
  (req, res, next) => {
    // For multipart/form-data requests with complex data
    if (req.file && req.body.data) {
      try {
        req.body = JSON.parse(req.body.data);
      } catch (parseError) {
        return apiResponse.error(res, 'Invalid data format', 400);
      }
    }
    next();
  },
  validate(updateProfileSchema), 
  updateProfileController
);

/**
 * @swagger
 * /api/doctors/{doctorId}/profile:
 *   get:
 *     summary: Get doctor profile
 *     tags: [Doctors]
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
 *         description: Doctor profile retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctor:
 *                   $ref: '#/components/schemas/Doctor'
 *       404:
 *         description: Doctor not found
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

// GET /:doctorId/profile - Get doctor info with authentication
router.get('/:doctorId/profile', getDoctor);

/**
 * @swagger
 * /api/doctors/{doctorId}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Doctors]
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
 *         description: Doctor deleted successfully
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
 *         description: Doctor not found
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

// DELETE /:doctorId - Delete doctor
router.delete('/:doctorId', deleteDoctorController);

// routes for web 

/**
 * @swagger
 * /api/doctors:
 *   get:
 *     summary: Get all doctors
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
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

// GET / - Get all doctors
router.get('/', getDoctors);

/**
 * @swagger
 * /api/doctors/search:
 *   post:
 *     summary: Search doctors by city or specialty
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               city:
 *                 type: string
 *                 description: City to search for
 *               specialty:
 *                 type: string
 *                 description: Specialty to search for
 *     responses:
 *       200:
 *         description: Doctors retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 doctors:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Doctor'
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

// POST /search - Search doctors by city or specialty (from request body)
router.post('/search', getDoctorsByCityOrSpecialtyController);

/**
 * @swagger
 * /api/doctors/available-dates:
 *   post:
 *     summary: Get available dates for a doctor
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - doctorId
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: Doctor ID
 *     responses:
 *       200:
 *         description: Available dates retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 availableDates:
 *                   type: array
 *                   items:
 *                     type: string
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

// POST /available-dates - Get available dates for a doctor
router.post('/available-dates', getAvailableDatesController);

/**
 * @swagger
 * /api/doctors/avatar:
 *   post:
 *     summary: Upload doctor avatar
 *     tags: [Doctors]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               avatar:
 *                 type: string
 *                 format: binary
 *     responses:
 *       200:
 *         description: Avatar uploaded successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 avatarUrl:
 *                   type: string
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

// POST /avatar - Upload avatar
router.post('/avatar', upload.single('avatar'), processImage, uploadAvatarController);

/**
 * @swagger
 * /api/doctors/{doctorId}:
 *   delete:
 *     summary: Delete a doctor
 *     tags: [Doctors]
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
 *         description: Doctor deleted successfully
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
 *         description: Doctor not found
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

module.exports = router;