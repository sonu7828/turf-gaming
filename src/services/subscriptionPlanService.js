import api from './api';

/**
 * Create a new subscription plan
 * @param {object} planData 
 * @returns {Promise<object>} response data
 */
export const createPlan = async (planData) => {
    const response = await api.post('/subscription-plans', planData);
    return response.data;
};

/**
 * Retrieve all subscription plans
 * @returns {Promise<object>} response data
 */
export const getAllPlans = async () => {
    const response = await api.get('/subscription-plans');
    return response.data;
};

/**
 * Retrieve a single subscription plan by ID
 * @param {string} id 
 * @returns {Promise<object>} response data
 */
export const getPlanById = async (id) => {
    const response = await api.get(`/subscription-plans/${id}`);
    return response.data;
};

/**
 * Update complete subscription plan details
 * @param {string} id 
 * @param {object} planData 
 * @returns {Promise<object>} response data
 */
export const updatePlan = async (id, planData) => {
    const response = await api.put(`/subscription-plans/${id}`, planData);
    return response.data;
};

/**
 * Soft delete a subscription plan
 * @param {string} id 
 * @returns {Promise<object>} response data
 */
export const deletePlan = async (id) => {
    const response = await api.delete(`/subscription-plans/${id}`);
    return response.data;
};

/**
 * Update active status of a subscription plan
 * @param {string} id 
 * @param {string} status - 'active' | 'inactive' | 'draft'
 * @returns {Promise<object>} response data
 */
export const toggleStatus = async (id, status) => {
    const response = await api.patch(`/subscription-plans/${id}/status`, { status });
    return response.data;
};

/**
 * Update popular flag of a subscription plan
 * @param {string} id 
 * @param {boolean} isPopular 
 * @returns {Promise<object>} response data
 */
export const togglePopular = async (id, isPopular) => {
    const response = await api.patch(`/subscription-plans/${id}/popular`, { isPopular });
    return response.data;
};
