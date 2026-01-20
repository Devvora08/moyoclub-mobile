import { useMemo } from 'react';
import { useCart } from './useCart';
import { ProductDisplayData, Addon } from '../types/product';
import { getProductImageUrl } from '../api/products';

export interface RecommendedAddon {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUri: string | null;
  parentProductId: number;
  parentProductName: string;
  protein: string | null;
  calories: string | null;
}

interface UseAddOnRecommendationsReturn {
  recommendations: RecommendedAddon[];
  hasRecommendations: boolean;
  getRecommendationsForProduct: (productId: number) => RecommendedAddon[];
  getRecommendationsForSection: (sectionProductIds: number[]) => RecommendedAddon[];
}

/**
 * Transforms an Addon to a RecommendedAddon format
 */
const transformAddonToRecommendation = (
  addon: Addon,
  parentProduct: ProductDisplayData
): RecommendedAddon => {
  return {
    id: addon.id,
    name: addon.product_name,
    price: parseFloat(addon.price),
    imageUri: getProductImageUrl(addon.media),
    parentProductId: parentProduct.id,
    parentProductName: parentProduct.name,
    protein: addon.protein ? `${addon.protein}g` : null,
    calories: addon.calories,
  };
};

/**
 * Hook to get add-on recommendations based on items in cart
 * Returns add-ons from products that are currently in the cart
 */
export const useAddOnRecommendations = (
  products: ProductDisplayData[]
): UseAddOnRecommendationsReturn => {
  const { items } = useCart();

  // Get all product IDs currently in cart
  const cartProductIds = useMemo(() => {
    return [...new Set(items.map(item => item.productId))];
  }, [items]);

  // Get recommendations for a specific product
  const getRecommendationsForProduct = useMemo(() => {
    return (productId: number): RecommendedAddon[] => {
      const product = products.find(p => p.id === productId);
      if (!product || !product.hasAddons || product.addons.length === 0) {
        return [];
      }

      return product.addons.map(addon => transformAddonToRecommendation(addon, product));
    };
  }, [products]);

  // Compute all recommendations based on cart items
  const recommendations = useMemo(() => {
    if (cartProductIds.length === 0 || products.length === 0) {
      return [];
    }

    const allRecommendations: RecommendedAddon[] = [];
    const addedAddonIds = new Set<number>();

    // For each product in cart, get its add-ons
    for (const productId of cartProductIds) {
      const product = products.find(p => p.id === productId);

      if (!product || !product.hasAddons || !product.addons || product.addons.length === 0) {
        continue;
      }

      // Add each addon as a recommendation (avoid duplicates)
      for (const addon of product.addons) {
        // Skip if addon is already in cart as a main product
        if (cartProductIds.includes(addon.id)) {
          continue;
        }

        // Skip duplicate addons (same addon might be attached to multiple products)
        if (addedAddonIds.has(addon.id)) {
          continue;
        }

        addedAddonIds.add(addon.id);
        allRecommendations.push(transformAddonToRecommendation(addon, product));
      }
    }

    return allRecommendations;
  }, [cartProductIds, products]);

  // Get recommendations filtered by products in a specific section
  const getRecommendationsForSection = useMemo(() => {
    return (sectionProductIds: number[]): RecommendedAddon[] => {
      // Filter recommendations where the parent product is in this section
      return recommendations.filter(rec =>
        sectionProductIds.includes(rec.parentProductId)
      );
    };
  }, [recommendations]);

  return {
    recommendations,
    hasRecommendations: recommendations.length > 0,
    getRecommendationsForProduct,
    getRecommendationsForSection,
  };
};

export default useAddOnRecommendations;
