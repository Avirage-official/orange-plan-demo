'use client';

import { useEffect, useState } from 'react';
import { TrendingUp, Calendar, Zap, Clock } from 'lucide-react';
import {
  paymentSummary,
  monthlyBreakdown,
} from '@/lib/mockData/providerPaymentHistory';

export default function PaymentHistory() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setAnimated(true), 100);
    return () => clearTimeout(timeout);
  }, []);

  const maxAmount = Math.max(...monthlyBreakdown.map((m) => m.invoiced));

  const summaryStats = [
    {
      icon: TrendingUp,
      label: 'Total Invoiced',
      value: `$${paymentSummary.totalInvoiced3Months.toLocaleString()}`,
    },
    {
      icon: Calendar,
      label: 'Total Paid',
      value: `$${paymentSummary.totalPaid3Months.toLocaleString()} (${paymentSummary.percentPaid}%)`,
    },
    {
      icon: Clock,
      label: 'Avg Payment Time',
      value: `${paymentSummary.avgPaymentDays} days`,
    },
    {
      icon: Zap,
      label: 'Fastest Payment',
      value: paymentSummary.fastestPayment,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Payment History
        </h2>
        <p className="text-sm text-gray-500">Last 3 Months</p>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-lg bg-gray-50 p-4 text-center"
          >
            <stat.icon className="mx-auto h-5 w-5 text-orange-500 mb-2" />
            <p className="text-xs text-gray-500">{stat.label}</p>
            <p className="mt-1 text-sm font-semibold text-gray-800">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Monthly Breakdown Table */}
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              <th className="px-6 py-3">Month</th>
              <th className="px-6 py-3">Invoiced</th>
              <th className="px-6 py-3">Paid</th>
              <th className="px-6 py-3">Avg Days</th>
              <th className="px-6 py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {monthlyBreakdown.map((row, idx) => {
              const fullyPaid = row.invoiced === row.paid;
              return (
                <tr
                  key={row.month}
                  className={idx % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
                >
                  <td className="px-6 py-4 font-medium text-gray-800">
                    {row.month}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    ${row.invoiced.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">
                    ${row.paid.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-gray-700">{row.avgDays}</td>
                  <td className="px-6 py-4">
                    {fullyPaid ? (
                      <span className="inline-flex items-center gap-1 text-emerald-600 font-medium">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs">
                          ✓
                        </span>
                        Fully paid
                      </span>
                    ) : (
                      <span className="inline-flex items-center gap-1 text-orange-600 font-medium">
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-orange-100 text-xs">
                          ●
                        </span>
                        {row.pendingCount} invoices pending
                      </span>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Bar Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-gray-700 mb-4">
          Monthly Comparison
        </h3>

        <div className="space-y-5">
          {monthlyBreakdown.map((row) => {
            const invoicedPct = (row.invoiced / maxAmount) * 100;
            const paidPct = (row.paid / maxAmount) * 100;
            const monthLabel = row.month.split(' ')[0].slice(0, 3);

            return (
              <div key={row.month}>
                <p className="text-xs font-medium text-gray-600 mb-1.5">
                  {monthLabel}
                </p>
                <div className="space-y-1.5">
                  <div className="h-5 w-full rounded bg-gray-100">
                    <div
                      className="h-5 rounded bg-amber-400 transition-all duration-1000 ease-out"
                      style={{ width: animated ? `${invoicedPct}%` : '0%' }}
                    />
                  </div>
                  <div className="h-5 w-full rounded bg-gray-100">
                    <div
                      className="h-5 rounded bg-emerald-400 transition-all duration-1000 ease-out"
                      style={{ width: animated ? `${paidPct}%` : '0%' }}
                    />
                  </div>
                </div>
                <div className="mt-1 flex gap-4 text-xs text-gray-500">
                  <span>${row.invoiced.toLocaleString()}</span>
                  <span>${row.paid.toLocaleString()}</span>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-5 flex items-center gap-4 text-xs text-gray-600">
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-amber-400" />
            Invoiced
          </span>
          <span className="flex items-center gap-1.5">
            <span className="inline-block h-3 w-3 rounded bg-emerald-400" />
            Paid
          </span>
        </div>
      </div>
    </div>
  );
}
