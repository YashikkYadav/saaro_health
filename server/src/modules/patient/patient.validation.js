const { z } = require('zod');

// Custom transformer to convert values to string and validate
const stringValidator = z.any().transform((val) => {
  // Convert to string if not already
  if (val === null || val === undefined) {
    return '';
  }
  return String(val);
}).refine((val) => val !== '', { message: "Value cannot be empty" });

// Custom phone number validation for exactly 10 digits
const phoneNumberSchema = z.any().transform((val) => {
  // Convert to string for validation
  const strVal = String(val);
  // Remove all non-digit characters
  const cleanVal = strVal.replace(/\D/g, '');
  return cleanVal;
}).refine((val) => {
  return /^\d{10}$/.test(val);
}, { message: 'Phone number must be exactly 10 digits' });

// Custom alternate phone number validation (allows empty or exactly 10 digits)
const alternatePhoneNumberSchema = z.any().optional().transform((val) => {
  // Handle undefined, null, empty string, or the number 0
  if (val === undefined || val === null || val === "" || val === 0) {
    return null; // Normalize empty values to null
  }
  
  // Convert to string and clean
  const strVal = String(val).replace(/\D/g, '');
  
  // If empty after cleaning, return null
  if (strVal === "") {
    return null;
  }
  
  return strVal;
}).refine((val) => {
  // Allow null values or exactly 10 digits
  if (val === null) {
    return true;
  }
  return /^\d{10}$/.test(val);
}, { message: 'Alternate phone number must be exactly 10 digits' });

// Custom transformer to convert values to number
const stringToNumber = z.any().transform((val) => {
  if (val === null || val === undefined) {
    return 0;
  }
  const num = Number(val);
  return isNaN(num) ? 0 : num;
}).refine((val) => val >= 0 && Number.isInteger(val), { message: "Age must be a non-negative integer" });

// Define the patient registration schema
const registerPatientSchema = z.object({
  doctorId: z.any().optional(),
  uid: z.any().transform(String).refine((val) => val.length > 0, { message: "UID is required" }).refine((val) => val.length <= 50, { message: "UID must be less than 50 characters" }),
  title: z.any().transform(String).refine((val) => val.length > 0, { message: "Title is required" }).refine((val) => val.length <= 20, { message: "Title must be less than 20 characters" }),
  fullName: z.any().transform(String).refine((val) => val.length > 0, { message: "Full name is required" }).refine((val) => val.length <= 100, { message: "Full name must be less than 100 characters" }),
  phoneNumber: phoneNumberSchema,
  spouseName: z.any().nullable().optional(),
  alternatePhoneNumber: alternatePhoneNumberSchema,
  dateOfBirth: z.any().transform(String).refine((val) => /^\d{4}-\d{2}-\d{2}$/.test(val), { message: "Date of birth must be in YYYY-MM-DD format" }),
  age: stringToNumber,
  gender: z.any().transform(String).refine((val) => val.length > 0, { message: "Gender is required" }).refine((val) => val.length <= 20, { message: "Gender must be less than 20 characters" }),
  email: z.any().optional().transform(String).refine((val) => val === '' || z.string().email().safeParse(val).success, { message: "Invalid email format" }).refine((val) => val.length <= 100, { message: "Email must be less than 100 characters" }),
  address: z.any().optional(),
  bloodGroup: z.any().optional(),
  allergies: z.any().optional(),
  tags: z.any().optional(),
  referredBy: z.any().optional(),
  otp: z.any().optional(),
  category: z.any().optional(),
  status: z.any().optional(),
  doctors: z.array(z.any()).optional(),
});

// Define the check patient exists schema
const checkPatientExistsSchema = z.object({
  phone: phoneNumberSchema
});

// Define the get all patients schema
const getAllPatientsSchema = z.object({
  page: z.any().optional().default(1),
  limit: z.any().optional().default(10),
  searchQuery: z.any().optional().default('')
});

// Define the update patient schema
const updatePatientSchema = z.object({
  uid: z.any().optional(),
  title: z.any().optional(),
  fullName: z.any().optional(),
  phoneNumber: phoneNumberSchema.optional(),
  spouseName: z.any().nullable().optional(),
  alternatePhoneNumber: alternatePhoneNumberSchema,
  dateOfBirth: z.any().optional(),
  age: z.any().optional(),
  gender: z.any().optional(),
  email: z.any().optional(),
  address: z.any().optional(),
  bloodGroup: z.any().optional(),
  allergies: z.any().optional(),
  tags: z.any().optional(),
  referredBy: z.any().optional(),
  otp: z.any().optional(),
  category: z.any().optional(),
  status: z.any().optional(),
  doctors: z.array(z.any()).optional(),
}).partial();

module.exports = {
  registerPatientSchema,
  checkPatientExistsSchema,
  getAllPatientsSchema,
  updatePatientSchema
};