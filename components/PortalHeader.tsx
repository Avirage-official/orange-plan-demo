'use client';

import Link from 'next/link';

interface PortalHeaderProps {
  title: string;
}

export default function PortalHeader({ title }: PortalHeaderProps) {
  const today = new Date().toLocaleDateString('en-AU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center">
        <Link href="/" className="text-xl font-bold text-orange-500 shrink-0">
          Orange Plan Management
        </Link>
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-gray-800">{title}</span>
          <p className="text-xs text-gray-500">{today}</p>
        </div>
        <div className="shrink-0">
          <Link
            href="/"
            className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
          >
            Logout
          </Link>
        </div>
      </div>
    </header>
  );
}
