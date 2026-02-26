'use client';

import { User, Briefcase, ClipboardList } from 'lucide-react';
import UserTypeCard from '@/components/UserTypeCard';

const portalCards = [
  {
    href: '/participant',
    title: 'Participant Experience',
    description:
      'How participants and their carers manage their NDIS plans with transparency',
    icon: User,
  },
  {
    href: '/provider',
    title: 'Service Provider Experience',
    description:
      'How service providers submit invoices and track fast payments',
    icon: Briefcase,
  },
  {
    href: '/manager',
    title: 'Plan Manager Experience',
    description:
      'How our team efficiently manages participants and processes invoices',
    icon: ClipboardList,
  },
];

export default function PortalCards() {
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-3">
      {portalCards.map(({ href, title, description, icon }, index) => (
        <UserTypeCard
          key={href}
          href={href}
          title={title}
          description={description}
          icon={icon}
          index={index}
        />
      ))}
    </div>
  );
}
