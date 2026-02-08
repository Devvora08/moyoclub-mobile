import { User } from '../types/auth';
import { DeliveryPerson, DeliveryStats, OrderStats, WarehouseOrder } from '../types/warehouse';

export const WAREHOUSE_CREDENTIALS = {
  email: 'warehouse@moyoclub.one',
  password: 'Moyo@2025',
};

export const WAREHOUSE_USER: User = {
  id: 9999,
  role_id: '5',
  first_name: 'Warehouse',
  last_name: 'Manager',
  email: 'warehouse@moyoclub.one',
  status: 'active',
  phone: '+91 9876543210',
  address1: 'MoyoClub Warehouse, Sector 12',
  city: 'Mumbai',
  state: 'Maharashtra',
  country: 'India',
  postal_code: '400001',
  created_at: '2025-01-01T00:00:00.000Z',
  updated_at: '2025-01-01T00:00:00.000Z',
  role: {
    id: 5,
    name: 'Warehouse Manager',
    slug: 'warehouse-manager',
  },
  info: null,
};

export const DELIVERY_STATS: DeliveryStats[] = [
  { label: 'Ready for Delivery', value: 12, icon: 'cube-outline', color: '#FF6B35' },
  { label: 'Unassigned', value: 5, icon: 'alert-circle-outline', color: '#EF4444' },
  { label: 'Assigned', value: 7, icon: 'checkmark-circle-outline', color: '#10B981' },
  { label: 'Available Staff', value: 3, icon: 'people-outline', color: '#3B82F6' },
  { label: 'Total Staff', value: 5, icon: 'person-outline', color: '#8B5CF6' },
];

export const ORDER_STATS: OrderStats[] = [
  { label: 'Total Orders', value: 48, icon: 'receipt-outline', color: '#FF6B35' },
  { label: 'Pending', value: 8, icon: 'time-outline', color: '#F59E0B' },
  { label: 'Processing', value: 12, icon: 'cog-outline', color: '#8B5CF6' },
  { label: 'Shipped', value: 18, icon: 'car-outline', color: '#3B82F6' },
  { label: 'Delivered', value: 10, icon: 'checkmark-done-outline', color: '#10B981' },
];

export const DELIVERY_PERSONNEL: DeliveryPerson[] = [
  {
    id: 'dp-1',
    name: 'Rajesh Kumar',
    phone: '+91 98765 43210',
    location: 'Andheri West',
    vehicle: 'bike',
    capacity: 10,
    currentOrders: 3,
    rating: 4.8,
    available: true,
    avatar: 'RK',
  },
  {
    id: 'dp-2',
    name: 'Amit Sharma',
    phone: '+91 98765 43211',
    location: 'Bandra East',
    vehicle: 'van',
    capacity: 25,
    currentOrders: 8,
    rating: 4.5,
    available: true,
    avatar: 'AS',
  },
  {
    id: 'dp-3',
    name: 'Priya Patel',
    phone: '+91 98765 43212',
    location: 'Juhu',
    vehicle: 'bike',
    capacity: 10,
    currentOrders: 10,
    rating: 4.9,
    available: false,
    avatar: 'PP',
  },
];

