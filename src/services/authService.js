import api from './api';

/**
 * Log in a user with email and password
 * @param {string} email 
 * @param {string} password 
 * @returns {Promise<object>} response data
 */
export const loginUser = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
};

/**
 * Fetch current user profile
 * @returns {Promise<object>} response data
 */
export const getProfile = async () => {
    const response = await api.get('/auth/profile');
    return response.data;
};

/**
 * Update current user profile details
 * @param {object} profileData 
 * @returns {Promise<object>} response data
 */
export const updateProfile = async (profileData) => {
    const response = await api.put('/auth/profile', profileData);
    return response.data;
};

/**
 * Change current user password
 * @param {object} passwordData 
 * @returns {Promise<object>} response data
 */
export const changePassword = async (passwordData) => {
    const response = await api.put('/auth/change-password', passwordData);
    return response.data;
};
