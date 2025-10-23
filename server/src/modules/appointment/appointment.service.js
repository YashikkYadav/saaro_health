const Appointment = require('./appointment.model');
const Doctor = require('../doctor/doctor.model');
const Patient = require('../patient/patient.model');

// Create a new appointment (existing function, but let's make sure it's correct)
const createAppointment = async (appointmentData) => {
  try {
    const { doctorId, patientId, ...appointmentInfo } = appointmentData;
    
    // Create new appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      ...appointmentInfo
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
    
    return savedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Book an appointment for a doctor
const bookAppointmentService = async (appointmentData) => {
  try {
    const { doctorId, patientId, date, timeSlot, location, notes, fees, ...otherInfo } = appointmentData;
    
    // Create new appointment with default status "confirmed"
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date),
      time: timeSlot,
      location,
      notes,
      fees,
      status: 'confirmed',
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
    
    return savedAppointment;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Create an appointment for a doctor (admin/doctor)
const createAppointmentForDoctorService = async (appointmentData) => {
  try {
    const { doctorId, patientId, date, timeSlot, location, notes, fees, status, ...otherInfo } = appointmentData;
    
    // Create new appointment
    const newAppointment = new Appointment({
      doctorId,
      patientId,
      date: new Date(date),
      time: timeSlot,
      location,
      notes,
      fees,
      status: status || 'Pending',
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
    
    return savedAppointment;
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

// Get appointment dates for a doctor at a location
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

// Get appointment time slots for a doctor at a location on a specific date
const getAppointmentTimeSlots = async (doctorId, date) => {
  try {
    // Fetch the doctor
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      throw new Error('Doctor not found');
    }
    
    // Generate time slots based on typical office hours (9:00 AM to 5:00 PM)
    // with 30-minute intervals
    const timeSlots = [];
    const startHour = 9;
    const endHour = 17;
    const slotDuration = 30; // minutes
    
    // Generate time slots
    for (let hour = startHour; hour < endHour; hour++) {
      for (let minute = 0; minute < 60; minute += slotDuration) {
        // Format time as HH:MM
        const startTime = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const endMinute = minute + slotDuration;
        let endHourSlot = hour;
        let endMinuteSlot = endMinute;
        
        // Handle hour overflow
        if (endMinute >= 60) {
          endHourSlot = hour + 1;
          endMinuteSlot = endMinute - 60;
        }
        
        const endTime = `${endHourSlot.toString().padStart(2, '0')}:${endMinuteSlot.toString().padStart(2, '0')}`;
        
        // Check if this time slot is already booked
        const existingAppointments = await Appointment.find({
          doctorId: doctorId,
          date: new Date(date),
          time: startTime
        });
        
        timeSlots.push({
          startTime,
          endTime,
          isBooked: existingAppointments.length > 0
        });
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