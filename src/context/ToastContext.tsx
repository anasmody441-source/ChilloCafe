import { createContext, useCallback, useContext, useEffect, useRef, useState, type ReactNode } from 'react';
import { Toast } from '../components/Toast';

export interface ToastMessage {
  /** Changes on every show so a repeated message restarts its animation and timer. */
  key: number;
  text: string;
  tone: 'success' | 'info';
}

type ShowToast = (text: string, tone?: ToastMessage['tone']) => void;

const ToastContext = createContext<ShowToast | null>(null);

const TOAST_DURATION_MS = 4000;

/** Shows one toast at a time: a new message replaces the current one, so rapid clicks never pile up. */
export function ToastProvider({ children }: { children: ReactNode }) {
  const [toast, setToast] = useState<ToastMessage | null>(null);
  const counter = useRef(0);

  const showToast = useCallback<ShowToast>((text, tone = 'success') => {
    counter.current += 1;
    setToast({ key: counter.current, text, tone });
  }, []);

  useEffect(() => {
    if (!toast) return;
    const timer = window.setTimeout(() => setToast(null), TOAST_DURATION_MS);
    return () => window.clearTimeout(timer);
  }, [toast]);

  return (
    <ToastContext.Provider value={showToast}>
      {children}
      <Toast toast={toast} onDismiss={() => setToast(null)} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);
  if (!context) throw new Error('useToast must be used inside ToastProvider');
  return context;
}
