import api from './api';

/**
 * Get current commission settings from backend
 * GET /api/settings/commission
 */
export const getCommissionSettings = async () => {
    const response = await api.get('/settings/commission');
    return response.data;
};

/**
 * Update commission settings on backend
 * PUT /api/settings/commission
 * @param {Object} payload - { defaultRate, maxRate, sportsRates: [{ sportName, commissionRate }] }
 */
export const updateCommissionSettings = async (payload) => {
    const response = await api.put('/settings/commission', payload);
    return response.data;
};

/**
 * Toggle commission settings status (ACTIVE / INACTIVE)
 * PATCH /api/settings/commission/status
 * @param {String} status - 'ACTIVE' or 'INACTIVE'
 */
export const changeCommissionStatus = async (status) => {
    const response = await api.patch('/settings/commission/status', { status });
    return response.data;
};
