import { Link } from 'react-router-dom';
import { publicLinks } from '../config/navigation';
import { site } from '../config/site';
import { Icon } from './Icon';
import { Logo } from './Logo';

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__brand">
          <Logo height={44} />
          <p>{site.description}</p>
        </div>

        <nav aria-label="روابط سريعة">
          <h2 className="footer__heading">روابط سريعة</h2>
          <ul className="footer__list">
            {publicLinks.map((link) => (
              <li key={link.to}>
                <Link to={link.to}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="footer__heading">تواصل معنا</h2>
          <ul className="footer__list">
            <li>{site.contact.address}</li>
            <li>
              <bdi dir="ltr">{site.contact.phone.display}</bdi>
            </li>
            <li>
              <bdi dir="ltr">{site.contact.email.display}</bdi>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="footer__heading">تابعنا</h2>
          <ul className="footer__list">
            {site.social.map((item) => (
              <li key={item.name}>
                {item.url ? (
                  <a href={item.url} target="_blank" rel="noreferrer">
                    {item.name}
                  </a>
                ) : (
                  <span className="footer__muted">{item.name} — قريباً</span>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="container footer__bottom">
        <div className="footer__legal">
          <p>{site.footer.copyright}</p>
          <p>{site.footer.developerCredit}</p>
          <Link to="/credits">مصادر الصور وتراخيصها</Link>
        </div>
        <button
          type="button"
          className="icon-button footer__top"
          aria-label="العودة إلى أعلى الصفحة"
          onClick={() => window.scrollTo({ top: 0 })}
        >
          <Icon name="arrowUp" />
        </button>
      </div>
    </footer>
  );
}
