const { 
  getPatient24HourReportService,
  getPatient30DaysReportService,
  getPatient12MonthsReportService,
  getAppointmentTypeReportService,
  getInvoice12MonthsReportService,
  getPayment12MonthsReportService,
  getComparisonDataService,
  getTodayAppointmentsPaginatedService,
  getPlannedSurgeriesPaginatedService,
  dashboardKPIsService
} = require('./dashboard.service');

// Get patient 24 hour report
const getPatient24HourReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPatient24HourReportService(doctorId);
    res.status(200).json({
      success: true,
      message: '24 hour patient report retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get patient 30 days report
const getPatient30DaysReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPatient30DaysReportService(doctorId);
    res.status(200).json({
      success: true,
      message: '30 days patient report retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get patient 12 months report
const getPatient12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPatient12MonthsReportService(doctorId);
    res.status(200).json({
      success: true,
      message: '12 months patient report retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get appointment type report
const getAppointmentTypeReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getAppointmentTypeReportService(doctorId);
    res.status(200).json({
      success: true,
      message: 'Appointment type report retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get invoice 12 months report
const getInvoice12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getInvoice12MonthsReportService(doctorId);
    res.status(200).json({
      success: true,
      message: '12 months invoice report retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get payment 12 months report
const getPayment12MonthsReport = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getPayment12MonthsReportService(doctorId);
    res.status(200).json({
      success: true,
      message: '12 months payment report retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get comparison data
const getComparisonData = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await getComparisonDataService(doctorId);
    res.status(200).json({
      success: true,
      message: 'Comparison data retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get today appointments paginated
const getTodayAppointmentsPaginated = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getTodayAppointmentsPaginatedService(doctorId, parseInt(page), parseInt(limit));
    res.status(200).json({
      success: true,
      message: 'Today appointments retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get planned surgeries paginated
const getPlannedSurgeriesPaginated = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const { page = 1, limit = 10 } = req.query;
    const result = await getPlannedSurgeriesPaginatedService(doctorId, parseInt(page), parseInt(limit));
    res.status(200).json({
      success: true,
      message: 'Planned surgeries retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
  }
};

// Get dashboard KPIs
const dashboardKPIs = async (req, res) => {
  try {
    const { doctorId } = req.params;
    const result = await dashboardKPIsService(doctorId);
    res.status(200).json({
      success: true,
      message: 'Dashboard KPIs retrieved successfully',
      data: result
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    });
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