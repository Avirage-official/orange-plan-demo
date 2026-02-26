'use client';

import { useState } from 'react';
import { Search, AlertTriangle, ExternalLink, MessageSquare, FileText } from 'lucide-react';
import { providerParticipants, pendingOnboarding } from '@/lib/mockData/providerParticipants';

const PAGE_SIZE = 10;

export default function ClientManagement() {
  const [searchFilter, setSearchFilter] = useState('');
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

  const filtered = providerParticipants.filter((c) =>
    c.name.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const visible = filtered.slice(0, visibleCount);

  return (
    <div className="space-y-8">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Clients &amp; Onboarding
      </h2>

      {/* ── Subsection A: Active Clients ── */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 p-5 border-b border-gray-100">
          <h3 className="text-base font-semibold text-gray-800">
            Active Clients ({providerParticipants.length})
          </h3>
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Filter by name…"
              value={searchFilter}
              onChange={(e) => {
                setSearchFilter(e.target.value);
                setVisibleCount(PAGE_SIZE);
              }}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-9 pr-3 text-sm text-gray-700 placeholder:text-gray-400 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-300"
            />
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs font-medium text-gray-500">
                <th className="px-5 py-3">Client</th>
                <th className="px-5 py-3">Status</th>
                <th className="px-5 py-3">Budget Remaining</th>
                <th className="px-5 py-3">Last Session</th>
                <th className="px-5 py-3">Next Session</th>
                <th className="px-5 py-3">Earned YTD</th>
                <th className="px-5 py-3">Last Payment</th>
                <th className="px-5 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visible.map((c) => {
                const pct = Math.round((c.budgetRemaining / c.budgetTotal) * 100);
                return (
                  <tr key={c.id} className="border-b border-gray-50 hover:bg-gray-50/60">
                    <td className="px-5 py-3 font-medium text-gray-900">{c.name}</td>
                    <td className="px-5 py-3">
                      <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                        {c.planStatus}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <span className="text-gray-700">${c.budgetRemaining.toLocaleString()}</span>
                        <div className="h-1.5 w-16 rounded-full bg-gray-100">
                          <div
                            className="h-1.5 rounded-full bg-emerald-500"
                            style={{ width: `${pct}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-gray-600">{c.lastSession}</td>
                    <td className="px-5 py-3 text-gray-600">{c.nextSession}</td>
                    <td className="px-5 py-3 text-gray-700">${c.totalEarned.toLocaleString()} YTD</td>
                    <td className="px-5 py-3 text-gray-600">{c.lastPayment}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="View Details">
                          <ExternalLink className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Submit Invoice">
                          <FileText className="h-4 w-4" />
                        </button>
                        <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Message Plan Manager">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Mobile cards */}
        <div className="lg:hidden divide-y divide-gray-100">
          {visible.map((c) => {
            const pct = Math.round((c.budgetRemaining / c.budgetTotal) * 100);
            return (
              <div key={c.id} className="p-4 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium text-gray-900">{c.name}</span>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    {c.planStatus}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-700">
                  <span>${c.budgetRemaining.toLocaleString()} remaining</span>
                  <div className="h-1.5 w-16 rounded-full bg-gray-100">
                    <div className="h-1.5 rounded-full bg-emerald-500" style={{ width: `${pct}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-1 text-xs text-gray-500">
                  <span>Last: {c.lastSession}</span>
                  <span>Next: {c.nextSession}</span>
                  <span>Earned: ${c.totalEarned.toLocaleString()} YTD</span>
                  <span>Paid: {c.lastPayment}</span>
                </div>
                <div className="flex items-center gap-1 pt-1">
                  <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="View Details">
                    <ExternalLink className="h-4 w-4" />
                  </button>
                  <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Submit Invoice">
                    <FileText className="h-4 w-4" />
                  </button>
                  <button className="rounded-md p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600" title="Message Plan Manager">
                    <MessageSquare className="h-4 w-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {visibleCount < filtered.length && (
          <div className="p-4 text-center border-t border-gray-100">
            <button
              onClick={() => setVisibleCount((v) => v + PAGE_SIZE)}
              className="text-sm font-medium text-orange-600 hover:text-orange-700"
            >
              Show More ({filtered.length - visibleCount} remaining)
            </button>
          </div>
        )}
      </div>

      {/* ── Subsection B: Pending Onboarding ── */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-base font-semibold text-gray-800">
            Pending Onboarding ({pendingOnboarding.length})
          </h3>
          <span className="inline-flex items-center rounded-full bg-orange-50 px-2.5 py-0.5 text-xs font-medium text-orange-700">
            Action Required
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Charlotte Adams */}
          <div className="rounded-lg border border-orange-200 bg-white p-4 border-l-4 border-l-orange-400">
            <div className="flex items-start justify-between">
              <p className="font-medium text-gray-900">{pendingOnboarding[0].name}</p>
              <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
            </div>
            <p className="mt-1 text-sm text-gray-600">{pendingOnboarding[0].status}</p>
            <div className="mt-2 flex items-center gap-3 text-xs text-gray-500">
              <span>{pendingOnboarding[0].daysPending} days pending</span>
              <span>Budget: ${pendingOnboarding[0].budgetAllocated.toLocaleString()}</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 hover:bg-orange-100">
                Resend approval link
              </button>
              <button className="rounded-md bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                Message Orange
              </button>
            </div>
          </div>

          {/* Jackson Lee */}
          <div className="rounded-lg border border-orange-200 bg-white p-4 border-l-4 border-l-orange-400">
            <div className="flex items-start justify-between">
              <p className="font-medium text-gray-900">{pendingOnboarding[1].name}</p>
              <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
            </div>
            <p className="mt-1 text-sm text-gray-600">{pendingOnboarding[1].status}</p>
            <div className="mt-2 text-xs text-gray-500">
              <p className="font-medium text-gray-600">Missing:</p>
              <ul className="mt-1 list-disc list-inside space-y-0.5">
                {pendingOnboarding[1].missingDocs.map((doc) => (
                  <li key={doc}>{doc}</li>
                ))}
              </ul>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 hover:bg-orange-100">
                Upload docs
              </button>
              <button className="rounded-md bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                Message Plan Manager
              </button>
            </div>
          </div>

          {/* Zara Khan */}
          <div className="rounded-lg border border-orange-200 bg-white p-4 border-l-4 border-l-orange-400">
            <div className="flex items-start justify-between">
              <p className="font-medium text-gray-900">{pendingOnboarding[2].name}</p>
              <AlertTriangle className="h-4 w-4 text-orange-500 shrink-0" />
            </div>
            <p className="mt-1 text-sm text-gray-600">{pendingOnboarding[2].status}</p>
            <div className="mt-2 text-xs text-gray-500">
              <span>{pendingOnboarding[2].daysPending} days pending</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              <button className="rounded-md bg-orange-50 px-3 py-1.5 text-xs font-medium text-orange-700 hover:bg-orange-100">
                Contact Orange
              </button>
              <button className="rounded-md bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-100">
                Auto-follow up
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
