import { Outlet, useLocation } from 'react-router-dom';
import { useRouteReset } from '../hooks/useRouteReset';
import { Footer } from './Footer';
import { Navbar } from './Navbar';

export function PublicLayout() {
  const { pathname } = useLocation();
  const mainRef = useRouteReset<HTMLElement>();

  return (
    <>
      <a className="skip-link" href="#main">
        تخطَّ إلى المحتوى
      </a>
      <Navbar />
      <main id="main" ref={mainRef} tabIndex={-1} key={pathname} className="page-enter">
        <Outlet />
      </main>
      <Footer />
    </>
  );
}
