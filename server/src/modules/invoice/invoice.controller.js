const { 
  createInvoiceService,
  updateInvoiceService,
  getInvoicesByDoctorId,
  exportInvoices,
  updateInvoice,
  getInvoiceById,
  deleteInvoice,
  printInvoice
} = require('./invoice.service');
const path = require('path');
const fs = require('fs');
const apiResponse = require('../../utils/apiResponse.utils');

// Create invoice
const createInvoice = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const invoiceData = req.body;
    
    const result = await createInvoiceService(doctorId, invoiceData);
    
    if (result.statusCode >= 400) {
      return apiResponse.error(res, result.error, result.statusCode);
    }
    
    return apiResponse.success(res, 'Invoice created successfully', { 
      invoice: result.invoice,
      invoiceUrl: result.invoiceUrl
    }, result.statusCode);
  } catch (error) {
    console.error('Error creating invoice:', error);
    return apiResponse.error(res, error.message, 500);
  }
};

// Update invoice by invoiceId
const updateInvoiceByInvoiceId = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { invoiceId } = req.body;
    const updateData = req.body;
    
    // Remove invoiceId from updateData to avoid conflicts
    const { invoiceId: removedInvoiceId, ...cleanUpdateData } = updateData;
    
    const result = await updateInvoiceService(doctorId, invoiceId, cleanUpdateData);
    
    if (result.statusCode >= 400) {
      return apiResponse.error(res, result.error, result.statusCode);
    }
    
    return apiResponse.success(res, 'Invoice updated successfully', { 
      invoice: result.invoice,
      invoiceUrl: result.invoiceUrl
    }, result.statusCode);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get invoices by doctor ID
const getInvoices = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await getInvoicesByDoctorId(doctorId, parseInt(page), parseInt(limit));
    
    return apiResponse.success(res, 'Invoices retrieved successfully', result);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Export invoices
const exportInvoiceData = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { format, dateRange, statusFilter, modeFilter, searchQuery } = req.query;
    
    // Log the filters for debugging
    // console.log('Export filters:', { format, dateRange, statusFilter, modeFilter, searchQuery });
    
    const exportResult = await exportInvoices(doctorId, format, dateRange, statusFilter, modeFilter, searchQuery);
    
    // Send the file for download
    res.setHeader('Content-Disposition', `attachment; filename="${exportResult.fileName}"`);
    res.setHeader('Content-Type', getContentType(exportResult.format));
    
    const fileStream = fs.createReadStream(exportResult.filePath);
    fileStream.pipe(res);
    
    // Delete the file after sending it
    fileStream.on('close', () => {
      fs.unlink(exportResult.filePath, (err) => {
        if (err) {
          console.error('Error deleting temp file:', err);
        }
      });
    });
    
    fileStream.on('error', (err) => {
      return apiResponse.error(res, 'Error exporting invoices', 500);
    });
  } catch (error) {
    console.error('Error exporting invoices:', error);
    return apiResponse.error(res, error.message, 500);
  }
};

// Helper function to get content type based on format
const getContentType = (format) => {
  switch (format.toLowerCase()) {
    case 'pdf':
      return 'application/pdf';
    case 'csv':
      return 'text/csv';
    case 'xlsx':
      return 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet';
    default:
      return 'application/octet-stream';
  }
};

// Update invoice
const updateInvoiceController = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    const updateData = req.body;
    
    const result = await updateInvoiceService(doctorId, invoiceId, updateData);
    
    if (result.statusCode >= 400) {
      return apiResponse.error(res, result.error, result.statusCode);
    }
    
    return apiResponse.success(res, 'Invoice updated successfully', { 
      invoice: result.invoice,
      invoiceUrl: result.invoiceUrl
    }, result.statusCode);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get invoice by ID
const getInvoice = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    
    const invoice = await getInvoiceById(doctorId, invoiceId);
    
    return apiResponse.success(res, 'Invoice retrieved successfully', { invoice });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Delete invoice
const deleteInvoiceController = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    
    const deletedInvoice = await deleteInvoice(doctorId, invoiceId);
    
    return apiResponse.success(res, 'Invoice deleted successfully', { invoice: deletedInvoice });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Print invoice
const printInvoiceController = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    
    const printResult = await printInvoice(doctorId, invoiceId);
    
    // Send the PDF file for download
    res.setHeader('Content-Disposition', `attachment; filename="${printResult.fileName}"`);
    res.setHeader('Content-Type', 'application/pdf');
    
    const fileStream = fs.createReadStream(printResult.filePath);
    fileStream.pipe(res);
    
    // Delete the file after sending it
    fileStream.on('close', () => {
      fs.unlink(printResult.filePath, (err) => {
        if (err) {
          console.error('Error deleting temp file:', err);
        }
      });
    });
    
    fileStream.on('error', (err) => {
      return apiResponse.error(res, 'Error generating invoice PDF', 500);
    });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

module.exports = {
  createInvoice,
  updateInvoiceByInvoiceId,
  getInvoices,
  exportInvoiceData,
  updateInvoiceController,
  getInvoice,
  deleteInvoiceController,
  printInvoiceController
};