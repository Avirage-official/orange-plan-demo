'use client';

import { useState } from 'react';
import { invoices as initialInvoices, type Invoice, type InvoiceStatus } from '@/lib/mockData/invoices';
import InvoiceModal from './InvoiceModal';

type SortField = 'dateSubmitted' | 'provider' | 'status';
type FilterStatus = 'All' | InvoiceStatus;

export default function InvoiceTable() {
  const [invoiceList, setInvoiceList] = useState<Invoice[]>(initialInvoices);
  const [filterStatus, setFilterStatus] = useState<FilterStatus>('All');
  const [sortField, setSortField] = useState<SortField>('dateSubmitted');
  const [sortAsc, setSortAsc] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortAsc(!sortAsc);
    } else {
      setSortField(field);
      setSortAsc(true);
    }
  };

  const handleApprove = (id: string) => {
    setInvoiceList((prev) =>
      prev.map((inv) => (inv.id === id ? { ...inv, status: 'Approved' as InvoiceStatus } : inv))
    );
  };

  const handleDecline = (_id: string, _reason: string) => {
    // In a real app this would send the query to the plan manager.
    // The invoice stays as Pending until the plan manager resolves it.
  };

  const filtered = invoiceList.filter((inv) => filterStatus === 'All' || inv.status === filterStatus);

  const sorted = [...filtered].sort((a, b) => {
    const dir = sortAsc ? 1 : -1;
    if (sortField === 'provider') return a.provider.localeCompare(b.provider) * dir;
    if (sortField === 'status') return a.status.localeCompare(b.status) * dir;
    return 0; // dateSubmitted is already in order
  });

  const statusBadge = (status: InvoiceStatus, paidDate?: string) => {
    switch (status) {
      case 'Pending':
        return <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-700">Pending</span>;
      case 'Approved':
        return <span className="rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700">Approved</span>;
      case 'Paid':
        return (
          <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
            Paid {paidDate}
          </span>
        );
    }
  };

  const actionLabel = (status: InvoiceStatus) => {
    switch (status) {
      case 'Pending':
        return 'View & Approve';
      case 'Approved':
        return 'View Details';
      case 'Paid':
        return 'View Receipt';
    }
  };

  const sortIcon = (field: SortField) => {
    if (sortField !== field) return '↕';
    return sortAsc ? '↑' : '↓';
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex flex-col gap-3 border-b border-gray-200 px-6 py-4 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-lg font-semibold text-gray-800">Recent Invoices</h2>
          <div className="flex gap-2">
            {(['All', 'Pending', 'Approved', 'Paid'] as FilterStatus[]).map((status) => (
              <button
                key={status}
                onClick={() => setFilterStatus(status)}
                className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                  filterStatus === status
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {status}
              </button>
            ))}
          </div>
        </div>

        {/* Desktop table */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100 text-left text-xs text-gray-500">
                <th className="px-6 py-3">
                  <button onClick={() => handleSort('dateSubmitted')} className="flex items-center gap-1 hover:text-gray-700">
                    Date {sortIcon('dateSubmitted')}
                  </button>
                </th>
                <th className="px-4 py-3">
                  <button onClick={() => handleSort('provider')} className="flex items-center gap-1 hover:text-gray-700">
                    Provider {sortIcon('provider')}
                  </button>
                </th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3 text-right">Amount</th>
                <th className="px-4 py-3">
                  <button onClick={() => handleSort('status')} className="flex items-center gap-1 hover:text-gray-700">
                    Status {sortIcon('status')}
                  </button>
                </th>
                <th className="px-4 py-3 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((inv) => (
                <tr key={inv.id} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
                  <td className="px-6 py-3 text-gray-700">{inv.dateSubmitted}</td>
                  <td className="px-4 py-3 font-medium text-gray-800">{inv.provider}</td>
                  <td className="px-4 py-3 text-gray-600">{inv.serviceType}</td>
                  <td className="px-4 py-3 text-right font-medium text-gray-800">${inv.amount.toLocaleString()}</td>
                  <td className="px-4 py-3">{statusBadge(inv.status, inv.paidDate)}</td>
                  <td className="px-4 py-3 text-right">
                    <button
                      onClick={() => setSelectedInvoice(inv)}
                      className="text-xs font-medium text-amber-600 hover:text-amber-700 hover:underline"
                    >
                      {actionLabel(inv.status)}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile card view */}
        <div className="sm:hidden divide-y divide-gray-100">
          {sorted.map((inv) => (
            <div key={inv.id} className="px-5 py-4 space-y-2">
              <div className="flex items-start justify-between">
                <div>
                  <p className="font-medium text-gray-800">{inv.provider}</p>
                  <p className="text-xs text-gray-500">{inv.serviceType}</p>
                </div>
                {statusBadge(inv.status, inv.paidDate)}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-500">{inv.dateSubmitted}</span>
                <span className="font-medium text-gray-800">${inv.amount.toLocaleString()}</span>
              </div>
              <button
                onClick={() => setSelectedInvoice(inv)}
                className="w-full rounded-lg bg-amber-50 py-2 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
              >
                {actionLabel(inv.status)}
              </button>
            </div>
          ))}
        </div>
      </div>

      {selectedInvoice && (
        <InvoiceModal
          invoice={selectedInvoice}
          onClose={() => setSelectedInvoice(null)}
          onApprove={handleApprove}
          onDecline={handleDecline}
        />
      )}
    </>
  );
}
