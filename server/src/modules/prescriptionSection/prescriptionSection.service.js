const PrescriptionSection = require('./prescriptionSection.model');

// Create a new prescription section
const createPrescriptionSectionService = async (sectionData) => {
  try {
    const newSection = new PrescriptionSection(sectionData);
    const savedSection = await newSection.save();
    return savedSection;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all prescription sections for a doctor
const getPrescriptionSectionsService = async (doctorId) => {
  try {
    const sections = await PrescriptionSection.find({ doctorId }).sort({ createdAt: 1 });
    return sections;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get a specific prescription section by ID
const getPrescriptionSectionByIdService = async (sectionId) => {
  try {
    const section = await PrescriptionSection.findById(sectionId);
    if (!section) {
      throw new Error('Prescription section not found');
    }
    return section;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update a prescription section
const updatePrescriptionSectionService = async (sectionId, updateData) => {
  try {
    const updatedSection = await PrescriptionSection.findByIdAndUpdate(
      sectionId,
      updateData,
      { new: true, runValidators: true }
    );
    
    if (!updatedSection) {
      throw new Error('Prescription section not found');
    }
    
    return updatedSection;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete a prescription section
const deletePrescriptionSectionService = async (sectionId) => {
  try {
    const deletedSection = await PrescriptionSection.findByIdAndDelete(sectionId);
    
    if (!deletedSection) {
      throw new Error('Prescription section not found');
    }
    
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createPrescriptionSectionService,
  getPrescriptionSectionsService,
  getPrescriptionSectionByIdService,
  updatePrescriptionSectionService,
  deletePrescriptionSectionService
};