const { 
  createDropdown,
  getDropdowns,
  getDropdownById,
  updateDropdown,
  deleteDropdown
} = require('./dropdown.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Create a new dropdown
const createDropdownController = async (req, res) => {
  try {
    const dropdownData = req.body;
    const dropdown = await createDropdown(dropdownData);
    return apiResponse.success(res, 'Dropdown created successfully', dropdown, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get all dropdowns
const getDropdownsController = async (req, res) => {
  try {
    const dropdowns = await getDropdowns();
    return apiResponse.success(res, 'Dropdowns retrieved successfully', dropdowns);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get dropdown by ID
const getDropdownByIdController = async (req, res) => {
  try {
    const { dropdownId } = req.params;
    const dropdown = await getDropdownById(dropdownId);
    if (!dropdown) {
      return apiResponse.error(res, 'Dropdown not found', 404);
    }
    return apiResponse.success(res, 'Dropdown retrieved successfully', dropdown);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Update dropdown
const updateDropdownController = async (req, res) => {
  try {
    const { dropdownId } = req.params;
    const updateData = req.body;
    const dropdown = await updateDropdown(dropdownId, updateData);
    if (!dropdown) {
      return apiResponse.error(res, 'Dropdown not found', 404);
    }
    return apiResponse.success(res, 'Dropdown updated successfully', dropdown);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Delete dropdown
const deleteDropdownController = async (req, res) => {
  try {
    const { dropdownId } = req.params;
    const dropdown = await deleteDropdown(dropdownId);
    if (!dropdown) {
      return apiResponse.error(res, 'Dropdown not found', 404);
    }
    return apiResponse.success(res, 'Dropdown deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

module.exports = {
  createDropdownController,
  getDropdownsController,
  getDropdownByIdController,
  updateDropdownController,
  deleteDropdownController
};