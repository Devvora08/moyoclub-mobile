import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from 'react';
import { Product, ProductDisplayData } from '../types/product';
import { fetchProducts, transformProductsForDisplay } from '../api/products';
import { initializeApi, getTokenStatus } from '../api/config';

interface ProductsContextValue {
  products: ProductDisplayData[];
  rawProducts: Product[];
  loading: boolean;
  error: string | null;
  isApiReady: boolean;
  refetch: () => Promise<void>;
  getProductById: (id: number) => ProductDisplayData | undefined;
  getProductsByIds: (ids: number[]) => ProductDisplayData[];
}

const ProductsContext = createContext<ProductsContextValue | undefined>(undefined);

interface ProductsProviderProps {
  children: ReactNode;
}

/**
 * Products Provider component
 * Provides global access to products data for add-on lookups and recommendations
 * Handles API initialization before fetching products
 */
export const ProductsProvider: React.FC<ProductsProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<ProductDisplayData[]>([]);
  const [rawProducts, setRawProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [isApiReady, setIsApiReady] = useState(false);

  const fetchAndTransformProducts = useCallback(async () => {
    // Check if API has token before fetching
    const { hasToken } = getTokenStatus();
    if (!hasToken) {
      console.log('ProductsContext: No token available, skipping fetch');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const raw = await fetchProducts();
      const transformed = transformProductsForDisplay(raw);
      setRawProducts(raw);
      setProducts(transformed);
      console.log(`ProductsContext: Loaded ${transformed.length} products`);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      console.error('ProductsContext error:', err);
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initialize API and fetch products
  useEffect(() => {
    const init = async () => {
      setLoading(true);
      try {
        // Initialize API (gets token)
        const success = await initializeApi();
        setIsApiReady(success);

        if (success) {
          // Now fetch products
          await fetchAndTransformProducts();
        } else {
          setError('Failed to initialize API');
          setLoading(false);
        }
      } catch (err) {
        console.error('ProductsContext init error:', err);
        setError('Failed to initialize');
        setLoading(false);
      }
    };

    init();
  }, [fetchAndTransformProducts]);

  const getProductById = useCallback(
    (id: number): ProductDisplayData | undefined => {
      return products.find(p => p.id === id);
    },
    [products]
  );

  const getProductsByIds = useCallback(
    (ids: number[]): ProductDisplayData[] => {
      return products.filter(p => ids.includes(p.id));
    },
    [products]
  );

  const value: ProductsContextValue = {
    products,
    rawProducts,
    loading,
    error,
    isApiReady,
    refetch: fetchAndTransformProducts,
    getProductById,
    getProductsByIds,
  };

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
};

/**
 * Hook to access products context
 */
export const useProductsContext = (): ProductsContextValue => {
  const context = useContext(ProductsContext);
  if (context === undefined) {
    throw new Error('useProductsContext must be used within a ProductsProvider');
  }
  return context;
};

export default ProductsContext;
