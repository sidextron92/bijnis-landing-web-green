'use client';

import { useEffect, useRef, useState } from 'react';
import Script from 'next/script';

interface UnicornStudioEmbedProps {
  projectId: string;
  className?: string;
}

export function UnicornStudioEmbed({ projectId, className = '' }: UnicornStudioEmbedProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scriptReady, setScriptReady] = useState(false);
  const initAttempted = useRef(false);

  useEffect(() => {
    if (!scriptReady || initAttempted.current) return;

    const initUnicornStudio = () => {
      if (typeof window !== 'undefined' && (window as any).UnicornStudio) {
        try {
          console.log('Initializing Unicorn Studio...');
          (window as any).UnicornStudio.init();
          initAttempted.current = true;
          console.log('Unicorn Studio initialized successfully');
        } catch (error) {
          console.error('Failed to initialize Unicorn Studio:', error);
        }
      } else {
        console.warn('UnicornStudio not found on window object');
      }
    };

    // Give the DOM a moment to settle, then initialize
    const timer = setTimeout(initUnicornStudio, 300);

    return () => clearTimeout(timer);
  }, [scriptReady]);

  const handleScriptLoad = () => {
    console.log('Unicorn Studio script loaded');
    setScriptReady(true);
  };

  return (
    <>
      <div
        ref={containerRef}
        data-us-project={projectId}
        className={className}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '500px',
          position: 'relative',
          display: 'block',
        }}
      />
      <Script
        src="https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v1.4.33/dist/unicornStudio.umd.js"
        strategy="afterInteractive"
        onLoad={handleScriptLoad}
        onError={(e) => {
          console.error('Failed to load Unicorn Studio script:', e);
        }}
      />
    </>
  );
}
