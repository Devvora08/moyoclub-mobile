// Product Types

export type ProductType = 'veg' | 'non-veg';
export type ProductStatus = 'active' | 'inactive';
export type MealTime = '0' | '1' | null; // '0' = false, '1' = true, null = not set

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
  media?: MediaAsset[];
}

// Campaign structure
export interface Campaign {
  id: number;
  campaign_code: string;
  campaign_name: string;
  campaign_source: string;
  venue: string;
  tv_channel: string;
  promo_price: string;
  status: 'active' | 'inactive';
  start_date: string;
  end_date: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    product_id: string;
    campaign_id: string;
    created_at: string;
    updated_at: string;
  };
}

// Media asset structure for product images
export interface MediaAsset {
  id: number;
  main_category: string;
  category: string;
  type: string;
  base_name: string;
  meta: {
    base_name: string;
    files: {
      original: string;
      medium: string;
      thumb: string;
    };
    urls: {
      original: string;
      medium: string;
      thumb: string;
    };
    mime: string;
    size: number;
  };
  created_by: string;
  created_at: string;
  updated_at: string;
  pivot?: {
    product_id: string;
    asset_id: string;
    created_at: string;
    updated_at: string;
    type: string | null;
  };
}

// Full product with relations
export interface Product extends BaseProduct {
  campaigns: Campaign[];
  addons: Addon[];
  media: MediaAsset[];
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
