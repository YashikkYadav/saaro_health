const { 
  createPrescription,
  endConsultation,
  savePastVisit,
  getPrescriptionsByPatient,
  getDraftPrescription,
  getConsultationHistory
} = require('./prescription.service');

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
      return res.status(201).json({
        prescription: result.prescription,
        message: result.message
      });
    } else {
      return res.status(400).json({
        message: result.message,
        error: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while creating prescription',
      error: error.message
    });
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
      return res.status(200).json({
        prescription: result.prescription,
        pdfPath: result.pdfPath,
        message: result.message
      });
    } else {
      return res.status(400).json({
        message: result.message,
        error: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while ending consultation',
      error: error.message
    });
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
      return res.status(201).json({
        success: true,
        prescription: result.prescription,
        message: result.message
      });
    } else {
      return res.status(400).json({
        success: false,
        message: result.message,
        error: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: 'Internal server error while saving past visit',
      error: error.message
    });
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
      return res.status(200).json({
        prescriptions: result.prescriptions,
        message: result.message
      });
    } else {
      return res.status(400).json({
        message: result.message,
        error: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while retrieving prescriptions',
      error: error.message
    });
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
      return res.status(200).json({
        prescription: result.prescription,
        message: result.message
      });
    } else {
      return res.status(404).json({
        message: result.message,
        error: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while retrieving draft prescription',
      error: error.message
    });
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
      return res.status(200).json({
        consultations: result.consultations,
        message: result.message
      });
    } else {
      return res.status(400).json({
        message: result.message,
        error: result.error
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: 'Internal server error while retrieving consultation history',
      error: error.message
    });
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