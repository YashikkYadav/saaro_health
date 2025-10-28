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

// OPD Location sub-schema
const opdLocationSchema = new mongoose.Schema({
  clinicName: { type: String, default: '' },
  city: { type: String, default: '' },
  address: { type: String, default: '' },
  days: {
    Mon: { type: Boolean, default: false },
    Tue: { type: Boolean, default: false },
    Wed: { type: Boolean, default: false },
    Thu: { type: Boolean, default: false },
    Fri: { type: Boolean, default: false },
    Sat: { type: Boolean, default: false },
    Sun: { type: Boolean, default: false }
  },
  startTime: { type: String, default: '09:00' },
  endTime: { type: String, default: '17:00' },
  slotMins: { type: Number, default: 10 },
  active: { type: Boolean, default: true },
  mapLocation: {
    type: {
      lat: { type: Number },
      lng: { type: Number }
    },
    default: null
  }
});

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

    // OPD Locations
    opdLocations: { type: [opdLocationSchema], default: [] },

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
  },
  { timestamps: true }
);

const Doctor = mongoose.model('Doctor', doctorSchema);

module.exports = Doctor;