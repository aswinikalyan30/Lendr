import {api} from './index';

export const equipmentsList = async () => {
  try {
    const response = await api.get('/v1/equipment');
    return response.data;
  } catch (error) {
    console.error('Error fetching equipments:', error);
    throw error;
  }
}