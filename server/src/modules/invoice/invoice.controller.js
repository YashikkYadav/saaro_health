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

// Create invoice
const createInvoice = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const invoiceData = req.body;
    
    const result = await createInvoiceService(doctorId, invoiceData);
    
    if (result.statusCode >= 400) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(result.statusCode).json({
      success: true,
      message: 'Invoice created successfully',
      invoice: result.invoice,
      invoiceUrl: result.invoiceUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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
      return res.status(result.statusCode).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(result.statusCode).json({
      success: true,
      message: 'Invoice updated successfully',
      invoice: result.invoice,
      invoiceUrl: result.invoiceUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get invoices by doctor ID
const getInvoices = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    
    const result = await getInvoicesByDoctorId(doctorId, parseInt(page), parseInt(limit));
    
    res.status(200).json({
      success: true,
      message: 'Invoices retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Export invoices
const exportInvoiceData = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { format, dateRange, statusFilter, modeFilter, searchQuery } = req.query;
    
    const exportResult = await exportInvoices(doctorId, format, dateRange, statusFilter, modeFilter, searchQuery);
    
    // In a real implementation, this would return an actual file download
    // For now, we'll return the data with a message
    res.status(200).json({
      success: true,
      message: `Invoice data exported successfully in ${format} format`,
      ...exportResult
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update invoice
const updateInvoiceController = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    const updateData = req.body;
    
    const result = await updateInvoiceService(doctorId, invoiceId, updateData);
    
    if (result.statusCode >= 400) {
      return res.status(result.statusCode).json({
        success: false,
        message: result.error
      });
    }
    
    res.status(result.statusCode).json({
      success: true,
      message: 'Invoice updated successfully',
      invoice: result.invoice,
      invoiceUrl: result.invoiceUrl
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get invoice by ID
const getInvoice = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    
    const invoice = await getInvoiceById(doctorId, invoiceId);
    
    res.status(200).json({
      success: true,
      message: 'Invoice retrieved successfully',
      invoice
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Delete invoice
const deleteInvoiceController = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    
    const deletedInvoice = await deleteInvoice(doctorId, invoiceId);
    
    res.status(200).json({
      success: true,
      message: 'Invoice deleted successfully',
      invoice: deletedInvoice
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Print invoice
const printInvoiceController = async (req, res) => {
  try {
    const { doctorId, invoiceId } = req.params;
    
    const printResult = await printInvoice(doctorId, invoiceId);
    
    res.status(200).json({
      success: true,
      message: 'Invoice print data retrieved successfully',
      ...printResult
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
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