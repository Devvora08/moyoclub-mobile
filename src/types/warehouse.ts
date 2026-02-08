export type OrderStatus =
  | 'pending'
  | 'accepted'
  | 'rejected'
  | 'processing'
  | 'packed'
  | 'dispatched'
  | 'delivered';

export type VehicleType = 'bike' | 'van' | 'truck' | 'auto';

export interface OrderCustomer {
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface OrderItem {
  id: number;
  name: string;
  frequency: string;
  quantity: number;
  price: number;
}

export interface WarehouseOrder {
  id: string;
  customer: OrderCustomer;
  items: OrderItem[];
  total: number;
  deliveryFee: number;
  status: OrderStatus;
  date: string;
  assignedTo?: string;
}

// API response types for warehouse orders
export interface ApiOrderUser {
  id: number;
  name: string;
  email: string;
  mobile: string;
}

export interface ApiOrderItem {
  id: number;
  product_id: number;
  product_name: string;
  price: string;
  quantity: number;
  total: string;
}

export interface ApiOrder {
  id: number;
  order_uid: string;
  status: string;
  transaction_id: string;
  subtotal: string;
  tax: string;
  total: string;
  paid_at: string | null;
  created_at: string;
  updated_at: string;
  user: ApiOrderUser;
  items: ApiOrderItem[];
}

export interface ApiOrdersResponse {
  current_page: number;
  data: ApiOrder[];
  last_page: number;
  per_page: number;
  total: number;
}

// Status transition map matching the backend
export const STATUS_TRANSITIONS: Record<string, string[]> = {
  pending: ['accepted', 'rejected'],
  accepted: ['processing'],
  processing: ['packed'],
  packed: ['dispatched'],
  dispatched: ['delivered'],
};

export const STATUS_ACTION_LABELS: Record<string, { label: string; icon: string; color: string }> = {
  accepted: { label: 'Accept', icon: 'checkmark-circle-outline', color: '#10B981' },
  rejected: { label: 'Reject', icon: 'close-circle-outline', color: '#EF4444' },
  processing: { label: 'Start Processing', icon: 'cog-outline', color: '#8B5CF6' },
  packed: { label: 'Mark Packed', icon: 'cube-outline', color: '#3730A3' },
  dispatched: { label: 'Dispatch', icon: 'car-outline', color: '#3B82F6' },
  delivered: { label: 'Mark Delivered', icon: 'checkmark-done-outline', color: '#047857' },
};

export interface DeliveryPerson {
  id: string;
  name: string;
  phone: string;
  location: string;
  vehicle: VehicleType;
  capacity: number;
  currentOrders: number;
  rating: number;
  available: boolean;
  avatar: string;
}

export interface DeliveryStats {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export interface OrderStats {
  label: string;
  value: number;
  icon: string;
  color: string;
}

export const ORDER_STATUS_COLORS: Record<string, { bg: string; text: string; label: string }> = {
  pending: { bg: '#FEF3C7', text: '#92400E', label: 'Pending' },
  accepted: { bg: '#DBEAFE', text: '#1E40AF', label: 'Accepted' },
  rejected: { bg: '#FEE2E2', text: '#991B1B', label: 'Rejected' },
  processing: { bg: '#EDE9FE', text: '#5B21B6', label: 'Processing' },
  packed: { bg: '#E0E7FF', text: '#3730A3', label: 'Packed' },
  dispatched: { bg: '#D1FAE5', text: '#065F46', label: 'Dispatched' },
  delivered: { bg: '#D1FAE5', text: '#047857', label: 'Delivered' },
};

export type WarehouseSection = 'delivery' | 'orders';
