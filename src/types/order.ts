export interface CreateOrderItem {
  product_id: number;
  name: string;
  price: number;
  qty: number;
}

export interface CreateOrderPayload {
  transaction_id: string;
  items: CreateOrderItem[];
}

export interface OrderItem {
  id: number;
  product_id: number;
  name: string;
  price: number;
  qty: number;
}

export interface OrderResponse {
  id: number;
  order_uid: string;
  transaction_id: string;
  subtotal: number;
  tax: number;
  total: number;
  status: string;
  items: OrderItem[];
}

export interface MyOrderItem {
  product_name: string;
  quantity: number;
}

export interface MyOrder {
  id: number;
  order_uid: string;
  status: string;
  total: string;
  created_at: string;
  items: MyOrderItem[];
}

export interface MyOrdersResponse {
  data: MyOrder[];
  current_page: number;
  total: number;
}
