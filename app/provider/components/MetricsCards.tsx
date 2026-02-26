'use client';

import { DollarSign, Clock, Users, Bell } from 'lucide-react';
import { providerInvoices } from '@/lib/mockData/providerInvoices';
import { pendingOnboarding } from '@/lib/mockData/providerParticipants';
import { providerMessages } from '@/lib/mockData/providerMessages';

export default function MetricsCards() {
  const febInvoices = providerInvoices.filter((i) =>
    i.submittedDate.includes('Feb 2026')
  );
  const paidCount = febInvoices.filter((i) => i.status === 'Paid').length;
  const approvedCount = febInvoices.filter((i) => i.status === 'Approved').length;
  const pendingCount = febInvoices.filter(
    (i) => i.status === 'Submitted' || i.status === 'Processing'
  ).length;

  const pendingInvoices = providerInvoices.filter(
    (i) => i.status === 'Submitted' || i.status === 'Processing' || i.status === 'Approved'
  );
  const pendingTotal = pendingInvoices.reduce((sum, i) => sum + i.amount, 0);

  const unreadMessages = providerMessages.filter((m) => !m.read);

  const parentApproval = pendingOnboarding.filter(
    (p) => p.status === 'Awaiting parent approval'
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* This Month's Earnings */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
            <DollarSign className="h-5 w-5 text-orange-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            ↑ 12% vs last month
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">$4,850</p>
        <p className="mt-1 text-sm text-gray-500">
          Total invoiced ({febInvoices.length} invoices)
        </p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Paid</span>
            <span className="font-medium text-emerald-600">{paidCount}</span>
          </li>
          <li className="flex justify-between">
            <span>Approved</span>
            <span className="font-medium text-blue-600">{approvedCount}</span>
          </li>
          <li className="flex justify-between">
            <span>Pending</span>
            <span className="font-medium text-orange-600">{pendingCount}</span>
          </li>
        </ul>
      </div>

      {/* Pending Payments */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Clock className="h-5 w-5 text-blue-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-blue-50 px-2.5 py-0.5 text-xs font-medium text-blue-700">
            {pendingInvoices.length} invoices
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">${pendingTotal.toLocaleString()}</p>
        <p className="mt-1 text-sm text-gray-500">Awaiting payment</p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          {pendingInvoices.map((inv) => (
            <li key={inv.id} className="flex justify-between">
              <span>${inv.amount.toLocaleString()}</span>
              <span className="text-gray-400 text-xs">
                submitted {inv.submittedDate.split(',')[0].replace(' 2026', '')}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-xs text-gray-400">
          Typically paid within 24 hours
        </p>
      </div>

      {/* Active Participants */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
            <Users className="h-5 w-5 text-emerald-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            On Track
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">42</p>
        <p className="mt-1 text-sm text-gray-500">Current NDIS clients</p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Active</span>
            <span className="font-medium text-emerald-600">38</span>
          </li>
          <li className="flex justify-between">
            <span>Pending onboarding</span>
            <span className="font-medium text-blue-600">{pendingOnboarding.length}</span>
          </li>
          <li className="flex justify-between">
            <span>Pending parent approval</span>
            <span className="font-medium text-orange-600">
              {parentApproval}
            </span>
          </li>
        </ul>
      </div>

      {/* Pending Messages/Alerts */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
            <Bell className="h-5 w-5 text-orange-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            Action Required
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">
          {unreadMessages.length}
        </p>
        <p className="mt-1 text-sm text-gray-500">New messages &amp; alerts</p>
        {unreadMessages.length > 0 && (
          <p className="mt-3 rounded-lg bg-gray-50 p-2.5 text-xs text-gray-600 leading-relaxed">
            <span className="font-medium text-gray-700">
              {unreadMessages[0].from}:
            </span>{' '}
            {unreadMessages[0].subject}
          </p>
        )}
        <p className="mt-3 text-xs text-gray-400">
          Also 2 pending onboarding docs needed
        </p>
      </div>
    </div>
  );
}
