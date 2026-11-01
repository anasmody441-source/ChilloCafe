import { NavLink } from 'react-router-dom';
import { publicLinks } from '../config/navigation';
import { Icon } from './Icon';
import { Logo } from './Logo';
import { Modal } from './Modal';

interface MobileSidebarProps {
  open: boolean;
  onClose: () => void;
  onManagementClick: () => void;
}

export function MobileSidebar({ open, onClose, onManagementClick }: MobileSidebarProps) {
  return (
    <Modal open={open} onClose={onClose} labelledBy="sidebar-title" className="sidebar">
      <div className="sidebar__head">
        <Logo height={36} />
        <h2 id="sidebar-title" className="visually-hidden">
          قائمة التنقل
        </h2>
        <button type="button" className="icon-button" aria-label="إغلاق القائمة" onClick={onClose}>
          <Icon name="close" size={24} />
        </button>
      </div>

      <nav className="sidebar__links" aria-label="قائمة الجوال">
        {publicLinks.map((link) => (
          <NavLink key={link.to} to={link.to} end={link.to === '/'} className="sidebar__link" onClick={onClose}>
            {link.label}
            <Icon name="chevronLeft" size={18} />
          </NavLink>
        ))}
      </nav>

      <button type="button" className="button button--primary sidebar__admin" onClick={onManagementClick}>
        صفحة الإدارة
      </button>
    </Modal>
  );
}
