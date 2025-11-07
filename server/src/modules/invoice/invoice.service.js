const Invoice = require('./invoice.model');
const Doctor = require('../doctor/doctor.model');
const Patient = require('../patient/patient.model');
const path = require('path');
const fs = require('fs');
const PDFDocument = require('pdfkit');
const { Parser } = require('json2csv');
const XLSX = require('xlsx');
const { generateInvoiceTemplate } = require('./templates/invoiceTemplate');

// Generate unique invoice ID
const generateInvoiceId = async () => {
  try {
    let invoiceId;
    const existingInvoices = await Invoice.find();
    const existingInvoiceIds = existingInvoices.map((invoice) => invoice.invoiceId);
    
    for (let i = 1; i < 100001; i++) {
      invoiceId = `INVC${i}`;
      if (!existingInvoiceIds.includes(invoiceId)) {
        return invoiceId; // Return immediately when we find an available ID
      }
    }
    
    // If we've exhausted all possibilities, generate a unique ID with timestamp
    return `INVC${Date.now()}`;
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
      clinicName
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
      paymentStatus: paymentStatus || 'Unbilled',
      privateNote,
      items: items || [],
      additionalDiscountAmount: additionalDiscountAmount || 0,
      totalAmount: totalAmount || 0,
      paymentMode: paymentMode || 'Cash',
      patientNote: patientNoteData,
      clinicName: clinicName || ''
    });
    
    await invoice.save();
    
    // Populate the new invoice
    await invoice.populate('doctorId', 'name clinicName address phoneNumber clinicAddress');
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
    console.error('Error creating invoice:', error);
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
      clinicName
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
        clinicName: clinicName || ''
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
    await invoice.populate('doctorId', 'name clinicName address phoneNumber clinicAddress');
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
        .populate('doctorId', 'name clinicName address phoneNumber clinicAddress')
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

// Export invoices (updated to generate actual files)
const exportInvoices = async (doctorId, format, dateRange, statusFilter, modeFilter, searchQuery) => {
  try {
    // Build query based on filters
    const query = { doctorId };
    
    // Handle payment status filter (Billed/Unbilled)
    if (statusFilter && statusFilter !== 'All') {
      query.paymentStatus = statusFilter;
    }
    
    // Handle payment mode filter
    if (modeFilter && modeFilter !== 'All') {
      query.paymentMode = modeFilter;
    }
    
    // Handle date range filter
    if (dateRange && dateRange !== 'All') {
      const dates = dateRange.split(',');
      if (dates.length === 2) {
        const startDate = new Date(dates[0]);
        const endDate = new Date(dates[1]);
        
        // Set end date to end of day
        endDate.setHours(23, 59, 59, 999);
        
        query.createdAt = {
          $gte: startDate,
          $lte: endDate
        };
      }
    }
    
    // Handle search query
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
      .populate('doctorId', 'name clinicName address phoneNumber clinicAddress')
      .sort({ createdAt: -1 });
    
    // Prepare filters object for export functions
    const filters = {
      dateRange,
      statusFilter,
      modeFilter,
      searchQuery
    };
    
    // Generate file based on format
    switch (format.toLowerCase()) {
      case 'pdf':
        return await exportInvoicesAsPDF(invoices, filters);
      case 'csv':
        return await exportInvoicesAsCSV(invoices, filters);
      case 'xlsx':
        return await exportInvoicesAsXLSX(invoices, filters);
      default:
        throw new Error('Unsupported format');
    }
  } catch (error) {
    throw new Error(error.message);
  }
};

