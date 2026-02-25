import Link from 'next/link';

const portalCards = [
  {
    href: '/participant',
    title: 'Participant Experience',
    description:
      'See how NDIS participants view their plan details, track budget usage, and manage their support services.',
  },
  {
    href: '/provider',
    title: 'Service Provider Experience',
    description:
      'Explore how service providers submit invoices, track payments, and manage their participant relationships.',
  },
  {
    href: '/manager',
    title: 'Plan Manager Experience',
    description:
      'Discover how our plan management team reviews budgets, processes invoices, and supports participants.',
  },
];

export default function HomePage() {
  return (
    <main className="flex-1">
      <section className="py-20 text-center">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 tracking-tight sm:text-5xl">
            Orange Plan Management
          </h1>
          <p className="mt-4 text-lg text-gray-500">
            See how we manage NDIS plans for participants, providers, and our
            team
          </p>
        </div>
      </section>

      <section className="pb-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
            {portalCards.map(({ href, title, description }) => (
              <Link
                key={href}
                href={href}
                className="block rounded-xl border border-gray-200 bg-white p-6 shadow-sm hover:border-orange-400 hover:shadow-md transition-all"
              >
                <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
                <p className="mt-2 text-sm text-gray-500">{description}</p>
                <span className="mt-4 inline-block text-sm font-medium text-orange-500">
                  Explore →
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
