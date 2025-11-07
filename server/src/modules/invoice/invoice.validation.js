const { z } = require('zod');

// Define the invoice item schema with flexible types
const invoiceItemSchema = z.object({
  service: z.any().optional().nullable().transform(String),
  amount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Amount must be a non-negative number" }),
  quantity: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : Math.floor(num);
  }).refine(val => val >= 0, { message: "Quantity must be a non-negative integer" }),
  discount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Discount must be a non-negative number" }),
});

// Define the create invoice schema with flexible types
const createInvoiceSchema = z.object({
  invoiceId: z.any().optional(),
  patientId: z.any().transform(String).refine(val => val.length > 0, { message: "Patient ID is required" }),
  clinicName: z.any().transform(String).refine(val => val.length > 0, { message: "Clinic name is required" }).refine(val => val.length <= 100, { message: "Clinic name must be less than 100 characters" }),
  name: z.any().transform(String).refine(val => val.length > 0, { message: "Name is required" }).refine(val => val.length <= 100, { message: "Name must be less than 100 characters" }),
  uid: z.any().transform(String).refine(val => val.length > 0, { message: "UID is required" }).refine(val => val.length <= 50, { message: "UID must be less than 50 characters" }),
  phone: z.any().transform(String).refine(val => val.length > 0, { message: "Phone number is required" }).refine(val => val.length <= 15, { message: "Phone number must be less than 15 characters" }),
  paymentStatus: z.any().optional().default('Unbilled'),
  privateNote: z.any().optional().nullable(),
  items: z.array(invoiceItemSchema).optional().default([]),
  additionalDiscountAmount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Additional discount amount must be a non-negative number" }).optional().default(0),
  totalAmount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Total amount must be a non-negative number" }),
  paymentMode: z.any().optional().default('Cash'),
  patientNote: z.any().optional().nullable(),
});

// Define the update invoice by invoiceId schema
const updateInvoiceByInvoiceIdSchema = z.object({
  invoiceId: z.any().transform(String).refine(val => val.length > 0, { message: "Invoice ID is required" }),
  patientId: z.any().optional(),
  clinicName: z.any().transform(String).refine(val => val.length > 0, { message: "Clinic name is required" }).refine(val => val.length <= 100, { message: "Clinic name must be less than 100 characters" }),
  name: z.any().transform(String).refine(val => val.length > 0, { message: "Name is required" }).refine(val => val.length <= 100, { message: "Name must be less than 100 characters" }).optional(),
  uid: z.any().transform(String).refine(val => val.length > 0, { message: "UID is required" }).refine(val => val.length <= 50, { message: "UID must be less than 50 characters" }).optional(),
  phone: z.any().transform(String).refine(val => val.length > 0, { message: "Phone number is required" }).refine(val => val.length <= 15, { message: "Phone number must be less than 15 characters" }).optional(),
  paymentStatus: z.any().optional(),
  privateNote: z.any().optional().nullable(),
  items: z.array(invoiceItemSchema).optional(),
  additionalDiscountAmount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Additional discount amount must be a non-negative number" }).optional(),
  totalAmount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Total amount must be a non-negative number" }).optional(),
  paymentMode: z.any().optional(),
  patientNote: z.any().optional().nullable(),
});

// Define the update invoice schema
const updateInvoiceSchema = z.object({
  patientId: z.any().optional(),
  clinicName: z.any().optional(),
  name: z.any().transform(String).refine(val => val.length > 0, { message: "Name is required" }).refine(val => val.length <= 100, { message: "Name must be less than 100 characters" }).optional(),
  uid: z.any().transform(String).refine(val => val.length > 0, { message: "UID is required" }).refine(val => val.length <= 50, { message: "UID must be less than 50 characters" }).optional(),
  phone: z.any().transform(String).refine(val => val.length > 0, { message: "Phone number is required" }).refine(val => val.length <= 15, { message: "Phone number must be less than 15 characters" }).optional(),
  paymentStatus: z.any().optional(),
  privateNote: z.any().optional().nullable(),
  items: z.array(invoiceItemSchema).optional(),
  additionalDiscountAmount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Additional discount amount must be a non-negative number" }).optional(),
  totalAmount: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Total amount must be a non-negative number" }).optional(),
  paymentMode: z.any().optional(),
  patientNote: z.any().optional().nullable(),
});

// Define the export invoice data schema
const exportInvoiceDataSchema = z.object({
  format: z.any().optional().default('pdf'),
  dateRange: z.any().optional(),
  statusFilter: z.any().optional().default('All'),
  modeFilter: z.any().optional().default('All'),
  searchQuery: z.any().optional().default(''),
});


module.exports = {
  createInvoiceSchema,
  updateInvoiceByInvoiceIdSchema,
  updateInvoiceSchema,
  exportInvoiceDataSchema,
};