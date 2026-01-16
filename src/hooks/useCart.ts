/**
 * Cart hook - re-exports from CartContext for convenience
 *
 * Usage:
 * import { useCart } from '../hooks/useCart';
 *
 * const { items, addToCart, totalItems, totalPrice } = useCart();
 */
export { useCart } from '../context/CartContext';
export type { CartContextValue } from '../types/cart';
