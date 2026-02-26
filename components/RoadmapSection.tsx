'use client';

import { useEffect, useRef, useState } from 'react';
import { roadmapPhases } from '@/lib/content/roadmap';

export default function RoadmapSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="bg-white py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Roadmap: Features Orange Could Implement
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          A phased approach to building the ultimate NDIS plan management platform.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {roadmapPhases.map((phase, i) => (
            <div
              key={phase.title}
              className={`rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 ${
                visible
                  ? 'opacity-100 translate-y-0'
                  : 'opacity-0 translate-y-6'
              }`}
              style={{ transitionDelay: `${i * 100}ms` }}
            >
              <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-orange-500">
                {phase.timeline}
              </div>
              <h3 className="text-lg font-semibold text-gray-900">
                {phase.title}
              </h3>
              <ul className="mt-4 space-y-2">
                {phase.features.map((f) => (
                  <li
                    key={f.label}
                    className="flex items-start gap-2 text-sm text-gray-600"
                  >
                    <span
                      className={`mt-0.5 ${
                        f.done ? 'text-green-500' : 'text-gray-300'
                      }`}
                    >
                      {f.done ? '✓' : '○'}
                    </span>
                    <span className={f.done ? '' : 'text-gray-400'}>
                      {f.label}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
