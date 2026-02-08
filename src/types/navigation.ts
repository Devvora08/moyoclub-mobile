import { OrderResponse } from './order';

export type RootTabParamList = {
  Home: undefined;
  Browse: undefined;
  Cart: undefined;
  Account: undefined;
  More: undefined;
};

export type RootStackParamList = {
  MainTabs: undefined;
  OrderConfirmation: { order: OrderResponse };
  MyOrders: undefined;
};

export type WarehouseSection = 'delivery' | 'orders';
