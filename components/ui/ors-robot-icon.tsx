"use client";

import React, { memo } from "react";
import { cn } from "@/lib/utils";

interface OrsRobotIconProps {
  className?: string;
  animated?: boolean;
}

/**
 * Custom cute, rounded, futuristic & minimalistic robot head icon
 * with blinking teal eyes, floating animation, pink blush ears/cheeks,
 * and dual antennas.
 */
function OrsRobotIconComponent({ className, animated = true }: OrsRobotIconProps) {
  return (
    <svg
      width="44"
      height="52"
      viewBox="0 0 44 52"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn(className)}
      aria-hidden="true"
    >
      {animated && (
        <style>{`
          @keyframes rb-blink { 0%,88%,96%,100%{transform:scaleY(1)} 92%{transform:scaleY(0.06)} }
          @keyframes rb-glow { 0%,100%{opacity:.75} 50%{opacity:1} }
          @keyframes rb-float { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-1.5px)} }
          .rb-head { animation: rb-float 3.5s ease-in-out infinite; }
          .rb-blink { animation: rb-blink 5s ease-in-out infinite; transform-origin: 22px 21px; }
          .rb-glow { animation: rb-glow 2.2s ease-in-out infinite; }
        `}</style>
      )}
      <defs>
        <radialGradient id="rbDome" cx="40%" cy="30%" r="65%">
          <stop offset="0%" stopColor="white"/>
          <stop offset="100%" stopColor="#e8eef2"/>
        </radialGradient>
        <radialGradient id="rbVisor" cx="30%" cy="25%" r="70%">
          <stop offset="0%" stopColor="#1a3a2e"/>
          <stop offset="100%" stopColor="#050f09"/>
        </radialGradient>
        <radialGradient id="rbEye" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#6fb3ff"/>
          <stop offset="100%" stopColor="#1a5bb5" stopOpacity="0"/>
        </radialGradient>
        <filter id="rbBloom" x="-80%" y="-80%" width="260%" height="260%">
          <feGaussianBlur stdDeviation="1.5" result="b"/>
          <feMerge><feMergeNode in="b"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      <g transform="translate(0, 6)">
      <g className={animated ? "rb-head" : undefined}>
        {/* Antennas */}
        <line x1="15" y1="7" x2="12.5" y2="2.5" stroke="#c8d0d8" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="12" cy="2" r="1.8" fill="none" stroke="#c8d0d8" strokeWidth="1.3"/>
        <line x1="29" y1="7" x2="31.5" y2="2.5" stroke="#c8d0d8" strokeWidth="1.3" strokeLinecap="round"/>
        <circle cx="32" cy="2" r="1.8" fill="none" stroke="#c8d0d8" strokeWidth="1.3"/>

        {/* Ears */}
        <ellipse cx="5" cy="19" rx="3.5" ry="4.5" fill="#edf0f3"/>
        <ellipse cx="5" cy="19" rx="2" ry="2.8" fill="#f7c5d0" fillOpacity="0.8"/>
        <ellipse cx="5" cy="19" rx="1" ry="1.4" fill="#f4a0b5" fillOpacity="0.6"/>
        <ellipse cx="39" cy="19" rx="3.5" ry="4.5" fill="#edf0f3"/>
        <ellipse cx="39" cy="19" rx="2" ry="2.8" fill="#f7c5d0" fillOpacity="0.8"/>
        <ellipse cx="39" cy="19" rx="1" ry="1.4" fill="#f4a0b5" fillOpacity="0.6"/>

        {/* Dome */}
        <ellipse cx="22" cy="18" rx="17" ry="16" fill="url(#rbDome)"/>
        <ellipse cx="22" cy="9.5" rx="8" ry="3" fill="#f7c5d0" fillOpacity="0.45"/>

        {/* Forehead dots */}
        <circle cx="18" cy="11.5" r="1.2" fill="#FBBC05" fillOpacity="0.9"/>
        <circle cx="22" cy="10.5" r="0.7" fill="#ccc" fillOpacity="0.6"/>
        <circle cx="26" cy="11.5" r="1.2" fill="#FBBC05" fillOpacity="0.9"/>

        {/* Visor */}
        <rect x="8.5" y="15" width="27" height="13" rx="6.5" fill="url(#rbVisor)"/>
        <rect x="10" y="15.5" width="14" height="2.5" rx="1.25" fill="white" fillOpacity="0.1"/>

        {/* Eyes */}
        <g className={animated ? "rb-blink" : undefined}>
          <circle className={animated ? "rb-glow" : undefined} cx="16" cy="21" r="4.5" fill="url(#rbEye)" fillOpacity="0.4" filter="url(#rbBloom)"/>
          <circle cx="16" cy="21" r="2.6" fill="#226fd3"/>
          <circle cx="16" cy="21" r="1.3" fill="#5a9ef5"/>
          <circle cx="17" cy="19.8" r="0.75" fill="white" fillOpacity="0.95"/>

          <circle className={animated ? "rb-glow" : undefined} cx="28" cy="21" r="4.5" fill="url(#rbEye)" fillOpacity="0.4" filter="url(#rbBloom)"/>
          <circle cx="28" cy="21" r="2.6" fill="#226fd3"/>
          <circle cx="28" cy="21" r="1.3" fill="#5a9ef5"/>
          <circle cx="29" cy="19.8" r="0.75" fill="white" fillOpacity="0.95"/>
        </g>

        {/* Cheeks */}
        <ellipse cx="9.5" cy="26" rx="3" ry="1.8" fill="#f7a8be" fillOpacity="0.55"/>
        <ellipse cx="34.5" cy="26" rx="3" ry="1.8" fill="#f7a8be" fillOpacity="0.55"/>

        {/* Neck */}
        <rect x="17" y="33" width="10" height="4.5" rx="2" fill="#dde3e8"/>
        <rect x="18.5" y="34.5" width="7" height="1" rx="0.5" fill="#c4cbd1"/>
        <rect x="18.5" y="36" width="7" height="1" rx="0.5" fill="#c4cbd1"/>
      </g>
      </g>
    </svg>
  );
}

export const OrsRobotIcon = memo(OrsRobotIconComponent);
