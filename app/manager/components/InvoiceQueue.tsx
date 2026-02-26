'use client';

import { useState, useCallback } from 'react';
import { Search } from 'lucide-react';
import {
  managerInvoices,
  type ManagerInvoice,
  type ManagerInvoiceStatus,
} from '@/lib/mockData/managerInvoices';
import InvoiceCard from './InvoiceCard';

type FilterStatus = 'All' | ManagerInvoiceStatus;

const filterOptions: { label: string; value: FilterStatus }[] = [
  { label: 'All', value: 'All' },
  { label: 'Pending', value: 'Validated' },
  { label: 'Flagged', value: 'Needs Review' },
  { label: 'Duplicate', value: 'Duplicate Detected' },
  { label: 'Pricing Query', value: 'Budget Alert' },
];

export default function InvoiceQueue() {
  const [filter, setFilter] = useState<FilterStatus>('All');
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [approvedIds, setApprovedIds] = useState<Set<string>>(new Set());
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((message: string) => {
    setToast(message);
    setTimeout(() => setToast(null), 3000);
  }, []);

  const activeInvoices = managerInvoices.filter(
    (inv) => !approvedIds.has(inv.id)
  );

  const filtered = activeInvoices.filter((inv) => {
    const matchesFilter = filter === 'All' || inv.status === filter;
    const matchesSearch =
      search === '' ||
      inv.participant.toLowerCase().includes(search.toLowerCase()) ||
      inv.provider.toLowerCase().includes(search.toLowerCase()) ||
      inv.serviceType.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const validatedInvoices = filtered.filter(
    (inv) => inv.status === 'Validated'
  );
  const allValidatedSelected =
    validatedInvoices.length > 0 &&
    validatedInvoices.every((inv) => selected.has(inv.id));

  const handleApprove = useCallback(
    (id: string) => {
      const invoice = managerInvoices.find((inv) => inv.id === id);
      setApprovedIds((prev) => new Set(prev).add(id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      showToast(
        `✓ Invoice ${id} approved${invoice ? ` — ${invoice.participant}` : ''}`
      );
    },
    [showToast]
  );

  const handleReject = useCallback(
    (id: string) => {
      setApprovedIds((prev) => new Set(prev).add(id));
      setSelected((prev) => {
        const next = new Set(prev);
        next.delete(id);
        return next;
      });
      showToast(`Invoice ${id} rejected`);
    },
    [showToast]
  );

  const handleSelect = useCallback((id: string) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleSelectAllReady = useCallback(() => {
    if (allValidatedSelected) {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const inv of validatedInvoices) {
          next.delete(inv.id);
        }
        return next;
      });
    } else {
      setSelected((prev) => {
        const next = new Set(prev);
        for (const inv of validatedInvoices) {
          next.add(inv.id);
        }
        return next;
      });
    }
  }, [allValidatedSelected, validatedInvoices]);

  const handleBulkApprove = useCallback(() => {
    const count = selected.size;
    if (count === 0) return;
    setApprovedIds((prev) => {
      const next = new Set(prev);
      for (const id of selected) {
        next.add(id);
      }
      return next;
    });
    setSelected(new Set());
    showToast(`✓ ${count} invoice${count > 1 ? 's' : ''} bulk approved`);
  }, [selected, showToast]);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      {/* Header */}
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Invoice Processing Queue
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {filtered.length} invoice{filtered.length !== 1 ? 's' : ''} in queue
        </p>
      </div>

      {/* Filter bar */}
      <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 px-6 py-3">
        <div className="flex gap-1">
          {filterOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setFilter(opt.value)}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                filter === opt.value
                  ? 'bg-orange-500 text-white'
                  : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
        <div className="relative ml-auto">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search invoices..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-64 rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-orange-300 focus:outline-none focus:ring-1 focus:ring-orange-300"
          />
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50">
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Participant
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Provider
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Service
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Amount
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Submitted
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Priority
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                AI Analysis
              </th>
              <th className="px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((invoice) => (
              <InvoiceCard
                key={invoice.id}
                invoice={invoice}
                onApprove={handleApprove}
                onReject={handleReject}
                isSelected={selected.has(invoice.id)}
                onSelect={handleSelect}
              />
            ))}
          </tbody>
        </table>

        {filtered.length === 0 && (
          <div className="py-12 text-center text-sm text-gray-500">
            No invoices match your filters.
          </div>
        )}
      </div>

      {/* Bulk actions */}
      <div className="flex items-center gap-4 border-t border-gray-200 px-6 py-3">
        <label className="flex items-center gap-2 text-sm text-gray-600">
          <input
            type="checkbox"
            checked={allValidatedSelected}
            onChange={handleSelectAllReady}
            className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
          />
          Select all ready-to-approve
        </label>
        <button
          onClick={handleBulkApprove}
          disabled={selected.size === 0}
          className="rounded-lg bg-emerald-500 px-4 py-2 text-sm font-medium text-white hover:bg-emerald-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Bulk Approve ({selected.size})
        </button>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out] rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
