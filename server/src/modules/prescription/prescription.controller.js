const { 
  createPrescription,
  endConsultation,
  savePastVisit,
  getPrescriptionsByPatient,
  getDraftPrescription,
  getConsultationHistory
} = require('./prescription.service');
const apiResponse = require('../../utils/apiResponse.utils');

/**
 * Create prescription
 * POST /:doctorId/prescription/:patientId
 */
const createPrescriptionController = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    const prescriptionData = req.body;

    const result = await createPrescription(doctorId, patientId, prescriptionData);

    if (result.success) {
      return apiResponse.success(res, result.message, { 
        prescription: result.prescription 
      }, 201);
    } else {
      return apiResponse.error(res, result.message, 400, result.error);
    }
  } catch (error) {
    return apiResponse.error(res, 'Internal server error while creating prescription', 500, error.message);
  }
};

/**
 * End consultation and finalize prescription
 * POST /:doctorId/prescription/:patientId/end-consultation
 */
const endConsultationController = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    const prescriptionData = req.body;

    const result = await endConsultation(doctorId, patientId, prescriptionData);

    if (result.success) {
      return apiResponse.success(res, result.message, { 
        prescription: result.prescription,
        pdfPath: result.pdfPath
      });
    } else {
      return apiResponse.error(res, result.message, 400, result.error);
    }
  } catch (error) {
    return apiResponse.error(res, 'Internal server error while ending consultation', 500, error.message);
  }
};

/**
 * Save consultation as past visit
 * POST /:doctorId/prescription/:patientId/save-past-visit
 */
const savePastVisitController = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;
    const consultationData = req.body;

    const result = await savePastVisit(doctorId, patientId, consultationData);

    if (result.success) {
      return apiResponse.success(res, result.message, { 
        prescription: result.prescription 
      }, 201);
    } else {
      return apiResponse.error(res, result.message, 400, result.error);
    }
  } catch (error) {
    return apiResponse.error(res, 'Internal server error while saving past visit', 500, error.message);
  }
};

/**
 * Get prescriptions by patient ID
 * GET /:doctorId/prescription/:patientId
 */
const getPrescriptionsByPatientController = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const result = await getPrescriptionsByPatient(doctorId, patientId);

    if (result.success) {
      return apiResponse.success(res, result.message, { 
        prescriptions: result.prescriptions 
      });
    } else {
      return apiResponse.error(res, result.message, 400, result.error);
    }
  } catch (error) {
    return apiResponse.error(res, 'Internal server error while retrieving prescriptions', 500, error.message);
  }
};

/**
 * Get draft prescription for patient
 * GET /:doctorId/prescription/:patientId/draft
 */
const getDraftPrescriptionController = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const result = await getDraftPrescription(doctorId, patientId);

    if (result.success) {
      return apiResponse.success(res, result.message, { 
        prescription: result.prescription 
      });
    } else {
      return apiResponse.error(res, result.message, 404, result.error);
    }
  } catch (error) {
    return apiResponse.error(res, 'Internal server error while retrieving draft prescription', 500, error.message);
  }
};

/**
 * Get patient consultation history
 * GET /:doctorId/prescription/:patientId/history
 */
const getConsultationHistoryController = async (req, res) => {
  try {
    const { doctorId, patientId } = req.params;

    const result = await getConsultationHistory(doctorId, patientId);

    if (result.success) {
      return apiResponse.success(res, result.message, { 
        consultations: result.consultations 
      });
    } else {
      return apiResponse.error(res, result.message, 400, result.error);
    }
  } catch (error) {
    return apiResponse.error(res, 'Internal server error while retrieving consultation history', 500, error.message);
  }
};

module.exports = {
  createPrescription: createPrescriptionController,
  endConsultation: endConsultationController,
  savePastVisit: savePastVisitController,
  getPrescriptionsByPatient: getPrescriptionsByPatientController,
  getDraftPrescription: getDraftPrescriptionController,
  getConsultationHistory: getConsultationHistoryController
};