import type { Product, ProductCategory } from '../types/product';

const priceFormatter = new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' });

export function formatPrice(price: number) {
  return priceFormatter.format(price);
}

/** Folds Arabic spelling variants and diacritics so "قهوه" also finds "قهوة". */
export function normalizeArabic(text: string) {
  return text
    .toLowerCase()
    .replace(/[ً-ْـ]/g, '')
    .replace(/[أإآ]/g, 'ا')
    .replace(/ى/g, 'ي')
    .replace(/ة/g, 'ه')
    .trim();
}

export function filterProducts(products: readonly Product[], query: string, category: ProductCategory | null) {
  const needle = normalizeArabic(query);
  return products.filter(
    (product) =>
      (category === null || product.category === category) &&
      (needle === '' || normalizeArabic(`${product.name} ${product.description}`).includes(needle)),
  );
}
