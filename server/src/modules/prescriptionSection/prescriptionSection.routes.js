const express = require('express');
const { 
  createPrescriptionSection,
  getPrescriptionSections,
  getPrescriptionSectionById,
  updatePrescriptionSection,
  deletePrescriptionSection
} = require('./prescriptionSection.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: PrescriptionSection
 *   description: Prescription section management
 */

/**
 * @swagger
 * /api/prescription-section/{doctorId}:
 *   post:
 *     summary: Create a new prescription section
 *     tags: [PrescriptionSection]
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
 *               - label
 *               - fieldType
 *               - sectionType
 *             properties:
 *               label:
 *                 type: string
 *               fieldType:
 *                 type: string
 *               placeholder:
 *                 type: string
 *               sectionType:
 *                 type: string
 *               printable:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Prescription section created successfully
 *       400:
 *         description: Bad request
 *       500:
 *         description: Internal server error
 */
router.post('/:doctorId', createPrescriptionSection);

/**
 * @swagger
 * /api/prescription-section/{doctorId}:
 *   get:
 *     summary: Get all prescription sections for a doctor
 *     tags: [PrescriptionSection]
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
 *         description: Prescription sections retrieved successfully
 *       500:
 *         description: Internal server error
 */
router.get('/:doctorId', getPrescriptionSections);

/**
 * @swagger
 * /api/prescription-section/section/{sectionId}:
 *   get:
 *     summary: Get a specific prescription section by ID
 *     tags: [PrescriptionSection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID
 *     responses:
 *       200:
 *         description: Prescription section retrieved successfully
 *       404:
 *         description: Prescription section not found
 *       500:
 *         description: Internal server error
 */
router.get('/section/:sectionId', getPrescriptionSectionById);

/**
 * @swagger
 * /api/prescription-section/section/{sectionId}:
 *   put:
 *     summary: Update a prescription section
 *     tags: [PrescriptionSection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               label:
 *                 type: string
 *               fieldType:
 *                 type: string
 *               placeholder:
 *                 type: string
 *               sectionType:
 *                 type: string
 *               printable:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Prescription section updated successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Prescription section not found
 *       500:
 *         description: Internal server error
 */
router.put('/section/:sectionId', updatePrescriptionSection);

/**
 * @swagger
 * /api/prescription-section/section/{sectionId}:
 *   delete:
 *     summary: Delete a prescription section
 *     tags: [PrescriptionSection]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID
 *     responses:
 *       200:
 *         description: Prescription section deleted successfully
 *       400:
 *         description: Bad request
 *       404:
 *         description: Prescription section not found
 *       500:
 *         description: Internal server error
 */
router.delete('/section/:sectionId', deletePrescriptionSection);

module.exports = router;