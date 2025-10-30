'use client';

/**
 * SVG India Map Component
 * Loads the accurate India map SVG with custom dark theme styling and state border highlights
 */
export function IndiaMapSVG() {
  return (
    <>
      {/* Main map image with green glow */}
      <image
        href="/images/india.svg"
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        className="india-map-svg"
        style={{
          filter: 'drop-shadow(0 0 8px rgba(7, 130, 54, 0.5)) drop-shadow(0 0 2px rgba(7, 130, 54, 0.8))'
        }}
      />

      {/* Duplicate for enhanced border effect */}
      <image
        href="/images/india.svg"
        x="0"
        y="0"
        width="100%"
        height="100%"
        preserveAspectRatio="xMidYMid meet"
        style={{
          opacity: 0.3,
          filter: 'drop-shadow(0 0 1px rgba(7, 130, 54, 1))',
          mixBlendMode: 'screen'
        }}
      />
    </>
  );
}
