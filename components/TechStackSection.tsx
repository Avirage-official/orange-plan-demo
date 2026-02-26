'use client';

import { useEffect, useRef, useState } from 'react';
import { Server, Code, Gauge, Shield } from 'lucide-react';

const sections = [
  {
    icon: Server,
    title: 'Architecture',
    items: [
      'Modern, scalable cloud-based design',
      'Microservices-ready',
      'API-first approach (real-time NDIS integration ready)',
    ],
  },
  {
    icon: Code,
    title: 'Technology Stack',
    items: [
      'Frontend: Next.js 15, React, TypeScript, Tailwind CSS',
      'Backend: Node.js / Python (flexible)',
      'Database: PostgreSQL (HIPAA-compliant)',
      'Security: Role-based access control, audit trails, data encryption',
      'Compliance: NDIS requirements, HIPAA standards',
      'Integrations: NDIA PRODA/PACE APIs (40+ endpoints as of 2026)',
    ],
  },
  {
    icon: Gauge,
    title: 'Performance',
    items: [
      'Real-time updates (no page refresh needed)',
      'Optimised for mobile (4G-friendly)',
      'Accessibility standards (WCAG 2.1 AA)',
    ],
  },
  {
    icon: Shield,
    title: 'Developer Notes',
    items: [
      'This template is open for customisation',
      'Mock data is easily replaceable with real backend',
      'Component-based architecture for easy updates',
      'Responsive design (mobile-first)',
    ],
  },
];

export default function TechStackSection() {
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
    <section className="bg-gray-900 py-16 sm:py-24 text-white" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold sm:text-4xl">
          Built for Scale &amp; Security
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-400">
          Enterprise-grade technology designed for the Australian NDIS ecosystem.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 sm:grid-cols-2">
          {sections.map((s, i) => {
            const Icon = s.icon;
            return (
              <div
                key={s.title}
                className={`rounded-xl border border-gray-700 bg-gray-800/60 p-6 transition-all duration-500 ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="mb-3 inline-flex items-center justify-center rounded-lg bg-orange-500/10 p-2.5 text-orange-400">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <ul className="mt-3 space-y-2">
                  {s.items.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-gray-300"
                    >
                      <span className="mt-0.5 text-orange-400">•</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
