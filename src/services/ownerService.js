import api from './api';

/**
 * Create a new Owner
 * @param {object} ownerData 
 * @returns {Promise<object>} response data
 */
export const createOwner = async (ownerData) => {
    const response = await api.post('/owners', ownerData);
    return response.data;
};

/**
 * Retrieve Owners with filters and pagination
 * @param {object} filters - search term, status, page, limit
 * @returns {Promise<object>} response data
 */
export const getOwners = async (filters = {}) => {
    const params = {};
    if (filters.status && filters.status !== 'ALL') {
        params.status = filters.status;
    }
    if (filters.search) {
        params.search = filters.search;
    }
    if (filters.page) {
        params.page = filters.page;
    }
    if (filters.limit) {
        params.limit = filters.limit;
    }

    const response = await api.get('/owners', { params });
    return response.data;
};

/**
 * Retrieve Owner by ID
 * @param {string} id 
 * @returns {Promise<object>} response data
 */
export const getOwnerById = async (id) => {
    const response = await api.get(`/owners/${id}`);
    return response.data;
};

/**
 * Update complete owner details
 * @param {string} id 
 * @param {object} ownerData 
 * @returns {Promise<object>} response data
 */
export const updateOwner = async (id, ownerData) => {
    const response = await api.put(`/owners/${id}`, ownerData);
    return response.data;
};

/**
 * Update owner active status
 * @param {string} id 
 * @param {string} status - ACTIVE | INACTIVE | SUSPENDED
 * @returns {Promise<object>} response data
 */
export const changeOwnerStatus = async (id, status) => {
    const response = await api.patch(`/owners/${id}/status`, { status });
    return response.data;
};

/**
 * Reset owner account password
 * @param {string} id 
 * @param {object} passwords - password, confirmPassword
 * @returns {Promise<object>} response data
 */
export const resetOwnerPassword = async (id, passwords) => {
    const response = await api.patch(`/owners/${id}/reset-password`, passwords);
    return response.data;
};

/**
 * Soft delete an owner
 * @param {string} id 
 * @returns {Promise<object>} response data
 */
export const deleteOwner = async (id) => {
    const response = await api.delete(`/owners/${id}`);
    return response.data;
};
