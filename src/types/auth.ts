// Auth Types

export interface LoginRequest {
  email: string;
  password: string;
}

export interface SignupRequest {
  role_id: number;
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  status?: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
}

export interface User {
  id: number;
  role_id: string;
  first_name: string;
  last_name: string;
  email: string;
  status: string;
  phone?: string;
  address1?: string;
  address2?: string;
  city?: string;
  state?: string;
  country?: string;
  postal_code?: string;
  created_at: string;
  updated_at: string;
  role: {
    id: number;
    name: string;
    slug: string;
  };
  info: any;
}

export interface LoginResponse {
  access_token: string;
  token_type: string;
  user: User;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

export interface OtpRequest {
  email: string;
}

export interface OtpVerifyRequest {
  email: string;
  otp: string;
}
