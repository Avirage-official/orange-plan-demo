'use client';

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
        <h1 className="text-5xl font-extrabold tracking-tight text-gray-900 sm:text-6xl">
          Orange Plan Management
        </h1>
        <p className="mt-6 text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          See how we manage NDIS plans for participants, providers, and our team
        </p>
        <p className="mt-3 text-base text-gray-400">
          Explore the experience for each user type below
        </p>
      </div>
    </section>
  );
}
