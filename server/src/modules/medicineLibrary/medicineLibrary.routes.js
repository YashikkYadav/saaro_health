const express = require('express');
const router = express.Router();
const { 
  createMedicineController,
  getMedicinesController,
  getMedicineByIdController,
  updateMedicineController,
  deleteMedicineController,
  searchMedicinesController
} = require('./medicineLibrary.controller');

/**
 * @swagger
 * /api/medicines/{doctorId}/medicine:
 *   post:
 *     summary: Create a new medicine
 *     tags: [Medicines]
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
 *               - name
 *               - composition
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paracetamol
 *               composition:
 *                 type: string
 *                 example: C8H9NO2
 *               frequency:
 *                 type: string
 *                 example: Once daily
 *               dosage:
 *                 type: string
 *                 example: 500mg
 *               notes:
 *                 type: string
 *                 example: Take after food
 *               createdBy:
 *                 type: string
 *                 example: Dr. Smith
 *     responses:
 *       201:
 *         description: Medicine created successfully
 *       500:
 *         description: Server error
 */
router.post('/:doctorId/medicine', createMedicineController);

/**
 * @swagger
 * /api/medicines/{doctorId}/medicine:
 *   get:
 *     summary: Get all medicines for a doctor
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Medicines retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/medicine', getMedicinesController);

/**
 * @swagger
 * /api/medicines/{doctorId}/medicine/{medicineId}:
 *   get:
 *     summary: Get medicine by ID
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: string
 *         description: Medicine ID
 *     responses:
 *       200:
 *         description: Medicine retrieved successfully
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/medicine/:medicineId', getMedicineByIdController);

/**
 * @swagger
 * /api/medicines/{doctorId}/medicine/{medicineId}:
 *   put:
 *     summary: Update a medicine
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: string
 *         description: Medicine ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: Paracetamol
 *               composition:
 *                 type: string
 *                 example: C8H9NO2
 *               frequency:
 *                 type: string
 *                 example: Once daily
 *               dosage:
 *                 type: string
 *                 example: 500mg
 *               notes:
 *                 type: string
 *                 example: Take after food
 *               createdBy:
 *                 type: string
 *                 example: Dr. Smith
 *     responses:
 *       200:
 *         description: Medicine updated successfully
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Server error
 */
router.put('/:doctorId/medicine/:medicineId', updateMedicineController);

/**
 * @swagger
 * /api/medicines/{doctorId}/medicine/{medicineId}:
 *   delete:
 *     summary: Delete a medicine
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: medicineId
 *         required: true
 *         schema:
 *           type: string
 *         description: Medicine ID
 *     responses:
 *       200:
 *         description: Medicine deleted successfully
 *       404:
 *         description: Medicine not found
 *       500:
 *         description: Server error
 */
router.delete('/:doctorId/medicine/:medicineId', deleteMedicineController);

/**
 * @swagger
 * /api/medicines/{doctorId}/medicine/search:
 *   get:
 *     summary: Search medicines by name
 *     tags: [Medicines]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: query
 *         name: searchTerm
 *         required: true
 *         schema:
 *           type: string
 *         description: Search term
 *     responses:
 *       200:
 *         description: Medicines retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/medicine/search', searchMedicinesController);

module.exports = router;