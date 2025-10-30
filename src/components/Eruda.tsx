'use client';

import { useEffect } from 'react';

/**
 * Eruda mobile debugging tool
 * Only loads in development mode
 */
export function Eruda() {
  useEffect(() => {
    // Only load in development
    if (process.env.NODE_ENV === 'development') {
      import('eruda').then((eruda) => {
        eruda.default.init();
        console.log('Eruda mobile debugger initialized');
      });
    }
  }, []);

  return null;
}
