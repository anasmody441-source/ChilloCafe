import { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { HeroSection } from '../components/HeroSection';
import { Icon } from '../components/Icon';
import { ImageSlider } from '../components/ImageSlider';
import { ProductGrid } from '../components/ProductGrid';
import { site } from '../config/site';
import { useProducts } from '../context/ProductsContext';
import { categoryLabels } from '../data/categories';
import type { ProductCategory } from '../types/product';
import { assetUrl } from '../utils/assets';

const FEATURED_COUNT = 4;

const categoryHighlights: { id: ProductCategory; image: string; alt: string }[] = [
  { id: 'hot', image: assetUrl('/assets/products/cappuccino.webp'), alt: 'فنجان كابتشينو' },
  { id: 'cold', image: assetUrl('/assets/products/green-mojito.webp'), alt: 'كوب موهيتو أخضر' },
  { id: 'specialty', image: assetUrl('/assets/products/pour-over.webp'), alt: 'قهوة مقطّرة يدوياً' },
  { id: 'desserts', image: assetUrl('/assets/products/cheesecake.webp'), alt: 'قطعة تشيز كيك' },
  { id: 'snacks', image: assetUrl('/assets/products/croissant.webp'), alt: 'كرواسون' },
];

export function HomePage() {
  const { products } = useProducts();
  const featured = useMemo(() => products.filter((product) => product.featured).slice(0, FEATURED_COUNT), [products]);

  return (
    <>
      <HeroSection />

      <section className="section section--tight container">
        <ImageSlider />
      </section>

      <section className="section container">
        <div className="section-head">
          <div>
            <p className="eyebrow">مختارات الموسم</p>
            <h2>الأكثر حضوراً على طاولاتنا</h2>
          </div>
          <Link to="/products" className="text-link">
            عرض القائمة كاملة
            <Icon name="arrowLeft" size={16} />
          </Link>
        </div>
        <ProductGrid products={featured} />
      </section>

      <section className="section section--band">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">تصفّح حسب ذوقك</p>
              <h2>لكل مزاج صنف يناسبه</h2>
            </div>
          </div>
          <div className="category-arches">
            {categoryHighlights.map((item) => (
              <Link key={item.id} to={`/products?category=${item.id}`} className="category-arch">
                <span className="arch">
                  <img src={item.image} alt={item.alt} width="800" height="600" loading="lazy" decoding="async" />
                </span>
                <span className="category-arch__label">{categoryLabels[item.id]}</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="section container intro">
        <div className="arch intro__image">
          <img src={assetUrl('/assets/about/barista.webp')} alt="تحضير القهوة على ماكينة الإسبريسو" width="900" height="1125" loading="lazy" decoding="async" />
        </div>
        <div className="intro__copy">
          <p className="eyebrow">
            تعرّف على <bdi>{site.brandName}</bdi>
          </p>
          <h2>مكان تبطئ فيه الأيام قليلاً</h2>
          <p>
            نؤمن بأن فنجان القهوة الجيد يبدأ من الاهتمام بالتفاصيل: حبوب مختارة، وتحضير متقن، وضيافة تُشعرك بأنك في مكانك.
            سواء جئت لبداية صباحك أو لقاء صديق، ستجد هنا ما يناسب مزاجك.
          </p>
          <Link to="/about" className="text-link">
            اقرأ قصتنا
            <Icon name="arrowLeft" size={16} />
          </Link>
        </div>
      </section>

      <section className="container section section--tight">
        <div className="cta-band">
          <div>
            <h2>قائمة كاملة بانتظارك</h2>
            <p>من الإسبريسو إلى الموهيتو والكرواسون، ابحث واختر ما تشتهيه.</p>
          </div>
          <Link to="/products" className="button button--light button--large">
            استكشف قائمتنا
          </Link>
        </div>
      </section>

      <section className="section container teaser">
        <div className="teaser__item">
          <Icon name="pin" size={24} />
          <div>
            <h3>زورونا</h3>
            <p>{site.contact.address}</p>
          </div>
        </div>
        <div className="teaser__item">
          <Icon name="clock" size={24} />
          <div>
            <h3>ساعات العمل</h3>
            {site.openingHours.map((entry) => (
              <p key={entry.days}>
                {entry.days}: {entry.hours}
              </p>
            ))}
          </div>
        </div>
        <Link to="/contact" className="button button--ghost">
          صفحة التواصل
        </Link>
      </section>
    </>
  );
}
