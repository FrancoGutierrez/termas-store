import React from 'react';

/**
 * Isotipo de marca: sol amarillo con franjas de atardecer
 * sobre fondo azul royal (inspirado en el logo TERMOINOX).
 */
export default function BrandLogo({ className = 'w-10 h-10' }) {
  return (
    <svg viewBox="0 0 64 64" className={className} role="img" aria-label="Logo TermaStore">
      <defs>
        <clipPath id="brand-sun-clip">
          <circle cx="32" cy="32" r="21" />
        </clipPath>
      </defs>

      {/* Fondo azul royal */}
      <rect width="64" height="64" rx="16" fill="#1D3A9E" />

      {/* Anillo blanco */}
      <circle cx="32" cy="32" r="23.5" fill="#FFFFFF" />

      {/* Sol + franjas recortadas en círculo */}
      <g clipPath="url(#brand-sun-clip)">
        <rect x="0" y="0" width="64" height="38" fill="#FFD633" />
        <rect x="0" y="38" width="64" height="4" fill="#FF4D12" />
        <rect x="0" y="42" width="64" height="1.6" fill="#FFFFFF" />
        <rect x="0" y="43.6" width="64" height="4" fill="#F03E3E" />
        <rect x="0" y="47.6" width="64" height="1.6" fill="#FFFFFF" />
        <rect x="0" y="49.2" width="64" height="5" fill="#D41C1C" />
        <rect x="0" y="54.2" width="64" height="10" fill="#FFFFFF" />
      </g>
    </svg>
  );
}
