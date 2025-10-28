const Review = require('./review.model');
const Doctor = require('../doctor/doctor.model');
const Patient = require('../patient/patient.model');

// Create a new review
const createReview = async (reviewData) => {
  try {
    const { text, rating, doctorId, patientId } = reviewData;

    // Validate doctor exists
    const doctor = await Doctor.findById(doctorId);
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Validate patient exists
    const patient = await Patient.findById(patientId);
    if (!patient) {
      throw new Error('Patient not found');
    }

    // Create the review
    const review = new Review({
      text,
      rating,
      doctorId,
      patientId
    });

    const savedReview = await review.save();

    // Add review reference to doctor
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $addToSet: { reviews: savedReview._id } }
    );

    // Add review reference to patient
    await Patient.findByIdAndUpdate(
      patientId,
      { $addToSet: { reviews: savedReview._id } }
    );

    // Populate the review with references
    const populatedReview = await Review.findById(savedReview._id)
      .populate('doctorId', 'name clinicName')
      .populate('patientId', 'fullName');

    return populatedReview;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get reviews by doctor ID
const getReviewsByDoctorId = async (doctorId) => {
  try {
    const reviews = await Review.find({ doctorId })
      .populate('patientId', 'fullName')
      .sort({ createdAt: -1 });

    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get reviews by patient ID
const getReviewsByPatientId = async (patientId) => {
  try {
    const reviews = await Review.find({ patientId })
      .populate('doctorId', 'name clinicName')
      .sort({ createdAt: -1 });

    return reviews;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get average rating for a doctor
const getAverageRatingByDoctorId = async (doctorId) => {
  try {
    const result = await Review.aggregate([
      { $match: { doctorId: mongoose.Types.ObjectId(doctorId) } },
      { $group: { _id: null, averageRating: { $avg: '$rating' }, totalReviews: { $sum: 1 } } }
    ]);

    return result.length > 0 ? result[0] : { averageRating: 0, totalReviews: 0 };
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createReview,
  getReviewsByDoctorId,
  getReviewsByPatientId,
  getAverageRatingByDoctorId
};