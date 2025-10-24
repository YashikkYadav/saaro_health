const express = require('express');
const router = express.Router();
const { 
  createPrescription,
  endConsultation,
  savePastVisit,
  getPrescriptionsByPatient,
  getDraftPrescription,
  getConsultationHistory
} = require('./prescription.controller');

/**
 * @swagger
 * /prescriptions/{doctorId}/prescription/{patientId}:
 *   post:
 *     summary: Create or update a prescription draft
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePrescriptionRequest'
 *     responses:
 *       201:
 *         description: Prescription draft created/updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrescriptionResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:doctorId/prescription/:patientId', createPrescription);

/**
 * @swagger
 * /prescriptions/{doctorId}/prescription/{patientId}/end-consultation:
 *   post:
 *     summary: End consultation and finalize prescription
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/CreatePrescriptionRequest'
 *     responses:
 *       200:
 *         description: Consultation ended and prescription finalized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prescription:
 *                   $ref: '#/components/schemas/Prescription'
 *                 pdfPath:
 *                   type: string
 *                   description: Path to generated PDF
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:doctorId/prescription/:patientId/end-consultation', endConsultation);

/**
 * @swagger
 * /prescriptions/{doctorId}/prescription/{patientId}/save-past-visit:
 *   post:
 *     summary: Save consultation as past visit
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               diagnosis:
 *                 type: string
 *               symptoms:
 *                 type: array
 *                 items:
 *                   type: string
 *               medicines:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     dosage:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     instructions:
 *                       type: string
 *               tests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     instructions:
 *                       type: string
 *               advices:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *               followUpDate:
 *                 type: string
 *                 format: date
 *               notes:
 *                 type: string
 *               visitDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Consultation saved as past visit
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 prescription:
 *                   $ref: '#/components/schemas/Prescription'
 *                 message:
 *                   type: string
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:doctorId/prescription/:patientId/save-past-visit', savePastVisit);

/**
 * @swagger
 * /prescriptions/{doctorId}/prescription/{patientId}:
 *   get:
 *     summary: Get prescriptions by patient ID
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Prescriptions retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PrescriptionsResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/:doctorId/prescription/:patientId', getPrescriptionsByPatient);

/**
 * @swagger
 * /prescriptions/{doctorId}/prescription/{patientId}/draft:
 *   get:
 *     summary: Get draft prescription for patient
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Draft prescription retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 prescription:
 *                   $ref: '#/components/schemas/Prescription'
 *                 message:
 *                   type: string
 *       404:
 *         description: No draft prescription found
 *       500:
 *         description: Internal server error
 */
router.get('/:doctorId/prescription/:patientId/draft', getDraftPrescription);

/**
 * @swagger
 * /prescriptions/{doctorId}/prescription/{patientId}/history:
 *   get:
 *     summary: Get patient consultation history
 *     tags: [Prescriptions]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         description: Doctor ID
 *         schema:
 *           type: string
 *       - in: path
 *         name: patientId
 *         required: true
 *         description: Patient ID
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Consultation history retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ConsultationHistoryResponse'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.get('/:doctorId/prescription/:patientId/history', getConsultationHistory);

module.exports = router;