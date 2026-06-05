import api from './api';

/**
 * Retrieve all available active master sports
 * @returns {Promise<object>} API response details
 */
export const getMasterSports = async () => {
    const response = await api.get('/sports/master');
    return response.data;
};

/**
 * Retrieve configured sports for a specific branch
 * @param {string} branchId - The branch ID
 * @returns {Promise<object>} API response details
 */
export const getBranchSports = async (branchId) => {
    const response = await api.get('/sports', {
        params: { branchId }
    });
    return response.data;
};

/**
 * Retrieve details for a single branch sport config by ID
 * @param {string} id - The configuration ID
 * @returns {Promise<object>} API response details
 */
export const getSportById = async (id) => {
    const response = await api.get(`/sports/${id}`);
    return response.data;
};

/**
 * Activate/Configure a sport for a branch
 * @param {object} payload - branchId, sportId, regularPrice, peakPrice, totalCourts
 * @returns {Promise<object>} API response details
 */
export const activateSport = async (payload) => {
    const response = await api.post('/sports/activate', payload);
    return response.data;
};

/**
 * Update pricing and courts setup of configured branch sport
 * @param {string} id - The configuration ID
 * @param {object} payload - regularPrice, peakPrice, totalCourts
 * @returns {Promise<object>} API response details
 */
export const updateSport = async (id, payload) => {
    const response = await api.put(`/sports/${id}`, payload);
    return response.data;
};

/**
 * Toggle status of a branch sport
 * @param {string} id - The configuration ID
 * @param {string} status - ACTIVE or INACTIVE
 * @returns {Promise<object>} API response details
 */
export const changeSportStatus = async (id, status) => {
    const response = await api.patch(`/sports/${id}/status`, { status });
    return response.data;
};

/**
 * Hard delete a configured branch sport
 * @param {string} id - The configuration ID
 * @returns {Promise<object>} API response details
 */
export const deleteSport = async (id) => {
    const response = await api.delete(`/sports/${id}`);
    return response.data;
};