export const WAREHOUSE_ORDERS: WarehouseOrder[] = [
  {
    id: 'ORD-2401',
    customer: {
      name: 'Anita Desai',
      email: 'anita.desai@email.com',
      phone: '+91 98111 22334',
      address: '42, Marine Drive, Colaba, Mumbai 400001',
    },
    items: [
      { id: 1, name: 'Farm Fresh Cow Milk (500ml)', frequency: 'Daily', quantity: 2, price: 35 },
      { id: 2, name: 'Organic Paneer (200g)', frequency: 'Weekly', quantity: 1, price: 120 },
    ],
    total: 190,
    deliveryFee: 30,
    status: 'pending',
    date: '2025-05-15',
  },
  {
    id: 'ORD-2402',
    customer: {
      name: 'Vikram Singh',
      email: 'vikram.s@email.com',
      phone: '+91 98222 33445',
      address: '15, Linking Road, Bandra West, Mumbai 400050',
    },
    items: [
      { id: 3, name: 'Buffalo Milk (1L)', frequency: 'Daily', quantity: 1, price: 65 },
      { id: 4, name: 'Curd (500g)', frequency: 'Alternate Day', quantity: 2, price: 45 },
      { id: 5, name: 'Buttermilk (500ml)', frequency: 'Weekly', quantity: 3, price: 25 },
    ],
    total: 230,
    deliveryFee: 30,
    status: 'accepted',
    date: '2025-05-15',
  },
  {
    id: 'ORD-2403',
    customer: {
      name: 'Meera Joshi',
      email: 'meera.j@email.com',
      phone: '+91 98333 44556',
      address: '78, SV Road, Andheri West, Mumbai 400058',
    },
    items: [
      { id: 6, name: 'A2 Cow Milk (1L)', frequency: 'Daily', quantity: 1, price: 80 },
    ],
    total: 80,
    deliveryFee: 0,
    status: 'processing',
    date: '2025-05-14',
  },
  {
    id: 'ORD-2404',
    customer: {
      name: 'Rahul Mehta',
      email: 'rahul.m@email.com',
      phone: '+91 98444 55667',
      address: '23, Turner Road, Bandra, Mumbai 400050',
    },
    items: [
      { id: 7, name: 'Farm Fresh Cow Milk (500ml)', frequency: 'Daily', quantity: 3, price: 35 },
      { id: 8, name: 'Ghee (500ml)', frequency: 'Monthly', quantity: 1, price: 450 },
    ],
    total: 555,
    deliveryFee: 30,
    status: 'packed',
    date: '2025-05-14',
  },
  {
    id: 'ORD-2405',
    customer: {
      name: 'Sneha Kapoor',
      email: 'sneha.k@email.com',
      phone: '+91 98555 66778',
      address: '56, Hill Road, Bandra, Mumbai 400050',
    },
    items: [
      { id: 9, name: 'Organic Paneer (200g)', frequency: 'Weekly', quantity: 2, price: 120 },
      { id: 10, name: 'Curd (500g)', frequency: 'Daily', quantity: 1, price: 45 },
    ],
    total: 285,
    deliveryFee: 30,
    status: 'dispatched',
    date: '2025-05-13',
    assignedTo: 'dp-1',
  },
  {
    id: 'ORD-2406',
    customer: {
      name: 'Arjun Nair',
      email: 'arjun.n@email.com',
      phone: '+91 98666 77889',
      address: '12, Juhu Tara Road, Juhu, Mumbai 400049',
    },
    items: [
      { id: 11, name: 'Buffalo Milk (1L)', frequency: 'Daily', quantity: 2, price: 65 },
    ],
    total: 130,
    deliveryFee: 0,
    status: 'delivered',
    date: '2025-05-12',
    assignedTo: 'dp-2',
  },
  {
    id: 'ORD-2407',
    customer: {
      name: 'Pooja Reddy',
      email: 'pooja.r@email.com',
      phone: '+91 98777 88990',
      address: '89, FC Road, Pune 411004',
    },
    items: [
      { id: 12, name: 'Farm Fresh Cow Milk (500ml)', frequency: 'Daily', quantity: 1, price: 35 },
      { id: 13, name: 'Buttermilk (500ml)', frequency: 'Weekly', quantity: 2, price: 25 },
    ],
    total: 85,
    deliveryFee: 30,
    status: 'rejected',
    date: '2025-05-12',
  },
  {
    id: 'ORD-2408',
    customer: {
      name: 'Karan Malhotra',
      email: 'karan.m@email.com',
      phone: '+91 98888 99001',
      address: '34, Pali Hill, Bandra, Mumbai 400050',
    },
    items: [
      { id: 14, name: 'A2 Cow Milk (1L)', frequency: 'Daily', quantity: 2, price: 80 },
      { id: 15, name: 'Organic Paneer (200g)', frequency: 'Weekly', quantity: 1, price: 120 },
      { id: 16, name: 'Ghee (500ml)', frequency: 'Monthly', quantity: 1, price: 450 },
    ],
    total: 730,
    deliveryFee: 0,
    status: 'packed',
    date: '2025-05-14',
  },
];
