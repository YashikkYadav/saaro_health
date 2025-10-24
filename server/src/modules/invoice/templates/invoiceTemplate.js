const PDFDocument = require('pdfkit');

const generateInvoiceTemplate = async (invoiceData) => {
  return new Promise((resolve, reject) => {
    try {
      const doc = new PDFDocument({ margin: 50 });
      
      // Create a temporary file path
      const tempFileName = `invoice_${Date.now()}.pdf`;
      const tempDir = './src/public/temp';
      const fs = require('fs');
      
      // Ensure temp directory exists
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      
      const filePath = `${tempDir}/${tempFileName}`;
      const stream = fs.createWriteStream(filePath);
      doc.pipe(stream);
      
      // Helper function to add header
      const addHeader = () => {
        doc.fontSize(20).text('INVOICE', 50, 50, { align: 'right' });
        doc.fontSize(12).text(`Invoice #: ${invoiceData.invoiceId}`, 50, 80, { align: 'right' });
        doc.fontSize(12).text(`Date: ${new Date(invoiceData.createdAt).toLocaleDateString()}`, 50, 100, { align: 'right' });
      };
      
      // Helper function to add company info (doctor information)
      const addCompanyInfo = () => {
        // Doctor/Clinic information
        doc.fontSize(16).text(invoiceData.doctorId.clinicName || invoiceData.doctorId.name, 50, 130);
        doc.fontSize(10);
        
        // Doctor name
        doc.text(`Dr. ${invoiceData.doctorId.name}`, 50, 150);
        
        // Clinic address
        if (invoiceData.doctorId.clinicAddress && invoiceData.doctorId.clinicAddress.length > 0) {
          doc.text(invoiceData.doctorId.clinicAddress[0], 50, 165);
        } else if (invoiceData.doctorId.address) {
          doc.text(invoiceData.doctorId.address, 50, 165);
        }
        
        // Doctor phone
        if (invoiceData.doctorId.phoneNumber) {
          doc.text(`Phone: ${invoiceData.doctorId.phoneNumber}`, 50, 180);
        }
      };
      
      // Helper function to add billing info
      const addBillingInfo = () => {
        doc.fontSize(12).text('Bill To:', 300, 130);
        doc.fontSize(10).text(invoiceData.name, 300, 150);
        doc.text(invoiceData.phone);
        doc.text(`Patient ID: ${invoiceData.uid}`);
      };
      
      // Helper function to add items table
      const addItemsTable = () => {
        const tableTop = 230;
        const itemHeight = 20;
        
        // Table headers
        doc.fontSize(10).text('Service', 50, tableTop);
        doc.text('Quantity', 200, tableTop);
        doc.text('Unit Price', 300, tableTop);
        doc.text('Discount', 400, tableTop);
        doc.text('Total', 500, tableTop);
        
        // Draw header line
        doc.moveTo(50, tableTop + 15).lineTo(550, tableTop + 15).stroke();
        
        // Table rows
        let yPos = tableTop + 25;
        let subtotal = 0;
        
        invoiceData.items.forEach((item, index) => {
          const quantity = item.quantity || 0;
          const unitPrice = item.amount || 0;
          const discount = item.discount || 0;
          const total = (quantity * unitPrice) - discount;
          subtotal += total;
          
          doc.text(item.service, 50, yPos);
          doc.text(quantity.toString(), 200, yPos);
          doc.text(unitPrice.toString(), 300, yPos);
          doc.text(discount.toString(), 400, yPos);
          doc.text(total.toFixed(2), 500, yPos);
          
          yPos += itemHeight;
        });
        
        // Draw bottom line
        doc.moveTo(50, yPos).lineTo(550, yPos).stroke();
        
        // Calculate totals
        const additionalDiscount = invoiceData.additionalDiscountAmount || 0;
        const totalAmount = subtotal - additionalDiscount;
        
        // Add totals
        doc.text('Subtotal:', 400, yPos + 20);
        doc.text(subtotal.toFixed(2), 500, yPos + 20);
        
        doc.text('Additional Discount:', 400, yPos + 40);
        doc.text(additionalDiscount.toFixed(2), 500, yPos + 40);
        
        doc.fontSize(12).text('Total:', 400, yPos + 60);
        doc.text(totalAmount.toFixed(2), 500, yPos + 60);
        
        // Payment info
        doc.fontSize(10).text(`Payment Status: ${invoiceData.paymentStatus}`, 50, yPos + 100);
        doc.text(`Payment Mode: ${invoiceData.paymentMode}`, 50, yPos + 120);
        
        // Notes
        if (invoiceData.patientNote) {
          doc.text('Notes:', 50, yPos + 150);
          doc.text(invoiceData.patientNote, 50, yPos + 170);
        }
      };
      
      // Add all sections
      addHeader();
      addCompanyInfo();
      addBillingInfo();
      addItemsTable();
      
      // Footer
      doc.fontSize(10).text('Thank you for your business!', 50, 700, { align: 'center' });
      
      doc.end();
      
      stream.on('finish', () => {
        resolve({
          filePath,
          fileName: tempFileName
        });
      });
      
      stream.on('error', (err) => {
        reject(err);
      });
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = {
  generateInvoiceTemplate
};