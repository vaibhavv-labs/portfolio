'use client';

import { ReactNode } from 'react';

interface SmoothScrollProps {
  children: ReactNode;
}

export default function SmoothScroll({ children }: SmoothScrollProps) {
  return (
    <div
      style={{
        scrollBehavior: 'smooth',
      }}
      className="smooth-scroll-wrapper"
    >
      {children}
    </div>
  );
}
