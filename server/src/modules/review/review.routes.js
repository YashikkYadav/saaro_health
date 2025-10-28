const express = require('express');
const { 
  createReviewController,
  getReviewsByDoctorIdController,
  getReviewsByPatientIdController,
  getAverageRatingByDoctorIdController
} = require('./review.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Reviews
 *   description: Review management
 */

/**
 * @swagger
 * /api/reviews:
 *   post:
 *     summary: Create a new review
 *     tags: [Reviews]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - text
 *               - rating
 *               - doctorId
 *               - patientId
 *             properties:
 *               text:
 *                 type: string
 *                 description: Review text
 *               rating:
 *                 type: number
 *                 description: Rating out of 5
 *                 minimum: 1
 *                 maximum: 5
 *               doctorId:
 *                 type: string
 *                 description: Doctor ID
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *     responses:
 *       200:
 *         description: Review created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 review:
 *                   $ref: '#/components/schemas/Review'
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

// POST /api/reviews - Create a new review
router.post('/', createReviewController);

/**
 * @swagger
 * /api/reviews/doctor/{doctorId}:
 *   get:
 *     summary: Get reviews by doctor ID
 *     tags: [Reviews]
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
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
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

// GET /api/reviews/doctor/:doctorId - Get reviews by doctor ID
router.get('/doctor/:doctorId', getReviewsByDoctorIdController);

/**
 * @swagger
 * /api/reviews/patient/{patientId}:
 *   get:
 *     summary: Get reviews by patient ID
 *     tags: [Reviews]
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
 *         description: Reviews retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 reviews:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Review'
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

// GET /api/reviews/patient/:patientId - Get reviews by patient ID
router.get('/patient/:patientId', getReviewsByPatientIdController);

/**
 * @swagger
 * /api/reviews/doctor/{doctorId}/average:
 *   get:
 *     summary: Get average rating for a doctor
 *     tags: [Reviews]
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
 *         description: Average rating retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 averageRating:
 *                   type: object
 *                   properties:
 *                     averageRating:
 *                       type: number
 *                     totalReviews:
 *                       type: number
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

// GET /api/reviews/doctor/:doctorId/average - Get average rating for a doctor
router.get('/doctor/:doctorId/average', getAverageRatingByDoctorIdController);

module.exports = router;