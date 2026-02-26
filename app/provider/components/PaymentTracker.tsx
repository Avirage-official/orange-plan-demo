'use client';

import { useState } from 'react';
import { providerInvoices } from '@/lib/mockData/providerInvoices';

const PAID_DISPLAY_LIMIT = 6;

export default function PaymentTracker() {
  const [showAllPaid, setShowAllPaid] = useState(false);

  const submitted = providerInvoices.filter(
    (i) => i.status === 'Submitted' || i.status === 'Processing'
  );
  const approved = providerInvoices.filter((i) => i.status === 'Approved');
  const paid = providerInvoices.filter((i) => i.status === 'Paid');

  const visiblePaid = showAllPaid ? paid : paid.slice(0, PAID_DISPLAY_LIMIT);

  return (
    <section>
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <h2 className="text-lg font-semibold text-gray-800">
          Payment Status This Month
        </h2>
        <span className="inline-flex items-center rounded-full bg-orange-50 px-3 py-1 text-sm font-medium text-orange-700">
          Average payment time: 1.2 days
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Submitted Column */}
        <div className="rounded-xl border border-gray-200 bg-gray-50">
          <div className="border-t-4 border-orange-400 rounded-t-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#F59E0B' }}
              />
              <h3 className="text-sm font-semibold text-gray-700">SUBMITTED</h3>
              <span className="ml-auto rounded-full bg-orange-100 px-2 py-0.5 text-xs font-medium text-orange-700">
                {submitted.length}
              </span>
            </div>
          </div>
          <div className="space-y-3 p-4">
            {submitted.map((inv) => (
              <div
                key={inv.id}
                className="rounded-lg border p-4 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900">
                    {inv.participantName}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-orange-50 px-2 py-0.5 text-xs font-medium text-orange-700">
                    {inv.status}
                  </span>
                </div>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  ${inv.amount.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {inv.serviceType} · {inv.duration}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Submitted {inv.submittedDate}
                </p>
                {inv.expectedPayment && (
                  <p className="mt-1 text-xs text-gray-500">
                    Expected payment:{' '}
                    <span className="font-medium">{inv.expectedPayment}</span>
                  </p>
                )}
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    className="text-xs font-medium text-orange-600 hover:text-orange-800"
                  >
                    View Invoice
                  </button>
                  <button
                    type="button"
                    className="text-xs font-medium text-gray-400 hover:text-gray-600"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Approved Column */}
        <div className="rounded-xl border border-gray-200 bg-gray-50">
          <div className="border-t-4 border-blue-400 rounded-t-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#3B82F6' }}
              />
              <h3 className="text-sm font-semibold text-gray-700">APPROVED</h3>
              <span className="ml-auto rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700">
                {approved.length}
              </span>
            </div>
          </div>
          <div className="space-y-3 p-4">
            {approved.map((inv) => (
              <div
                key={inv.id}
                className="rounded-lg border p-4 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900">
                    {inv.participantName}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-blue-50 px-2 py-0.5 text-xs font-medium text-blue-700">
                    {inv.status}
                  </span>
                </div>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  ${inv.amount.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {inv.serviceType} · {inv.duration}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Approved {inv.submittedDate}
                </p>
                {inv.expectedPayment && (
                  <p className="mt-1 text-xs text-gray-500">
                    Expected payment:{' '}
                    <span className="font-medium">{inv.expectedPayment}</span>
                  </p>
                )}
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    className="text-xs font-medium text-blue-600 hover:text-blue-800"
                  >
                    View Invoice
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Paid Column */}
        <div className="rounded-xl border border-gray-200 bg-gray-50">
          <div className="border-t-4 border-emerald-400 rounded-t-xl px-4 py-3">
            <div className="flex items-center gap-2">
              <span
                className="inline-block h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#10B981' }}
              />
              <h3 className="text-sm font-semibold text-gray-700">PAID</h3>
              <span className="ml-auto rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-medium text-emerald-700">
                {paid.length}
              </span>
            </div>
          </div>
          <div className="space-y-3 p-4">
            {visiblePaid.map((inv) => (
              <div
                key={inv.id}
                className="rounded-lg border p-4 bg-white shadow-sm"
              >
                <div className="flex items-start justify-between">
                  <p className="font-medium text-gray-900">
                    {inv.participantName}
                  </p>
                  <span className="inline-flex items-center rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-medium text-emerald-700">
                    Paid
                  </span>
                </div>
                <p className="mt-1 text-lg font-bold text-gray-900">
                  ${inv.amount.toLocaleString()}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {inv.serviceType} · {inv.duration}
                </p>
                <p className="mt-1 text-xs text-gray-400">
                  Paid {inv.paidDate}
                </p>
                {inv.paymentRef && (
                  <p className="mt-1 text-xs text-gray-500">
                    Ref: {inv.paymentRef}
                    {inv.daysToPayment !== null && (
                      <span className="ml-2 text-emerald-600">
                        · {inv.daysToPayment === 0
                          ? 'Same day'
                          : `${inv.daysToPayment}d to payment`}
                      </span>
                    )}
                  </p>
                )}
                <div className="mt-3 flex gap-3">
                  <button
                    type="button"
                    className="text-xs font-medium text-emerald-600 hover:text-emerald-800"
                  >
                    View Invoice
                  </button>
                  <button
                    type="button"
                    className="text-xs font-medium text-gray-400 hover:text-gray-600"
                  >
                    Download
                  </button>
                </div>
              </div>
            ))}

            {!showAllPaid && paid.length > PAID_DISPLAY_LIMIT && (
              <button
                type="button"
                onClick={() => setShowAllPaid(true)}
                className="w-full rounded-lg border border-dashed border-gray-300 py-2 text-sm font-medium text-gray-500 hover:border-gray-400 hover:text-gray-700"
              >
                View More Paid Invoices ({paid.length - PAID_DISPLAY_LIMIT}{' '}
                remaining)
              </button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
