'use client';

import { useState } from 'react';
import type { Invoice } from '@/lib/mockData/invoices';

interface InvoiceModalProps {
  invoice: Invoice;
  onClose: () => void;
  onApprove?: (id: string) => void;
  onDecline?: (id: string, reason: string) => void;
}

export default function InvoiceModal({ invoice, onClose, onApprove, onDecline }: InvoiceModalProps) {
  const [showDeclineForm, setShowDeclineForm] = useState(false);
  const [declineReason, setDeclineReason] = useState('Pricing query');
  const [declineMessage, setDeclineMessage] = useState('');
  const [actionTaken, setActionTaken] = useState<'approved' | 'declined' | null>(null);

  const isPending = invoice.status === 'Pending';

  const handleApprove = () => {
    onApprove?.(invoice.id);
    setActionTaken('approved');
  };

  const handleDeclineSubmit = () => {
    onDecline?.(invoice.id, `${declineReason}: ${declineMessage}`);
    setActionTaken('declined');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-lg animate-[slideUp_0.25s_ease-out] rounded-xl border border-gray-200 bg-white shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h3 className="text-lg font-semibold text-gray-800">
            {isPending ? 'Review Invoice' : 'Invoice Details'}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
            ✕
          </button>
        </div>

        {actionTaken === 'approved' && (
          <div className="m-6 rounded-lg bg-emerald-50 p-4 text-sm text-emerald-700">
            <span className="mr-1">✓</span> Invoice approved! {invoice.provider} will be paid within 24 hours.
          </div>
        )}

        {actionTaken === 'declined' && (
          <div className="m-6 rounded-lg bg-amber-50 p-4 text-sm text-amber-700">
            <span className="mr-1">✗</span> Invoice query sent to plan manager. We&apos;ll follow up within 1 business day.
          </div>
        )}

        {!actionTaken && (
          <div className="space-y-4 px-6 py-5">
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <p className="text-gray-500">Provider</p>
                <p className="font-medium text-gray-800">{invoice.provider}</p>
              </div>
              <div>
                <p className="text-gray-500">Service</p>
                <p className="font-medium text-gray-800">{invoice.serviceType}</p>
              </div>
              <div>
                <p className="text-gray-500">Amount</p>
                <p className="text-xl font-bold text-gray-800">${invoice.amount.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-gray-500">Date Submitted</p>
                <p className="font-medium text-gray-800">{invoice.dateSubmitted}</p>
              </div>
            </div>

            {invoice.description && (
              <div className="text-sm">
                <p className="text-gray-500">Description</p>
                <p className="font-medium text-gray-800">{invoice.description}</p>
              </div>
            )}

            {invoice.rate && (
              <div className="text-sm">
                <p className="text-gray-500">NDIS Price Guide Rate</p>
                <p className="font-medium text-gray-800">{invoice.rate}</p>
              </div>
            )}

            {invoice.servicePeriod && (
              <div className="text-sm">
                <p className="text-gray-500">Service Period</p>
                <p className="font-medium text-gray-800">{invoice.servicePeriod}</p>
              </div>
            )}

            {invoice.paidDate && (
              <div className="text-sm">
                <p className="text-gray-500">Payment Date</p>
                <p className="font-medium text-emerald-600">Paid {invoice.paidDate}</p>
              </div>
            )}

            {invoice.transactionRef && (
              <div className="text-sm">
                <p className="text-gray-500">Transaction Reference</p>
                <p className="font-mono text-xs text-gray-800">{invoice.transactionRef}</p>
              </div>
            )}

            {!isPending && (
              <button className="mt-2 w-full rounded-lg border border-gray-200 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors">
                Download Receipt / Invoice
              </button>
            )}

            {isPending && !showDeclineForm && (
              <div className="flex gap-3 pt-2">
                <button
                  onClick={handleApprove}
                  className="flex-1 rounded-lg bg-emerald-500 py-2.5 text-sm font-medium text-white hover:bg-emerald-600 transition-colors"
                >
                  ✓ Approve Invoice
                </button>
                <button
                  onClick={() => setShowDeclineForm(true)}
                  className="flex-1 rounded-lg bg-amber-500 py-2.5 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
                >
                  ✗ Decline &amp; Request Info
                </button>
              </div>
            )}

            {isPending && showDeclineForm && (
              <div className="space-y-3 rounded-lg border border-gray-200 p-4">
                <p className="text-sm font-medium text-gray-800">Reason for query:</p>
                <div className="flex flex-wrap gap-2">
                  {['Pricing query', 'Service not provided', 'Duplicate', 'Other'].map((reason) => (
                    <button
                      key={reason}
                      onClick={() => setDeclineReason(reason)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        declineReason === reason
                          ? 'bg-amber-500 text-white'
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                    >
                      {reason}
                    </button>
                  ))}
                </div>
                <textarea
                  value={declineMessage}
                  onChange={(e) => setDeclineMessage(e.target.value)}
                  placeholder="Add a message to your plan manager..."
                  className="w-full rounded-lg border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={3}
                />
                <div className="flex gap-3">
                  <button
                    onClick={handleDeclineSubmit}
                    className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
                  >
                    Submit Query
                  </button>
                  <button
                    onClick={() => setShowDeclineForm(false)}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {actionTaken && (
          <div className="border-t border-gray-200 px-6 py-4">
            <button
              onClick={onClose}
              className="w-full rounded-lg bg-gray-100 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
