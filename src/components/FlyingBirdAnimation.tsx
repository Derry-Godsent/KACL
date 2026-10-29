/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';

interface FlyingBirdAnimationProps {
  className?: string;
  showCompanion?: boolean;
}

export const FlyingBirdAnimation: React.FC<FlyingBirdAnimationProps> = ({
  className = '',
  showCompanion = true
}) => {
  const [isPaused, setIsPaused] = useState(false);

  return (
    <div
      className={`pointer-events-none absolute inset-0 overflow-hidden select-none z-10 ${className}`}
      aria-hidden="true"
    >
      {/* Lead Soaring White Heron / Falcon */}
      <div
        className={`absolute top-6 sm:top-8 left-0 animate-bird-soar ${
          isPaused ? '[animation-play-state:paused]' : ''
        }`}
      >
        <svg
          width="64"
          height="42"
          viewBox="0 0 64 42"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-[0_4px_6px_rgba(10,38,24,0.12)] opacity-85 hover:opacity-100 transition-opacity"
        >
          {/* Bird Body & Streamlined Head */}
          <path
            d="M24 20C27 18.5 32 18 36 20C40 22 43 23 46 22.5C48 22 51 20.5 53 20C50 22 46 24 41 24C36 24 30 23 24 20Z"
            fill="#FFFFFF"
          />
          <path
            d="M51 20.5C53.5 19.8 56 19 57.5 19.5C56 20.5 54 21.2 52 21.5L51 20.5Z"
            fill="#E2E8F0"
          />
          {/* Bird Tail Feathers */}
          <path
            d="M12 21C16 20.5 21 20.2 25 20.5L20 22.5L12 21Z"
            fill="#CBD5E1"
          />

          {/* Left Wing (Beating Gracefully) */}
          <g className="animate-wing-left">
            <path
              d="M32 20C30 14 26 8 18 4C14 2 10 1.5 6 2C10 5 14 9 18 14C22 19 28 20 32 20Z"
              fill="#FFFFFF"
            />
            {/* Wing Feather Accents */}
            <path
              d="M18 4C23 8 28 14 30 18L24 16C20 12 16 8 12 5L18 4Z"
              fill="#E2E8F0"
              opacity="0.7"
            />
          </g>

          {/* Right Wing (Beating Gracefully) */}
          <g className="animate-wing-right">
            <path
              d="M34 20C36 14 40 8 48 4C52 2 56 1.5 60 2C56 5 52 9 48 14C44 19 38 20 34 20Z"
              fill="#F8FAFC"
            />
            {/* Wing Feather Accents */}
            <path
              d="M48 4C43 8 38 14 36 18L42 16C46 12 50 8 54 5L48 4Z"
              fill="#E2E8F0"
              opacity="0.7"
            />
          </g>
        </svg>
      </div>

      {/* Companion Bird in Distance (Adds Perspective Depth) */}
      {showCompanion && (
        <div
          className={`absolute top-14 sm:top-16 left-0 animate-companion-soar ${
            isPaused ? '[animation-play-state:paused]' : ''
          }`}
        >
          <svg
            width="44"
            height="28"
            viewBox="0 0 64 42"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="opacity-55 drop-shadow-xs"
          >
            {/* Bird Body */}
            <path
              d="M24 20C27 18.5 32 18 36 20C40 22 43 23 46 22.5C48 22 51 20.5 53 20C50 22 46 24 41 24C36 24 30 23 24 20Z"
              fill="#FFFFFF"
            />
            {/* Left Wing */}
            <g className="animate-wing-left">
              <path
                d="M32 20C30 14 26 8 18 4C14 2 10 1.5 6 2C10 5 14 9 18 14C22 19 28 20 32 20Z"
                fill="#F1F5F9"
              />
            </g>
            {/* Right Wing */}
            <g className="animate-wing-right">
              <path
                d="M34 20C36 14 40 8 48 4C52 2 56 1.5 60 2C56 5 52 9 48 14C44 19 38 20 34 20Z"
                fill="#FFFFFF"
              />
            </g>
          </svg>
        </div>
      )}
    </div>
  );
};
