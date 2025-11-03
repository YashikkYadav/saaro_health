const express = require('express');
const router = express.Router();
const { 
  createTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate
} = require('./templateLibrary.controller');

/**
 * @swagger
 * /api/templates/{doctorId}/template:
 *   post:
 *     summary: Create a new template
 *     tags: [Templates]
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
 *               - type
 *               - items
 *               - creator
 *             properties:
 *               name:
 *                 type: string
 *                 example: Common Cold Advice
 *               type:
 *                 type: string
 *                 example: Advice
 *               items:
 *                 type: string
 *                 example: Rest well and drink plenty of fluids.
 *               creator:
 *                 type: string
 *                 example: Dr. Smith
 *     responses:
 *       201:
 *         description: Template created successfully
 *       400:
 *         description: Validation error
 *       500:
 *         description: Server error
 */
router.post('/:doctorId/template', createTemplate);

/**
 * @swagger
 * /api/templates/{doctorId}/template:
 *   get:
 *     summary: Get all templates for a doctor
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Templates fetched successfully
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/template', getTemplates);

/**
 * @swagger
 * /api/templates/{doctorId}/template/{templateId}:
 *   put:
 *     summary: Update a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: templateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Template ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - type
 *               - items
 *               - creator
 *             properties:
 *               name:
 *                 type: string
 *                 example: Updated Cold Advice
 *               type:
 *                 type: string
 *                 example: Advice
 *               items:
 *                 type: string
 *                 example: Rest well, drink fluids, and take prescribed medications.
 *               creator:
 *                 type: string
 *                 example: Dr. Smith
 *     responses:
 *       200:
 *         description: Template updated successfully
 *       400:
 *         description: Validation error
 *       404:
 *         description: Template not found
 *       500:
 *         description: Server error
 */
router.put('/:doctorId/template/:templateId', updateTemplate);

/**
 * @swagger
 * /api/templates/{doctorId}/template/{templateId}:
 *   delete:
 *     summary: Delete a template
 *     tags: [Templates]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: templateId
 *         required: true
 *         schema:
 *           type: string
 *         description: Template ID
 *     responses:
 *       200:
 *         description: Template deleted successfully
 *       404:
 *         description: Template not found
 *       500:
 *         description: Server error
 */
router.delete('/:doctorId/template/:templateId', deleteTemplate);

module.exports = router;