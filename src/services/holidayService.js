import api from './api';

/**
 * Create a new branch holiday
 * @param {object} payload - Holiday details
 * @returns {Promise<object>} API response details
 */
export const createHoliday = async (payload) => {
    const response = await api.post('/holidays', payload);
    return response.data;
};

/**
 * Get holidays list for a branch
 * @param {object} params - branchId, startDate, endDate
 * @returns {Promise<object>} API response details
 */
export const getHolidays = async (params) => {
    const response = await api.get('/holidays', { params });
    return response.data;
};

/**
 * Soft delete a holiday configuration by ID
 * @param {string} id - The holiday ID
 * @returns {Promise<object>} API response details
 */
export const deleteHoliday = async (id) => {
    const response = await api.delete(`/holidays/${id}`);
    return response.data;
};
