export type ProductCategory = 'hot' | 'cold' | 'specialty' | 'desserts' | 'snacks';

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  price: number;
  image: string;
  featured?: boolean;
  /** True for products added from the dashboard; these live in memory only. */
  temporary?: boolean;
}

export type NewProductInput = Pick<Product, 'name' | 'description' | 'category' | 'price' | 'image'>;
