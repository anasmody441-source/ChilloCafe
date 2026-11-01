import { useId, useState } from 'react';
import { Link } from 'react-router-dom';
import { ConfirmDialog } from '../components/ConfirmDialog';
import { Icon } from '../components/Icon';
import { Logo } from '../components/Logo';
import { Modal } from '../components/Modal';
import { ProductForm } from '../components/ProductForm';
import { site } from '../config/site';
import { useProducts } from '../context/ProductsContext';
import { useToast } from '../context/ToastContext';
import { categoryLabels } from '../data/categories';
import { useRouteReset } from '../hooks/useRouteReset';
import type { Product } from '../types/product';
import { formatPrice } from '../utils/products';

export function ManagementDashboard() {
  const { products, temporaryCount, addProduct, removeTemporaryProduct } = useProducts();
  const showToast = useToast();
  const [formOpen, setFormOpen] = useState(false);
  const [pendingDelete, setPendingDelete] = useState<Product | null>(null);
  const [preview, setPreview] = useState<Product | null>(null);
  const formTitleId = useId();
  const previewTitleId = useId();
  const mainRef = useRouteReset<HTMLElement>();

  return (
    <div className="dashboard">
      <title>صفحة الإدارة | ChilloCafé</title>
      <header className="dashboard__header">
        <div className="container dashboard__header-inner">
          <Link to="/" aria-label="ChilloCafé — الرئيسية">
            <Logo height={38} />
          </Link>
          <span className="dashboard__tag">لوحة تجريبية</span>
          <Link to="/" className="button button--ghost button--small dashboard__back">
            العودة إلى الموقع
          </Link>
        </div>
      </header>

      <main ref={mainRef} tabIndex={-1} className="container dashboard__main page-enter">
        <section className="dashboard__welcome">
          <div>
            <h1>أهلاً بك في لوحة الإدارة</h1>
            <p>جرّب إضافة المنتجات وشاهدها تظهر فوراً في صفحة المنتجات.</p>
          </div>
          <button type="button" className="button button--primary button--large" onClick={() => setFormOpen(true)}>
            <Icon name="plus" size={18} />
            إضافة منتج جديد
          </button>
        </section>

        <div className="notice" role="note">
          <Icon name="info" />
          <p>
            هذه محاكاة تعمل في المتصفح فقط وبدون خادم أو قاعدة بيانات. المنتجات المؤقتة ستختفي عند تحديث الصفحة، ولا توجد
            حماية أو صلاحيات حقيقية هنا.
          </p>
        </div>

        <dl className="stats">
          <div className="stat">
            <dt>المنتجات الأساسية</dt>
            <dd>{products.length - temporaryCount}</dd>
          </div>
          <div className="stat">
            <dt>المنتجات المؤقتة</dt>
            <dd>{temporaryCount}</dd>
          </div>
          <div className="stat stat--accent">
            <dt>المعروضة حالياً</dt>
            <dd>{products.length}</dd>
          </div>
        </dl>

        <section aria-labelledby="products-heading">
          <h2 id="products-heading" className="dashboard__section-title">
            قائمة المنتجات
          </h2>
          <ul className="admin-list">
            {products.map((product) => (
              <li key={product.id} className={`admin-row ${product.temporary ? 'admin-row--temp' : ''}`}>
                <button
                  type="button"
                  className="admin-row__thumb"
                  aria-label={`معاينة صورة ${product.name}`}
                  onClick={() => setPreview(product)}
                >
                  <img src={product.image} alt="" width="800" height="600" loading="lazy" decoding="async" />
                </button>
                <div className="admin-row__info">
                  <h3>{product.name}</h3>
                  <p>{categoryLabels[product.category]}</p>
                </div>
                <bdi className="price admin-row__price" dir="ltr">
                  {formatPrice(product.price)}
                </bdi>
                <span className={`tag ${product.temporary ? 'tag--temp' : ''}`}>
                  {product.temporary ? 'مؤقت' : 'أساسي'}
                </span>
                <div className="admin-row__action">
                  {product.temporary ? (
                    <button
                      type="button"
                      className="icon-button icon-button--danger"
                      aria-label={`حذف ${product.name}`}
                      onClick={() => setPendingDelete(product)}
                    >
                      <Icon name="trash" />
                    </button>
                  ) : (
                    <span className="admin-row__locked" title="لا يمكن حذف المنتجات الأساسية">
                      <Icon name="lock" size={18} />
                      <span className="visually-hidden">منتج محمي من الحذف</span>
                    </span>
                  )}
                </div>
              </li>
            ))}
          </ul>
        </section>
      </main>

      <footer className="dashboard__footer">
        <div className="container">
          <p>{site.footer.copyright}</p>
          <p>{site.footer.developerCredit}</p>
        </div>
      </footer>

      <Modal open={formOpen} onClose={() => setFormOpen(false)} labelledBy={formTitleId} className="form-dialog">
        {/* Mounted only while open, so every opening starts from an empty form. */}
        {formOpen && (
          <ProductForm
            titleId={formTitleId}
            onCancel={() => setFormOpen(false)}
            onSubmit={(input) => {
              addProduct(input);
              setFormOpen(false);
              showToast('تمت إضافة المنتج بنجاح');
            }}
          />
        )}
      </Modal>

      <Modal open={preview !== null} onClose={() => setPreview(null)} labelledBy={previewTitleId} className="preview-dialog">
        {preview && (
          <>
            <img src={preview.image} alt={preview.name} />
            <div className="preview-dialog__bar">
              <h2 id={previewTitleId}>{preview.name}</h2>
              <button type="button" className="icon-button" aria-label="إغلاق المعاينة" onClick={() => setPreview(null)}>
                <Icon name="close" />
              </button>
            </div>
          </>
        )}
      </Modal>

      <ConfirmDialog
        open={pendingDelete !== null}
        title={`هل تريد حذف «${pendingDelete?.name ?? ''}»؟`}
        confirmLabel="نعم، احذف"
        cancelLabel="إلغاء"
        danger
        onConfirm={() => {
          if (pendingDelete) removeTemporaryProduct(pendingDelete.id);
          setPendingDelete(null);
          showToast('تم حذف المنتج');
        }}
        onCancel={() => setPendingDelete(null)}
      >
        سيختفي المنتج فوراً من صفحة المنتجات ونتائج البحث.
      </ConfirmDialog>
    </div>
  );
}
