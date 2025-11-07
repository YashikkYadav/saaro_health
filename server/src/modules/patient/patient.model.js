const mongoose = require('mongoose');

const patientSchema = new mongoose.Schema(
  {
    uid: {
      index: true,
      required: true,
      type: String,
      unique: true,
    },
    title: {
      type: String,
      required: true,
    },
    fullName: {
      required: true,
      type: String,
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      validate: {
        validator: function (v) {
          // Exactly 10 digits
          return /^\d{10}$/.test(v);
        },
        message: "Phone number must be exactly 10 digits",
      },
      index: true,
    },

    spouseName: {
      type: String,
      default: null,
    },
    alternatePhoneNumber: {
      type: String,
      validate: {
        validator: function (v) {
          // Exactly 10 digits or empty
          return !v || /^\d{10}$/.test(v);
        },
        message: "Alternate phone number must be exactly 10 digits",
      },
      default: null,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      default: null,
    },
    email: {
      type: String,
      default: null,
    },
    address: {
      type: String,
    },
    bloodGroup: {
      type: String,
      default: null,
    },
    allergies: {
      type: String,
      default: null,
    },
    tags: {
      type: String,
      default: null,
    },
    referredBy: {
      type: String,
      default: null,
    },
    otp: {
      type: Number,
      default: null,
    },
    category: {
      type: String,
      default: 'Follow-up',
    },
    // Adding status field with enum values
    status: {
      type: String,
      enum: ['Waiting', 'In Consultation', 'Completed'],
      default: 'Waiting',
    },
    // Adding reference to doctors
    doctors: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Doctor",
      },
    ],
    // Adding references to related entities
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
    // Adding reference to reviews
    reviews: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review",
      },
    ],
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;