import { memo } from 'react';
import { categoryLabels } from '../data/categories';
import { useToast } from '../context/ToastContext';
import type { Product } from '../types/product';
import { formatPrice } from '../utils/products';

export const ProductCard = memo(function ProductCard({ product }: { product: Product }) {
  const showToast = useToast();

  return (
    <article className="product-card">
      <div className="product-card__media">
        <img src={product.image} alt={product.name} width="800" height="600" loading="lazy" decoding="async" />
        {product.temporary ? (
          <span className="product-card__badge product-card__badge--temp">منتج مؤقت</span>
        ) : (
          product.featured && <span className="product-card__badge">مميّز</span>
        )}
      </div>
      <div className="product-card__body">
        <p className="product-card__category">{categoryLabels[product.category]}</p>
        <h3 className="product-card__name">{product.name}</h3>
        <p className="product-card__description">{product.description}</p>
        <div className="product-card__footer">
          <bdi className="price" dir="ltr">
            {formatPrice(product.price)}
          </bdi>
          <button
            type="button"
            className="button button--primary button--small"
            aria-label={`اطلب الآن: ${product.name}`}
            onClick={() => showToast(`تم اختيار «${product.name}» لطلب تجريبي — هذا العرض لا يرسل طلباً فعلياً.`, 'info')}
          >
            اطلب الآن
          </button>
        </div>
      </div>
    </article>
  );
});
