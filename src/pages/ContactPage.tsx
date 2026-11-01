import { ContactForm } from '../components/ContactForm';
import { Icon } from '../components/Icon';
import { site } from '../config/site';

export function ContactPage() {
  const { contact } = site;

  return (
    <>
      <title>تواصل معنا | ChilloCafé</title>
      <section className="page-hero page-hero--compact">
        <div className="container">
          <p className="eyebrow">تواصل معنا</p>
          <h1>يسعدنا أن نسمع منك</h1>
          <p>سؤال أو اقتراح أو رأي في مشروبك المفضل؟ هذه طرق الوصول إلينا.</p>
        </div>
      </section>

      <section className="section section--tight container contact-layout">
        <aside className="contact-info panel">
          <h2>معلومات المقهى</h2>
          <ul>
            <li>
              <Icon name="pin" />
              <div>
                <h3>العنوان</h3>
                <p>{contact.address}</p>
              </div>
            </li>
            <li>
              <Icon name="phone" />
              <div>
                <h3>الهاتف</h3>
                {contact.phone.href ? (
                  <a href={contact.phone.href}>
                    <bdi dir="ltr">{contact.phone.display}</bdi>
                  </a>
                ) : (
                  <p>
                    <bdi dir="ltr">{contact.phone.display}</bdi>
                  </p>
                )}
              </div>
            </li>
            <li>
              <Icon name="mail" />
              <div>
                <h3>البريد الإلكتروني</h3>
                {contact.email.href ? (
                  <a href={contact.email.href}>
                    <bdi dir="ltr">{contact.email.display}</bdi>
                  </a>
                ) : (
                  <p>
                    <bdi dir="ltr">{contact.email.display}</bdi>
                  </p>
                )}
              </div>
            </li>
            <li>
              <Icon name="clock" />
              <div>
                <h3>ساعات العمل</h3>
                {site.openingHours.map((entry) => (
                  <p key={entry.days}>
                    {entry.days}: {entry.hours}
                  </p>
                ))}
              </div>
            </li>
            <li>
              <Icon name="share" />
              <div>
                <h3>وسائل التواصل</h3>
                <div className="social-pills">
                  {site.social.map((item) =>
                    item.url ? (
                      <a key={item.name} className="pill" href={item.url} target="_blank" rel="noreferrer">
                        {item.name}
                      </a>
                    ) : (
                      <span key={item.name} className="pill pill--muted">
                        {item.name} — قريباً
                      </span>
                    ),
                  )}
                </div>
              </div>
            </li>
          </ul>
        </aside>

        <ContactForm />
      </section>
    </>
  );
}
