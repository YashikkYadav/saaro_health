const { 
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
  getAvailableDates
} = require('./doctor.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Register a new doctor
const register = async (req, res) => {
  try {
    const doctorData = req.body;
    const result = await registerDoctor(doctorData); 
    
    return apiResponse.success(res, 'Doctor registered successfully', {
      doctor: result.doctor,
      token: result.token
    }, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Login doctor
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const result = await loginDoctor(identifier, password);
    
    return apiResponse.success(res, 'Doctor logged in successfully', {
      doctor: result.doctor,
      token: result.token
    });
  } catch (error) {
    return apiResponse.error(res, error.message, 401);
  }
};

// Logout doctor
const logout = async (req, res) => {
  try {
    await logoutDoctor();
    
    return apiResponse.success(res, 'Logged out successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get first doctor (for initialization)
const getFirst = async (req, res) => {
  try {
    const doctor = await getFirstDoctor();
    
    return apiResponse.success(res, 'First doctor retrieved successfully', { doctor });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Get doctor by ID
const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await getDoctorById(doctorId);
    
    return apiResponse.success(res, 'Doctor retrieved successfully', { doctor });
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Change password
const changePasswordController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { currentPassword, newPassword } = req.body;
    await changePassword(doctorId, currentPassword, newPassword);
    
    return apiResponse.success(res, 'Password changed successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Update profile
const updateProfileController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const updateData = req.body;
    const updatedDoctor = await updateProfile(doctorId, updateData);
    
    return apiResponse.success(res, 'Profile updated successfully', { doctor: updatedDoctor });
  } catch (error) {
    return apiResponse.error(res, error.message, 400);
  }
};

// Delete doctor
const deleteDoctorController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    await deleteDoctor(doctorId);
    
    return apiResponse.success(res, 'Doctor deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 404);
  }
};

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    
    return apiResponse.success(res, 'Doctors retrieved successfully', { doctors });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get doctors by city or specialty (from request body)
const getDoctorsByCityOrSpecialtyController = async (req, res) => {
  try {
    const { city, specialty } = req.body;
    const doctors = await getDoctorsByCityOrSpecialty(city, specialty);
    
    return apiResponse.success(res, 'Doctors retrieved successfully', { doctors });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get available dates for a doctor
const getAvailableDatesController = async (req, res) => {
  try {
    const { doctorId } = req.body;
    
    if (!doctorId) {
      return apiResponse.error(res, 'Doctor ID is required', 400);
    }
    
    const availableDates = await getAvailableDates(doctorId);
    
    return apiResponse.success(res, 'Available dates retrieved successfully', { availableDates });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

module.exports = {
  register,
  login,
  logout,
  getFirst,
  getDoctor,
  changePasswordController,
  updateProfileController,
  deleteDoctorController,
  getDoctors,
  getDoctorsByCityOrSpecialtyController,
  getAvailableDatesController
};