import {api} from './index';

export const bookingsList = async () => {
  try {
    const response = await api.get('/v1/bookings');
    return response.data;
  } catch (error) {
    console.error('Error fetching bookings:', error);
    throw error;
  }
}