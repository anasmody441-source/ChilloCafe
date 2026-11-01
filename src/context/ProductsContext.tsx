import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { predefinedProducts } from '../data/products';
import type { NewProductInput, Product } from '../types/product';

interface ProductsContextValue {
  products: readonly Product[];
  temporaryCount: number;
  addProduct: (input: NewProductInput) => void;
  removeTemporaryProduct: (id: string) => void;
}

const ProductsContext = createContext<ProductsContextValue | null>(null);

let temporaryIdCounter = 0;

/**
 * Single source of truth for the catalog.
 *
 * Added products are deliberately held only in this React state: nothing is written to
 * localStorage, sessionStorage, IndexedDB, cookies or a server. The provider sits above the
 * router, so they survive in-app navigation, and a full page reload restores the original
 * catalog. Uploaded images are in-memory data URLs that disappear with the product.
 */
export function ProductsProvider({ children }: { children: ReactNode }) {
  const [temporaryProducts, setTemporaryProducts] = useState<Product[]>([]);

  const addProduct = useCallback((input: NewProductInput) => {
    temporaryIdCounter += 1;
    const product: Product = { ...input, id: `temp-${Date.now()}-${temporaryIdCounter}`, temporary: true };
    setTemporaryProducts((current) => [product, ...current]);
  }, []);

  const removeTemporaryProduct = useCallback((id: string) => {
    setTemporaryProducts((current) => current.filter((product) => product.id !== id));
  }, []);

  const value = useMemo(
    () => ({
      products: [...temporaryProducts, ...predefinedProducts],
      temporaryCount: temporaryProducts.length,
      addProduct,
      removeTemporaryProduct,
    }),
    [temporaryProducts, addProduct, removeTemporaryProduct],
  );

  return <ProductsContext.Provider value={value}>{children}</ProductsContext.Provider>;
}

export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) throw new Error('useProducts must be used inside ProductsProvider');
  return context;
}
