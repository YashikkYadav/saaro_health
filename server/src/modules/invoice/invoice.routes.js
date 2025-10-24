const express = require('express');
const { 
  createInvoice,
  updateInvoiceByInvoiceId,
  getInvoices,
  exportInvoiceData,
  updateInvoiceController,
  getInvoice,
  deleteInvoiceController,
  printInvoiceController
} = require('./invoice.controller');

const router = express.Router();

/**
 * @swagger
 * tags:
 *   name: Invoices
 *   description: Invoice management
 */

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice:
 *   post:
 *     summary: Create an invoice
 *     tags: [Invoices]
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
 *               - patientId
 *               - name
 *               - uid
 *               - phone
 *               - totalAmount
 *             properties:
 *               invoiceId:
 *                 type: string
 *                 description: Invoice ID (optional, auto-generated if not provided)
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *               name:
 *                 type: string
 *                 description: Invoice name
 *               uid:
 *                 type: string
 *                 description: Unique identifier
 *               phone:
 *                 type: string
 *                 description: Phone number
 *               paymentStatus:
 *                 type: string
 *                 enum: [Unbilled, Billed, Paid, Overdue]
 *                 description: Payment status
 *               privateNote:
 *                 type: string
 *                 description: Private notes
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     service:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     discount:
 *                       type: number
 *               additionalDiscountAmount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               paymentMode:
 *                 type: string
 *                 enum: [Cash, Card, UPI, Bank Transfer]
 *               patientNote:
 *                 type: string
 *     responses:
 *       201:
 *         description: Invoice created successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *                 invoiceUrl:
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

// POST /:doctorId/invoice - Create an invoice
router.post('/:doctorId/invoice', createInvoice);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice/update:
 *   post:
 *     summary: Update an invoice by invoiceId
 *     tags: [Invoices]
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
 *               - invoiceId
 *             properties:
 *               invoiceId:
 *                 type: string
 *                 description: Invoice ID
 *               patientId:
 *                 type: string
 *                 description: Patient ID
 *               name:
 *                 type: string
 *                 description: Invoice name
 *               uid:
 *                 type: string
 *                 description: Unique identifier
 *               phone:
 *                 type: string
 *                 description: Phone number
 *               paymentStatus:
 *                 type: string
 *                 enum: [Unbilled, Billed, Paid, Overdue]
 *                 description: Payment status
 *               privateNote:
 *                 type: string
 *                 description: Private notes
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     service:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     discount:
 *                       type: number
 *               additionalDiscountAmount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               paymentMode:
 *                 type: string
 *                 enum: [Cash, Card, UPI, Bank Transfer]
 *               patientNote:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *                 invoiceUrl:
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

// POST /:doctorId/invoice/update - Update an invoice by invoiceId
router.post('/:doctorId/invoice/update', updateInvoiceByInvoiceId);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice:
 *   get:
 *     summary: Get invoices by doctor ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: Page number
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Number of items per page
 *     responses:
 *       200:
 *         description: Invoices retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoices:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Invoice'
 *                 pagination:
 *                   type: object
 *                   properties:
 *                     currentPage:
 *                       type: integer
 *                     totalPages:
 *                       type: integer
 *                     totalInvoices:
 *                       type: integer
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

// GET /:doctorId/invoice - Get invoices by doctor ID
router.get('/:doctorId/invoice', getInvoices);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice/export:
 *   get:
 *     summary: Export invoices
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: query
 *         name: format
 *         schema:
 *           type: string
 *           enum: [pdf, csv, xlsx]
 *         description: Export format
 *       - in: query
 *         name: dateRange
 *         schema:
 *           type: string
 *         description: Date range in format "startDate,endDate"
 *       - in: query
 *         name: statusFilter
 *         schema:
 *           type: string
 *           enum: [Unbilled, Billed, Paid, Overdue]
 *         description: Payment status filter
 *       - in: query
 *         name: modeFilter
 *         schema:
 *           type: string
 *           enum: [Cash, Card, UPI, Bank Transfer]
 *         description: Payment method filter
 *       - in: query
 *         name: searchQuery
 *         schema:
 *           type: string
 *         description: Search query
 *     responses:
 *       200:
 *         description: Invoice data exported successfully
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
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

// GET /:doctorId/invoice/export - Export invoices
router.get('/:doctorId/invoice/export', exportInvoiceData);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice/{invoiceId}:
 *   put:
 *     summary: Update an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               patientId:
 *                 type: string
 *               name:
 *                 type: string
 *               uid:
 *                 type: string
 *               phone:
 *                 type: string
 *               paymentStatus:
 *                 type: string
 *                 enum: [Unbilled, Billed, Paid, Overdue]
 *               privateNote:
 *                 type: string
 *               items:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     service:
 *                       type: string
 *                     amount:
 *                       type: number
 *                     quantity:
 *                       type: number
 *                     discount:
 *                       type: number
 *               additionalDiscountAmount:
 *                 type: number
 *               totalAmount:
 *                 type: number
 *               paymentMode:
 *                 type: string
 *                 enum: [Cash, Card, UPI, Bank Transfer]
 *               patientNote:
 *                 type: string
 *     responses:
 *       200:
 *         description: Invoice updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *                 invoiceUrl:
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

// PUT /:doctorId/invoice/:invoiceId - Update an invoice
router.put('/:doctorId/invoice/:invoiceId', updateInvoiceController);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice/{invoiceId}:
 *   get:
 *     summary: Get invoice by ID
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
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

// GET /:doctorId/invoice/:invoiceId - Get invoice by ID
router.get('/:doctorId/invoice/:invoiceId', getInvoice);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice/{invoiceId}:
 *   delete:
 *     summary: Delete an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *       404:
 *         description: Invoice not found
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

// DELETE /:doctorId/invoice/:invoiceId - Delete an invoice
router.delete('/:doctorId/invoice/:invoiceId', deleteInvoiceController);

/**
 * @swagger
 * /api/invoices/{doctorId}/invoice/{invoiceId}/print:
 *   get:
 *     summary: Print an invoice
 *     tags: [Invoices]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: doctorId
 *         required: true
 *         schema:
 *           type: string
 *         description: Doctor ID
 *       - in: path
 *         name: invoiceId
 *         required: true
 *         schema:
 *           type: string
 *         description: Invoice ID
 *     responses:
 *       200:
 *         description: Invoice print data retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 message:
 *                   type: string
 *                 invoice:
 *                   $ref: '#/components/schemas/Invoice'
 *                 pdfUrl:
 *                   type: string
 *       404:
 *         description: Invoice not found
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

// GET /:doctorId/invoice/:invoiceId/print - Print an invoice
router.get('/:doctorId/invoice/:invoiceId/print', printInvoiceController);

module.exports = router;