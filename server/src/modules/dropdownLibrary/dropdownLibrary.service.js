const DropdownLibrary = require('./dropdownLibrary.model');

// Create a new dropdown library item
const createDropdownLibraryItem = async (doctorId, dropdownData) => {
  try {
    const dropdown = new DropdownLibrary({
      doctorId,
      ...dropdownData
    });
    const savedDropdown = await dropdown.save();
    return savedDropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all dropdown library items for a doctor
const getDropdownLibraryItems = async (doctorId) => {
  try {
    const dropdowns = await DropdownLibrary.find({ doctorId })
      .sort({ createdAt: -1 });
    return dropdowns;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get dropdown library items grouped by section
const getDropdownLibraryItemsGroupedBySection = async (doctorId) => {
  try {
    const items = await DropdownLibrary.find({ doctorId });
    const grouped = {};
    
    items.forEach(item => {
      if (!grouped[item.sectionId]) {
        grouped[item.sectionId] = {
          sectionId: item.sectionId,
          sectionName: item.sectionName,
          options: []
        };
      }
      grouped[item.sectionId].options.push({
        id: item._id,
        name: item.name,
        creator: item.creator
      });
    });
    
    return Object.values(grouped);
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get dropdown library items by section ID
const getDropdownLibraryItemsBySectionId = async (doctorId, sectionId) => {
  try {
    const dropdowns = await DropdownLibrary.find({ doctorId, sectionId })
      .sort({ createdAt: -1 });
    return dropdowns;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get dropdown library item by ID
const getDropdownLibraryItemById = async (doctorId, dropdownId) => {
  try {
    const dropdown = await DropdownLibrary.findOne({ _id: dropdownId, doctorId });
    return dropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update dropdown library item
const updateDropdownLibraryItem = async (doctorId, dropdownId, updateData) => {
  try {
    const updatedDropdown = await DropdownLibrary.findByIdAndUpdate(
      dropdownId,
      updateData,
      { new: true, runValidators: true }
    );
    return updatedDropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete dropdown library item
const deleteDropdownLibraryItem = async (doctorId, dropdownId) => {
  try {
    const deletedDropdown = await DropdownLibrary.findByIdAndDelete(dropdownId);
    return deletedDropdown;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createDropdownLibraryItem,
  getDropdownLibraryItems,
  getDropdownLibraryItemsGroupedBySection,
  getDropdownLibraryItemsBySectionId,
  getDropdownLibraryItemById,
  updateDropdownLibraryItem,
  deleteDropdownLibraryItem,
};