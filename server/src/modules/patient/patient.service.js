const Patient = require('./patient.model');
const Doctor = require('../doctor/doctor.model');

// Register a new patient
const registerPatient = async (patientData) => {
  try {
    const { doctorId, ...patientInfo } = patientData;
    
    // Check if patient with same phone number already exists
    const existingPatient = await Patient.findOne({
      phoneNumber: patientInfo.phoneNumber
    });

    if (existingPatient) {
      throw new Error('Patient with this phone number already exists');
    }

    // Create new patient
    const newPatient = new Patient(patientInfo);
    const savedPatient = await newPatient.save();
    
    // If doctorId is provided, establish bidirectional relationship
    if (doctorId) {
      // Add patient to doctor's patients array
      await Doctor.findByIdAndUpdate(
        doctorId,
        { $addToSet: { patients: savedPatient._id } }
      );
      
      // Add doctor to patient's doctors array
      await Patient.findByIdAndUpdate(
        savedPatient._id,
        { $addToSet: { doctors: doctorId } }
      );
    }

    return savedPatient;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Check if patient exists by phone number
const checkPatientExists = async (phoneNumber) => {
  try {
    const patient = await Patient.findOne({ phoneNumber });
    return patient;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all patients with pagination and search
const getAllPatients = async (page = 1, limit = 10, searchQuery = '') => {
  try {
    const skip = (page - 1) * limit;
    
    // Build search query
    const query = {};
    if (searchQuery) {
      query.$or = [
        { fullName: { $regex: searchQuery, $options: 'i' } },
        { phoneNumber: { $regex: searchQuery, $options: 'i' } },
        { email: { $regex: searchQuery, $options: 'i' } },
        { uid: { $regex: searchQuery, $options: 'i' } }
      ];
    }
    
    const [patients, totalPatients] = await Promise.all([
      Patient.find(query).skip(skip).limit(limit).sort({ createdAt: -1 }),
      Patient.countDocuments(query)
    ]);

    return {
      patients,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalPatients / limit),
        totalPatients
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get patient by ID
const getPatientById = async (patientId) => {
  try {
    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get patient by UID
const getPatientByUid = async (uid) => {
  try {
    const patient = await Patient.findOne({ uid });
    
    if (!patient) {
      throw new Error('Patient not found');
    }

    return patient;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update patient
const updatePatient = async (patientId, updateData) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(
      patientId,
      updateData,
      { new: true, runValidators: true }
    );

    if (!updatedPatient) {
      throw new Error('Patient not found');
    }

    return updatedPatient;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete patient
const deletePatient = async (patientId) => {
  try {
    // First, get the patient to access their doctor references
    const patient = await Patient.findById(patientId);
    
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Remove patient from all doctors' patients arrays
    if (patient.doctors && patient.doctors.length > 0) {
      await Doctor.updateMany(
        { _id: { $in: patient.doctors } },
        { $pull: { patients: patientId } }
      );
    }
    
    // Delete the patient
    const deletedPatient = await Patient.findByIdAndDelete(patientId);
    
    if (!deletedPatient) {
      throw new Error('Patient not found');
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerPatient,
  checkPatientExists,
  getAllPatients,
  getPatientById,
  getPatientByUid,
  updatePatient,
  deletePatient
};