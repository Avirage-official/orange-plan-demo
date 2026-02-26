'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import type { LucideIcon } from 'lucide-react';

interface UserTypeCardProps {
  href: string;
  title: string;
  description: string;
  icon: LucideIcon;
  index: number;
}

export default function UserTypeCard({
  href,
  title,
  description,
  icon: Icon,
  index,
}: UserTypeCardProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 200 + index * 150);
    return () => clearTimeout(timer);
  }, [index]);

  return (
    <Link
      href={href}
      className={`group block rounded-xl border border-gray-200 bg-white p-6 shadow-sm transition-all duration-300 hover:border-orange-400 hover:shadow-lg hover:scale-[1.03] ${
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
      }`}
      style={{ transitionProperty: 'opacity, transform, border-color, box-shadow' }}
    >
      <div className="mb-4 inline-flex items-center justify-center rounded-lg bg-orange-50 p-3 text-orange-500 transition-colors group-hover:bg-orange-100">
        <Icon className="h-6 w-6" />
      </div>
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <p className="mt-2 text-sm text-gray-500 leading-relaxed">{description}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-orange-500 transition-all group-hover:gap-2">
        Explore <span aria-hidden="true">→</span>
      </span>
    </Link>
  );
}
