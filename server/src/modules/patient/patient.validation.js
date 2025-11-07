const { z } = require('zod');

// Define the patient registration schema
const registerPatientSchema = z.object({
  doctorId: z.string().optional(),
  uid: z.string().min(1, "UID is required").max(50, "UID must be less than 50 characters").optional(),
  title: z.string().min(1, "Title is required").max(20, "Title must be less than 20 characters"),
  fullName: z.string().min(1, "Full name is required").max(100, "Full name must be less than 100 characters"),
  // phoneNumber: z.string(),
  spouseName: z.string().nullable().optional(),
  // alternatePhoneNumber: z.string(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format"),
  age: z.number().int().min(0, "Age must be a non-negative integer"),
  gender: z.string().min(1, "Gender is required").max(20, "Gender must be less than 20 characters"),
  email: z.string().email("Invalid email format").max(100, "Email must be less than 100 characters").optional(),
  address: z.string().optional(),
  bloodGroup: z.string().max(10, "Blood group must be less than 10 characters").optional(),
  allergies: z.string().optional(),
  tags: z.string().optional(),
  referredBy: z.string().optional(),
  otp: z.number().int().optional(),
  category: z.string().max(50, "Category must be less than 50 characters").optional(),
  status: z.enum(['Waiting', 'In Consultation', 'Completed']).optional(),
  doctors: z.array(z.string()).optional(),
});

// Define the check patient exists schema
const checkPatientExistsSchema = z.object({
  phone: z.string().min(1, "Phone number is required")
});

// Define the get all patients schema
const getAllPatientsSchema = z.object({
  page: z.number().int().min(1, "Page must be a positive integer").optional().default(1),
  limit: z.number().int().min(1, "Limit must be a positive integer").max(100, "Limit must be less than or equal to 100").optional().default(10),
  searchQuery: z.string().optional().default('')
});

// Define the update patient schema
const updatePatientSchema = z.object({
  uid: z.string().min(1, "UID is required").max(50, "UID must be less than 50 characters").optional(),
  title: z.string().min(1, "Title is required").max(20, "Title must be less than 20 characters").optional(),
  fullName: z.string().min(1, "Full name is required").max(100, "Full name must be less than 100 characters").optional(),
  phoneNumber: z.number().int().positive("Phone number must be a positive integer").optional(),
  spouseName: z.string().nullable().optional(),
  alternatePhoneNumber: z.number().int().positive("Alternate phone number must be a positive integer").optional(),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Date of birth must be in YYYY-MM-DD format").optional(),
  age: z.number().int().min(0, "Age must be a non-negative integer").optional(),
  gender: z.string().min(1, "Gender is required").max(20, "Gender must be less than 20 characters").optional(),
  email: z.string().email("Invalid email format").max(100, "Email must be less than 100 characters").optional(),
  address: z.string().optional(),
  bloodGroup: z.string().max(10, "Blood group must be less than 10 characters").optional(),
  allergies: z.string().optional(),
  tags: z.string().optional(),
  referredBy: z.string().optional(),
  otp: z.number().int().optional(),
  category: z.string().max(50, "Category must be less than 50 characters").optional(),
  status: z.enum(['Waiting', 'In Consultation', 'Completed']).optional(),
  doctors: z.array(z.string()).optional(),
}).partial();

module.exports = {
  registerPatientSchema,
  checkPatientExistsSchema,
  getAllPatientsSchema,
  updatePatientSchema
};