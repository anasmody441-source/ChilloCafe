import type { ProductCategory } from '../types/product';

export const categoryLabels: Record<ProductCategory, string> = {
  hot: 'مشروبات ساخنة',
  cold: 'مشروبات باردة',
  specialty: 'قهوة مختصة',
  desserts: 'حلويات',
  snacks: 'مأكولات خفيفة',
};

export const productCategories = Object.keys(categoryLabels) as ProductCategory[];

export function isProductCategory(value: string | null): value is ProductCategory {
  return value !== null && value in categoryLabels;
}
