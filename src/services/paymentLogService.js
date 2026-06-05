import api from './api';

/**
 * Get payment dashboard statistics
 * GET /api/payment-logs/stats
 * @param {Object} params - { startDate, endDate }
 */
export const getPaymentStats = async (params = {}) => {
    const response = await api.get('/payment-logs/stats', { params });
    return response.data;
};

/**
 * Get paginated payment logs with filters and search
 * GET /api/payment-logs
 * @param {Object} params - { search, status, type, paymentMethod, startDate, endDate, page, limit }
 */
export const getPaymentLogs = async (params = {}) => {
    const response = await api.get('/payment-logs', { params });
    return response.data;
};

/**
 * Get a single payment log by MongoDB _id or human-readable paymentId
 * GET /api/payment-logs/:id
 * @param {string} id - MongoDB ObjectId or paymentId (e.g. PAY-20240529-0001)
 */
export const getPaymentLogById = async (id) => {
    const response = await api.get(`/payment-logs/${id}`);
    return response.data;
};
