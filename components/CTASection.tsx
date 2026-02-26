import Link from 'next/link';
import { Monitor, Code, Phone } from 'lucide-react';

const options = [
  {
    icon: Monitor,
    title: 'Explore the Demo',
    description:
      'See it in action with real NDIS data scenarios.',
    note: 'No login required. Interactive demo with mock data.',
    links: [
      { label: 'Try Participant', href: '/participant' },
      { label: 'Try Provider', href: '/provider' },
      { label: 'Try Manager', href: '/manager' },
    ],
  },
  {
    icon: Code,
    title: 'Use This as a Template',
    description:
      'Like what you see? Use this as a development template.',
    note: 'Fully documented, component-based, ready for your team to build on.',
    links: [{ label: 'View Repository', href: '#' }],
  },
  {
    icon: Phone,
    title: 'Custom Development',
    description:
      'Want Orange Plan Management to build this for you?',
    note: "Let's discuss your specific requirements and timeline.",
    links: [{ label: 'Schedule Demo Call', href: '#' }],
  },
];

export default function CTASection() {
  return (
    <section
      id="cta"
      className="bg-gradient-to-br from-orange-50 via-white to-amber-50 py-16 sm:py-24"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <h2 className="text-center text-3xl font-bold text-gray-900 sm:text-4xl">
          Ready to Transform NDIS Plan Management?
        </h2>

        <div className="mt-12 grid grid-cols-1 gap-8 md:grid-cols-3">
          {options.map((o) => {
            const Icon = o.icon;
            return (
              <div
                key={o.title}
                className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition-shadow hover:shadow-lg"
              >
                <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-orange-50 p-3 text-orange-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900">
                  {o.title}
                </h3>
                <p className="mt-2 text-sm text-gray-500">{o.description}</p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {o.links.map((l) => (
                    <Link
                      key={l.label}
                      href={l.href}
                      className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 hover:scale-105"
                    >
                      {l.label}
                    </Link>
                  ))}
                </div>
                <p className="mt-4 text-xs text-gray-400">{o.note}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
