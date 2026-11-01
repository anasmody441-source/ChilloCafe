import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// Module-level because the public layout and the dashboard each mount their own copy of this hook.
let lastPathname: string | null = null;

/** On in-app navigation: scroll to the top and move keyboard focus to the new page's main region. */
export function useRouteReset<T extends HTMLElement>() {
  const { pathname } = useLocation();
  const ref = useRef<T>(null);

  useEffect(() => {
    if (lastPathname !== null && lastPathname !== pathname) {
      window.scrollTo({ top: 0, behavior: 'instant' });
      ref.current?.focus({ preventScroll: true });
    }
    lastPathname = pathname;
  }, [pathname]);

  return ref;
}
