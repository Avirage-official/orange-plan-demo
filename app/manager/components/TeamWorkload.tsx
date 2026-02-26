'use client';

import { useState } from 'react';
import {
  Users,
  ArrowRightLeft,
  HelpCircle,
  Calendar,
  MessageCircle,
  Inbox,
} from 'lucide-react';
import { teamMembers, teamTotalPending } from '@/lib/mockData/teamData';
import type { TeamMember } from '@/lib/mockData/teamData';

const statusBadge: Record<TeamMember['status'], string> = {
  Available: 'bg-emerald-50 text-emerald-700',
  Busy: 'bg-orange-50 text-orange-700',
  'On Leave': 'bg-gray-100 text-gray-500',
};

const CURRENT_USER = 'Alex Chen';

export default function TeamWorkload() {
  const [toast, setToast] = useState<string | null>(null);

  const maxInvoices = Math.max(...teamMembers.map((m) => m.invoicesInQueue));

  const showToast = (message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  };

  const actions = [
    {
      label: 'Reassign to team member',
      icon: ArrowRightLeft,
      action: () => showToast('Reassignment panel opened'),
    },
    {
      label: 'Request assistance',
      icon: HelpCircle,
      action: () => showToast('Assistance request sent'),
    },
    {
      label: 'View team calendar',
      icon: Calendar,
      action: () => showToast('Team calendar opened'),
    },
    {
      label: 'Team chat',
      icon: MessageCircle,
      action: () => showToast('Team chat opened'),
    },
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-50">
            <Users className="h-5 w-5 text-indigo-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Team Workload &amp; Handoff
            </h2>
            <p className="text-sm text-gray-500">
              Current workload distribution
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-lg bg-blue-50 px-3 py-2">
          <Inbox className="h-4 w-4 text-blue-600" />
          <span className="text-sm font-medium text-blue-700">
            {teamTotalPending} invoices across team
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {teamMembers.map((member) => {
          const isCurrentUser = member.name === CURRENT_USER;
          const barWidth = (member.invoicesInQueue / maxInvoices) * 100;

          return (
            <div
              key={member.id}
              className={`rounded-xl border p-4 shadow-sm transition-colors ${
                isCurrentUser
                  ? 'border-blue-200 bg-blue-50/40'
                  : 'border-gray-200 bg-white'
              }`}
            >
              <div className="mb-3 flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-gray-900">
                      {member.name}
                    </p>
                    {isCurrentUser && (
                      <span className="rounded-full bg-blue-100 px-2 py-0.5 text-[10px] font-medium text-blue-700">
                        You
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{member.role}</p>
                </div>
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge[member.status]}`}
                >
                  {member.status}
                </span>
              </div>

              <div className="mb-2">
                <div className="mb-1 flex items-center justify-between text-xs">
                  <span className="text-gray-500">Invoices in queue</span>
                  <span className="font-semibold text-gray-900">
                    {member.invoicesInQueue}
                  </span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100">
                  <div
                    className="h-full rounded-full bg-blue-500 transition-all duration-500 ease-out"
                    style={{ width: `${barWidth}%` }}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between text-xs text-gray-500">
                <span>Caseload: {member.caseload} participants</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex flex-wrap gap-3">
        {actions.map((act) => {
          const Icon = act.icon;
          return (
            <button
              key={act.label}
              onClick={act.action}
              className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
            >
              <Icon className="h-4 w-4" />
              {act.label}
            </button>
          );
        })}
      </div>

      {toast && (
        <div className="fixed right-6 bottom-6 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
