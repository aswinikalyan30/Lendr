import { api } from './index';
export const userlogin = async (credentials) => {
  try {
    const response = await api.post('/v1/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error('Login failed:', error);
    throw error;
  }
};
