'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

const portalLinks = [
  { href: '/participant', label: 'Participant Portal' },
  { href: '/provider', label: 'Service Provider Portal' },
  { href: '/manager', label: 'Plan Manager Portal' },
];

export default function DemoSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 min-h-screen bg-white border-r border-gray-200 flex flex-col p-4">
      <Link
        href="/"
        className="flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Menu
      </Link>
      <nav className="flex flex-col gap-1">
        {portalLinks.map(({ href, label }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive
                  ? 'bg-orange-100 text-orange-700'
                  : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
