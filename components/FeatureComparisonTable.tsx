'use client';

import { useEffect, useRef, useState } from 'react';
import { comparisonRows } from '@/lib/content/comparisons';
import { Check, X } from 'lucide-react';

export default function FeatureComparisonTable() {
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
    <section className="bg-gray-50 py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          How Custom Platform Compares
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          See the difference a purpose-built NDIS platform makes.
        </p>

        {/* Desktop table */}
        <div
          className={`mt-12 hidden overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm md:block transition-all duration-700 ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-6 py-4 font-semibold text-gray-700">
                  Feature
                </th>
                <th className="px-6 py-4 font-semibold text-gray-400">
                  Current Solution
                </th>
                <th className="px-6 py-4 font-semibold text-orange-600">
                  Custom Orange Platform
                </th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((r, i) => (
                <tr
                  key={r.feature}
                  className={i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'}
                >
                  <td className="px-6 py-3 font-medium text-gray-900">
                    {r.feature}
                  </td>
                  <td className="px-6 py-3 text-gray-400">{r.current}</td>
                  <td className="px-6 py-3 font-medium text-gray-700">
                    <span className="inline-flex items-center gap-1.5">
                      <Check className="h-4 w-4 text-green-500" />
                      {r.orange}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="mt-12 space-y-4 md:hidden">
          {comparisonRows.map((r) => (
            <div
              key={r.feature}
              className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
            >
              <h3 className="font-semibold text-gray-900">{r.feature}</h3>
              <div className="mt-2 flex items-start gap-2 text-sm text-gray-400">
                <X className="mt-0.5 h-4 w-4 shrink-0 text-red-400" />
                <span>{r.current}</span>
              </div>
              <div className="mt-1 flex items-start gap-2 text-sm font-medium text-gray-700">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-green-500" />
                <span>{r.orange}</span>
              </div>
            </div>
          ))}
        </div>

        <p className="mt-8 text-center text-sm font-medium text-orange-600">
          A platform designed specifically for NDIS plan management — not a
          generic solution.
        </p>
      </div>
    </section>
  );
}
