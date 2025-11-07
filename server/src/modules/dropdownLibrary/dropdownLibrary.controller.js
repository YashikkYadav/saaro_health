const { 
  createDropdownLibraryItem,
  getDropdownLibraryItems,
  getDropdownLibraryItemsGroupedBySection,
  getDropdownLibraryItemsBySectionId,
  getDropdownLibraryItemById,
  updateDropdownLibraryItem,
  deleteDropdownLibraryItem
} = require('./dropdownLibrary.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Create a new dropdown library item
const createDropdownLibraryItemController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const dropdownData = req.body;
    const dropdown = await createDropdownLibraryItem(doctorId, dropdownData);
    return apiResponse.success(res, 'Dropdown library item created successfully', dropdown, 201);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get all dropdown library items for a doctor
const getDropdownLibraryItemsController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const dropdowns = await getDropdownLibraryItems(doctorId);
    return apiResponse.success(res, 'Dropdown library items retrieved successfully', { dropdowns });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get dropdown library items grouped by section
const getDropdownLibraryItemsGroupedController = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const groupedDropdowns = await getDropdownLibraryItemsGroupedBySection(doctorId);
    return apiResponse.success(res, 'Dropdown library items retrieved successfully', { dropdowns: groupedDropdowns });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get dropdown library items by section ID
const getDropdownLibraryItemsBySectionController = async (req, res) => {
  try {
    const { doctorId, sectionId } = req.params;
    const dropdowns = await getDropdownLibraryItemsBySectionId(doctorId, sectionId);
    return apiResponse.success(res, 'Dropdown library items retrieved successfully', { dropdowns });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get dropdown library item by ID
const getDropdownLibraryItemByIdController = async (req, res) => {
  try {
    const { doctorId, dropdownId } = req.params;
    const dropdown = await getDropdownLibraryItemById(doctorId, dropdownId);
    if (!dropdown) {
      return apiResponse.error(res, 'Dropdown library item not found', 404);
    }
    return apiResponse.success(res, 'Dropdown library item retrieved successfully', dropdown);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Update dropdown library item
const updateDropdownLibraryItemController = async (req, res) => {
  try {
    const { doctorId, dropdownId } = req.params;
    const updateData = req.body;
    const dropdown = await updateDropdownLibraryItem(doctorId, dropdownId, updateData);
    if (!dropdown) {
      return apiResponse.error(res, 'Dropdown library item not found', 404);
    }
    return apiResponse.success(res, 'Dropdown library item updated successfully', dropdown);
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Delete dropdown library item
const deleteDropdownLibraryItemController = async (req, res) => {
  try {
    const { doctorId, dropdownId } = req.params;
    const dropdown = await deleteDropdownLibraryItem(doctorId, dropdownId);
    if (!dropdown) {
      return apiResponse.error(res, 'Dropdown library item not found', 404);
    }
    return apiResponse.success(res, 'Dropdown library item deleted successfully');
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

module.exports = {
  createDropdownLibraryItemController,
  getDropdownLibraryItemsController,
  getDropdownLibraryItemsGroupedController,
  getDropdownLibraryItemsBySectionController,
  getDropdownLibraryItemByIdController,
  updateDropdownLibraryItemController,
  deleteDropdownLibraryItemController
};