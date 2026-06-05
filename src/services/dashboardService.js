import api from './api';

/**
 * Get dashboard overview summary statistics
 * GET /api/dashboard/overview
 * @param {Object} params - { range, startDate, endDate }
 */
export const getOverview = async (params = {}) => {
    const response = await api.get('/dashboard/overview', { params });
    return response.data;
};

/**
 * Get monthly revenue growth chart series
 * GET /api/dashboard/revenue-growth
 * @param {Object} params - { range, startDate, endDate }
 */
export const getRevenueGrowth = async (params = {}) => {
    const response = await api.get('/dashboard/revenue-growth', { params });
    return response.data;
};

/**
 * Get monthly platform commission earnings trend
 * GET /api/dashboard/commission-growth
 * @param {Object} params - { range, startDate, endDate }
 */
export const getCommissionGrowth = async (params = {}) => {
    const response = await api.get('/dashboard/commission-growth', { params });
    return response.data;
};

/**
 * Get top branches sorted by revenue or bookings volume
 * GET /api/dashboard/top-branches
 * @param {Object} params - { range, startDate, endDate }
 */
export const getTopBranches = async (params = {}) => {
    const response = await api.get('/dashboard/top-branches', { params });
    return response.data;
};

/**
 * Get recent system-wide platform activities
 * GET /api/dashboard/recent-activities
 * @param {Object} params - { range, startDate, endDate }
 */
export const getRecentActivities = async (params = {}) => {
    const response = await api.get('/dashboard/recent-activities', { params });
    return response.data;
};
