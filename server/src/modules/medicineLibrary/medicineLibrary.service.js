const MedicineLibrary = require('./medicineLibrary.model');

// Create a new medicine
const createMedicine = async (doctorId, medicineData) => {
  try {
    const medicine = new MedicineLibrary({
      doctorId,
      ...medicineData
    });
    
    const savedMedicine = await medicine.save();
    return savedMedicine;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get all medicines for a doctor
const getMedicines = async (doctorId) => {
  try {
    const medicines = await MedicineLibrary.find({ doctorId })
      .sort({ createdAt: -1 });
    return medicines;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get medicine by ID
const getMedicineById = async (doctorId, medicineId) => {
  try {
    const medicine = await MedicineLibrary.findOne({ _id: medicineId, doctorId });
    return medicine;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Update medicine
const updateMedicine = async (doctorId, medicineId, updateData) => {
  try {
    const updatedMedicine = await MedicineLibrary.findByIdAndUpdate(
      medicineId,
      updateData,
      { new: true, runValidators: true }
    );
    
    return updatedMedicine;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Delete medicine
const deleteMedicine = async (doctorId, medicineId) => {
  try {
    const deletedMedicine = await MedicineLibrary.findByIdAndDelete(medicineId);
    return deletedMedicine;
  } catch (error) {
    throw new Error(error.message);
  }
};

// Search medicines by name
const searchMedicines = async (doctorId, searchTerm) => {
  try {
    const medicines = await MedicineLibrary.find({
      doctorId,
      name: { $regex: searchTerm, $options: 'i' }
    }).sort({ createdAt: -1 });
    return medicines;
  } catch (error) {
    throw new Error(error.message);
  }
};

module.exports = {
  createMedicine,
  getMedicines,
  getMedicineById,
  updateMedicine,
  deleteMedicine,
  searchMedicines
};