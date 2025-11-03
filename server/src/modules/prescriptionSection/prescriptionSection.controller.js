const { 
  createPrescriptionSectionService,
  getPrescriptionSectionsService,
  getPrescriptionSectionByIdService,
  updatePrescriptionSectionService,
  deletePrescriptionSectionService
} = require('./prescriptionSection.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Create a new prescription section
const createPrescriptionSection = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const sectionData = { ...req.body, doctorId };
    
    const result = await createPrescriptionSectionService(sectionData);
    return apiResponse.success(res, 'Prescription section created successfully', { section: result });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Get all prescription sections for a doctor
const getPrescriptionSections = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    const result = await getPrescriptionSectionsService(doctorId);
    return apiResponse.success(res, 'Prescription sections retrieved successfully', { sections: result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get a specific prescription section by ID
const getPrescriptionSectionById = async (req, res) => {
  try {
    const { sectionId } = req.params;
    
    const result = await getPrescriptionSectionByIdService(sectionId);
    return apiResponse.success(res, 'Prescription section retrieved successfully', { section: result });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Update a prescription section
const updatePrescriptionSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    const updateData = req.body;
    
    const result = await updatePrescriptionSectionService(sectionId, updateData);
    return apiResponse.success(res, 'Prescription section updated successfully', { section: result });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Delete a prescription section
const deletePrescriptionSection = async (req, res) => {
  try {
    const { sectionId } = req.params;
    
    await deletePrescriptionSectionService(sectionId);
    return apiResponse.success(res, 'Prescription section deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

module.exports = {
  createPrescriptionSection,
  getPrescriptionSections,
  getPrescriptionSectionById,
  updatePrescriptionSection,
  deletePrescriptionSection
};