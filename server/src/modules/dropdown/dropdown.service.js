const Dropdown = require('./dropdown.model');

// Create a new dropdown
const createDropdown = async (dropdownData) => {
  try {
    const dropdown = new Dropdown(dropdownData);
    const savedDropdown = await dropdown.save();
    return savedDropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all dropdowns
const getDropdowns = async () => {
  try {
    const dropdowns = await Dropdown.find().sort({ createdAt: -1 });
    return dropdowns;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get dropdown by ID
const getDropdownById = async (dropdownId) => {
  try {
    const dropdown = await Dropdown.findById(dropdownId);
    return dropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update dropdown
const updateDropdown = async (dropdownId, updateData) => {
  try {
    const updatedDropdown = await Dropdown.findByIdAndUpdate(
      dropdownId,
      updateData,
      { new: true, runValidators: true }
    );
    return updatedDropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete dropdown
const deleteDropdown = async (dropdownId) => {
  try {
    const deletedDropdown = await Dropdown.findByIdAndDelete(dropdownId);
    return deletedDropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createDropdown,
  getDropdowns,
  getDropdownById,
  updateDropdown,
  deleteDropdown,
};