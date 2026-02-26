'use client';

import { useState } from 'react';
import { Shield, Download, Search } from 'lucide-react';
import { auditTrail } from '@/lib/mockData/analyticsData';
import type { AuditEntry } from '@/lib/mockData/analyticsData';

const statusStyles: Record<string, string> = {
  Completed: 'bg-emerald-50 text-emerald-700',
  'In Progress': 'bg-blue-50 text-blue-700',
  Pending: 'bg-yellow-50 text-yellow-700',
  'Pending Review': 'bg-yellow-50 text-yellow-700',
  'Pending NDIA': 'bg-yellow-50 text-yellow-700',
  'Action Required': 'bg-red-50 text-red-700',
  Flagged: 'bg-red-50 text-red-700',
  'Awaiting Response': 'bg-orange-50 text-orange-700',
};

function getStatusStyle(status: string): string {
  return statusStyles[status] || 'bg-gray-50 text-gray-700';
}

export default function ComplianceAuditLog() {
  const [searchTerm, setSearchTerm] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  const filtered = auditTrail.filter(
    (entry) =>
      entry.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.participant.toLowerCase().includes(searchTerm.toLowerCase()) ||
      entry.details.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    setToast('Audit log exported successfully');
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-50">
            <Shield className="h-5 w-5 text-purple-600" />
          </div>
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Compliance Audit Trail
            </h2>
            <p className="text-sm text-gray-500">
              {auditTrail.length} entries logged
            </p>
          </div>
        </div>
        <button
          onClick={handleExport}
          className="inline-flex items-center gap-2 rounded-lg bg-gray-100 px-3 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-200"
        >
          <Download className="h-4 w-4" />
          Export audit log
        </button>
      </div>

      <div className="relative">
        <Search className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Search audit entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full rounded-lg border border-gray-200 py-2 pr-4 pl-10 text-sm focus:border-blue-300 focus:ring-2 focus:ring-blue-100 focus:outline-none"
        />
      </div>

      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white shadow-sm">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Timestamp
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Action
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Participant
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Details
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-600">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((entry, i) => (
              <tr
                key={entry.id}
                className={`border-b border-gray-100 transition-colors hover:bg-gray-50 ${
                  i % 2 === 0 ? 'bg-white' : 'bg-gray-50/50'
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {entry.timestamp}
                </td>
                <td className="px-4 py-3 font-medium text-gray-900">
                  {entry.action}
                </td>
                <td className="px-4 py-3 text-gray-700">
                  {entry.participant}
                </td>
                <td className="max-w-xs px-4 py-3 truncate text-gray-500">
                  {entry.details}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusStyle(entry.status)}`}
                  >
                    {entry.status}
                  </span>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="px-4 py-8 text-center text-gray-400"
                >
                  No matching audit entries found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {toast && (
        <div className="fixed right-6 bottom-6 z-50 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-medium text-emerald-700 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
