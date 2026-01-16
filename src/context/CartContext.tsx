import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  useMemo,
  ReactNode,
} from 'react';
import {
  CartItem,
  CartContextValue,
  AddToCartInput,
  CartOperationResult,
  generateCartItemId,
} from '../types/cart';
import { cartStorage } from '../services/cartStorage';
import { useAuth } from './AuthContext';

const CartContext = createContext<CartContextValue | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

/**
 * Cart Provider component
 * Manages global cart state with AsyncStorage persistence
 */
export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { isAuthenticated } = useAuth();

  /**
   * Load cart from storage on mount
   */
  useEffect(() => {
    loadCart();
  }, []);

  /**
   * Load cart from AsyncStorage
   */
  const loadCart = async () => {
    setIsLoading(true);
    try {
      const cart = await cartStorage.loadCart();
      setItems(cart.items);
    } catch (error) {
      console.error('Error loading cart:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sync cart state to storage whenever items change
   */
  const syncCartToStorage = useCallback(async (cartItems: CartItem[]) => {
    await cartStorage.saveCart({
      items: cartItems,
      lastUpdated: Date.now(),
    });
  }, []);

  /**
   * Add item to cart
   * Requires user to be authenticated (not read-only mode)
   */
  const addToCart = useCallback(
    async (input: AddToCartInput): Promise<CartOperationResult> => {
      // Check if user is authenticated
      if (!isAuthenticated) {
        return {
          success: false,
          message: 'Please login to add items to cart',
          requiresAuth: true,
        };
      }

      try {
        const cartItemId = generateCartItemId(input.productId, input.selectedAddons);
        const newItem: CartItem = {
          id: cartItemId,
          productId: input.productId,
          name: input.name,
          price: input.price,
          originalPrice: input.originalPrice,
          quantity: input.quantity || 1,
          imageUri: input.imageUri,
          selectedAddons: input.selectedAddons || [],
          addedAt: Date.now(),
        };

        setItems(prevItems => {
          const existingIndex = prevItems.findIndex(item => item.id === cartItemId);
          let updatedItems: CartItem[];

          if (existingIndex >= 0) {
            // Update quantity of existing item
            updatedItems = prevItems.map((item, index) =>
              index === existingIndex
                ? { ...item, quantity: item.quantity + (input.quantity || 1) }
                : item
            );
          } else {
            // Add new item
            updatedItems = [...prevItems, newItem];
          }

          // Sync to storage
          syncCartToStorage(updatedItems);
          return updatedItems;
        });

        return {
          success: true,
          message: `${input.name} added to cart`,
        };
      } catch (error) {
        console.error('Error adding to cart:', error);
        return {
          success: false,
          message: 'Failed to add item to cart',
        };
      }
    },
    [isAuthenticated, syncCartToStorage]
  );

  /**
   * Remove item from cart
   */
  const removeFromCart = useCallback(
    (cartItemId: string) => {
      setItems(prevItems => {
        const updatedItems = prevItems.filter(item => item.id !== cartItemId);
        syncCartToStorage(updatedItems);
        return updatedItems;
      });
    },
    [syncCartToStorage]
  );

  /**
   * Update item quantity
   */
  const updateQuantity = useCallback(
    (cartItemId: string, quantity: number) => {
      if (quantity <= 0) {
        removeFromCart(cartItemId);
        return;
      }

      setItems(prevItems => {
        const updatedItems = prevItems.map(item =>
          item.id === cartItemId ? { ...item, quantity } : item
        );
        syncCartToStorage(updatedItems);
        return updatedItems;
      });
    },
    [removeFromCart, syncCartToStorage]
  );

  /**
   * Clear entire cart
   */
  const clearCart = useCallback(() => {
    setItems([]);
    cartStorage.clearCart();
  }, []);

  /**
   * Get quantity of a specific product in cart
   */
  const getItemQuantity = useCallback(
    (productId: number): number => {
      return items
        .filter(item => item.productId === productId)
        .reduce((total, item) => total + item.quantity, 0);
    },
    [items]
  );

  /**
   * Check if a product is in cart
   */
  const isInCart = useCallback(
    (productId: number): boolean => {
      return items.some(item => item.productId === productId);
    },
    [items]
  );

  /**
   * Calculate total items in cart
   */
  const totalItems = useMemo(() => {
    return items.reduce((total, item) => total + item.quantity, 0);
  }, [items]);

  /**
   * Calculate total price
   */
  const totalPrice = useMemo(() => {
    return items.reduce((total, item) => {
      const itemPrice = item.price * item.quantity;
      const addonsPrice = item.selectedAddons.reduce(
        (sum, addon) => sum + addon.price * item.quantity,
        0
      );
      return total + itemPrice + addonsPrice;
    }, 0);
  }, [items]);

  const value: CartContextValue = {
    items,
    totalItems,
    totalPrice,
    isLoading,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getItemQuantity,
    isInCart,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

/**
 * Hook to access cart context
 */
export const useCart = (): CartContextValue => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export default CartContext;
