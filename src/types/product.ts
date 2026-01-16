// Product Types

export type ProductType = 'veg' | 'non-veg';
export type ProductStatus = 'active' | 'inactive';
export type MealTime = '0' | '1'; // '0' = false, '1' = true

// Base product fields shared between Product and Addon
export interface BaseProduct {
  id: number;
  product_name: string;
  product_code: string;
  price: string; // API returns price as string
  img: string | null;
  description: string | null;
  badges: string | null;
  type: ProductType;
  food_category: string | null;
  food_style: string | null;
  tags: string | null;
  breakfast: MealTime;
  lunch: MealTime;
  dinner: MealTime;
  snacks: MealTime;
  beverages: MealTime;
  calories: string | null;
  protein: string | null;
  carbs: string | null;
  fat: string | null;
  is_campaign: boolean;
  is_addon: boolean;
  status: ProductStatus;
  created_at: string;
  updated_at: string;
}

// Addon product with pivot data
export interface Addon extends BaseProduct {
  pivot: {
    product_id: string;
    addon_product_id: string;
  };
}

// Campaign structure (based on typical e-commerce patterns)
export interface Campaign {
  id: number;
  name: string;
  description: string | null;
  discount_type: 'percentage' | 'fixed';
  discount_value: string;
  start_date: string;
  end_date: string;
  status: 'active' | 'inactive';
  pivot?: {
    product_id: string;
    campaign_id: string;
  };
}

// Full product with relations
export interface Product extends BaseProduct {
  campaigns: Campaign[];
  addons: Addon[];
}

// API Response wrapper
export interface ProductsResponse {
  success: boolean;
  message: string;
  data: Product[];
}

export interface SingleProductResponse {
  success: boolean;
  message: string;
  data: Product;
}

// Helper type for product display
export interface ProductDisplayData {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  imageUri: string | null;
  description: string | null;
  badges: string | null;
  type: ProductType;
  category: string | null;
  rating: number; // Placeholder since API doesn't provide rating
  reviewCount: number; // Placeholder since API doesn't provide reviews
  protein: string | null;
  calories: string | null;
  carbs: string | null;
  fat: string | null;
  discount?: string;
  isOrganic: boolean;
  isVeg: boolean;
  hasAddons: boolean;
  hasCampaign: boolean;
  addons: Addon[];
  campaigns: Campaign[];
  mealTimes: {
    breakfast: boolean;
    lunch: boolean;
    dinner: boolean;
    snacks: boolean;
    beverages: boolean;
  };
}

// Filter options for products
export interface ProductFilters {
  type?: ProductType;
  category?: string;
  mealTime?: 'breakfast' | 'lunch' | 'dinner' | 'snacks' | 'beverages';
  hasProtein?: boolean;
  isOrganic?: boolean;
}
