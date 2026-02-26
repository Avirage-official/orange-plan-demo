'use client';

import { useEffect, useRef, useState } from 'react';
import { Eye, Zap, Shield, Users } from 'lucide-react';
import {
  participantBenefits,
  providerBenefits,
  managerBenefits,
} from '@/lib/content/benefits';

const iconMap = [Eye, Zap, Shield, Users];

const groups = [
  { heading: 'For Participants', items: participantBenefits, color: 'orange' },
  { heading: 'For Providers', items: providerBenefits, color: 'blue' },
  { heading: 'For Plan Managers', items: managerBenefits, color: 'green' },
] as const;

export default function BenefitsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.15 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="benefits" className="bg-white py-16 sm:py-24" ref={ref}>
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Why Custom NDIS Management Software?
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center text-gray-500">
          Purpose-built technology that benefits every stakeholder in the NDIS ecosystem.
        </p>

        <div className="mt-12 grid grid-cols-1 gap-10 lg:grid-cols-2">
          {/* Left — benefits list */}
          <div className="space-y-10">
            {groups.map((g) => (
              <div key={g.heading}>
                <h3 className="text-lg font-semibold text-gray-900">
                  {g.heading}
                </h3>
                <ul className="mt-3 space-y-3">
                  {g.items.map((b) => (
                    <li key={b.title} className="flex items-start gap-3">
                      <span className="mt-1 text-green-500 font-bold text-sm">✓</span>
                      <div>
                        <span className="font-medium text-gray-800">
                          &ldquo;{b.title}&rdquo;
                        </span>
                        <span className="text-gray-500"> — {b.description}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Right — icon grid */}
          <div
            className={`grid grid-cols-2 gap-6 self-start transition-all duration-700 ${
              visible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-6'
            }`}
          >
            {[
              { icon: Eye, label: 'Transparency', desc: 'Full budget visibility', bg: 'bg-orange-50', text: 'text-orange-500' },
              { icon: Zap, label: 'Speed', desc: 'Same-day payments', bg: 'bg-blue-50', text: 'text-blue-500' },
              { icon: Shield, label: 'Compliance', desc: 'Built-in audit trails', bg: 'bg-green-50', text: 'text-green-500' },
              { icon: Users, label: 'Collaboration', desc: 'Team-wide efficiency', bg: 'bg-purple-50', text: 'text-purple-500' },
            ].map(({ icon: Icon, label, desc, bg, text }) => (
              <div
                key={label}
                className="flex flex-col items-center rounded-xl border border-gray-100 bg-white p-6 text-center shadow-sm"
              >
                <div
                  className={`mb-3 inline-flex items-center justify-center rounded-lg ${bg} p-3 ${text}`}
                >
                  <Icon className="h-6 w-6" />
                </div>
                <h4 className="font-semibold text-gray-900">{label}</h4>
                <p className="mt-1 text-sm text-gray-500">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
