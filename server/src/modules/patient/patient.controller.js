const { 
  registerPatient, 
  checkPatientExists, 
  getAllPatients, 
  getPatientById, 
  getPatientByUid, 
  updatePatient, 
  deletePatient 
} = require('./patient.service');

// Register a new patient
const register = async (req, res) => {
  try {
    const patientData = req.body;
    const patient = await registerPatient(patientData);
    
    res.status(201).json({
      success: true,
      message: 'Patient registered successfully',
      patient
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Check if patient exists
const checkExists = async (req, res) => {
  try {
    const { phone } = req.body;
    const patient = await checkPatientExists(phone);
    
    res.status(200).json({
      success: true,
      message: 'Patient check completed successfully',
      exists: !!patient,
      patient
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all patients for a doctor with pagination and search
const getAll = async (req, res) => {
  try {
    const { page = 1, limit = 10, searchQuery = '' } = req.body;
    const result = await getAllPatients(parseInt(page), parseInt(limit), searchQuery);
    
    res.status(200).json({
      success: true,
      message: 'Patients retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get patient by ID
const getPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const patient = await getPatientById(patientId);
    
    res.status(200).json({
      success: true,
      message: 'Patient retrieved successfully',
      patient
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get patient by UID
const getPatientByUidController = async (req, res) => {
  try {
    const { uid } = req.params;
    const patient = await getPatientByUid(uid);
    
    res.status(200).json({
      success: true,
      message: 'Patient retrieved successfully',
      patient
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Update patient
const update = async (req, res) => {
  try {
    const { patientId } = req.params;
    const updateData = req.body;
    const updatedPatient = await updatePatient(patientId, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Patient updated successfully',
      patient: updatedPatient
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete patient
const deletePatientController = async (req, res) => {
  try {
    const { patientId } = req.params;
    await deletePatient(patientId);
    
    res.status(200).json({
      success: true,
      message: 'Patient deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
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