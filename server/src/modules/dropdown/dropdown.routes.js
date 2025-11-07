const express = require('express');
const router = express.Router();
const { 
  createDropdownController,
  getDropdownsController,
  getDropdownByIdController,
  updateDropdownController,
  deleteDropdownController
} = require('./dropdown.controller');

/**
 * @swagger
 * tags:
 *   name: Dropdowns
 *   description: Dropdown management
 */

/**
 * @swagger
 * /api/dropdown/dropdown:
 *   post:
 *     summary: Create a new dropdown
 *     tags: [Dropdowns]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - id
 *               - name
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Option 1
 *     responses:
 *       201:
 *         description: Dropdown created successfully
 *       500:
 *         description: Server error
 */
router.post('/dropdown', createDropdownController);

/**
 * @swagger
 * /api/dropdown/dropdown:
 *   get:
 *     summary: Get all dropdowns
 *     tags: [Dropdowns]
 *     responses:
 *       200:
 *         description: Dropdowns retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/dropdown', getDropdownsController);

/**
 * @swagger
 * /api/dropdown/dropdown/{dropdownId}:
 *   get:
 *     summary: Get dropdown by ID
 *     tags: [Dropdowns]
 *     parameters:
 *       - in: path
 *         name: dropdownId
 *         required: true
 *         schema:
 *           type: string
 *         description: Dropdown ID
 *     responses:
 *       200:
 *         description: Dropdown retrieved successfully
 *       404:
 *         description: Dropdown not found
 *       500:
 *         description: Server error
 */
router.get('/dropdown/:dropdownId', getDropdownByIdController);

/**
 * @swagger
 * /api/dropdown/dropdown/{dropdownId}:
 *   put:
 *     summary: Update a dropdown
 *     tags: [Dropdowns]
 *     parameters:
 *       - in: path
 *         name: dropdownId
 *         required: true
 *         schema:
 *           type: string
 *         description: Dropdown ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id:
 *                 type: number
 *                 example: 1
 *               name:
 *                 type: string
 *                 example: Updated Option 1
 *     responses:
 *       200:
 *         description: Dropdown updated successfully
 *       404:
 *         description: Dropdown not found
 *       500:
 *         description: Server error
 */
router.put('/dropdown/:dropdownId', updateDropdownController);

/**
 * @swagger
 * /api/dropdown/dropdown/{dropdownId}:
 *   delete:
 *     summary: Delete a dropdown
 *     tags: [Dropdowns]
 *     parameters:
 *       - in: path
 *         name: dropdownId
 *         required: true
 *         schema:
 *           type: string
 *         description: Dropdown ID
 *     responses:
 *       200:
 *         description: Dropdown deleted successfully
 *       404:
 *         description: Dropdown not found
 *       500:
 *         description: Server error
 */
router.delete('/dropdown/:dropdownId', deleteDropdownController);

module.exports = router;