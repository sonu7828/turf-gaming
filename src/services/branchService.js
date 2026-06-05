import api from './api';

/**
 * Create a new Branch
 * @param {object} branchData 
 * @returns {Promise<object>} response data
 */
export const createBranch = async (branchData) => {
    const response = await api.post('/branches', branchData);
    return response.data;
};

/**
 * Retrieve Branches with filters, searches, and pagination
 * @param {object} filters - status, subscriptionPlanId, ownerId, search, page, limit
 * @returns {Promise<object>} response data
 */
export const getBranches = async (filters = {}) => {
    const params = {};
    if (filters.status && filters.status !== 'ALL') {
        params.status = filters.status;
    }
    if (filters.subscriptionPlanId && filters.subscriptionPlanId !== 'ALL') {
        params.subscriptionPlanId = filters.subscriptionPlanId;
    }
    if (filters.ownerId && filters.ownerId !== 'ALL') {
        params.ownerId = filters.ownerId;
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

    const response = await api.get('/branches', { params });
    return response.data;
};

/**
 * Retrieve Branch by ID
 * @param {string} id 
 * @returns {Promise<object>} response data
 */
export const getBranchById = async (id) => {
    const response = await api.get(`/branches/${id}`);
    return response.data;
};

/**
 * Update complete branch details
 * @param {string} id 
 * @param {object} branchData 
 * @returns {Promise<object>} response data
 */
export const updateBranch = async (id, branchData) => {
    const response = await api.put(`/branches/${id}`, branchData);
    return response.data;
};

/**
 * Change status of a branch (ACTIVE | INACTIVE | SUSPENDED)
 * @param {string} id 
 * @param {string} status 
 * @returns {Promise<object>} response data
 */
export const changeBranchStatus = async (id, status) => {
    const response = await api.patch(`/branches/${id}/status`, { status });
    return response.data;
};

/**
 * Soft delete a branch
 * @param {string} id 
 * @returns {Promise<object>} response data
 */
export const deleteBranch = async (id) => {
    const response = await api.delete(`/branches/${id}`);
    return response.data;
};

/**
 * Get Branch statistics for Dashboard Cards
 * @returns {Promise<object>} response data
 */
export const getDashboardStats = async () => {
    const response = await api.get('/branches/dashboard/stats');
    return response.data;
};
