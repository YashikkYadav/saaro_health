const Prescription = require('./prescription.model');

/**
 * Create a new prescription or update existing draft
 * @param {string} doctorId
 * @param {string} patientId
 * @param {Object} prescriptionData
 * @returns {Object} Result with prescription and status
 */
const createPrescription = async (doctorId, patientId, prescriptionData) => {
  try {
    // Check if there's an existing draft prescription
    let prescription = await Prescription.findOne({
      doctorId,
      patientId,
      status: 'draft'
    });

    if (prescription) {
      // Update existing draft
      prescription = await Prescription.findByIdAndUpdate(
        prescription._id,
        { 
          ...prescriptionData,
          doctorId,
          patientId,
          status: 'draft'
        },
        { new: true }
      );
      return {
        success: true,
        message: 'Prescription draft updated successfully',
        prescription
      };
    } else {
      // Create new draft prescription
      prescription = new Prescription({
        doctorId,
        patientId,
        ...prescriptionData,
        status: 'draft'
      });
      await prescription.save();
      return {
        success: true,
        message: 'Prescription draft created successfully',
        prescription
      };
    }
  } catch (error) {
    return {
      success: false,
      message: 'Failed to create/update prescription draft',
      error: error.message
    };
  }
};

/**
 * End consultation and finalize prescription
 * @param {string} doctorId
 * @param {string} patientId
 * @param {Object} prescriptionData
 * @returns {Object} Result with prescription and PDF path
 */
const endConsultation = async (doctorId, patientId, prescriptionData) => {
  try {
    // Check if there's an existing draft prescription
    let prescription = await Prescription.findOne({
      doctorId,
      patientId,
      status: 'draft'
    });

    if (prescription) {
      // Update existing draft to complete
      prescription = await Prescription.findByIdAndUpdate(
        prescription._id,
        {
          ...prescriptionData,
          doctorId,
          patientId,
          status: 'complete',
          consultationDate: new Date()
        },
        { new: true }
      );
    } else {
      // Create new complete prescription
      prescription = new Prescription({
        doctorId,
        patientId,
        ...prescriptionData,
        status: 'complete',
        consultationDate: new Date()
      });
      await prescription.save();
    }

    // In a real implementation, you would generate a PDF here
    const pdfPath = `/prescriptions/${prescription._id}.pdf`;

    return {
      success: true,
      message: 'Consultation ended and prescription finalized successfully',
      prescription,
      pdfPath
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to end consultation and finalize prescription',
      error: error.message
    };
  }
};

/**
 * Save consultation as past visit
 * @param {string} doctorId
 * @param {string} patientId
 * @param {Object} consultationData
 * @returns {Object} Result with prescription
 */
const savePastVisit = async (doctorId, patientId, consultationData) => {
  try {
    // Create a new complete prescription for past visit
    const prescription = new Prescription({
      doctorId,
      patientId,
      ...consultationData,
      status: 'complete',
      consultationDate: consultationData.visitDate || new Date()
    });

    await prescription.save();

    return {
      success: true,
      message: 'Consultation saved as past visit successfully',
      prescription
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to save consultation as past visit',
      error: error.message
    };
  }
};

/**
 * Get all prescriptions for a patient
 * @param {string} doctorId
 * @param {string} patientId
 * @returns {Object} Result with prescriptions array
 */
const getPrescriptionsByPatient = async (doctorId, patientId) => {
  try {
    const prescriptions = await Prescription.find({
      doctorId,
      patientId,
      status: 'complete'
    }).sort({ consultationDate: -1 });

    return {
      success: true,
      message: 'Prescriptions retrieved successfully',
      prescriptions
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve prescriptions',
      error: error.message
    };
  }
};

/**
 * Get draft prescription for a patient
 * @param {string} doctorId
 * @param {string} patientId
 * @returns {Object} Result with prescription
 */
const getDraftPrescription = async (doctorId, patientId) => {
  try {
    const prescription = await Prescription.findOne({
      doctorId,
      patientId,
      status: 'draft'
    });

    if (!prescription) {
      return {
        success: false,
        message: 'No draft prescription found for this patient'
      };
    }

    return {
      success: true,
      message: 'Draft prescription retrieved successfully',
      prescription
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve draft prescription',
      error: error.message
    };
  }
};

/**
 * Get patient consultation history
 * @param {string} doctorId
 * @param {string} patientId
 * @returns {Object} Result with consultations array
 */
const getConsultationHistory = async (doctorId, patientId) => {
  try {
    const consultations = await Prescription.find({
      doctorId,
      patientId,
      status: 'complete'
    }).sort({ consultationDate: -1 });

    return {
      success: true,
      message: 'Consultation history retrieved successfully',
      consultations
    };
  } catch (error) {
    return {
      success: false,
      message: 'Failed to retrieve consultation history',
      error: error.message
    };
  }
};

module.exports = {
  createPrescription,
  endConsultation,
  savePastVisit,
  getPrescriptionsByPatient,
  getDraftPrescription,
  getConsultationHistory
};