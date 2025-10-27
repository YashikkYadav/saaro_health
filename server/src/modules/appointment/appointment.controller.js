const { 
  createAppointment,
  getAppointmentById,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getUpcomingAppointmentsByDoctorId,
  getLatestAppointmentByPatientId,
  deleteAppointment,
  getSharedBookingsByDoctorId,
  getAppointmentLocations,
  getAppointmentDates,
  getAppointmentTimeSlots,
  bookAppointmentService,
  createAppointmentForDoctorService,
  updateAppointmentStatusByIdService,
  updateAppointment
} = require('./appointment.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Book an appointment for a doctor
const bookAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointmentData = { ...req.body, doctorId };
    const appointment = await bookAppointmentService(appointmentData);
    
    return apiResponse.success(res, 'Appointment booked successfully', { appointment }, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Create an appointment for a doctor (admin/doctor)
const createAppointmentForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointmentData = { ...req.body, doctorId };
    const appointment = await createAppointmentForDoctorService(appointmentData);
    
    return apiResponse.success(res, 'Appointment created successfully', { appointment }, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Get upcoming appointments for a doctor
const getUpcomingAppointmentsForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getUpcomingAppointmentsByDoctorId(doctorId, parseInt(page), parseInt(limit));
    
    return apiResponse.success(res, 'Upcoming appointments retrieved successfully', result);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get latest appointment for a patient
const getLatestAppointmentForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointment = await getLatestAppointmentByPatientId(patientId);
    
    return apiResponse.success(res, 'Latest appointment retrieved successfully', { appointment });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get all appointments for a patient
const getAppointmentsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getAppointmentsByPatientId(patientId, parseInt(page), parseInt(limit));
    
    return apiResponse.success(res, 'Appointments retrieved successfully', result);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await updateAppointmentStatusByIdService(appointmentId, status);
    
    return apiResponse.success(res, 'Appointment status updated successfully', { appointment });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Update appointment
const updateAppointmentController = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = req.body;
    const appointment = await updateAppointment(appointmentId, updateData);
    
    return apiResponse.success(res, 'Appointment updated successfully', { appointment });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Get appointment by ID
const getAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await getAppointmentById(appointmentId);
    
    return apiResponse.success(res, 'Appointment retrieved successfully', { appointment });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Delete appointment
const deleteAppointmentController = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    await deleteAppointment(appointmentId);
    
    return apiResponse.success(res, 'Appointment deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Get shared bookings for a doctor
const getSharedBookings = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getSharedBookingsByDoctorId(doctorId, parseInt(page), parseInt(limit));
    
    return apiResponse.success(res, 'Shared bookings retrieved successfully', result);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get appointment locations for a doctor
const getLocations = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const locations = await getAppointmentLocations(doctorId);
    
    return apiResponse.success(res, 'Locations retrieved successfully', { locations });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get appointment dates for a doctor at a location
const getDates = async (req, res) => {
  try {
    const { doctorId, locationId } = req.params;
    const dates = await getAppointmentDates(doctorId, locationId);
    
    return apiResponse.success(res, 'Dates retrieved successfully', { dates });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get appointment time slots for a doctor at a location on a specific date
const getTimeSlots = async (req, res) => {
  try {
    const { doctorId, locationId, date } = req.params;
    const timeSlots = await getAppointmentTimeSlots(doctorId, locationId, date);
    
    return apiResponse.success(res, 'Time slots retrieved successfully', { timeSlots });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

module.exports = {
  bookAppointment,
  createAppointmentForDoctor,
  getUpcomingAppointmentsForDoctor,
  getLatestAppointmentForPatient,
  getAppointmentsForPatient,
  updateAppointmentStatus,
  updateAppointment: updateAppointmentController,
  getAppointment,
  deleteAppointmentController,
  getSharedBookings,
  getLocations,
  getDates,
  getTimeSlots
};