const { z } = require('zod');

// Define the doctor registration schema
const registerDoctorSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  rmcNumber: z.string().min(1, "RMC Number is required").max(50, "RMC Number must be less than 50 characters"),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits"),
  email: z.string().email("Invalid email format").min(1, "Email is required").max(100, "Email must be less than 100 characters"),
  city: z.string().min(1, "City is required").max(50, "City must be less than 50 characters"),
  address: z.string().optional(),
  clinicName: z.string().nullable().optional(),
  password: z.string().min(6, "Password must be at least 6 characters").max(100, "Password must be less than 100 characters"),
  experience: z.number().optional().default(0),
  education: z.string().optional().default(""),
  bio: z.string().optional().default(""),
  avatar: z.string().optional().default(""),
  introduction: z.string().optional().default(""),
  happyClients: z.number().optional().default(0),
  about: z.string().optional().default(""),
  qualification: z.string().optional(),
  gender: z.string().optional(),
  cashlessAvailable: z.boolean().optional(),
  rating: z.string().optional(),
  clinicAddress: z.array(z.string()).optional().default([]),
  availableDates: z.array(z.string()).optional().default([]),
  awards: z.array(z.string()).optional().default([]),
  specialization: z.string().optional(),
  surgeries: z.array(z.string()).optional().default([]),
  unavailabilityDate: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }).optional(),
  availabilityAfter: z.number().optional()
});

// Define the login schema
const loginDoctorSchema = z.object({
  identifier: z.string().min(1, "Email or phone number is required"),
  password: z.string().min(1, "Password is required")
});

// Define the update profile schema
const updateProfileSchema = z.object({
  name: z.string().min(1, "Name is required").max(100, "Name must be less than 100 characters").optional(),
  rmcNumber: z.string().min(1, "RMC Number is required").max(50, "RMC Number must be less than 50 characters").optional(),
  phoneNumber: z.string().min(10, "Phone number must be at least 10 digits").max(15, "Phone number must be less than 15 digits").optional(),
  email: z.string().email("Invalid email format").min(1, "Email is required").max(100, "Email must be less than 100 characters").optional(),
  city: z.string().min(1, "City is required").max(50, "City must be less than 50 characters").optional(),
  address: z.string().optional(),
  clinicName: z.string().nullable().optional(),
  experience: z.number().optional(),
  education: z.string().optional(),
  bio: z.string().optional(),
  avatar: z.string().optional(),
  introduction: z.string().optional(),
  happyClients: z.number().optional(),
  about: z.string().optional(),
  qualification: z.string().optional(),
  gender: z.string().optional(),
  cashlessAvailable: z.boolean().optional(),
  rating: z.string().optional(),
  clinicAddress: z.array(z.string()).optional(),
  availableDates: z.array(z.string()).optional(),
  awards: z.array(z.string()).optional(),
  specialization: z.string().optional(),
  surgeries: z.array(z.string()).optional(),
  unavailabilityDate: z.object({
    from: z.date().optional(),
    to: z.date().optional()
  }).optional(),
  availabilityAfter: z.number().optional()
});

// Define the change password schema
const changePasswordSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z.string().min(6, "New password must be at least 6 characters").max(100, "New password must be less than 100 characters")
});

module.exports = {
  registerDoctorSchema,
  loginDoctorSchema,
  updateProfileSchema,
  changePasswordSchema
};