/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from 'react';

interface IconProps {
  className?: string;
}

// 1. Flaying: Precision hide & skin removal by qualified butchers
export const FlayingIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    {/* Circular Badge Ring */}
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* Curved Butchery Skinning Knife */}
    <path
      d="M14 32L24 22L28 26L18 36L14 32Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    <path
      d="M24 22C28 16 34 14 38 15C39 19 37 25 31 29L28 26L24 22Z"
      fill="currentColor"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Hide separation curve */}
    <path
      d="M12 16C18 17 26 12 32 10"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeDasharray="2 3"
    />
  </svg>
);

// 2. Kraal: Live animal market & holding facility (Cattle, Sheep, Goats)
export const KraalIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* Traditional Holding Corral / Enclosure Fence */}
    <path
      d="M10 24H38M10 32H38M14 18V36M24 16V36M34 18V36"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
    {/* Cattle / Horns Silhouette in Kraal */}
    <path
      d="M18 14C19 18 29 18 30 14M21 16V22H27V16"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// 3. Singeing: LPG clean-burning flame removing hair & quartering
export const SingeingIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* LPG Torch Burner Nozzle */}
    <path
      d="M12 34L20 26M19 25L23 29"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    {/* Clean LPG Singeing Flame */}
    <path
      d="M24 24C24 24 26 20 28 17C29 15 31 13 31 11C33 13 36 17 36 21C36 26.5 31.5 31 26 31C22 31 21 28 24 24Z"
      fill="currentColor"
      fillOpacity="0.25"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path
      d="M26 27C27 27 29 25 30 22C30 24 29 26 27 27Z"
      fill="currentColor"
    />
  </svg>
);

// 4. Cutting: Professional butcher prime cuts to table size & custom customer requests
export const CuttingIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* Heavy Butcher Cleaver */}
    <path
      d="M12 36L18 30M17 29L21 33"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
    />
    <path
      d="M20 28L34 14C36 16 38 20 37 24L26 34L20 28Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinejoin="round"
    />
    {/* Cutting Board / Table Markings */}
    <path
      d="M14 38H34"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// 5. Retail Outlets: Deep freezer placed in shops across Kumasi (e.g. Poku Trading)
export const RetailOutletIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* Storefront / Commercial Freezer */}
    <rect x="12" y="16" width="24" height="20" rx="3" stroke="currentColor" strokeWidth="2" />
    <path d="M12 24H36" stroke="currentColor" strokeWidth="1.8" />
    {/* Glass freezer lid handles & temperature gauge */}
    <path d="M18 20H22M26 20H30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    <circle cx="24" cy="29" r="2" fill="currentColor" />
  </svg>
);

// 6. Bulk Sales: KACL delivery vans carting meat in bulk to hotels, restaurants, institutions
export const BulkSalesIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* Insulated Heavy Delivery Van */}
    <path
      d="M10 20H28V32H10V20Z"
      fill="currentColor"
      fillOpacity="0.2"
      stroke="currentColor"
      strokeWidth="2"
    />
    <path
      d="M28 23H33L37 27V32H28V23Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    {/* Wheels */}
    <circle cx="16" cy="33" r="3" fill="currentColor" />
    <circle cx="32" cy="33" r="3" fill="currentColor" />
  </svg>
);

// 7. Door to Door Sales: Branded cold vans selling meat directly to KNUST, KATH, and others
export const DoorToDoorIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* House / Institution Gate */}
    <path
      d="M12 26L20 18L28 26V35H12V26Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinejoin="round"
    />
    <path d="M18 35V28H22V35" stroke="currentColor" strokeWidth="1.8" />
    {/* Cold van visiting institution */}
    <path
      d="M29 27H35L38 30V34H29V27Z"
      stroke="currentColor"
      strokeWidth="1.8"
    />
    <circle cx="32" cy="35" r="1.8" fill="currentColor" />
  </svg>
);

// 8. Walk-Ins: Direct butchery counter purchases at Kaase abattoir premises
export const WalkInsIcon: React.FC<IconProps> = ({ className = 'w-6 h-6' }) => (
  <svg
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    aria-hidden="true"
  >
    <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="2" strokeOpacity="0.25" />
    {/* Welcoming butchery customer portal */}
    <circle cx="24" cy="18" r="4" stroke="currentColor" strokeWidth="2" />
    <path
      d="M15 34C15 28 19 26 24 26C29 26 33 28 33 34"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);
