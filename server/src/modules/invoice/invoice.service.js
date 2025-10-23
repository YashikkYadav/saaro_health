const Invoice = require('./invoice.model');
const Doctor = require('../doctor/doctor.model');
const Patient = require('../patient/patient.model');

// Generate unique invoice ID
const generateInvoiceId = async () => {
  try {
    let invoiceId;
    const existingInvoices = await Invoice.find();
    const existingInvoiceIds = existingInvoices.map((invoice) => invoice.invoiceId);
    
    for (let i = 1; i < 100001; i++) {
      invoiceId = `INVC${i}`;
      if (!existingInvoiceIds.includes(invoiceId)) {
        break;
      }
    }
    
    return invoiceId;
  } catch (error) {
    return {
      error: "Error generating UID",
    };
  }
};

// Create invoice
const createInvoiceService = async (doctorId, invoiceData) => {
  try {
    const { 
      patientId,
      name,
      uid,
      phone,
      paymentStatus,
      privateNote,
      items,
      additionalDiscountAmount,
      totalAmount,
      paymentMode,
      patientNote: patientNoteData,
    } = invoiceData;
    
    // Generate invoiceId
    let generatedInvoiceId = invoiceData.invoiceId;
    if (!generatedInvoiceId) {
      generatedInvoiceId = await generateInvoiceId();
      if (generatedInvoiceId && generatedInvoiceId.error) {
        return {
          statusCode: 500,
          error: generatedInvoiceId.error,
        };
      }
    }
    
    // Create new invoice
    const invoice = new Invoice({
      doctorId,
      patientId,
      name,
      uid,
      invoiceId: generatedInvoiceId,
      phone,
      paymentStatus,
      privateNote,
      items,
      additionalDiscountAmount,
      totalAmount,
      paymentMode,
      patientNote: patientNoteData,
    });
    
    await invoice.save();
    
    // Populate the new invoice
    await invoice.populate('doctorId', 'name');
    await invoice.populate('patientId', 'fullName');
    
    // Add invoice to doctor's invoices array
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $addToSet: { invoices: invoice._id } }
    );
    
    // Add invoice to patient's invoices array
    await Patient.findByIdAndUpdate(
      patientId,
      { $addToSet: { invoices: invoice._id } }
    );

    return {
      statusCode: 201,
      invoice,
      invoiceUrl: `/api/invoices/${invoice._id}`, // Placeholder URL
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

// Update invoice
const updateInvoiceService = async (doctorId, invoiceId, updateData) => {
  try {
    const { 
      patientId,
      name,
      uid,
      phone,
      paymentStatus,
      privateNote,
      items,
      additionalDiscountAmount,
      totalAmount,
      paymentMode,
      patientNote: patientNoteData,
    } = updateData;
    
    // Update existing invoice
    const invoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      {
        doctorId,
        patientId,
        name,
        uid,
        phone,
        paymentStatus,
        privateNote,
        items,
        additionalDiscountAmount,
        totalAmount,
        paymentMode,
        patientNote: patientNoteData,
      },
      { new: true }
    );
    
    if (!invoice) {
      return {
        statusCode: 404,
        error: 'Invoice not found',
      };
    }
    
    // Populate the updated invoice
    await invoice.populate('doctorId', 'name');
    await invoice.populate('patientId', 'fullName');

    return {
      statusCode: 200,
      invoice,
      invoiceUrl: `/api/invoices/${invoice._id}`, // Placeholder URL
    };
  } catch (error) {
    return {
      statusCode: 500,
      error: error.message,
    };
  }
};

