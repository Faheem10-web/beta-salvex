import React, { useEffect, createContext, useContext } from 'react';
import { initSmoothScroll, destroySmoothScroll, getLenis, scrollToTarget } from '../../utils/smoothScroll';

const SmoothScrollContext = createContext({
  lenis: null,
  scrollTo: scrollToTarget
});

export function useSmoothScroll() {
  return useContext(SmoothScrollContext);
}

export default function SmoothScrollProvider({ children }) {
  useEffect(() => {
    const lenis = initSmoothScroll();

    return () => {
      destroySmoothScroll();
    };
  }, []);

  return (
    <SmoothScrollContext.Provider value={{ lenis: getLenis(), scrollTo: scrollToTarget }}>
      {children}
    </SmoothScrollContext.Provider>
  );
}
