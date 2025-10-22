const mongoose = require('mongoose');

// Treatment sub-schema for top treatments
const treatmentSchema = new mongoose.Schema({
  key: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  icon: {
    type: String,
    required: true
  }
});
// const treatmentSchema = new mongoose.Schema({ ... });

const doctorSchema = new mongoose.Schema(
  {
    // Basic doctor information
    name: { type: String ,required: true},
    rmcNumber: { type: String, unique: true, index: true,required: true },
    phoneNumber: { type: String, index: true ,required: true },
    email: { type: String, unique: true, index: true,required: true },
    city: { type: String ,required: true },
    address: { type: String },
    clinicName: { type: String, default: null },
    password: { type: String,required: true },

    // Additional doctor information
    experience: { type: Number, default: 0 }, 
    education: { type: String, default: "" },
    bio: { type: String, default: "" },
    avatar: { type: String, default: "" },

    // Profile-specific information
    introduction: { type: String, default: "" },
    happyClients: { type: Number, default: 0 },
    about: { type: String, default: "" },
    qualification: { type: String },
    gender: { type: String },
    cashlessAvailable: { type: Boolean },
    // distanceKm: { type: Number },
    rating: { type: String },           // average of ratings 
    reviews:[{ type: mongoose.Schema.Types.ObjectId, ref: "Review" }],          // review id we can use this to get review details
    clinicAddress: [{ type: String }],   // clinic address multiple

    availableDates: [{ type: String }],
    awards: [{ type: String }],

    // Treatments and specialization
    topTreatments: [treatmentSchema],
    specialization: { type: String },
    surgeries: [{ type: String }],


    // Location (latitude & longitude)
    locations: [
      {
        latitude: { type: String },
        longitude: { type: String },
      },
    ],

    // Availability information
    unavailabilityDate: {
      from: { type: Date },
      to: { type: Date },
    },
    availabilityAfter: { type: Number },
   patients: [
       {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Patient",
     },
   ],

   appointments: [
       {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Appointment",
     },
   ],
   
   prescriptions: [
       {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Prescription",
     },
   ],
   
   documents: [
       {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Document",
     },
   ],
   
   invoices: [
       {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Invoice",
     },
   ],
   
   messages: [
       {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
     },
   ],
  },
  { timestamps: true }
);

const DoctorModal = mongoose.model('Doctor', doctorSchema);

module.exports = DoctorModal;