// Get invoices by doctor ID with pagination
const getInvoicesByDoctorId = async (doctorId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const [invoices, totalInvoices] = await Promise.all([
      Invoice.find({ doctorId })
        .populate('patientId', 'fullName')
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      Invoice.countDocuments({ doctorId })
    ]);

    return {
      invoices,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalInvoices / limit),
        totalInvoices
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Export invoices (simplified version - in a real implementation, this would generate actual files)
const exportInvoices = async (doctorId, format, dateRange, statusFilter, modeFilter, searchQuery) => {
  try {
    // Build query based on filters
    const query = { doctorId };
    
    if (statusFilter) {
      query.paymentStatus = statusFilter;
    }
    
    if (modeFilter) {
      query.paymentMode = modeFilter;
    }
    
    if (dateRange) {
      const [startDate, endDate] = dateRange.split(',');
      query.createdAt = {
        $gte: startDate instanceof Date ? startDate : new Date(startDate),
        $lte: endDate instanceof Date ? endDate : new Date(endDate)
      };
    }
    
    if (searchQuery) {
      query.$or = [
        { name: { $regex: searchQuery, $options: 'i' } },
        { uid: { $regex: searchQuery, $options: 'i' } },
        { 'items.service': { $regex: searchQuery, $options: 'i' } },
        { privateNote: { $regex: searchQuery, $options: 'i' } },
        { patientNote: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    const invoices = await Invoice.find(query)
      .populate('patientId', 'fullName')
      .sort({ createdAt: -1 });
    
    // In a real implementation, this would generate and return actual CSV/XLSX files
    // For now, we'll return the data that would be used to generate the file
    return {
      format,
      data: invoices,
      count: invoices.length
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update an invoice
const updateInvoice = async (doctorId, invoiceId, updateData) => {
  try {
    const { patientId, name, uid, phone, paymentStatus, privateNote, items, additionalDiscountAmount, totalAmount, paymentMode, patientNote } = updateData;
    
    const updateObject = {};
    
    if (patientId) updateObject.patientId = patientId;
    if (name) updateObject.name = name;
    if (uid) updateObject.uid = uid;
    if (phone) updateObject.phone = phone;
    if (paymentStatus) updateObject.paymentStatus = paymentStatus;
    if (privateNote !== undefined) updateObject.privateNote = privateNote;
    if (items) updateObject.items = items;
    if (additionalDiscountAmount !== undefined) updateObject.additionalDiscountAmount = additionalDiscountAmount;
    if (totalAmount) updateObject.totalAmount = totalAmount;
    if (paymentMode) updateObject.paymentMode = paymentMode;
    if (patientNote !== undefined) updateObject.patientNote = patientNote;

    const invoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      updateObject,
      { new: true, runValidators: true }
    );

    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    // Populate the updated invoice
    await invoice.populate('doctorId', 'name');
    await invoice.populate('patientId', 'fullName');

    return invoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get invoice by ID
const getInvoiceById = async (doctorId, invoiceId) => {
  try {
    const invoice = await Invoice.findOne({ _id: invoiceId, doctorId })
      .populate('doctorId', 'name')
      .populate('patientId', 'fullName');
    
    if (!invoice) {
      throw new Error('Invoice not found');
    }

    return invoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete invoice
const deleteInvoice = async (doctorId, invoiceId) => {
  try {
    // First, get the invoice to access doctorId and patientId
    const invoice = await Invoice.findById(invoiceId);
    
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    // Remove invoice from doctor's invoices array
    await Doctor.findByIdAndUpdate(
      invoice.doctorId,
      { $pull: { invoices: invoiceId } }
    );
    
    // Remove invoice from patient's invoices array
    await Patient.findByIdAndUpdate(
      invoice.patientId,
      { $pull: { invoices: invoiceId } }
    );
    
    // Delete the invoice
    const deletedInvoice = await Invoice.findByIdAndDelete(invoiceId);
    
    if (!deletedInvoice) {
      throw new Error('Invoice not found');
    }

    return deletedInvoice;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Print invoice (returns data needed for PDF generation)
const printInvoice = async (doctorId, invoiceId) => {
  try {
    const invoice = await Invoice.findOne({ _id: invoiceId, doctorId })
      .populate('doctorId', 'name clinicName address')
      .populate('patientId', 'fullName phoneNumber address');
    
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    // In a real implementation, this would generate and return a PDF URL
    // For now, we'll return the data that would be used to generate the PDF
    return {
      invoice,
      pdfUrl: `/api/invoices/${invoiceId}/pdf` // Placeholder URL
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createInvoiceService,
  updateInvoiceService,
  getInvoicesByDoctorId,
  exportInvoices,
  updateInvoice,
  getInvoiceById,
  deleteInvoice,
  printInvoice
};