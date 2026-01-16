import api, { setAuthToken, clearAuthToken, initializeApiUserToken } from './config';
import {
  LoginRequest,
  SignupRequest,
  LoginResponse,
  ApiResponse,
  User,
  OtpRequest,
  OtpVerifyRequest,
} from '../types/auth';

// Login with email and password
export const login = async (data: LoginRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/login', data);

  // Store the token
  if (response.data.access_token) {
    setAuthToken(response.data.access_token, false);
  }

  return response.data;
};

// Signup new user (role_id 3 = Customer)
export const signup = async (data: SignupRequest): Promise<ApiResponse<User>> => {
  const response = await api.post<ApiResponse<User>>('/users', {
    ...data,
    role_id: data.role_id || 3, // Default to customer role
    status: data.status || 'active',
  });

  return response.data;
};

// Request OTP via email
export const requestOtp = async (email: string): Promise<ApiResponse<any>> => {
  const response = await api.post<ApiResponse<any>>('/otp/login/email', { email });
  return response.data;
};

// Verify OTP
export const verifyOtp = async (data: OtpVerifyRequest): Promise<LoginResponse> => {
  const response = await api.post<LoginResponse>('/otp/verify/email', data);

  // Store the token if OTP verification returns one
  if (response.data.access_token) {
    setAuthToken(response.data.access_token, false);
  }

  return response.data;
};

// Logout - clear user token and reinitialize with API user
export const logout = async (): Promise<void> => {
  clearAuthToken();
  await initializeApiUserToken();
};

// Get current user info
export const getCurrentUser = async (userId: number): Promise<ApiResponse<User>> => {
  const response = await api.get<ApiResponse<User>>(`/users/${userId}`);
  return response.data;
};
