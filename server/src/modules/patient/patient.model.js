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
      index: true,
      required: true,
      type: Number,
      // unique: true,
    },
    spouseName: {
      type: String,
      default: null,
    },
    alternatePhoneNumber: {
      type: Number,
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
  },
  {
    timestamps: true,
  },
);

const Patient = mongoose.model('Patient', patientSchema);
module.exports = Patient;