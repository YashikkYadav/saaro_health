const { createReview, getReviewsByDoctorId, getReviewsByPatientId, getAverageRatingByDoctorId } = require('./review.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Create a new review
const createReviewController = async (req, res) => {
  try {
    const reviewData = req.body;
    
    // Add doctorId from params if not provided in body
    if (req.params.doctorId && !reviewData.doctorId) {
      reviewData.doctorId = req.params.doctorId;
    }

    const review = await createReview(reviewData);
    
    return apiResponse.success(res, 'Review created successfully', { review });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Get reviews by doctor ID
const getReviewsByDoctorIdController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const reviews = await getReviewsByDoctorId(doctorId);
    
    return apiResponse.success(res, 'Reviews retrieved successfully', { reviews });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Get reviews by patient ID
const getReviewsByPatientIdController = async (req, res) => {
  try {
    const { patientId } = req.params;
    const reviews = await getReviewsByPatientId(patientId);
    
    return apiResponse.success(res, 'Reviews retrieved successfully', { reviews });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Get average rating for a doctor
const getAverageRatingByDoctorIdController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const averageRating = await getAverageRatingByDoctorId(doctorId);
    
    return apiResponse.success(res, 'Average rating retrieved successfully', { averageRating });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

module.exports = {
  createReviewController,
  getReviewsByDoctorIdController,
  getReviewsByPatientIdController,
  getAverageRatingByDoctorIdController
};