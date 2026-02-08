import api from './config';
import { CreateOrderPayload, OrderResponse, MyOrdersResponse } from '../types/order';
import { CartItem } from '../types/cart';

export const generateTransactionId = (): string => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `TXN-${timestamp}-${random}`;
};

export const mapCartItemsToPayload = (items: CartItem[]): CreateOrderPayload['items'] => {
  return items.map(item => ({
    product_id: item.productId,
    name: item.name,
    price: item.price,
    qty: item.quantity,
  }));
};

export const createOrder = async (
  items: CartItem[],
  transactionId?: string
): Promise<OrderResponse> => {
  const payload: CreateOrderPayload = {
    transaction_id: transactionId || generateTransactionId(),
    items: mapCartItemsToPayload(items),
  };

  const response = await api.post('/orders', payload);
  console.log('createOrder raw response:', JSON.stringify(response.data));
  // Handle both { data: { ... } } and { ... } response shapes
  const order = response.data?.data ?? response.data;
  return order as OrderResponse;
};

export const fetchMyOrders = async (): Promise<MyOrdersResponse> => {
  const response = await api.get<MyOrdersResponse>('/my-orders');
  return response.data;
};
