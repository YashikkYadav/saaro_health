const Doctor = require('./doctor.model');
const { hashPassword, comparePassword, generateToken } = require('../../utils/auth.utils');

// Register a new doctor
const registerDoctor = async (doctorData) => {
  try {
    // Check if doctor with same email or phone already exists
    const existingDoctor = await Doctor.findOne({
      $or: [
        { email: doctorData.email },
        { phoneNumber: doctorData.phoneNumber },
        { rmcNumber: doctorData.rmcNumber }
      ]
    });

    if (existingDoctor) {
      throw new Error('Doctor with this email, phone number, or RMC number already exists');
    }

    // Hash password
    const hashedPassword = await hashPassword(doctorData.password);
    
    // Create new doctor
    const newDoctor = new Doctor({
      ...doctorData,
      password: hashedPassword
    });

    const savedDoctor = await newDoctor.save();
    
    // Generate token
    const token = generateToken({
      id: savedDoctor._id,
      email: savedDoctor.email
    });

    // Remove password from response
    const doctorResponse = savedDoctor.toObject();
    delete doctorResponse.password;

    return {
      doctor: doctorResponse,
      token
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Login doctor
const loginDoctor = async (identifier, password) => {
  try {
    // Find doctor by email or phone number and populate appointments and patients
    const doctor = await Doctor.findOne({
      $or: [
        { email: identifier },
        { phoneNumber: identifier }
      ]
    }).populate([
      {
        path: 'appointments',
        model: 'Appointment',
        options: { sort: { date: 1, time: 1 } }
      },
      {
        path: 'patients',
        model: 'Patient',
        options: { sort: { fullName: 1 } }
      }
    ]);

    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Compare password
    const isPasswordValid = await comparePassword(password, doctor.password);
    
    if (!isPasswordValid) {
      throw new Error('Invalid credentials');
    }

    // Generate token
    const token = generateToken({
      id: doctor._id,
      email: doctor.email
    });

    // Remove password from response
    const doctorResponse = doctor.toObject();
    delete doctorResponse.password;

    return {
      doctor: doctorResponse,
      token
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Logout doctor
const logoutDoctor = async () => {
  try {
    // In a stateless JWT approach, logout is handled on the client side
    // by removing the token. Server side we can add the token to a blacklist
    // if we implement token blacklisting.
    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get first doctor (for initialization)
const getFirstDoctor = async () => {
  try {
    const doctor = await Doctor.findOne({}, { password: 0 }).sort({ createdAt: 1 });
    
    if (!doctor) {
      throw new Error('No doctors found');
    }

    return doctor;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get doctor by ID
const getDoctorById = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Remove password from response
    const doctorResponse = doctor.toObject();
    delete doctorResponse.password;

    return doctorResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Change password
const changePassword = async (doctorId, currentPassword, newPassword) => {
  try {
    const doctor = await Doctor.findById(doctorId);
    
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    // Compare current password
    const isPasswordValid = await comparePassword(currentPassword, doctor.password);
    
    if (!isPasswordValid) {
      throw new Error('Current password is incorrect');
    }

    // Hash new password
    const hashedNewPassword = await hashPassword(newPassword);
    
    // Update password
    await Doctor.findByIdAndUpdate(doctorId, { password: hashedNewPassword });

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update profile
const updateProfile = async (doctorId, updateData) => {
  try {
    // Remove password from update data if present
    if (updateData.password) {
      delete updateData.password;
    }

    // Handle avatar field specifically
    // If avatar is not provided or is empty, don't update it
    if (updateData.avatar === undefined || updateData.avatar === null || updateData.avatar === '') {
      delete updateData.avatar;
    }

    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      updateData,
      { new: true, runValidators: true }
    ).populate([
      {
        path: 'appointments',
        model: 'Appointment',
        options: { sort: { date: 1, time: 1 } }
      },
      {
        path: 'patients',
        model: 'Patient',
        options: { sort: { fullName: 1 } }
      }
    ]);

    if (!updatedDoctor) {
      throw new Error('Doctor not found');
    }

    // Remove password from response
    const doctorResponse = updatedDoctor.toObject();
    delete doctorResponse.password;

    return doctorResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete doctor
const deleteDoctor = async (doctorId) => {
  try {
    const deletedDoctor = await Doctor.findByIdAndDelete(doctorId);
    
    if (!deletedDoctor) {
      throw new Error('Doctor not found');
    }

    return true;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all doctors
const getAllDoctors = async () => {
  try {
    const doctors = await Doctor.find({}, { password: 0 }); // Exclude password field
    return doctors;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get doctors by city or specialty
const getDoctorsByCityOrSpecialty = async (city, specialty) => {
  const query = {};
  
  if (city) {
    query.city = { $regex: new RegExp(city, 'i') };
  }
  
  if (specialty) {
    query.specialization = { $regex: new RegExp(specialty, 'i') };
  }
  
  return await Doctor.find(query, { password: 0 });
};

// Get available dates for a doctor
const getAvailableDates = async (doctorId) => {
  try {
    const doctor = await Doctor.findById(doctorId, { availableDates: 1 });
    
    if (!doctor) {
      throw new Error('Doctor not found');
    }

    return doctor.availableDates || [];
  } catch (error) {
    throw new Error(error.message);
  }
};

// Upload avatar
const uploadAvatar = async (doctorId, filePath) => {
  try {
    const updatedDoctor = await Doctor.findByIdAndUpdate(
      doctorId,
      { avatar: filePath },
      { new: true, runValidators: true }
    );

    if (!updatedDoctor) {
      throw new Error('Doctor not found');
    }

    // Remove password from response
    const doctorResponse = updatedDoctor.toObject();
    delete doctorResponse.password;

    return doctorResponse;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  registerDoctor,
  loginDoctor,
  logoutDoctor,
  getFirstDoctor,
  getDoctorById,
  changePassword,
  updateProfile,
  deleteDoctor,
  getAllDoctors,
  getDoctorsByCityOrSpecialty,
  getAvailableDates,
  uploadAvatar
};