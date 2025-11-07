const express = require('express');
const router = express.Router();
const { 
  createDropdownLibraryItemController,
  getDropdownLibraryItemsController,
  getDropdownLibraryItemsGroupedController,
  getDropdownLibraryItemsBySectionController,
  getDropdownLibraryItemByIdController,
  updateDropdownLibraryItemController,
  deleteDropdownLibraryItemController
} = require('./dropdownLibrary.controller');

/**
 * @swagger
 * tags:
 *   name: DropdownLibrary
 *   description: Dropdown library management
 */

/**
 * @swagger
 * /api/{doctorId}/dropdown:
 *   post:
 *     summary: Create a new dropdown library item
 *     tags: [DropdownLibrary]
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
 *               - sectionId
 *               - sectionName
 *               - name
 *             properties:
 *               sectionId:
 *                 type: string
 *                 example: complaints
 *               sectionName:
 *                 type: string
 *                 example: Chief Complaints
 *               name:
 *                 type: string
 *                 example: Headache
 *               creator:
 *                 type: string
 *                 example: Dr. John Doe
 *     responses:
 *       201:
 *         description: Dropdown library item created successfully
 *       500:
 *         description: Server error
 */
router.post('/:doctorId/dropdown', createDropdownLibraryItemController);

/**
 * @swagger
 * /api/{doctorId}/dropdown:
 *   get:
 *     summary: Get all dropdown library items for a doctor
 *     tags: [DropdownLibrary]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Dropdown library items retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/dropdown', getDropdownLibraryItemsController);

/**
 * @swagger
 * /api/{doctorId}/dropdown/grouped:
 *   get:
 *     summary: Get all dropdown library items grouped by section
 *     tags: [DropdownLibrary]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *     responses:
 *       200:
 *         description: Dropdown library items retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/dropdown/grouped', getDropdownLibraryItemsGroupedController);

/**
 * @swagger
 * /api/{doctorId}/dropdown/section/{sectionId}:
 *   get:
 *     summary: Get dropdown library items by section ID
 *     tags: [DropdownLibrary]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: sectionId
 *         required: true
 *         schema:
 *           type: string
 *         description: Section ID
 *     responses:
 *       200:
 *         description: Dropdown library items retrieved successfully
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/dropdown/section/:sectionId', getDropdownLibraryItemsBySectionController);

/**
 * @swagger
 * /api/{doctorId}/dropdown/{dropdownId}:
 *   get:
 *     summary: Get dropdown library item by ID
 *     tags: [DropdownLibrary]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: dropdownId
 *         required: true
 *         schema:
 *           type: string
 *         description: Dropdown Library Item ID
 *     responses:
 *       200:
 *         description: Dropdown library item retrieved successfully
 *       404:
 *         description: Dropdown library item not found
 *       500:
 *         description: Server error
 */
router.get('/:doctorId/dropdown/:dropdownId', getDropdownLibraryItemByIdController);

/**
 * @swagger
 * /api/{doctorId}/dropdown/{dropdownId}:
 *   put:
 *     summary: Update a dropdown library item
 *     tags: [DropdownLibrary]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: dropdownId
 *         required: true
 *         schema:
 *           type: string
 *         description: Dropdown Library Item ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               sectionId:
 *                 type: string
 *                 example: complaints
 *               sectionName:
 *                 type: string
 *                 example: Chief Complaints
 *               name:
 *                 type: string
 *                 example: Severe Headache
 *               creator:
 *                 type: string
 *                 example: Dr. John Doe
 *     responses:
 *       200:
 *         description: Dropdown library item updated successfully
 *       404:
 *         description: Dropdown library item not found
 *       500:
 *         description: Server error
 */
router.put('/:doctorId/dropdown/:dropdownId', updateDropdownLibraryItemController);

/**
 * @swagger
 * /api/{doctorId}/dropdown/{dropdownId}:
 *   delete:
 *     summary: Delete a dropdown library item
 *     tags: [DropdownLibrary]
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: dropdownId
 *         required: true
 *         schema:
 *           type: string
 *         description: Dropdown Library Item ID
 *     responses:
 *       200:
 *         description: Dropdown library item deleted successfully
 *       404:
 *         description: Dropdown library item not found
 *       500:
 *         description: Server error
 */
router.delete('/:doctorId/dropdown/:dropdownId', deleteDropdownLibraryItemController);

module.exports = router;