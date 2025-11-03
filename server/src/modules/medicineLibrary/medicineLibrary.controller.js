const { 
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  searchMedicines
} = require('./medicineLibrary.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Create a new medicine
const createMedicineController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const medicineData = req.body;
    
    const medicine = await createMedicine(doctorId, medicineData);
    return apiResponse.success(res, 'Medicine created successfully', medicine, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get all medicines for a doctor
const getMedicinesController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    const medicines = await getMedicines(doctorId);
    return apiResponse.success(res, 'Medicines retrieved successfully', medicines);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get medicine by ID
const getMedicineByIdController = async (req, res) => {
  try {
    const { doctorId, medicineId } = req.params;
    
    const medicine = await getMedicineById(doctorId, medicineId);
    if (!medicine) {
      return apiResponse.error(res, 'Medicine not found', 404);
    }
    
    return apiResponse.success(res, 'Medicine retrieved successfully', medicine);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Update medicine
const updateMedicineController = async (req, res) => {
  try {
    const { doctorId, medicineId } = req.params;
    const updateData = req.body;
    
    const medicine = await updateMedicine(doctorId, medicineId, updateData);
    if (!medicine) {
      return apiResponse.error(res, 'Medicine not found', 404);
    }
    
    return apiResponse.success(res, 'Medicine updated successfully', medicine);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Delete medicine
const deleteMedicineController = async (req, res) => {
  try {
    const { doctorId, medicineId } = req.params;
    
    const medicine = await deleteMedicine(doctorId, medicineId);
    if (!medicine) {
      return apiResponse.error(res, 'Medicine not found', 404);
    }
    
    return apiResponse.success(res, 'Medicine deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Search medicines by name
const searchMedicinesController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { searchTerm } = req.query;
    
    const medicines = await searchMedicines(doctorId, searchTerm);
    return apiResponse.success(res, 'Medicines retrieved successfully', medicines);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

module.exports = {
  createMedicineController,
  getMedicinesController,
  getMedicineByIdController,
  updateMedicineController,
  deleteMedicineController,
  searchMedicinesController
};