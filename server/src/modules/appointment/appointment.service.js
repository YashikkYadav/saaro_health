const Appointment = require('./appointment.model');
const Doctor = require('../doctor/doctor.model');
const Patient = require('../patient/patient.model');

// Create a new appointment (existing function, but let's make sure it's correct)
const createAppointment = async (appointmentData) => {
  try {
    const { doctorId, patientId, date, time, location, type, mode, status, source, ...otherInfo } = appointmentData;
    
    // Get patient details to embed in the appointment
    const patient = await Patient.findById(patientId).select('fullName phoneNumber');
    
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Create new appointment with embedded patient data for consistency
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date),
      time,
      location,
      type,
      mode,
      status: status || 'Pending',
      source: source || 'manual',
      // Embed patient data for consistent structure
      name: patient.fullName,
      phoneNumber: patient.phoneNumber,
      ...otherInfo
    });
    
    const savedAppointment = await newAppointment.save();
    
    // Add appointment to doctor's appointments array
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $addToSet: { appointments: savedAppointment._id } }
    );
    
    // Add appointment to patient's appointments array
    await Patient.findByIdAndUpdate(
      patientId,
      { $addToSet: { appointments: savedAppointment._id } }
    );
    
    // Populate the saved appointment with doctor and patient details
    const populatedAppointment = await Appointment.findById(savedAppointment._id)
      .populate('doctorId', 'name')
      .populate('patientId', 'fullName phoneNumber');
    
    return populatedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Book an appointment for a doctor
const bookAppointmentService = async (appointmentData) => {
  try {
    const { doctorId, patientId, date, time, location, type, mode, ...otherInfo } = appointmentData;
    
    // Get patient details to embed in the appointment
    const patient = await Patient.findById(patientId).select('fullName phoneNumber');
    
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Create new appointment with embedded patient data for consistency
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date),
      time,
      location,
      type,
      mode,
      status: 'confirmed',
      source: 'manual',
      // Embed patient data for consistent structure
      name: patient.fullName,
      phoneNumber: patient.phoneNumber,
      ...otherInfo
    });
    
    const savedAppointment = await newAppointment.save();
    
    // Add appointment to doctor's appointments array
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $addToSet: { appointments: savedAppointment._id } }
    );
    
    // Add appointment to patient's appointments array
    await Patient.findByIdAndUpdate(
      patientId,
      { $addToSet: { appointments: savedAppointment._id } }
    );
    
    // Populate the saved appointment with doctor and patient details
    const populatedAppointment = await Appointment.findById(savedAppointment._id)
      .populate('doctorId', 'name')
      .populate('patientId', 'fullName phoneNumber');
    
    return populatedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create an appointment for a doctor (admin/doctor)
const createAppointmentForDoctorService = async (appointmentData) => {
  try {
    const { doctorId, patientId, date, time, location, type, mode, status, source, ...otherInfo } = appointmentData;
    
    // Get patient details to embed in the appointment
    const patient = await Patient.findById(patientId).select('fullName phoneNumber');
    
    if (!patient) {
      throw new Error('Patient not found');
    }
    
    // Create new appointment with embedded patient data for consistency
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date),
      time,
      location,
      type,
      mode,
      status: status || 'Pending',
      source: source || 'manual',
      // Embed patient data for consistent structure
      name: patient.fullName,
      phoneNumber: patient.phoneNumber,
      ...otherInfo
    });
    
    const savedAppointment = await newAppointment.save();
    
    // Add appointment to doctor's appointments array
    await Doctor.findByIdAndUpdate(
      doctorId,
      { $addToSet: { appointments: savedAppointment._id } }
    );
    
    // Add appointment to patient's appointments array
    await Patient.findByIdAndUpdate(
      patientId,
      { $addToSet: { appointments: savedAppointment._id } }
    );
    
    // Populate the saved appointment with doctor and patient details
    const populatedAppointment = await Appointment.findById(savedAppointment._id)
      .populate('doctorId', 'name')
      .populate('patientId', 'fullName phoneNumber');
    
    return populatedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get appointment by ID (existing function)
