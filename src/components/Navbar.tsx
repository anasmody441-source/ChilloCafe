import { useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { publicLinks } from '../config/navigation';
import { ConfirmDialog } from './ConfirmDialog';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { MobileSidebar } from './MobileSidebar';

export function Navbar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="navbar">
      <div className="navbar__inner container">
        <Link to="/" className="navbar__brand" aria-label="ChilloCafé — الرئيسية">
          <Logo height={40} />
        </Link>

        <nav className="navbar__links" aria-label="القائمة الرئيسية">
          {publicLinks.map((link) => (
            <NavLink key={link.to} to={link.to} end={link.to === '/'} className="navbar__link">
              {link.label}
            </NavLink>
          ))}
        </nav>

        <button type="button" className="navbar__admin" onClick={() => setConfirmOpen(true)}>
          صفحة الإدارة
        </button>

        <button
          type="button"
          className="icon-button navbar__menu"
          aria-label="فتح القائمة"
          aria-expanded={sidebarOpen}
          onClick={() => setSidebarOpen(true)}
        >
          <Icon name="menu" size={24} />
        </button>
      </div>

      <MobileSidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        onManagementClick={() => {
          setSidebarOpen(false);
          setConfirmOpen(true);
        }}
      />

      <ConfirmDialog
        open={confirmOpen}
        title="هل تريد الدخول إلى نظام الإدارة؟"
        confirmLabel="نعم، الدخول"
        cancelLabel="لا، العودة"
        onConfirm={() => {
          setConfirmOpen(false);
          navigate('/admin');
        }}
        onCancel={() => {
          setConfirmOpen(false);
          navigate('/');
        }}
        onDismiss={() => setConfirmOpen(false)}
      >
        لوحة تجريبية مفتوحة للجميع، يمكنك فيها إضافة منتجات مؤقتة تختفي عند تحديث الصفحة.
      </ConfirmDialog>
    </header>
  );
}
