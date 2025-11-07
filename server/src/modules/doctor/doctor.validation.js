const { z } = require('zod');

// Custom validation for image files
const imageValidation = z.any().refine((value) => {
  if (!value) return true; // Allow empty values
  const strVal = String(value);
  // Check if it's a valid image URL or file path
  return /\.(jpg|jpeg|png|gif|webp)$/i.test(strVal) || strVal.startsWith('data:image/');
}, {
  message: "Must be a valid image file (jpg, jpeg, png, gif, webp)"
});

// Custom validation for strong password
const strongPassword = z.any().transform(String).refine((value) => value.length >= 8, {
    message: "Password must be at least 8 characters long"
  })
  .refine((value) => value.length <= 100, {
    message: "Password must be less than 100 characters"
  })
  .refine((value) => /[a-z]/.test(value), {
    message: "Password must contain at least one lowercase letter"
  })
  .refine((value) => /[A-Z]/.test(value), {
    message: "Password must contain at least one uppercase letter"
  })
  .refine((value) => /[0-9]/.test(value), {
    message: "Password must contain at least one number"
  })
  .refine((value) => /[^a-zA-Z0-9]/.test(value), {
    message: "Password must contain at least one special character"
  });

// Define the doctor registration schema with flexible types
const registerDoctorSchema = z.object({
  name: z.any().transform(String).refine(val => val.length > 0, { message: "Name is required" }).refine(val => val.length <= 100, { message: "Name must be less than 100 characters" }),
  rmcNumber: z.any().transform(String).refine(val => val.length > 0, { message: "RMC Number is required" }).refine(val => val.length <= 50, { message: "RMC Number must be less than 50 characters" }),
  phoneNumber: z.any().transform(String).refine(val => val.length >= 10, { message: "Phone number must be at least 10 digits" }).refine(val => val.length <= 15, { message: "Phone number must be less than 15 digits" }),
  email: z.any().transform(String).refine(val => val.length > 0, { message: "Email is required" }).refine(val => val.length <= 100, { message: "Email must be less than 100 characters" }).refine(val => z.string().email().safeParse(val).success, { message: "Invalid email format" }),
  city: z.any().transform(String).refine(val => val.length > 0, { message: "City is required" }).refine(val => val.length <= 50, { message: "City must be less than 50 characters" }),
  address: z.any().optional(),
  clinicName: z.any().nullable().optional(),
  experience: z.any().optional(),
  education: z.any().optional(),
  bio: z.any().optional(),
  avatar: imageValidation.optional().default(""),
  introduction: z.any().optional().default(""),
  happyClients: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).optional().default(0),
  about: z.any().optional().default(""),
  qualification: z.any().optional(),
  gender: z.any().optional(),
  cashlessAvailable: z.any().optional().transform(Boolean),
  rating: z.any().optional(),
  clinicAddress: z.array(z.any()).optional().default([]),
  availableDates: z.array(z.any()).optional().default([]),
  awards: z.array(z.any()).optional().default([]),
  specialization: z.any().optional(),
  surgeries: z.array(z.any()).optional().default([]),
  opdLocations: z.array(z.object({
    clinicName: z.any().optional(),
    city: z.any().optional(),
    address: z.any().optional(),
    days: z.object({
      Mon: z.any().optional(),
      Tue: z.any().optional(),
      Wed: z.any().optional(),
      Thu: z.any().optional(),
      Fri: z.any().optional(),
      Sat: z.any().optional(),
      Sun: z.any().optional()
    }).optional(),
    startTime: z.any().optional(),
    endTime: z.any().optional(),
    slotMins: z.any().optional(),
    active: z.any().optional(),
    mapLocation: z.object({
      lat: z.any().optional(),
      lng: z.any().optional()
    }).nullable().optional()
  })).optional(),
  unavailabilityDate: z.object({
    from: z.any().optional(),
    to: z.any().optional()
  }).optional(),
  availabilityAfter: z.any().optional()
});

// Define the login schema
const loginDoctorSchema = z.object({
  identifier: z.any().transform(String).refine(val => val.length > 0, { message: "Email or phone number is required" }),
  password: z.any().transform(String).refine(val => val.length > 0, { message: "Password is required" })
});

// Define the update profile schema
const updateProfileSchema = z.object({
  name: z.any().transform(String).refine(val => val.length > 0, { message: "Name is required" }).refine(val => val.length <= 100, { message: "Name must be less than 100 characters" }).optional(),
  rmcNumber: z.any().transform(String).refine(val => val.length > 0, { message: "RMC Number is required" }).refine(val => val.length <= 50, { message: "RMC Number must be less than 50 characters" }).optional(),
  phoneNumber: z.any().transform(String).refine(val => val.length >= 10, { message: "Phone number must be at least 10 digits" }).refine(val => val.length <= 15, { message: "Phone number must be less than 15 digits" }).optional(),
  email: z.any().transform(String).refine(val => val.length > 0, { message: "Email is required" }).refine(val => val.length <= 100, { message: "Email must be less than 100 characters" }).refine(val => z.string().email().safeParse(val).success, { message: "Invalid email format" }).optional(),
  city: z.any().transform(String).refine(val => val.length > 0, { message: "City is required" }).refine(val => val.length <= 50, { message: "City must be less than 50 characters" }).optional(),
  address: z.any().optional(),
  clinicName: z.any().nullable().optional(),
  experience: z.any().optional(),
  education: z.any().optional(),
  bio: z.any().optional(),
  avatar: imageValidation.optional(),
  introduction: z.any().optional(),
  happyClients: z.any().transform(val => {
    const num = Number(val);
    return isNaN(num) ? 0 : num;
  }).optional(),
  about: z.any().optional(),
  qualification: z.any().optional(),
  gender: z.any().optional(),
  cashlessAvailable: z.any().optional().transform(Boolean),
  rating: z.any().optional(),
  clinicAddress: z.array(z.any()).optional(),
  availableDates: z.array(z.any()).optional(),
  awards: z.array(z.any()).optional(),
  specialization: z.any().optional(),
  surgeries: z.array(z.any()).optional(),
  opdLocations: z.array(z.object({
    clinicName: z.any().optional(),
    city: z.any().optional(),
    address: z.any().optional(),
    days: z.object({
      Mon: z.any().optional(),
      Tue: z.any().optional(),
      Wed: z.any().optional(),
      Thu: z.any().optional(),
      Fri: z.any().optional(),
      Sat: z.any().optional(),
      Sun: z.any().optional()
    }).optional(),
    startTime: z.any().optional(),
    endTime: z.any().optional(),
    slotMins: z.any().optional(),
    active: z.any().optional(),
    mapLocation: z.object({
      lat: z.any().optional(),
      lng: z.any().optional()
    }).nullable().optional()
  })).optional(),
  unavailabilityDate: z.object({
    from: z.any().optional(),
    to: z.any().optional()
  }).optional(),
  availabilityAfter: z.any().optional()
});

// Define the change password schema
const changePasswordSchema = z.object({
  currentPassword: z.any().transform(String).refine(val => val.length > 0, { message: "Current password is required" }),
  newPassword: strongPassword
});

module.exports = {
  registerDoctorSchema,
  loginDoctorSchema,
  updateProfileSchema,
  changePasswordSchema
};