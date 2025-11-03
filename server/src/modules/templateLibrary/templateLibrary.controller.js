const TemplateLibrary = require('./templateLibrary.model');
const apiResponse = require('../../utils/apiResponse.utils');

// Create a new template
const createTemplate = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { name, type, items, creator } = req.body;
    
    // Validate required fields
    if (!name || !type || !items || !creator) {
      return apiResponse.error(res, 'All fields are required: name, type, items, creator', 400);
    }
    
    // Create template with the structure expected by the frontend
    const templateData = {
      doctorId,
      sectionId: type, // Using type as sectionId
      sectionName: type, // Using type as sectionName
      name,
      data: [{ content: items, createdBy: creator }] // Store items and creator in data array
    };
    
    const newTemplate = new TemplateLibrary(templateData);
    const savedTemplate = await newTemplate.save();
    
    apiResponse.success(res, 'Template created successfully', savedTemplate, 201);
  } catch (error) {
    console.error('Error creating template:', error);
    apiResponse.error(res, 'Failed to create template', 500, error.message);
  }
};

// Get all templates for a doctor
const getTemplates = async (req, res) => {
  try {
    const { doctorId } = req.params;
    
    const templates = await TemplateLibrary.find({ doctorId })
      .sort({ createdAt: -1 });
    
    // Transform data to match frontend expectations
    const transformedTemplates = templates.map(template => ({
      _id: template._id,
      name: template.name,
      type: template.sectionName,
      items: template.data && template.data.length > 0 ? template.data[0].content : '',
      creator: template.data && template.data.length > 0 ? template.data[0].createdBy : '',
      createdAt: template.createdAt,
      updatedAt: template.updatedAt
    }));
    
    apiResponse.success(res, 'Templates fetched successfully', transformedTemplates);
  } catch (error) {
    console.error('Error fetching templates:', error);
    apiResponse.error(res, 'Failed to fetch templates', 500, error.message);
  }
};

// Update a template
const updateTemplate = async (req, res) => {
  try {
    const { doctorId, templateId } = req.params;
    const { name, type, items, creator } = req.body;
    
    // Validate required fields
    if (!name || !type || !items || !creator) {
      return apiResponse.error(res, 'All fields are required: name, type, items, creator', 400);
    }
    
    const updatedTemplate = await TemplateLibrary.findByIdAndUpdate(
      templateId,
      {
        name,
        sectionId: type,
        sectionName: type,
        data: [{ content: items, createdBy: creator }]
      },
      { new: true, runValidators: true }
    );
    
    if (!updatedTemplate) {
      return apiResponse.error(res, 'Template not found', 404);
    }
    
    // Transform data to match frontend expectations
    const transformedTemplate = {
      _id: updatedTemplate._id,
      name: updatedTemplate.name,
      type: updatedTemplate.sectionName,
      items: updatedTemplate.data && updatedTemplate.data.length > 0 ? updatedTemplate.data[0].content : '',
      creator: updatedTemplate.data && updatedTemplate.data.length > 0 ? updatedTemplate.data[0].createdBy : '',
      createdAt: updatedTemplate.createdAt,
      updatedAt: updatedTemplate.updatedAt
    };
    
    apiResponse.success(res, 'Template updated successfully', transformedTemplate);
  } catch (error) {
    console.error('Error updating template:', error);
    apiResponse.error(res, 'Failed to update template', 500, error.message);
  }
};

// Delete a template
const deleteTemplate = async (req, res) => {
  try {
    const { doctorId, templateId } = req.params;
    
    const deletedTemplate = await TemplateLibrary.findByIdAndDelete(templateId);
    
    if (!deletedTemplate) {
      return apiResponse.error(res, 'Template not found', 404);
    }
    
    apiResponse.success(res, 'Template deleted successfully');
  } catch (error) {
    console.error('Error deleting template:', error);
    apiResponse.error(res, 'Failed to delete template', 500, error.message);
  }
};

module.exports = {
  createTemplate,
  getTemplates,
  updateTemplate,
  deleteTemplate
};