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

// Register a new doctor
const register = async (req, res) => {
  try {
    const doctorData = req.body;
    const result = await registerDoctor(doctorData); 
    
    res.status(201).json({
      success: true,
      message: 'Doctor registered successfully',
      doctor: result.doctor,
      token: result.token
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Login doctor
const login = async (req, res) => {
  try {
    const { identifier, password } = req.body;
    const result = await loginDoctor(identifier, password);
    
    res.status(200).json({
      success: true,
      message: 'Doctor logged in successfully',
      doctor: result.doctor,
      token: result.token
    });
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message
    });
  }
};

// Logout doctor
const logout = async (req, res) => {
  try {
    await logoutDoctor();
    
    res.status(200).json({
      success: true,
      message: 'Logged out successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get first doctor (for initialization)
const getFirst = async (req, res) => {
  try {
    const doctor = await getFirstDoctor();
    
    res.status(200).json({
      success: true,
      message: 'First doctor retrieved successfully',
      doctor: doctor
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get doctor by ID
const getDoctor = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const doctor = await getDoctorById(doctorId);
    
    res.status(200).json({
      success: true,
      message: 'Doctor retrieved successfully',
      doctor: doctor
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Change password
const changePasswordController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { currentPassword, newPassword } = req.body;
    await changePassword(doctorId, currentPassword, newPassword);
    
    res.status(200).json({
      success: true,
      message: 'Password changed successfully'
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Update profile
const updateProfileController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const updateData = req.body;
    const updatedDoctor = await updateProfile(doctorId, updateData);
    
    res.status(200).json({
      success: true,
      message: 'Profile updated successfully',
      doctor: updatedDoctor
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message
    });
  }
};

// Delete doctor
const deleteDoctorController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    await deleteDoctor(doctorId);
    
    res.status(200).json({
      success: true,
      message: 'Doctor deleted successfully'
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: error.message
    });
  }
};

// Get all doctors
const getDoctors = async (req, res) => {
  try {
    const doctors = await getAllDoctors();
    
    res.status(200).json({
      success: true,
      message: 'Doctors retrieved successfully',
      doctors: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get doctors by city or specialty (from request body)
const getDoctorsByCityOrSpecialtyController = async (req, res) => {
  try {
    const { city, specialty } = req.body;
    const doctors = await getDoctorsByCityOrSpecialty(city, specialty);
    
    res.status(200).json({
      success: true,
      message: 'Doctors retrieved successfully',
      doctors: doctors
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get available dates for a doctor
const getAvailableDatesController = async (req, res) => {
  try {
    const { doctorId } = req.body;
    
    if (!doctorId) {
      return res.status(400).json({
        success: false,
        message: 'Doctor ID is required'
      });
    }
    
    const availableDates = await getAvailableDates(doctorId);
    
    res.status(200).json({
      success: true,
      message: 'Available dates retrieved successfully',
      availableDates: availableDates
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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