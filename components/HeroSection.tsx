'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

export default function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-white to-amber-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(251,146,60,0.15),_transparent_50%)]"
      />
      <div
        className={`relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-24 sm:py-32 text-center transition-all duration-700 ease-out ${
          visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
        }`}
      >
        <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 sm:text-5xl lg:text-6xl">
          Custom NDIS Plan Management Platform
        </h1>
        <p className="mt-6 text-xl font-medium text-gray-700 sm:text-2xl">
          Transparent budgets. Fast payments. Personal touch.
        </p>
        <p className="mt-4 text-base text-gray-500 max-w-2xl mx-auto leading-relaxed">
          A purpose-built platform designed to transform how NDIS participants
          manage plans, how providers get paid reliably, and how plan managers
          operate efficiently.
        </p>

        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
          <Link
            href="/participant"
            className="rounded-lg bg-orange-500 px-6 py-3 text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 hover:scale-105"
          >
            Explore Participant Experience
          </Link>
          <Link
            href="/provider"
            className="rounded-lg border border-gray-300 bg-white px-6 py-3 text-sm font-medium text-gray-700 shadow-sm transition-all hover:bg-gray-50 hover:scale-105"
          >
            Explore Provider Experience
          </Link>
        </div>

        <div className="mt-10 mx-auto max-w-xl rounded-lg border border-orange-200 bg-orange-50/60 px-5 py-4 text-left text-sm text-gray-500 space-y-1">
          <p>
            ✦ This is a platform showcase demonstrating recommended features
            &amp; user experiences.
          </p>
          <p>✦ All data is mock/sample for demonstration purposes.</p>
          <p>
            ✦ This template can be adapted and used by development teams.
          </p>
        </div>
      </div>
    </section>
  );
}
