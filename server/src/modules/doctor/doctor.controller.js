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
  getAvailableDates,
  uploadAvatar
} = require('./doctor.service');
const apiResponse = require('../../utils/apiResponse.utils');
const fs = require('fs');

// Register a new doctor
const register = async (req, res) => {
  try {
    // req.body is already validated by Zod middleware
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
    // req.body is already validated by Zod middleware
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
// Get doctor profile by ID
const getDoctorProfile = async (req, res) => {
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
    // req.body is already validated by Zod middleware
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
    // req.body is already validated by Zod middleware
    let updateData = req.body;
    
    // If there's an uploaded file, process it
    if (req.file) {
      // Check if file size is within limit after compression
      if (req.file.size > 100 * 1024) { // 100KB
        // Clean up the uploaded file
        fs.unlinkSync(req.file.path);
        return apiResponse.error(res, 'File is too large even after compression. Please use a smaller image.', 400);
      }
      
      const avatarUrl = `/uploads/avatars/${req.file.filename}`;
      updateData.avatar = avatarUrl;
    }
    
    const updatedDoctor = await updateProfile(doctorId, updateData);
    
    return apiResponse.success(res, 'Profile updated successfully', { doctor: updatedDoctor });
  } catch (error) {
    // Clean up the uploaded file if there was an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }
    return apiResponse.error(res, error.message, 400);
  }
};

// Upload avatar
const uploadAvatarController = async (req, res) => {
  try {
    if (!req.file) {
      return apiResponse.error(res, 'No file uploaded', 400);
    }

    // Check if file size is within limit after compression
    if (req.file.size > 100 * 1024) { // 100KB
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
      return apiResponse.error(res, 'File is too large even after compression. Please use a smaller image.', 400);
    }

    // Get doctor ID from the authenticated user
    const doctorId = req.doctor?.id || req.user?.id;
    
    if (!doctorId) {
      // Clean up the uploaded file
      fs.unlinkSync(req.file.path);
      return apiResponse.error(res, 'Doctor ID not found in request', 400);
    }

    const avatarUrl = `/uploads/avatars/${req.file.filename}`;
    
    // Update doctor's avatar in the database
    const updatedDoctor = await uploadAvatar(doctorId, avatarUrl);
    
    return apiResponse.success(res, 'Avatar uploaded successfully', { 
      avatarUrl,
      doctor: updatedDoctor
    });
  } catch (error) {
    // Clean up the uploaded file if there was an error
    if (req.file && req.file.path) {
      try {
        fs.unlinkSync(req.file.path);
      } catch (unlinkError) {
        console.error('Error cleaning up file:', unlinkError);
      }
    }
    return apiResponse.error(res, error.message, 500);
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
  getAvailableDatesController,
  uploadAvatarController
};