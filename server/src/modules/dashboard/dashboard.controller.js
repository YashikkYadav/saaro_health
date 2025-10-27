const { 
  getPatient24HourReportService,
  getPatient30DaysReportService,
  getPatient12MonthsReportService,
  getAppointmentTypeReportService,
  getInvoice12MonthsReportService,
  getPayment12MonthsReportService,
  getComparisonDataService,
  getPlannedSurgeriesPaginatedService,
  dashboardKPIsService
} = require('./dashboard.service');
const apiResponse = require('../../utils/apiResponse.utils');

// Get patient 24 hour report
const getPatient24HourReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPatient24HourReportService(doctorId);
    return apiResponse.success(res, '24 hour patient report retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get patient 30 days report
const getPatient30DaysReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPatient30DaysReportService(doctorId);
    return apiResponse.success(res, '30 days patient report retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get patient 12 months report
const getPatient12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPatient12MonthsReportService(doctorId);
    return apiResponse.success(res, '12 months patient report retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get appointment type report
const getAppointmentTypeReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getAppointmentTypeReportService(doctorId);
    return apiResponse.success(res, 'Appointment type report retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get invoice 12 months report
const getInvoice12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getInvoice12MonthsReportService(doctorId);
    return apiResponse.success(res, '12 months invoice report retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get payment 12 months report
const getPayment12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPayment12MonthsReportService(doctorId);
    return apiResponse.success(res, '12 months payment report retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get comparison data
const getComparisonData = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getComparisonDataService(doctorId);
    return apiResponse.success(res, 'Comparison data retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get today appointments paginated
const getTodayAppointmentsPaginated = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getTodayAppointmentsPaginatedService(doctorId, parseInt(page), parseInt(limit));
    return apiResponse.success(res, 'Today appointments retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get planned surgeries paginated
const getPlannedSurgeriesPaginated = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getPlannedSurgeriesPaginatedService(doctorId, parseInt(page), parseInt(limit));
    return apiResponse.success(res, 'Planned surgeries retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

// Get dashboard KPIs
const dashboardKPIs = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await dashboardKPIsService(doctorId);
    return apiResponse.success(res, 'Dashboard KPIs retrieved successfully', { result });
  } catch (error) {
    return apiResponse.error(res, error.message, 500);
  }
};

module.exports = {
  getPatient24HourReport,
  getPatient30DaysReport,
  getPatient12MonthsReport,
  getAppointmentTypeReport,
  getInvoice12MonthsReport,
  getPayment12MonthsReport,
  getComparisonData,
  getTodayAppointmentsPaginated,
  getPlannedSurgeriesPaginated,
  dashboardKPIs
};