const getAppointmentById = async (appointmentId) => {
  try {
    const appointment = await Appointment.findById(appointmentId)
      .populate('doctorId', 'name')
      .populate('patientId', 'fullName');
    
    if (!appointment) {
      throw new Error('Appointment not found');
    }

    return appointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all appointments for a doctor (existing function)
const getAppointmentsByDoctorId = async (doctorId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const [appointments, totalAppointments] = await Promise.all([
      Appointment.find({ doctorId })
        .populate('patientId', 'fullName')
        .sort({ date: 1, time: 1 })
        .skip(skip)
        .limit(limit),
      Appointment.countDocuments({ doctorId })
    ]);

    return {
      appointments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalAppointments / limit),
        totalAppointments
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all appointments for a patient (existing function)
const getAppointmentsByPatientId = async (patientId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const [appointments, totalAppointments] = await Promise.all([
      Appointment.find({ patientId })
        .populate('doctorId', 'name')
        .sort({ date: -1, time: -1 }) // Most recent first
        .skip(skip)
        .limit(limit),
      Appointment.countDocuments({ patientId })
    ]);

    return {
      appointments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalAppointments / limit),
        totalAppointments
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get upcoming appointments for a doctor (existing function)
const getUpcomingAppointmentsByDoctorId = async (doctorId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const [appointments, totalAppointments] = await Promise.all([
      Appointment.find({ 
        doctorId, 
        $or: [
          { date: { $gt: today } },
          { date: today, time: { $gte: new Date().toTimeString().substring(0, 5) } }
        ]
      })
        .populate('patientId', 'fullName')
        .sort({ date: 1, time: 1 })
        .skip(skip)
        .limit(limit),
      Appointment.countDocuments({ 
        doctorId, 
        $or: [
          { date: { $gt: today } },
          { date: today, time: { $gte: new Date().toTimeString().substring(0, 5) } }
        ]
      })
    ]);

    return {
      appointments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalAppointments / limit),
        totalAppointments
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get latest appointment for a patient (existing function)
const getLatestAppointmentByPatientId = async (patientId) => {
  try {
    const appointment = await Appointment.findOne({ patientId })
      .populate('doctorId', 'name')
      .populate('patientId', 'fullName')
      .sort({ date: -1, time: -1 }); // Most recent first
    
    return appointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update appointment status (existing function)
const updateAppointmentStatus = async (appointmentId, status) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    ).populate('doctorId', 'name')
     .populate('patientId', 'fullName');

    if (!updatedAppointment) {
      throw new Error('Appointment not found');
    }

    return updatedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update appointment status by ID
const updateAppointmentStatusByIdService = async (appointmentId, status) => {
  try {
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      { status },
      { new: true }
    ).populate('doctorId', 'name')
     .populate('patientId', 'fullName');

    if (!updatedAppointment) {
      throw new Error('Appointment not found');
    }

    return updatedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update appointment (existing function)
const updateAppointment = async (appointmentId, updateData) => {
  try {
    // First, get the current appointment to check if patientId is being changed
    const currentAppointment = await Appointment.findById(appointmentId);
    
    if (!currentAppointment) {
      throw new Error('Appointment not found');
    }
    
    // If patientId is being updated, we need to update both patient documents
    if (updateData.patientId && updateData.patientId !== currentAppointment.patientId.toString()) {
      // Remove appointment from old patient's appointments array
      await Patient.findByIdAndUpdate(
        currentAppointment.patientId,
        { $pull: { appointments: appointmentId } }
      );
      
      // Add appointment to new patient's appointments array
      await Patient.findByIdAndUpdate(
        updateData.patientId,
        { $addToSet: { appointments: appointmentId } }
      );
    }
    
    const updatedAppointment = await Appointment.findByIdAndUpdate(
      appointmentId,
      updateData,
      { new: true, runValidators: true }
    ).populate('doctorId', 'name')
     .populate('patientId', 'fullName');

    if (!updatedAppointment) {
      throw new Error('Appointment not found');
    }

    return updatedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete appointment (existing function)
const deleteAppointment = async (appointmentId) => {
  try {
    // First, get the appointment to access doctorId and patientId
    const appointment = await Appointment.findById(appointmentId);
    
    if (!appointment) {
      throw new Error('Appointment not found');
    }
    
    // Remove appointment from doctor's appointments array
    await Doctor.findByIdAndUpdate(
      appointment.doctorId,
      { $pull: { appointments: appointmentId } }
    );
    
    // Remove appointment from patient's appointments array
    await Patient.findByIdAndUpdate(
      appointment.patientId,
      { $pull: { appointments: appointmentId } }
    );
    
    // Delete the appointment
    const deletedAppointment = await Appointment.findByIdAndDelete(appointmentId);
    
    if (!deletedAppointment) {
      throw new Error('Appointment not found');
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get shared bookings for a doctor (existing function)
const getSharedBookingsByDoctorId = async (doctorId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const [appointments, totalAppointments] = await Promise.all([
      Appointment.find({ doctorId, source: { $ne: 'manual' } })
        .populate('patientId', 'fullName')
        .sort({ date: 1, time: 1 })
        .skip(skip)
        .limit(limit),
      Appointment.countDocuments({ doctorId, source: { $ne: 'manual' } })
    ]);

    return {
      appointments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalAppointments / limit),
        totalAppointments
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};
 
// Get appointment locations for a doctor
const getAppointmentLocations = async (doctorId) => {
  try {
    const locations = await Doctor.findById(doctorId).select('locations');
    
    return locations;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get appointment dates for a doctor
const getAppointmentDates = async (doctorId) => {
  try {
    // Fetch the doctor and their available dates
    const doctor = await Doctor.findById(doctorId).select('availableDates');
    
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    // Return the doctor's available dates
    // If no available dates are set, return next 14 days as an example
    if (!doctor.availableDates || doctor.availableDates.length === 0) {
     return ["no available dates"]
    }
    
    return doctor.availableDates;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get appointment time slots for a doctor on a specific date and location
const getAppointmentTimeSlots = async (doctorId, locationName, date) => {
  try {
    // Fetch the doctor with OPD locations
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    // Find the selected location
    const location = doctor.opdLocations.find(loc => loc.clinicName === locationName);
    if (!location) {
      throw new Error('Location not found');
    }
    
    // Get slot duration and working hours from location settings
    const slotDuration = location.slotMins || 30;
    const startTime = location.startTime || "09:00";
    const endTime = location.endTime || "17:00";
    
    // Parse start and end times
    const [startHour, startMinute] = startTime.split(':').map(Number);
    const [endHour, endMinute] = endTime.split(':').map(Number);
    
    // Generate time slots
    const timeSlots = [];
    let currentHour = startHour;
    let currentMinute = startMinute;
    
    while (currentHour < endHour || (currentHour === endHour && currentMinute < endMinute)) {
      // Format current time
      const timeString = `${currentHour.toString().padStart(2, '0')}:${currentMinute.toString().padStart(2, '0')}`;
      
      // Check if this time slot is already booked
      const existingAppointments = await Appointment.find({
        doctorId: doctorId,
        location: locationName,
        date: new Date(date),
        time: timeString
      });
      
      timeSlots.push({
        time: timeString,
        isBooked: existingAppointments.length > 0
      });
      
      // Add slot duration
      currentMinute += slotDuration;
      if (currentMinute >= 60) {
        currentHour += Math.floor(currentMinute / 60);
        currentMinute = currentMinute % 60;
      }
    }
    
    return timeSlots;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createAppointment,
  getAppointmentById,
  getAppointmentsByDoctorId,
  getAppointmentsByPatientId,
  getUpcomingAppointmentsByDoctorId,
  getLatestAppointmentByPatientId,
  updateAppointmentStatus,
  updateAppointment,
  deleteAppointment,
  getSharedBookingsByDoctorId,
  bookAppointmentService,
  createAppointmentForDoctorService,
  getUpcomingAppointmentsForDoctorService: getUpcomingAppointmentsByDoctorId,
  updateAppointmentStatusByIdService: updateAppointmentStatus,
  getAppointmentLocations,
  getAppointmentDates,
  getAppointmentTimeSlots
};