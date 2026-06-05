import api from './api';

/**
 * Create a new slot
 * @param {object} payload - Slot configurations
 * @returns {Promise<object>} API response details
 */
export const createSlot = async (payload) => {
    const response = await api.post('/slots', payload);
    return response.data;
};

/**
 * Retrieve slots by filter parameters
 * @param {object} params - branchId, date, startDate, endDate, sportId, courtName
 * @returns {Promise<object>} API response details
 */
export const getSlots = async (params) => {
    const response = await api.get('/slots', { params });
    return response.data;
};

/**
 * Retrieve details for a single slot config by ID
 * @param {string} id - The slot ID
 * @returns {Promise<object>} API response details
 */
export const getSlotById = async (id) => {
    const response = await api.get(`/slots/${id}`);
    return response.data;
};

/**
 * Update pricing and courts setup of a slot
 * @param {string} id - The slot ID
 * @param {object} payload - Slot details
 * @returns {Promise<object>} API response details
 */
export const updateSlot = async (id, payload) => {
    const response = await api.put(`/slots/${id}`, payload);
    return response.data;
};

/**
 * Toggle status or notes of a slot
 * @param {string} id - The slot ID
 * @param {string} status - AVAILABLE, BOOKED, or BLOCKED
 * @param {string} notes - Optional notes string
 * @returns {Promise<object>} API response details
 */
export const updateSlotStatus = async (id, status, notes = '') => {
    const response = await api.patch(`/slots/${id}/status`, { status, notes });
    return response.data;
};

/**
 * Soft delete a configured slot
 * @param {string} id - The slot ID
 * @returns {Promise<object>} API response details
 */
export const deleteSlot = async (id) => {
    const response = await api.delete(`/slots/${id}`);
    return response.data;
};