// Export invoices as PDF
const exportInvoicesAsPDF = async (invoices, filters = {}) => {
  try {
    // For a list export, we'll create a summary report
    const doc = new PDFDocument({ margin: 50 });
    
    // Create a temporary file
    const fileName = `invoices_export_${Date.now()}.pdf`;
    const tempDir = path.join(__dirname, '../../public/temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const filePath = path.join(tempDir, fileName);
    const stream = fs.createWriteStream(filePath);
    doc.pipe(stream);
    
    // Add title
    doc.fontSize(20).text('Invoices Report', { align: 'center' });
    doc.moveDown();
    
    // Add filter information if provided
    if (filters && Object.keys(filters).length > 0) {
      doc.fontSize(12).text('Filters Applied:', { underline: true });
      if (filters.statusFilter && filters.statusFilter !== 'All') {
        doc.text(`Payment Status: ${filters.statusFilter}`);
      }
      if (filters.modeFilter && filters.modeFilter !== 'All') {
        doc.text(`Payment Mode: ${filters.modeFilter}`);
      }
      if (filters.dateRange && filters.dateRange !== 'All') {
        const dates = filters.dateRange.split(',');
        if (dates.length === 2) {
          doc.text(`Date Range: ${new Date(dates[0]).toLocaleDateString()} to ${new Date(dates[1]).toLocaleDateString()}`);
        }
      }
      if (filters.searchQuery) {
        doc.text(`Search Query: ${filters.searchQuery}`);
      }
      doc.moveDown();
    }
    
    // Add summary
    doc.fontSize(12).text(`Total Invoices: ${invoices.length}`, { align: 'left' });
    doc.moveDown();
    
    // Add table header
    const tableTop = filters && Object.keys(filters).length > 0 ? 200 : 150;
    doc.fontSize(10);
    doc.text('Invoice ID', 50, tableTop);
    doc.text('Doctor', 150, tableTop);
    doc.text('Patient', 250, tableTop);
    doc.text('Status', 350, tableTop);
    doc.text('Mode', 420, tableTop);
    doc.text('Amount', 500, tableTop);
    doc.text('Date', 580, tableTop);
    
    // Draw header line
    doc.moveTo(50, tableTop + 15).lineTo(700, tableTop + 15).stroke();
    
    // Add invoice data
    let yPos = tableTop + 30;
    invoices.forEach((invoice, index) => {
      if (yPos > 700) { // Create new page if needed
        doc.addPage();
        yPos = 50;
      }
      
      doc.fontSize(9);
      doc.text(invoice.invoiceId, 50, yPos);
      
      // Doctor name (clinic name if available)
      const doctorName = invoice.doctorId.clinicName || (invoice.doctorId.name ? `Dr. ${invoice.doctorId.name}` : 'N/A');
      doc.text(doctorName, 150, yPos);
      
      doc.text(invoice.name, 250, yPos);
      doc.text(invoice.paymentStatus, 350, yPos);
      doc.text(invoice.paymentMode, 420, yPos);
      doc.text(invoice.totalAmount.toString(), 500, yPos);
      doc.text(new Date(invoice.createdAt).toLocaleDateString(), 580, yPos);
      
      yPos += 20;
    });
    
    doc.end();
    
    // Wait for the file to be written
    await new Promise((resolve, reject) => {
      stream.on('finish', resolve);
      stream.on('error', reject);
    });
    
    return {
      filePath,
      fileName,
      format: 'pdf'
    };
  } catch (error) {
    throw new Error(`Error generating PDF: ${error.message}`);
  }
};

// Export invoices as CSV
const exportInvoicesAsCSV = async (invoices, filters = {}) => {
  try {
    // Create header rows with filter information
    const csvData = [];
    
    // Add filter information if provided
    if (filters && Object.keys(filters).length > 0) {
      csvData.push({ 'Filter Information': '' });
      if (filters.statusFilter && filters.statusFilter !== 'All') {
        csvData.push({ 'Payment Status': filters.statusFilter });
      }
      if (filters.modeFilter && filters.modeFilter !== 'All') {
        csvData.push({ 'Payment Mode': filters.modeFilter });
      }
      if (filters.dateRange && filters.dateRange !== 'All') {
        const dates = filters.dateRange.split(',');
        if (dates.length === 2) {
          csvData.push({ 'Date Range': `${new Date(dates[0]).toLocaleDateString()} to ${new Date(dates[1]).toLocaleDateString()}` });
        }
      }
      if (filters.searchQuery) {
        csvData.push({ 'Search Query': filters.searchQuery });
      }
      csvData.push({ '': '' }); // Empty row for spacing
    }
    
    // Add summary row
    csvData.push({ 'Total Invoices': invoices.length });
    csvData.push({ '': '' }); // Empty row for spacing
    
    // Transform invoices data to flat structure for CSV
    invoices.forEach(invoice => {
      // Doctor name (clinic name if available)
      const doctorName = invoice.doctorId.clinicName || (invoice.doctorId.name ? `Dr. ${invoice.doctorId.name}` : 'N/A');
      
      csvData.push({
        'Invoice ID': invoice.invoiceId,
        'Doctor': doctorName,
        'Patient Name': invoice.name,
        'Phone': invoice.phone,
        'Payment Status': invoice.paymentStatus,
        'Payment Mode': invoice.paymentMode,
        'Total Amount': invoice.totalAmount,
        'Created At': invoice.createdAt.toISOString(),
        'Items Count': invoice.items ? invoice.items.length : 0
      });
    });
    
    // Create CSV
    const json2csvParser = new Parser();
    const csv = json2csvParser.parse(csvData);
    
    // Save to file
    const fileName = `invoices_export_${Date.now()}.csv`;
    const tempDir = path.join(__dirname, '../../public/temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const filePath = path.join(tempDir, fileName);
    fs.writeFileSync(filePath, csv);
    
    return {
      filePath,
      fileName,
      format: 'csv'
    };
  } catch (error) {
    throw new Error(`Error generating CSV: ${error.message}`);
  }
};

// Export invoices as XLSX
const exportInvoicesAsXLSX = async (invoices, filters = {}) => {
  try {
    // Create worksheet data array
    const xlsxData = [];
    
    // Add filter information if provided
    if (filters && Object.keys(filters).length > 0) {
      xlsxData.push(['Filter Information', '']);
      if (filters.statusFilter && filters.statusFilter !== 'All') {
        xlsxData.push(['Payment Status', filters.statusFilter]);
      }
      if (filters.modeFilter && filters.modeFilter !== 'All') {
        xlsxData.push(['Payment Mode', filters.modeFilter]);
      }
      if (filters.dateRange && filters.dateRange !== 'All') {
        const dates = filters.dateRange.split(',');
        if (dates.length === 2) {
          xlsxData.push(['Date Range', `${new Date(dates[0]).toLocaleDateString()} to ${new Date(dates[1]).toLocaleDateString()}`]);
        }
      }
      if (filters.searchQuery) {
        xlsxData.push(['Search Query', filters.searchQuery]);
      }
      xlsxData.push(['', '']); // Empty row for spacing
    }
    
    // Add summary row
    xlsxData.push(['Total Invoices', invoices.length]);
    xlsxData.push(['', '']); // Empty row for spacing
    
    // Add header row for invoice data
    xlsxData.push([
      'Invoice ID',
      'Doctor',
      'Patient Name',
      'Phone',
      'Payment Status',
      'Payment Mode',
      'Total Amount',
      'Created At',
      'Items Count'
    ]);
    
    // Transform invoices data to flat structure for XLSX
    invoices.forEach(invoice => {
      // Doctor name (clinic name if available)
      const doctorName = invoice.doctorId.clinicName || (invoice.doctorId.name ? `Dr. ${invoice.doctorId.name}` : 'N/A');
      
      xlsxData.push([
        invoice.invoiceId,
        doctorName,
        invoice.name,
        invoice.phone,
        invoice.paymentStatus,
        invoice.paymentMode,
        invoice.totalAmount,
        invoice.createdAt.toISOString(),
        invoice.items ? invoice.items.length : 0
      ]);
    });
    
    // Create workbook and worksheet
    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(xlsxData);
    
    // Add worksheet to workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Invoices');
    
    // Save to file
    const fileName = `invoices_export_${Date.now()}.xlsx`;
    const tempDir = path.join(__dirname, '../../public/temp');
    
    // Ensure temp directory exists
    if (!fs.existsSync(tempDir)) {
      fs.mkdirSync(tempDir, { recursive: true });
    }
    
    const filePath = path.join(tempDir, fileName);
    XLSX.writeFile(wb, filePath);
    
    return {
      filePath,
      fileName,
      format: 'xlsx'
    };
  } catch (error) {
    throw new Error(`Error generating XLSX: ${error.message}`);
  }
};

// Update an invoice
const updateInvoice = async (doctorId, invoiceId, updateData) => {
  try {
    const { patientId, name, uid, phone, paymentStatus, privateNote, items, additionalDiscountAmount, totalAmount, paymentMode, patientNote, clinicName } = updateData;
    
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
    if (clinicName !== undefined) updateObject.clinicName = clinicName;

    const invoice = await Invoice.findByIdAndUpdate(
      invoiceId,
      updateObject,
      { new: true, runValidators: true }
    );

    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    // Populate the updated invoice
    await invoice.populate('doctorId', 'name clinicName address phoneNumber clinicAddress');
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
      .populate('doctorId', 'name clinicName address phoneNumber clinicAddress')
      .populate('patientId', 'fullName phoneNumber address');
    
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
      .populate('doctorId', 'name clinicName address phoneNumber clinicAddress')
      .populate('patientId', 'fullName phoneNumber address');
    
    if (!invoice) {
      throw new Error('Invoice not found');
    }
    
    // Generate professional PDF invoice using template
    const result = await generateInvoiceTemplate(invoice);
    
    return {
      filePath: result.filePath,
      fileName: result.fileName
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