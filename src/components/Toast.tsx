import type { ToastMessage } from '../context/ToastContext';
import { Icon } from './Icon';

interface ToastProps {
  toast: ToastMessage | null;
  onDismiss: () => void;
}

export function Toast({ toast, onDismiss }: ToastProps) {
  return (
    // The live region stays mounted so screen readers announce every new message.
    <div className="toast-region" role="status" aria-live="polite">
      {toast && (
        <div key={toast.key} className={`toast toast--${toast.tone}`}>
          <span className="toast__icon">
            <Icon name={toast.tone === 'success' ? 'check' : 'info'} size={18} />
          </span>
          <p>{toast.text}</p>
          <button type="button" className="toast__close" onClick={onDismiss} aria-label="إغلاق الإشعار">
            <Icon name="close" size={16} />
          </button>
        </div>
      )}
    </div>
  );
}
