import { useState, useEffect, useCallback } from 'react';
import { Product, ProductDisplayData, ProductFilters } from '../types/product';
import {
  fetchProducts,
  transformProductsForDisplay,
  filterProducts,
  getHighProteinProducts,
  getBreakfastProducts,
  getDealsProducts,
} from '../api/products';

interface UseProductsState {
  products: ProductDisplayData[];
  rawProducts: Product[];
  loading: boolean;
  error: string | null;
}

interface UseProductsReturn extends UseProductsState {
  refetch: () => Promise<void>;
  getFiltered: (filters: ProductFilters) => ProductDisplayData[];
  highProteinProducts: ProductDisplayData[];
  breakfastProducts: ProductDisplayData[];
  dealsProducts: ProductDisplayData[];
}

/**
 * Custom hook for fetching and managing products
 * @param autoFetch - Whether to fetch products automatically on mount (default: true)
 */
export const useProducts = (autoFetch: boolean = true): UseProductsReturn => {
  const [state, setState] = useState<UseProductsState>({
    products: [],
    rawProducts: [],
    loading: false,
    error: null,
  });

  const fetchAndTransformProducts = useCallback(async () => {
    setState(prev => ({ ...prev, loading: true, error: null }));

    try {
      const rawProducts = await fetchProducts();
      const products = transformProductsForDisplay(rawProducts);

      console.log(`Products loaded: ${products.length}`);

      setState({
        products,
        rawProducts,
        loading: false,
        error: null,
      });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch products';
      console.error('useProducts error:', err);
      setState(prev => ({
        ...prev,
        loading: false,
        error: errorMessage,
      }));
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchAndTransformProducts();
    }
  }, [autoFetch, fetchAndTransformProducts]);

  const getFiltered = useCallback(
    (filters: ProductFilters) => filterProducts(state.products, filters),
    [state.products]
  );

  const highProteinProducts = getHighProteinProducts(state.products);
  const breakfastProducts = getBreakfastProducts(state.products);
  const dealsProducts = getDealsProducts(state.products);

  return {
    ...state,
    refetch: fetchAndTransformProducts,
    getFiltered,
    highProteinProducts,
    breakfastProducts,
    dealsProducts,
  };
};

/**
 * Hook for fetching a single product by ID
 */
export const useProduct = (productId: number | null) => {
  const [product, setProduct] = useState<ProductDisplayData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (productId === null) return;

    const fetchProduct = async () => {
      setLoading(true);
      setError(null);

      try {
        const { fetchProductById, transformProductForDisplay } = await import('../api/products');
        const rawProduct = await fetchProductById(productId);
        const transformed = transformProductForDisplay(rawProduct);
        setProduct(transformed);
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : 'Failed to fetch product';
        setError(errorMessage);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  return { product, loading, error };
};

export default useProducts;
