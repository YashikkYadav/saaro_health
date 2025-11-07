const { z } = require('zod');

// Define the book appointment schema with flexible types
const bookAppointmentSchema = z.object({
  patientId: z.any().transform(String).refine(val => val.length > 0, { message: "Patient ID is required" }),
  date: z.any().transform(String).refine(val => val.length > 0, { message: "Date is required" }),
  time: z.any().transform(String).refine(val => val.length > 0, { message: "Time is required" }),
  location: z.any().transform(String).refine(val => val.length > 0, { message: "Location is required" }).refine(val => val.length <= 100, { message: "Location must be less than 100 characters" }),
  type: z.any().transform(String).refine(val => val.length > 0, { message: "Type is required" }).refine(val => val.length <= 50, { message: "Type must be less than 50 characters" }),
  mode: z.any().default('Online'),
  notes: z.any().optional(),
  fees: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Fees must be a non-negative number" }).optional(),
  reason: z.any().optional(),
  email: z.any().optional(),
  source: z.any().default('manual').optional()
});

// Define the create appointment schema (similar to book appointment but with status)
const createAppointmentSchema = z.object({
  patientId: z.any().transform(String).refine(val => val.length > 0, { message: "Patient ID is required" }),
  date: z.any().transform(String).refine(val => val.length > 0, { message: "Date is required" }),
  time: z.any().transform(String).refine(val => val.length > 0, { message: "Time is required" }),
  location: z.any().transform(String).refine(val => val.length > 0, { message: "Location is required" }).refine(val => val.length <= 100, { message: "Location must be less than 100 characters" }),
  type: z.any().transform(String).refine(val => val.length > 0, { message: "Type is required" }).refine(val => val.length <= 50, { message: "Type must be less than 50 characters" }),
  mode: z.any().default('Online'),
  notes: z.any().optional(),
  fees: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Fees must be a non-negative number" }).optional(),
  status: z.any().optional(),
  reason: z.any().optional(),
  email: z.any().optional(),
  source: z.any().default('manual').optional()
});

// Define the update appointment status schema
const updateAppointmentStatusSchema = z.object({
  appointmentId: z.any().transform(String).refine(val => val.length > 0, { message: "Appointment ID is required" }),
  status: z.any().transform(String).refine(val => val.length > 0, { message: "Status is required" })
});

// Define the update appointment schema
const updateAppointmentSchema = z.object({
  date: z.any().optional(),
  time: z.any().optional(),
  location: z.any().optional(),
  notes: z.any().optional(),
  fees: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).refine(val => val >= 0, { message: "Fees must be a non-negative number" }).optional(),
  status: z.any().optional(),
  reason: z.any().optional(),
  email: z.any().optional(),
  source: z.any().optional(),
  type: z.any().optional(),
  mode: z.any().optional()
});

// Define the get appointments for patient schema


module.exports = {
  bookAppointmentSchema,
  createAppointmentSchema,
  updateAppointmentStatusSchema,
  updateAppointmentSchema,
};