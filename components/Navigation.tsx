'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Features', href: '#portals' },
  { label: 'Portals', href: '#portals' },
  { label: 'Benefits', href: '#benefits' },
  { label: 'Pricing', href: '#cta' },
];

export default function Navigation() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6 lg:px-8">
        <Link href="/" className="text-lg font-bold text-orange-500">
          Orange Plan Management
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="text-sm text-gray-600 transition-colors hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#portals"
            className="rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white shadow-sm transition-all hover:bg-orange-600 hover:scale-105"
          >
            View Demo
          </a>
        </nav>

        {/* Mobile toggle */}
        <button
          onClick={() => setOpen(!open)}
          className="md:hidden rounded-lg p-2 text-gray-600 hover:bg-gray-100"
          aria-label="Toggle menu"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile nav */}
      {open && (
        <nav className="border-t border-gray-100 bg-white px-4 pb-4 pt-2 md:hidden">
          {navLinks.map((l) => (
            <a
              key={l.label}
              href={l.href}
              onClick={() => setOpen(false)}
              className="block py-2 text-sm text-gray-600 hover:text-gray-900"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#portals"
            onClick={() => setOpen(false)}
            className="mt-2 block rounded-lg bg-orange-500 px-4 py-2 text-center text-sm font-medium text-white"
          >
            View Demo
          </a>
        </nav>
      )}
    </header>
  );
}
