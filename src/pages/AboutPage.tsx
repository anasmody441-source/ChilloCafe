import { Link } from 'react-router-dom';
import { Icon, type IconName } from '../components/Icon';
import { assetUrl } from '../utils/assets';

const values: { icon: IconName; title: string; text: string }[] = [
  { icon: 'bean', title: 'جودة المكوّنات', text: 'نختار مكوناتنا بعناية، لأن الطعم الجميل يبدأ من الأساس.' },
  { icon: 'cup', title: 'إتقان التحضير', text: 'نولي كل كوب الاهتمام نفسه، من الجرعة الأولى حتى التقديم.' },
  { icon: 'heart', title: 'ضيافة صادقة', text: 'ابتسامة وترحيب ومكان مريح يجعلك ترغب في العودة دائماً.' },
];

export function AboutPage() {
  return (
    <>
      <title>من نحن | ChilloCafé</title>
      <section className="page-hero">
        <div className="container page-hero__split">
          <div>
            <p className="eyebrow">من نحن</p>
            <h1>أكثر من فنجان قهوة</h1>
            <p>
              <bdi>ChilloCafé</bdi> مقهى يجمع القهوة الجيدة والمكونات المختارة والأجواء المريحة، ليمنحك لحظات تستحق أن
              تُتذكَّر.
            </p>
          </div>
          <div className="arch page-hero__arch">
            <img src={assetUrl('/assets/about/cafe-interior.webp')} alt="أجواء داخلية دافئة في مقهى" width="900" height="1125" />
          </div>
        </div>
      </section>

      <section className="section container about-vision">
        <div className="panel">
          <h2>رؤيتنا</h2>
          <p>أن نكون المحطة اليومية التي يقصدها كل من يبحث عن قهوة صادقة ولحظة هدوء وسط زحام اليوم.</p>
        </div>
        <div className="panel">
          <h2>رسالتنا</h2>
          <p>تقديم مشروبات ومأكولات خفيفة بجودة ثابتة، في مساحة ودودة ترحب بالجميع وتحترم وقتهم وذوقهم.</p>
        </div>
      </section>

      <section className="section section--band">
        <div className="container">
          <div className="section-head">
            <div>
              <p className="eyebrow">قيمنا</p>
              <h2>ما نحرص عليه كل يوم</h2>
            </div>
          </div>
          <div className="values-grid">
            {values.map((value) => (
              <article key={value.title} className="value-card">
                <span className="value-card__icon">
                  <Icon name={value.icon} size={26} />
                </span>
                <h3>{value.title}</h3>
                <p>{value.text}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section container intro intro--reverse">
        <div className="arch intro__image">
          <img src={assetUrl('/assets/about/coffee-beans.webp')} alt="حبوب قهوة محمّصة" width="900" height="1125" loading="lazy" decoding="async" />
        </div>
        <div className="intro__copy">
          <p className="eyebrow">الجودة والضيافة</p>
          <h2>التفاصيل الصغيرة تصنع الفرق</h2>
          <p>
            من درجة حرارة الحليب إلى طريقة الترحيب بك عند الباب، نهتم بكل ما يصنع تجربتك. وهدفنا بسيط: أن تغادر وأنت أفضل
            مزاجاً مما كنت عليه حين وصلت.
          </p>
          <Link to="/products" className="button button--primary">
            تصفّح المنتجات
            <Icon name="arrowLeft" size={18} />
          </Link>
        </div>
      </section>
    </>
  );
}
