import React from "react";

export function Logo({
  className = "h-10 w-auto",
  inverted = false,
}: {
  className?: string;
  inverted?: boolean;
}) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 360 80"
      role="img"
      aria-label="Yoga Córdoba"
      className={className}
    >
      <defs>
        <linearGradient id="brand-logo-grad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#2d8f83" />
          <stop offset="100%" stopColor="#8bd7c7" />
        </linearGradient>
      </defs>
      <g fill="none" stroke="url(#brand-logo-grad)" strokeLinecap="round" strokeLinejoin="round">
        <path
          d="M40 18c-10 6-18 16-18 32 0 15 8 25 20 27 6 1 12-1 17-4V32c-7 2-13 6-18 12-6 7-10 16-10 24"
          strokeWidth="4"
        />
        <path
          d="M40 18c10 6 18 16 18 32 0 15-8 25-20 27-6 1-12-1-17-4V32c7 2 13 6 18 12 6 7 10 16 10 24"
          strokeWidth="4"
        />
        <circle cx="40" cy="66" r="5" fill="url(#brand-logo-grad)" stroke="none" />
      </g>
      <text
        x="82"
        y="42"
        fill="url(#brand-logo-grad)"
        fontFamily="Fraunces, Georgia, serif"
        fontSize="34"
        fontWeight="400"
        letterSpacing="0.5"
      >
        Yoga
      </text>
      <text
        x="82"
        y="68"
        fontFamily="Inter, system-ui, sans-serif"
        fontSize="15"
        fontWeight="600"
        letterSpacing="3"
        className={
          inverted
            ? "fill-ivory-100"
            : "fill-[#344e4b] dark:fill-ivory-100 transition-colors"
        }
      >
        CÓRDOBA
      </text>
    </svg>
  );
}

