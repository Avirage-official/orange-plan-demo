'use client';

import { CheckCircle, AlertTriangle, Ban, Info } from 'lucide-react';
import type { ManagerInvoice } from '@/lib/mockData/managerInvoices';

interface InvoiceCardProps {
  invoice: ManagerInvoice;
  onApprove: (id: string) => void;
  onReject: (id: string) => void;
  isSelected: boolean;
  onSelect: (id: string) => void;
}

function StatusIcon({ status }: { status: ManagerInvoice['status'] }) {
  switch (status) {
    case 'Validated':
      return <CheckCircle className="h-5 w-5 text-emerald-500" />;
    case 'Needs Review':
    case 'Budget Alert':
      return <AlertTriangle className="h-5 w-5 text-orange-500" />;
    case 'Duplicate Detected':
      return <Ban className="h-5 w-5 text-red-500" />;
    default:
      return <Info className="h-5 w-5 text-gray-400" />;
  }
}

function PriorityBadge({ priority }: { priority: ManagerInvoice['priority'] }) {
  const styles = {
    Normal: 'bg-gray-100 text-gray-600',
    HIGH: 'bg-orange-100 text-orange-700',
    URGENT: 'bg-red-100 text-red-700',
  };

  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${styles[priority]}`}
    >
      {priority}
    </span>
  );
}

export default function InvoiceCard({
  invoice,
  onApprove,
  onReject,
  isSelected,
  onSelect,
}: InvoiceCardProps) {
  return (
    <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
      {/* Checkbox / Status */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-2">
          {invoice.status === 'Validated' && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect(invoice.id)}
              className="h-4 w-4 rounded border-gray-300 text-orange-500 focus:ring-orange-500"
            />
          )}
          <StatusIcon status={invoice.status} />
        </div>
      </td>

      {/* Participant */}
      <td className="px-4 py-3">
        <p className="text-sm font-medium text-gray-900">
          {invoice.participant}
        </p>
      </td>

      {/* Provider */}
      <td className="px-4 py-3 text-sm text-gray-600">{invoice.provider}</td>

      {/* Service */}
      <td className="px-4 py-3 text-sm text-gray-600">
        {invoice.serviceType}
      </td>

      {/* Amount */}
      <td className="px-4 py-3 text-sm font-medium text-gray-900">
        ${invoice.amount.toLocaleString()}
      </td>

      {/* Submitted */}
      <td className="px-4 py-3 text-sm text-gray-500">{invoice.submitted}</td>

      {/* Priority */}
      <td className="px-4 py-3">
        <PriorityBadge priority={invoice.priority} />
      </td>

      {/* AI Analysis */}
      <td className="max-w-xs px-4 py-3">
        <p className="text-xs text-gray-600 leading-relaxed">
          {invoice.aiAnalysis}
        </p>
      </td>

      {/* Actions */}
      <td className="px-4 py-3">
        <div className="flex items-center gap-1.5">
          {invoice.status === 'Validated' && (
            <>
              <button
                onClick={() => onApprove(invoice.id)}
                className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
              >
                Approve
              </button>
              <button
                onClick={() => onReject(invoice.id)}
                className="rounded-md bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
              <button className="rounded-md bg-gray-100 px-2.5 py-1 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
                Details
              </button>
            </>
          )}
          {(invoice.status === 'Needs Review' ||
            invoice.status === 'Budget Alert') && (
            <>
              <button className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700 hover:bg-orange-200 transition-colors">
                Message Provider
              </button>
              <button
                onClick={() => onApprove(invoice.id)}
                className="rounded-md bg-emerald-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-emerald-600 transition-colors"
              >
                Approve with Note
              </button>
              <button
                onClick={() => onReject(invoice.id)}
                className="rounded-md bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-600 transition-colors"
              >
                Reject
              </button>
            </>
          )}
          {invoice.status === 'Duplicate Detected' && (
            <>
              <button className="rounded-md bg-orange-100 px-2.5 py-1 text-xs font-medium text-orange-700 hover:bg-orange-200 transition-colors">
                Contact Provider
              </button>
              <button
                onClick={() => onReject(invoice.id)}
                className="rounded-md bg-red-500 px-2.5 py-1 text-xs font-medium text-white hover:bg-red-600 transition-colors"
              >
                Mark as Duplicate
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}
