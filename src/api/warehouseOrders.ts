import api from './config';
import { ApiOrder, ApiOrdersResponse } from '../types/warehouse';

export const fetchWarehouseOrders = async (page = 1): Promise<ApiOrdersResponse> => {
  const response = await api.get('/orders', { params: { page } });
  return response.data;
};

export const fetchWarehouseOrderById = async (id: number): Promise<ApiOrder> => {
  const response = await api.get(`/orders/${id}`);
  return response.data?.data ?? response.data;
};

export const fetchUserOrders = async (userId: number): Promise<{ data: ApiOrder[]; total: number }> => {
  const response = await api.get(`/users/${userId}/orders`);
  return response.data;
};

export const updateOrderStatus = async (orderId: number, status: string): Promise<ApiOrder> => {
  const response = await api.patch(`/orders/${orderId}/status`, { status });
  return response.data?.data ?? response.data;
};
