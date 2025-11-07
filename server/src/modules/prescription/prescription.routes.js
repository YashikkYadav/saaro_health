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
 *             type: object
 *             properties:
 *               doctorId:
 *                 type: string
 *                 description: Doctor ID
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *               vitals:
 *                 type: object
 *                 properties:
 *                   bloodPressure:
 *                     type: string
 *                   pulse:
 *                     type: string
 *                   height:
 *                     type: string
 *                   weight:
 *                     type: string
 *                   temperature:
 *                     type: string
 *                   painScore:
 *                     type: string
 *                   oxygenSaturation:
 *                     type: string
 *                   respiratoryRate:
 *                     type: string
 *               complaints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     id:
 *                       type: string
 *               pastHistory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               surgicalHistory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               drugAllergy:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               physicalExamination:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     id:
 *                       type: string
 *               diagnosis:
 *                 type: object
 *                 properties:
 *                   provisional:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: string
 *                         id:
 *                           type: string
 *                   final:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: string
 *                         id:
 *                           type: string
 *               tests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               medication:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     dosage:
 *                       type: string
 *                     frequency:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     notes:
 *                       type: string
 *                     id:
 *                       type: string
 *               advice:
 *                 type: string
 *               followUp:
 *                 type: array
 *                 items:
 *                   type: string
 *               customSections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     heading:
 *                       type: string
 *                     fields:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           type:
 *                             type: string
 *                           required:
 *                             type: boolean
 *                           values:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 value:
 *                                   type: string
 *                                 id:
 *                                   type: string
 *               consultationType:
 *                 type: string
 *                 enum: [general, followup, emergency, specialty]
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, complete, archived]
 *               consultationDate:
 *                 type: string
 *                 format: date-time
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
 *               doctorId:
 *                 type: string
 *                 description: Doctor ID
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *               vitals:
 *                 type: object
 *                 properties:
 *                   bloodPressure:
 *                     type: string
 *                   pulse:
 *                     type: string
 *                   height:
 *                     type: string
 *                   weight:
 *                     type: string
 *                   temperature:
 *                     type: string
 *                   painScore:
 *                     type: string
 *                   oxygenSaturation:
 *                     type: string
 *                   respiratoryRate:
 *                     type: string
 *               complaints:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     id:
 *                       type: string
 *               pastHistory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               surgicalHistory:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               drugAllergy:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               physicalExamination:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     text:
 *                       type: string
 *                     id:
 *                       type: string
 *               diagnosis:
 *                 type: object
 *                 properties:
 *                   provisional:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: string
 *                         id:
 *                           type: string
 *                   final:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         value:
 *                           type: string
 *                         id:
 *                           type: string
 *               tests:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     value:
 *                       type: string
 *                     id:
 *                       type: string
 *               medication:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     dosage:
 *                       type: string
 *                     frequency:
 *                       type: string
 *                     duration:
 *                       type: string
 *                     notes:
 *                       type: string
 *                     id:
 *                       type: string
 *               advice:
 *                 type: string
 *               followUp:
 *                 type: array
 *                 items:
 *                   type: string
 *               customSections:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     heading:
 *                       type: string
 *                     fields:
 *                       type: array
 *                       items:
 *                         type: object
 *                         properties:
 *                           label:
 *                             type: string
 *                           type:
 *                             type: string
 *                           required:
 *                             type: boolean
 *                           values:
 *                             type: array
 *                             items:
 *                               type: object
 *                               properties:
 *                                 value:
 *                                   type: string
 *                                 id:
 *                                   type: string
 *               consultationType:
 *                 type: string
 *                 enum: [general, followup, emergency, specialty]
 *               notes:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [draft, complete, archived]
 *               consultationDate:
 *                 type: string
 *                 format: date-time
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