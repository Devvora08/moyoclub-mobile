import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const API_BASE_URL = 'https://api.moyoclub.one/api';

// Read-only API user credentials (for unauthenticated users to view products, etc.)
const API_USER = {
  email: 'api@moyoclub.com',
  password: 'QGmPZmqjyatOrJaF',
};

// Token storage (in-memory, synced with AsyncStorage)
let authToken: string | null = null;
let isApiUserToken = false; // Track if current token is from API user

// Create axios instance with base URL
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    if (authToken) {
      config.headers.Authorization = `Bearer ${authToken}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error.response?.data || error.message);
    return Promise.reject(error);
  }
);

// Set auth token (used after user login)
export const setAuthToken = (token: string, isApiUser = false) => {
  authToken = token;
  isApiUserToken = isApiUser;
};

// Clear auth token (used on logout)
export const clearAuthToken = () => {
  authToken = null;
  isApiUserToken = false;
};

// Get current token status
export const getTokenStatus = () => ({
  hasToken: !!authToken,
  isApiUserToken,
});

// Restore token from AsyncStorage (for persisted user sessions)
export const restoreToken = async (): Promise<boolean> => {
  try {
    const savedToken = await AsyncStorage.getItem('token');
    if (savedToken) {
      authToken = savedToken;
      isApiUserToken = false;
      console.log('User token restored from storage');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to restore token:', error);
    return false;
  }
};

// Initialize API - first try to restore user token, fallback to API user
export const initializeApi = async (): Promise<boolean> => {
  // First, try to restore existing user session
  const hasUserToken = await restoreToken();
  if (hasUserToken) {
    return true;
  }

  // No user token, initialize with API user for read-only access
  return initializeApiUserToken();
};

// Initialize with API user token (for read-only access)
export const initializeApiUserToken = async (): Promise<boolean> => {
  try {
    const response = await axios.post(`${API_BASE_URL}/login`, API_USER);
    if (response.data?.access_token) {
      setAuthToken(response.data.access_token, true);
      console.log('API User token initialized for read-only access');
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to initialize API user token:', error);
    return false;
  }
};

export default api;
