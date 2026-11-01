import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { CategoryFilter } from '../components/CategoryFilter';
import { Icon } from '../components/Icon';
import { ProductGrid } from '../components/ProductGrid';
import { ProductSearch } from '../components/ProductSearch';
import { useProducts } from '../context/ProductsContext';
import { isProductCategory } from '../data/categories';
import type { ProductCategory } from '../types/product';
import { filterProducts } from '../utils/products';

export function ProductsPage() {
  const { products } = useProducts();
  // The query stays in local state: the router applies URL updates in a transition, which is too
  // slow for a controlled input. The category lives in the URL so homepage links can open it directly.
  const [query, setQuery] = useState('');
  const [params, setParams] = useSearchParams();
  const rawCategory = params.get('category');
  const category = isProductCategory(rawCategory) ? rawCategory : null;

  const setCategory = (next: ProductCategory | null) => {
    setParams(next ? { category: next } : {}, { replace: true });
  };

  const results = useMemo(() => filterProducts(products, query, category), [products, query, category]);
  const hasFilters = query !== '' || category !== null;
  const clearFilters = () => {
    setQuery('');
    setCategory(null);
  };

  return (
    <>
      <title>المنتجات | ChilloCafé</title>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <p className="eyebrow">قائمة ChilloCafé</p>
          <h1>اختر ما يناسب مزاجك اليوم</h1>
          <p>مشروبات ساخنة وباردة، وقهوة مختصة، وحلويات ومأكولات خفيفة.</p>
        </div>
      </section>

      <div className="menu-toolbar">
        <div className="container menu-toolbar__inner">
          <ProductSearch value={query} onChange={setQuery} />
          <CategoryFilter value={category} onChange={setCategory} />
        </div>
      </div>

      <section className="section section--tight container" aria-label="نتائج القائمة">
        <div className="results-bar">
          <p role="status">
            {results.length === 0 ? 'لا توجد نتائج' : `عدد النتائج: ${results.length}`}
          </p>
          {hasFilters && (
            <button type="button" className="text-button" onClick={clearFilters}>
              <Icon name="close" size={16} />
              مسح الفلاتر
            </button>
          )}
        </div>

        {results.length > 0 ? (
          <ProductGrid products={results} />
        ) : (
          <div className="empty-state">
            <span className="empty-state__icon">
              <Icon name="cup" size={36} />
            </span>
            <h2>لم نجد ما تبحث عنه</h2>
            <p>جرّب كلمة أخرى أو تصنيفاً مختلفاً، فالقائمة مليئة بالخيارات.</p>
            <button type="button" className="button button--primary" onClick={clearFilters}>
              مسح الفلاتر
            </button>
          </div>
        )}
      </section>
    </>
  );
}
