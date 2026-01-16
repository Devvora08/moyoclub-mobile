import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { User, LoginResponse } from '../types/auth';
import { login as apiLogin, signup as apiSignup, logout as apiLogout } from '../api/auth';
import { setAuthToken, clearAuthToken, initializeApi, getTokenStatus } from '../api/config';

/**
 * Auth context value interface
 */
interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isCheckingAuth: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
  signup: (data: SignupData) => Promise<{ success: boolean; message: string }>;
  logout: () => Promise<void>;
  refreshAuth: () => Promise<void>;
}

/**
 * Signup data interface
 */
interface SignupData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  address1: string;
  address2?: string;
  city: string;
  state: string;
  country: string;
  postalCode: string;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Auth Provider component
 * Manages global authentication state
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  /**
   * Check for existing session on mount
   */
  useEffect(() => {
    checkExistingSession();
  }, []);

  /**
   * Check if there's an existing user session
   */
  const checkExistingSession = async () => {
    try {
      const [userData, token] = await Promise.all([
        AsyncStorage.getItem('user'),
        AsyncStorage.getItem('token'),
      ]);

      if (userData && token) {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setAuthToken(token, false);
      } else {
        // No user session, initialize API with read-only user
        await initializeApi();
      }
    } catch (error) {
      console.error('Error checking session:', error);
      // Fallback to API user initialization
      await initializeApi();
    } finally {
      setIsCheckingAuth(false);
    }
  };

  /**
   * Save user session to AsyncStorage
   */
  const saveUserSession = async (userData: User, token: string) => {
    try {
      await Promise.all([
        AsyncStorage.setItem('user', JSON.stringify(userData)),
        AsyncStorage.setItem('token', token),
      ]);
    } catch (error) {
      console.error('Error saving session:', error);
    }
  };

  /**
   * Clear user session from AsyncStorage
   */
  const clearUserSession = async () => {
    try {
      await Promise.all([
        AsyncStorage.removeItem('user'),
        AsyncStorage.removeItem('token'),
      ]);
    } catch (error) {
      console.error('Error clearing session:', error);
    }
  };

  /**
   * Login user
   */
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response: LoginResponse = await apiLogin({
        email: email.trim(),
        password,
      });

      await saveUserSession(response.user, response.access_token);
      setUser(response.user);

      return {
        success: true,
        message: `Welcome back, ${response.user.first_name}!`,
      };
    } catch (error: any) {
      console.error('Login error:', error);
      const message = error.response?.data?.message || 'Login failed. Please check your credentials.';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Signup new user
   */
  const signup = useCallback(async (data: SignupData) => {
    setIsLoading(true);
    try {
      const response = await apiSignup({
        role_id: 3, // Customer role
        first_name: data.firstName.trim(),
        last_name: data.lastName.trim(),
        email: data.email.trim(),
        password: data.password,
        status: 'active',
        phone: data.phone.trim(),
        address1: data.address1.trim(),
        address2: data.address2?.trim() || undefined,
        city: data.city.trim(),
        state: data.state.trim(),
        country: data.country.trim(),
        postal_code: data.postalCode.trim(),
      });

      if (response.success) {
        return {
          success: true,
          message: 'Account created successfully. Please login.',
        };
      }
      return { success: false, message: 'Signup failed. Please try again.' };
    } catch (error: any) {
      console.error('Signup error:', error);
      const message = error.response?.data?.message || 'Signup failed. Please try again.';
      return { success: false, message };
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Logout user
   */
  const logout = useCallback(async () => {
    setIsLoading(true);
    try {
      await apiLogout();
      await clearUserSession();
      setUser(null);
      clearAuthToken();
      // Reinitialize with API user for read-only access
      await initializeApi();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  /**
   * Refresh auth state (re-check session)
   */
  const refreshAuth = useCallback(async () => {
    setIsCheckingAuth(true);
    await checkExistingSession();
  }, []);

  const value: AuthContextValue = {
    user,
    isAuthenticated: !!user,
    isLoading,
    isCheckingAuth,
    login,
    signup,
    logout,
    refreshAuth,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to access auth context
 */
export const useAuth = (): AuthContextValue => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
