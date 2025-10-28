const Patient = require('../patient/patient.model');
const Appointment = require('../appointment/appointment.model');
const Invoice = require('../invoice/invoice.model');
const Doctor = require('../doctor/doctor.model');
const moment = require('moment');

// Get patient 24 hour report service
const getPatient24HourReportService = async (doctorId) => {
  try {
    const twentyFourHoursAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    
    const newPatients = await Patient.countDocuments({
      doctors: { $in: [doctorId] },
      createdAt: { $gte: twentyFourHoursAgo }
    });
    
    return {
      newPatients,
      timeframe: '24 hours'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get patient 30 days report service
const getPatient30DaysReportService = async (doctorId) => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    
    // Get patient count for each day
    const patientData = await Patient.aggregate([
      {
        $match: {
          doctors: { $in: [doctorId] },
          createdAt: { $gte: thirtyDaysAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m-%d", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    return {
      patientData,
      timeframe: '30 days'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get patient 12 months report service
const getPatient12MonthsReportService = async (doctorId) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    // Get patient count for each month
    const patientData = await Patient.aggregate([
      {
        $match: {
          doctors: { $in: [doctorId] },
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    return {
      patientData,
      timeframe: '12 months'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get appointment type report service
const getAppointmentTypeReportService = async (doctorId) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    // Get appointment count by type
    const appointmentData = await Appointment.aggregate([
      {
        $match: {
          doctorId: doctorId,
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: "$type",
          count: { $sum: 1 }
        }
      },
      {
        $sort: { count: -1 }
      }
    ]);
    
    return {
      appointmentData,
      timeframe: '12 months'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get invoice 12 months report service
const getInvoice12MonthsReportService = async (doctorId) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    // Get invoice count for each month
    const invoiceData = await Invoice.aggregate([
      {
        $match: {
          doctorId: doctorId,
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            $dateToString: { format: "%Y-%m", date: "$createdAt" }
          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);
    
    return {
      invoiceData,
      timeframe: '12 months'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get payment 12 months report service
const getPayment12MonthsReportService = async (doctorId) => {
  try {
    const twelveMonthsAgo = new Date();
    twelveMonthsAgo.setMonth(twelveMonthsAgo.getMonth() - 12);
    
    // Get payment count by mode for each month
    const paymentData = await Invoice.aggregate([
      {
        $match: {
          doctorId: doctorId,
          createdAt: { $gte: twelveMonthsAgo }
        }
      },
      {
        $group: {
          _id: {
            month: { $dateToString: { format: "%Y-%m", date: "$createdAt" } },
            mode: "$paymentMode"
          },
          count: { $sum: 1 },
          totalAmount: { $sum: "$totalAmount" }
        }
      },
      {
        $sort: { "_id.month": 1, "_id.mode": 1 }
      }
    ]);
    
    return {
      paymentData,
      timeframe: '12 months'
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get comparison data service
const getComparisonDataService = async (doctorId) => {
  try {
    // Get current month data
    const startOfMonth = new Date();
    startOfMonth.setDate(1);
    startOfMonth.setHours(0, 0, 0, 0);
    
    const endOfMonth = new Date();
    endOfMonth.setMonth(endOfMonth.getMonth() + 1);
    endOfMonth.setDate(0);
    endOfMonth.setHours(23, 59, 59, 999);
    
    // Previous month data
    const startOfPreviousMonth = new Date(startOfMonth);
    startOfPreviousMonth.setMonth(startOfPreviousMonth.getMonth() - 1);
    
    const endOfPreviousMonth = new Date(startOfMonth);
    endOfPreviousMonth.setDate(0);
    endOfPreviousMonth.setHours(23, 59, 59, 999);
    
    // Current month counts
    const currentMonthPatients = await Patient.countDocuments({
      doctors: { $in: [doctorId] },
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    const currentMonthAppointments = await Appointment.countDocuments({
      doctorId,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    const currentMonthInvoices = await Invoice.countDocuments({
      doctorId,
      createdAt: { $gte: startOfMonth, $lte: endOfMonth }
    });
    
    const currentMonthRevenue = await Invoice.aggregate([
      {
        $match: {
          doctorId: doctorId,
          createdAt: { $gte: startOfMonth, $lte: endOfMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);
    
    // Previous month counts
    const previousMonthPatients = await Patient.countDocuments({
      doctors: { $in: [doctorId] },
      createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
    });
    
    const previousMonthAppointments = await Appointment.countDocuments({
      doctorId,
      createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
    });
    
    const previousMonthInvoices = await Invoice.countDocuments({
      doctorId,
      createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
    });
    
    const previousMonthRevenue = await Invoice.aggregate([
      {
        $match: {
          doctorId: doctorId,
          createdAt: { $gte: startOfPreviousMonth, $lte: endOfPreviousMonth }
        }
      },
      {
        $group: {
          _id: null,
          total: { $sum: "$totalAmount" }
        }
      }
    ]);
    
    return {
      currentMonth: {
        patients: currentMonthPatients,
        appointments: currentMonthAppointments,
        invoices: currentMonthInvoices,
        revenue: currentMonthRevenue.length > 0 ? currentMonthRevenue[0].total : 0
      },
      previousMonth: {
        patients: previousMonthPatients,
        appointments: previousMonthAppointments,
        invoices: previousMonthInvoices,
        revenue: previousMonthRevenue.length > 0 ? previousMonthRevenue[0].total : 0
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get today appointments paginated service
const getTodayAppointmentsPaginatedService = async (doctorId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    // Get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    const [appointments, totalAppointments] = await Promise.all([
      Appointment.find({
        doctorId,
        date: { $gte: startOfDay, $lte: endOfDay }
      })
      .populate('patientId', 'fullName')
      .sort({ time: 1 })
      .skip(skip)
      .limit(limit),
      Appointment.countDocuments({
        doctorId,
        date: { $gte: startOfDay, $lte: endOfDay }
      })
    ]);
    
    return {
      appointments,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalAppointments / limit),
        totalAppointments
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

// Get planned surgeries paginated service
const getPlannedSurgeriesPaginatedService = async (doctorId, page = 1, limit = 10) => {
  try {
    const skip = (page - 1) * limit;
    
    const [surgeries, totalSurgeries] = await Promise.all([
      Appointment.find({
        doctorId,
        type: 'Surgery',
        markComplete: false
      })
      .populate('patientId', 'fullName')
      .sort({ date: 1, time: 1 })
      .skip(skip)
      .limit(limit),
      Appointment.countDocuments({
        doctorId,
        type: 'Surgery',
        markComplete: false
      })
    ]);
    
    return {
      surgeries,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalSurgeries / limit),
        totalSurgeries
      }
    };
  } catch (error) {
    throw new Error(error.message);
  }
};

const dashboardKPIsService = async (doctorId) => {
  try {
    // Get today's date range
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);
    
    const endOfDay = new Date();
    endOfDay.setHours(23, 59, 59, 999);
    
    // Get total patients - using the doctors array in patient schema
    const totalPatients = await Patient.countDocuments({ 
      doctors: { $in: [doctorId] } 
    });
    
    // Get today's appointments
    const todayAppointments = await Appointment.countDocuments({
      doctorId,
      date: { $gte: startOfDay, $lte: endOfDay }
    });
    
    // Get total appointments
    const totalAppointments = await Appointment.countDocuments({ doctorId });
    
    // Get total invoices
    const totalInvoices = await Invoice.countDocuments({ doctorId });
    
    // Get total revenue - sum all invoice amounts, including 0 values
    // Convert doctorId to ObjectId if it's a string
    const mongoose = require('mongoose');
    const objectId = mongoose.Types.ObjectId.isValid(doctorId) ? new mongoose.Types.ObjectId(doctorId) : doctorId;
    
    const revenueResult = await Invoice.aggregate([
      {
        $match: {
          doctorId: objectId
        }
      },
      {
        $group: {
          _id: null,
          totalAmount: { $sum: { $ifNull: ["$totalAmount", 0] } },
          count: { $sum: 1 }
        }
      }
    ]);

    
    const totalRevenue = revenueResult.length > 0 ? revenueResult[0].totalAmount : 0;
    
    return {
      totalPatients,
      todayAppointments,
      totalAppointments,
      totalInvoices,
      totalRevenue
    };
  } catch (error) {
    console.error('Error in dashboardKPIsService:', error);
    throw new Error(error.message);
  }
};

module.exports = {
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
};