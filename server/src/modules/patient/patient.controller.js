const { 
  registerPatient, 
  checkPatientExists, 
  getAllPatients, 
  getPatientById, 
  getPatientByUid, 
  updatePatient, 
  deletePatient 
} = require('./patient.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Register a new patient
const register = async (req, res) => {
  try {
    const patientData = req.body;
    const patient = await registerPatient(patientData);
    
    return apiResponse.success(res, 'Patient registered successfully', { patient }, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Check if patient exists
const checkExists = async (req, res) => {
  try {
    const { phone } = req.body;
    const patient = await checkPatientExists(phone);
    
    return apiResponse.success(res, 'Patient check completed successfully', { 
      exists: !!patient, 
      patient 
    });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get all patients for a doctor with pagination and search
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchQuery = '' } = req.body;
    const result = await getAllPatients(parseInt(page), parseInt(limit), searchQuery);
    
    return apiResponse.success(res, 'Patients retrieved successfully', result);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get patient by ID
const getPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await getPatientById(patientId);
    
    return apiResponse.success(res, 'Patient retrieved successfully', { patient });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Get patient by UID
const getPatientByUidController = async (req, res) => {
  try {
    const { uid } = req.params;
    const patient = await getPatientByUid(uid);
    
    return apiResponse.success(res, 'Patient retrieved successfully', { patient });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Update patient
const update = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updateData = req.body;
    const updatedPatient = await updatePatient(patientId, updateData);
    
    return apiResponse.success(res, 'Patient updated successfully', { patient: updatedPatient });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Delete patient
const deletePatientController = async (req, res) => {
  try {
    const { patientId } = req.params;
    await deletePatient(patientId);
    
    return apiResponse.success(res, 'Patient deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

module.exports = {
  register,
  checkExists,
  getAll,
  getPatient,
  getPatientByUidController,
  update,
  deletePatientController
};