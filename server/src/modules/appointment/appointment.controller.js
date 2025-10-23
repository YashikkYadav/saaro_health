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
  updateAppointmentStatusByIdService
} = require('./appointment.service');

// Book an appointment for a doctor
const bookAppointment = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointmentData = { ...req.body, doctorId };
    const appointment = await bookAppointmentService(appointmentData);
    
    res.status(201).json({
      success: true,
      message: 'Appointment booked successfully',
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Create an appointment for a doctor (admin/doctor)
const createAppointmentForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const appointmentData = { ...req.body, doctorId };
    const appointment = await createAppointmentForDoctorService(appointmentData);
    
    res.status(201).json({
      success: true,
      message: 'Appointment created successfully',
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get upcoming appointments for a doctor
const getUpcomingAppointmentsForDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getUpcomingAppointmentsByDoctorId(doctorId, parseInt(page), parseInt(limit));
    
    res.status(200).json({
      success: true,
      message: 'Upcoming appointments retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get latest appointment for a patient
const getLatestAppointmentForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const appointment = await getLatestAppointmentByPatientId(patientId);
    
    res.status(200).json({
      success: true,
      message: 'Latest appointment retrieved successfully',
      appointment
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get all appointments for a patient
const getAppointmentsForPatient = async (req, res) => {
  try {
    const { patientId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getAppointmentsByPatientId(patientId, parseInt(page), parseInt(limit));
    
    res.status(200).json({
      success: true,
      message: 'Appointments retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Update appointment status
const updateAppointmentStatus = async (req, res) => {
  try {
    const { appointmentId, status } = req.body;
    const appointment = await updateAppointmentStatusByIdService(appointmentId, status);
    
    res.status(200).json({
      success: true,
      message: 'Appointment status updated successfully',
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update appointment
const updateAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const updateData = req.body;
    const appointment = await updateAppointmentService(appointmentId, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Appointment updated successfully',
      appointment
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Get appointment by ID
const getAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    const appointment = await getAppointmentById(appointmentId);
    
    res.status(200).json({
      success: true,
      message: 'Appointment retrieved successfully',
      appointment
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Delete appointment
const deleteAppointmentController = async (req, res) => {
  try {
    const { appointmentId } = req.params;
    await deleteAppointment(appointmentId);
    
    res.status(200).json({
      success: true,
      message: 'Appointment deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get shared bookings for a doctor
const getSharedBookings = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getSharedBookingsByDoctorId(doctorId, parseInt(page), parseInt(limit));
    
    res.status(200).json({
      success: true,
      message: 'Shared bookings retrieved successfully',
      ...result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get appointment locations for a doctor
const getLocations = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const locations = await getAppointmentLocations(doctorId);
    
    res.status(200).json({
      success: true,
      message: 'Locations retrieved successfully',
      locations
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get appointment dates for a doctor at a location
const getDates = async (req, res) => {
  try {
    const { doctorId, locationId } = req.params;
    const dates = await getAppointmentDates(doctorId, locationId);
    
    res.status(200).json({
      success: true,
      message: 'Dates retrieved successfully',
      dates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get appointment time slots for a doctor at a location on a specific date
const getTimeSlots = async (req, res) => {
  try {
    const { doctorId, locationId, date } = req.params;
    const timeSlots = await getAppointmentTimeSlots(doctorId, locationId, date);
    
    res.status(200).json({
      success: true,
      message: 'Time slots retrieved successfully',
      timeSlots
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

module.exports = {
  bookAppointment,
  createAppointmentForDoctor,
  getUpcomingAppointmentsForDoctor,
  getLatestAppointmentForPatient,
  getAppointmentsForPatient,
  updateAppointmentStatus,
  updateAppointment,
  getAppointment,
  deleteAppointmentController,
  getSharedBookings,
  getLocations,
  getDates,
  getTimeSlots
};