'use client';

import { Users, FileText, AlertTriangle, UsersRound } from 'lucide-react';
import { managerParticipants } from '@/lib/mockData/managerParticipants';
import { managerInvoices } from '@/lib/mockData/managerInvoices';
import { teamMembers } from '@/lib/mockData/teamData';

export default function CaseloadOverview() {
  const activeCount = managerParticipants.length;
  const steadyState = managerParticipants.filter(
    (p) => p.planStatus === 'Active'
  ).length;
  const reviewDue = managerParticipants.filter(
    (p) => p.planStatus === 'Plan Review Due'
  ).length;
  const newOnboarding = managerParticipants.filter(
    (p) => p.planStatus === 'New Onboarding'
  ).length;

  const onlineMembers = teamMembers.filter(
    (m) => m.status === 'Available'
  ).length;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
      {/* Active Participants */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <Users className="h-5 w-5 text-blue-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            On Track
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">{activeCount}</p>
        <p className="mt-1 text-sm text-gray-500">Active NDIS Plans</p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Steady state</span>
            <span className="font-medium text-emerald-600">{steadyState}</span>
          </li>
          <li className="flex justify-between">
            <span>Plan reviews coming up</span>
            <span className="font-medium text-amber-600">{reviewDue}</span>
          </li>
          <li className="flex justify-between">
            <span>New onboarding</span>
            <span className="font-medium text-blue-600">{newOnboarding}</span>
          </li>
        </ul>
        <button className="mt-4 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
          View Caseload
        </button>
      </div>

      {/* Pending Approvals */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
            <FileText className="h-5 w-5 text-orange-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            Action Required
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">
          {managerInvoices.length}
        </p>
        <p className="mt-1 text-sm text-gray-500">Invoices awaiting approval</p>
        <p className="mt-1 text-xs text-gray-400">
          Total amount: $
          {managerInvoices
            .reduce((sum, i) => sum + i.amount, 0)
            .toLocaleString()}
        </p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Ready to approve</span>
            <span className="font-medium text-emerald-600">
              {managerInvoices.filter((i) => i.status === 'Validated').length}
            </span>
          </li>
          <li className="flex justify-between">
            <span>Need review</span>
            <span className="font-medium text-orange-600">
              {managerInvoices.filter((i) => i.status !== 'Validated').length}
            </span>
          </li>
        </ul>
        <button className="mt-4 w-full rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600 transition-colors">
          Process Queue
        </button>
      </div>

      {/* Budget Anomalies / Alerts */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-50">
            <AlertTriangle className="h-5 w-5 text-red-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-red-50 px-2.5 py-0.5 text-xs font-medium text-red-700">
            Review Needed
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">3</p>
        <p className="mt-1 text-sm text-gray-500">Active alerts on caseload</p>
        <ul className="mt-4 space-y-1 text-sm text-gray-600">
          <li className="flex justify-between">
            <span>Over budget in category</span>
            <span className="font-medium text-red-600">1</span>
          </li>
          <li className="flex justify-between">
            <span>Duplicate invoice detected</span>
            <span className="font-medium text-red-600">1</span>
          </li>
          <li className="flex justify-between">
            <span>Pricing mismatch query</span>
            <span className="font-medium text-orange-600">1</span>
          </li>
        </ul>
        <button className="mt-4 w-full rounded-lg bg-red-500 px-3 py-2 text-sm font-medium text-white hover:bg-red-600 transition-colors">
          Review Alerts
        </button>
      </div>

      {/* Team Workload */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
            <UsersRound className="h-5 w-5 text-purple-600" />
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            {onlineMembers} Online
          </span>
        </div>
        <p className="mt-4 text-3xl font-bold text-gray-900">
          {teamMembers.length}
        </p>
        <p className="mt-1 text-sm text-gray-500">Plan managers online</p>
        <ul className="mt-4 space-y-1.5 text-sm text-gray-600">
          {teamMembers.slice(0, 4).map((member) => (
            <li key={member.id} className="flex items-center justify-between">
              <span className="truncate">{member.name}</span>
              <span className="ml-2 shrink-0 rounded-full bg-gray-100 px-2 py-0.5 text-xs font-medium text-gray-700">
                {member.invoicesInQueue} in queue
              </span>
            </li>
          ))}
        </ul>
        <button className="mt-4 w-full rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors">
          View Team
        </button>
      </div>
    </div>
  );
}
