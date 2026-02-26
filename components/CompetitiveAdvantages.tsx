'use client';

import { useEffect, useRef, useState } from 'react';
import { Zap, Eye, Heart } from 'lucide-react';

const cards = [
  {
    icon: Zap,
    headline: 'Payment Speed That Matters',
    stats: [
      '98.2% of invoices processed within 1 business day',
      '99.8% of payments made same-day or next-day',
      '0% payment retries',
    ],
    description:
      'Participants get continuity of care. Providers get predictable cash flow.',
  },
  {
    icon: Eye,
    headline: 'Families Know Where Every Dollar Goes',
    stats: [],
    description:
      'Real-time budget breakdown by category. Clear invoice approval workflow. No surprises.',
    visual: [
      { label: 'Physio', amount: '$3,500 / $8,000', pct: 44 },
      { label: 'Speech', amount: '$1,800 / $6,000', pct: 30 },
      { label: 'School Support', amount: '$2,200 / $5,000', pct: 44 },
    ],
  },
  {
    icon: Heart,
    headline: 'Speak to Real People. Fast.',
    stats: [],
    description:
      'No hold queues. Direct team access. Lived experience with disability. We understand the challenges.',
    highlight:
      'Founded by Luke Shaw (15+ years lived experience as carer)',
  },
];

export default function CompetitiveAdvantages() {
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
          Orange Plan Management — Key Differentiators
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {cards.map((c, i) => {
            const Icon = c.icon;
            return (
              <div
                key={c.headline}
                className={`rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-500 hover:shadow-lg ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-orange-50 p-3 text-orange-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {c.headline}
                </h3>
                {c.stats.length > 0 && (
                  <ul className="mt-3 space-y-2">
                    {c.stats.map((s) => (
                      <li
                        key={s}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-0.5 text-orange-500 font-bold">•</span>
                        {s}
                      </li>
                    ))}
                  </ul>
                )}
                <p className="mt-3 text-sm text-gray-500 leading-relaxed">
                  {c.description}
                </p>
                {c.visual && (
                  <div className="mt-4 space-y-2">
                    {c.visual.map((v) => (
                      <div key={v.label}>
                        <div className="flex justify-between text-xs text-gray-500">
                          <span>{v.label}</span>
                          <span>{v.amount}</span>
                        </div>
                        <div className="mt-1 h-2 overflow-hidden rounded-full bg-gray-100">
                          <div
                            className="h-full rounded-full bg-orange-400 transition-all duration-1000"
                            style={{ width: visible ? `${v.pct}%` : '0%' }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                {c.highlight && (
                  <div className="mt-4 rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
                    {c.highlight}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
