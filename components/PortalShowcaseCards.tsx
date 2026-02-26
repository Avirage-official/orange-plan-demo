'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { User, Briefcase, Settings } from 'lucide-react';
import {
  participantFeatures,
  providerFeatures,
  managerFeatures,
} from '@/lib/content/featuresList';

const portals = [
  {
    href: '/participant',
    title: 'Participant & Carer Portal',
    icon: User,
    description:
      'Empower families to manage NDIS plans with complete transparency and control.',
    features: participantFeatures,
    highlight: 'See exactly where every dollar goes',
    cta: 'Try Participant Portal',
  },
  {
    href: '/provider',
    title: 'Service Provider Portal',
    icon: Briefcase,
    description:
      'Make invoicing simple and get paid fast. Orange delivers payments in 24 hours average.',
    features: providerFeatures,
    highlight: 'Average payment time: 1.2 days (industry: 5–7 days)',
    cta: 'Try Service Provider Portal',
  },
  {
    href: '/manager',
    title: 'Plan Manager Dashboard',
    icon: Settings,
    description:
      'Streamline operations. Manage caseloads efficiently. Ensure compliance with built-in controls.',
    features: managerFeatures,
    highlight: 'Process 40+ invoices per day with AI validation',
    cta: 'Try Plan Manager Portal',
  },
];

export default function PortalShowcaseCards() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section id="portals" className="bg-gray-50 py-16 sm:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Three Powerful Portals, One Platform
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          Purpose-built experiences for every stakeholder in the NDIS plan management lifecycle.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {portals.map((p, i) => {
            const Icon = p.icon;
            return (
              <div
                key={p.href}
                className={`flex flex-col rounded-2xl border border-gray-200 bg-white shadow-sm transition-all duration-500 hover:border-orange-300 hover:shadow-lg hover:scale-[1.02] ${
                  visible
                    ? 'opacity-100 translate-y-0'
                    : 'opacity-0 translate-y-6'
                }`}
                style={{ transitionDelay: `${i * 100}ms` }}
              >
                <div className="p-6">
                  <div className="mb-4 inline-flex items-center justify-center rounded-xl bg-orange-50 p-3 text-orange-500">
                    <Icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm text-gray-500 leading-relaxed">
                    {p.description}
                  </p>
                  <ul className="mt-4 space-y-2">
                    {p.features.map((f) => (
                      <li
                        key={f}
                        className="flex items-start gap-2 text-sm text-gray-600"
                      >
                        <span className="mt-0.5 text-green-500">✓</span>
                        {f}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 rounded-lg bg-orange-50 px-4 py-3 text-sm font-medium text-orange-700">
                    {p.highlight}
                  </div>
                </div>
                <div className="mt-auto border-t border-gray-100 p-6">
                  <Link
                    href={p.href}
                    className="block rounded-lg bg-orange-500 px-4 py-2.5 text-center text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 hover:scale-105"
                  >
                    {p.cta}
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
