import { useId, type ReactNode } from 'react';
import { Modal } from './Modal';

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  children?: ReactNode;
  confirmLabel: string;
  cancelLabel: string;
  danger?: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  /** Backdrop click or Escape; defaults to onCancel. */
  onDismiss?: () => void;
}

export function ConfirmDialog({
  open,
  title,
  children,
  confirmLabel,
  cancelLabel,
  danger = false,
  onConfirm,
  onCancel,
  onDismiss = onCancel,
}: ConfirmDialogProps) {
  const titleId = useId();

  return (
    <Modal open={open} onClose={onDismiss} labelledBy={titleId} className="confirm-dialog">
      <img className="confirm-dialog__mark" src="/assets/branding/icon.svg" alt="" width="52" height="52" />
      <h2 id={titleId} className="confirm-dialog__title">
        {title}
      </h2>
      {children && <div className="confirm-dialog__text">{children}</div>}
      <div className="confirm-dialog__actions">
        <button type="button" className={`button ${danger ? 'button--danger' : 'button--primary'}`} onClick={onConfirm}>
          {confirmLabel}
        </button>
        <button type="button" className="button button--ghost" onClick={onCancel}>
          {cancelLabel}
        </button>
      </div>
    </Modal>
  );
}
