// Cart Types

import { ProductDisplayData, Addon } from './product';

/**
 * Represents a single item in the cart
 */
export interface CartItem {
  id: string; // Unique cart item ID (productId + selectedAddons hash)
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  imageUri: string | null;
  selectedAddons: SelectedAddon[];
  addedAt: number; // Timestamp when added
}

/**
 * Selected addon for a cart item
 */
export interface SelectedAddon {
  id: number;
  name: string;
  price: number;
}

/**
 * Cart state structure
 */
export interface CartState {
  items: CartItem[];
  lastUpdated: number | null;
}

/**
 * Cart context value
 */
export interface CartContextValue {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  isLoading: boolean;
  addToCart: (product: AddToCartInput) => Promise<CartOperationResult>;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, quantity: number) => void;
  clearCart: () => void;
  getItemQuantity: (productId: number) => number;
  isInCart: (productId: number) => boolean;
}

/**
 * Input for adding item to cart
 */
export interface AddToCartInput {
  productId: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUri: string | null;
  quantity?: number;
  selectedAddons?: SelectedAddon[];
}

/**
 * Result of cart operation
 */
export interface CartOperationResult {
  success: boolean;
  message: string;
  requiresAuth?: boolean;
}

/**
 * Storage key for cart data
 */
export const CART_STORAGE_KEY = '@moyoclub_cart';

/**
 * Generate unique cart item ID based on product and selected addons
 */
export const generateCartItemId = (
  productId: number,
  selectedAddons: SelectedAddon[] = []
): string => {
  const addonIds = selectedAddons
    .map(a => a.id)
    .sort((a, b) => a - b)
    .join('-');
  return `${productId}${addonIds ? `-${addonIds}` : ''}`;
};
