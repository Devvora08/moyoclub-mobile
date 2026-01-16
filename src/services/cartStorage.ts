import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartState, CartItem, CART_STORAGE_KEY } from '../types/cart';

/**
 * Default cart state
 */
const DEFAULT_CART_STATE: CartState = {
  items: [],
  lastUpdated: null,
};

/**
 * Cart Storage Service
 * Handles persistence of cart data to AsyncStorage
 */
export const cartStorage = {
  /**
   * Load cart from AsyncStorage
   */
  async loadCart(): Promise<CartState> {
    try {
      const cartData = await AsyncStorage.getItem(CART_STORAGE_KEY);
      if (cartData) {
        const parsed = JSON.parse(cartData) as CartState;
        // Validate the structure
        if (parsed.items && Array.isArray(parsed.items)) {
          return parsed;
        }
      }
      return DEFAULT_CART_STATE;
    } catch (error) {
      console.error('Error loading cart from storage:', error);
      return DEFAULT_CART_STATE;
    }
  },

  /**
   * Save cart to AsyncStorage
   */
  async saveCart(cart: CartState): Promise<boolean> {
    try {
      const cartData = JSON.stringify({
        ...cart,
        lastUpdated: Date.now(),
      });
      await AsyncStorage.setItem(CART_STORAGE_KEY, cartData);
      return true;
    } catch (error) {
      console.error('Error saving cart to storage:', error);
      return false;
    }
  },

  /**
   * Clear cart from AsyncStorage
   */
  async clearCart(): Promise<boolean> {
    try {
      await AsyncStorage.removeItem(CART_STORAGE_KEY);
      return true;
    } catch (error) {
      console.error('Error clearing cart from storage:', error);
      return false;
    }
  },

  /**
   * Add item to cart
   */
  async addItem(item: CartItem): Promise<CartState> {
    const cart = await this.loadCart();
    const existingIndex = cart.items.findIndex(i => i.id === item.id);

    if (existingIndex >= 0) {
      // Update quantity of existing item
      cart.items[existingIndex].quantity += item.quantity;
    } else {
      // Add new item
      cart.items.push(item);
    }

    await this.saveCart(cart);
    return cart;
  },

  /**
   * Remove item from cart
   */
  async removeItem(cartItemId: string): Promise<CartState> {
    const cart = await this.loadCart();
    cart.items = cart.items.filter(item => item.id !== cartItemId);
    await this.saveCart(cart);
    return cart;
  },

  /**
   * Update item quantity
   */
  async updateItemQuantity(cartItemId: string, quantity: number): Promise<CartState> {
    const cart = await this.loadCart();
    const itemIndex = cart.items.findIndex(item => item.id === cartItemId);

    if (itemIndex >= 0) {
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        cart.items.splice(itemIndex, 1);
      } else {
        cart.items[itemIndex].quantity = quantity;
      }
    }

    await this.saveCart(cart);
    return cart;
  },

  /**
   * Get cart item count
   */
  async getItemCount(): Promise<number> {
    const cart = await this.loadCart();
    return cart.items.reduce((total, item) => total + item.quantity, 0);
  },

  /**
   * Get cart total price
   */
  async getTotalPrice(): Promise<number> {
    const cart = await this.loadCart();
    return cart.items.reduce((total, item) => {
      const itemPrice = item.price * item.quantity;
      const addonsPrice = item.selectedAddons.reduce(
        (sum, addon) => sum + addon.price * item.quantity,
        0
      );
      return total + itemPrice + addonsPrice;
    }, 0);
  },

  /**
   * Check if product is in cart
   */
  async isProductInCart(productId: number): Promise<boolean> {
    const cart = await this.loadCart();
    return cart.items.some(item => item.productId === productId);
  },

  /**
   * Get quantity of a product in cart
   */
  async getProductQuantity(productId: number): Promise<number> {
    const cart = await this.loadCart();
    return cart.items
      .filter(item => item.productId === productId)
      .reduce((total, item) => total + item.quantity, 0);
  },
};

export default cartStorage;
