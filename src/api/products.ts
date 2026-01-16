import api, { API_BASE_URL } from './config';
import {
  Product,
  ProductsResponse,
  SingleProductResponse,
  ProductDisplayData,
  ProductFilters,
} from '../types/product';

// Image base URL
const IMAGE_BASE_URL = 'https://dev-moyoclub.one/upload/products/img';

/**
 * Constructs the full image URL from product id and image filename
 * @param productId - The product ID
 * @param img - The image filename from API (e.g., "20260114_348980")
 * @returns Full image URL or null
 */
export const getProductImageUrl = (productId: number, img: string | null): string | null => {
  if (!img) return null;
  return `${IMAGE_BASE_URL}/${productId}/${img}_m.jpg`;
};

/**
 * Fetches all products from the API
 */
export const fetchProducts = async (): Promise<Product[]> => {
  const response = await api.get<ProductsResponse>('/products');
  return response.data.data;
};

/**
 * Fetches a single product by ID
 */
export const fetchProductById = async (id: number): Promise<Product> => {
  const response = await api.get<SingleProductResponse>(`/products/${id}`);
  return response.data.data;
};

/**
 * Transforms API product data into display-friendly format
 * @param product - Raw product from API
 * @returns Transformed product data for UI components
 */
export const transformProductForDisplay = (product: Product): ProductDisplayData => {
  const price = parseFloat(product.price);

  // Calculate discount from campaigns if any
  let originalPrice: number | undefined;
  let discountText: string | undefined;

  if (product.campaigns && product.campaigns.length > 0) {
    const activeCampaign = product.campaigns.find(c => c.status === 'active');
    if (activeCampaign) {
      const discountValue = parseFloat(activeCampaign.discount_value);
      if (activeCampaign.discount_type === 'percentage') {
        originalPrice = Math.round(price / (1 - discountValue / 100));
        discountText = `${discountValue}% OFF`;
      } else {
        originalPrice = price + discountValue;
        discountText = `₹${discountValue} OFF`;
      }
    }
  }

  // Check if product has organic-related tags/badges
  const isOrganic = !!(
    product.badges?.toLowerCase().includes('organic') ||
    product.tags?.toLowerCase().includes('organic')
  );

  return {
    id: product.id,
    name: product.product_name,
    price,
    originalPrice,
    imageUri: getProductImageUrl(product.id, product.img),
    description: product.description,
    badges: product.badges,
    type: product.type,
    category: product.food_category,
    rating: 4.5, // Default rating since API doesn't provide it
    reviewCount: Math.floor(Math.random() * 200) + 50, // Placeholder
    protein: product.protein ? `${product.protein}g` : null,
    calories: product.calories,
    carbs: product.carbs ? `${product.carbs}g` : null,
    fat: product.fat ? `${product.fat}g` : null,
    discount: discountText,
    isOrganic,
    isVeg: product.type === 'veg',
    hasAddons: product.addons && product.addons.length > 0,
    hasCampaign: product.is_campaign || (product.campaigns && product.campaigns.length > 0),
    addons: product.addons || [],
    campaigns: product.campaigns || [],
    mealTimes: {
      breakfast: product.breakfast === '1',
      lunch: product.lunch === '1',
      dinner: product.dinner === '1',
      snacks: product.snacks === '1',
      beverages: product.beverages === '1',
    },
  };
};

/**
 * Transforms array of products for display
 */
export const transformProductsForDisplay = (products: Product[]): ProductDisplayData[] => {
  return products.map(transformProductForDisplay);
};

/**
 * Filters products based on given criteria
 */
export const filterProducts = (
  products: ProductDisplayData[],
  filters: ProductFilters
): ProductDisplayData[] => {
  return products.filter(product => {
    // Filter by type (veg/non-veg)
    if (filters.type && product.type !== filters.type) {
      return false;
    }

    // Filter by category
    if (filters.category && product.category !== filters.category) {
      return false;
    }

    // Filter by meal time
    if (filters.mealTime && !product.mealTimes[filters.mealTime]) {
      return false;
    }

    // Filter by protein (has protein info)
    if (filters.hasProtein && !product.protein) {
      return false;
    }

    // Filter by organic
    if (filters.isOrganic && !product.isOrganic) {
      return false;
    }

    return true;
  });
};

/**
 * Gets products that have high protein content
 */
export const getHighProteinProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.protein !== null);
};

/**
 * Gets products for breakfast
 */
export const getBreakfastProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.mealTimes.breakfast);
};

/**
 * Gets products for lunch
 */
export const getLunchProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.mealTimes.lunch);
};

/**
 * Gets products for dinner
 */
export const getDinnerProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.mealTimes.dinner);
};

/**
 * Gets snack products
 */
export const getSnackProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.mealTimes.snacks);
};

/**
 * Gets beverage products
 */
export const getBeverageProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.mealTimes.beverages);
};

/**
 * Gets products with active campaigns/deals
 */
export const getDealsProducts = (products: ProductDisplayData[]): ProductDisplayData[] => {
  return products.filter(p => p.discount !== undefined);
};
