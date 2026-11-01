import { Link } from 'react-router-dom';
import { site } from '../config/site';
import { Icon } from './Icon';
import { Logo } from './Logo';

export function HeroSection() {
  return (
    <section className="hero">
      <div className="container hero__inner">
        <div className="hero__copy">
          <Logo height={52} />
          <h1 className="hero__title">{site.tagline}</h1>
          <p className="hero__lead">
            من حبوب مختارة بعناية إلى فنجان يُحضَّر أمامك، نصنع لك لحظة هادئة تستحق أن تتوقف عندها.
          </p>
          <div className="hero__actions">
            <Link to="/products" className="button button--primary button--large">
              استكشف قائمتنا
              <Icon name="arrowLeft" size={18} />
            </Link>
            <Link to="/contact" className="button button--ghost button--large">
              تواصل معنا
            </Link>
          </div>
        </div>

        <div className="hero__visual">
          <div className="arch hero__arch">
            <img
              src="/assets/hero/hero-coffee.webp"
              alt="فنجان قهوة أحمر بفن الحليب على طاولة داكنة"
              width="900"
              height="1125"
              fetchPriority="high"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
