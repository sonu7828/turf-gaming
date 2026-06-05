import api from './api';

const getParams = (filters) => {
  const params = {};
  if (filters) {
    if (filters.range) params.range = filters.range;
    if (filters.startDate) params.startDate = filters.startDate;
    if (filters.endDate) params.endDate = filters.endDate;
    if (filters.format) params.format = filters.format;
  }
  return params;
};

/**
 * Get dashboard overview stats
 */
export const getOverview = async (filters) => {
  const response = await api.get('/analytics/overview', { params: getParams(filters) });
  return response.data;
};

/**
 * Get revenue charts analytics
 */
export const getRevenueAnalytics = async (filters) => {
  const response = await api.get('/analytics/revenue', { params: getParams(filters) });
  return response.data;
};

/**
 * Get booking trends analytics
 */
export const getBookingAnalytics = async (filters) => {
  const response = await api.get('/analytics/bookings', { params: getParams(filters) });
  return response.data;
};

/**
 * Get user growth trends analytics
 */
export const getUserAnalytics = async (filters) => {
  const response = await api.get('/analytics/users', { params: getParams(filters) });
  return response.data;
};

/**
 * Get branch growth trends analytics
 */
export const getBranchAnalytics = async (filters) => {
  const response = await api.get('/analytics/branches', { params: getParams(filters) });
  return response.data;
};

/**
 * Get sports popularity metrics
 */
export const getSportsAnalytics = async (filters) => {
  const response = await api.get('/analytics/sports', { params: getParams(filters) });
  return response.data;
};

/**
 * Get subscription plans metrics
 */
export const getSubscriptionAnalytics = async (filters) => {
  const response = await api.get('/analytics/subscriptions', { params: getParams(filters) });
  return response.data;
};

/**
 * Get top owners by revenue
 */
export const getTopOwners = async (filters) => {
  const response = await api.get('/analytics/top-owners', { params: getParams(filters) });
  return response.data;
};

/**
 * Get top branches by bookings volume
 */
export const getTopBranches = async (filters) => {
  const response = await api.get('/analytics/top-branches', { params: getParams(filters) });
  return response.data;
};

/**
 * Get top sports ranked by bookings
 */
export const getTopSports = async (filters) => {
  const response = await api.get('/analytics/top-sports', { params: getParams(filters) });
  return response.data;
};

/**
 * Download report in requested format (Blob response)
 */
export const downloadReport = async (reportType, format, filters) => {
  const response = await api.get(`/reports/${reportType}`, {
    params: { ...getParams(filters), format },
    responseType: 'blob'
  });
  return response.data; // Blob
};
