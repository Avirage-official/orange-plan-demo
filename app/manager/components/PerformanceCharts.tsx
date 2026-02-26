'use client';

import { useEffect, useState } from 'react';
import { BarChart3, Users, Clock } from 'lucide-react';
import {
  dailyInvoicesProcessed,
  budgetUtilizationDistribution,
  processingTimeDistribution,
} from '@/lib/mockData/analyticsData';

export default function PerformanceCharts() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(timer);
  }, []);

  const maxCount = Math.max(...dailyInvoicesProcessed.map((d) => d.count));

  const budgetTotal =
    budgetUtilizationDistribution.green0_25 +
    budgetUtilizationDistribution.blue25_75 +
    budgetUtilizationDistribution.orange75_100 +
    budgetUtilizationDistribution.red_over100;

  const budgetSegments = [
    {
      label: '0–25%',
      count: budgetUtilizationDistribution.green0_25,
      color: '#10B981',
      bg: 'bg-emerald-50',
      text: 'text-emerald-700',
    },
    {
      label: '25–75%',
      count: budgetUtilizationDistribution.blue25_75,
      color: '#3B82F6',
      bg: 'bg-blue-50',
      text: 'text-blue-700',
    },
    {
      label: '75–100%',
      count: budgetUtilizationDistribution.orange75_100,
      color: '#F59E0B',
      bg: 'bg-orange-50',
      text: 'text-orange-700',
    },
    {
      label: '>100%',
      count: budgetUtilizationDistribution.red_over100,
      color: '#EF4444',
      bg: 'bg-red-50',
      text: 'text-red-700',
    },
  ];

  const timeDistributions = [
    {
      label: 'Same day',
      value: processingTimeDistribution.sameDay,
      color: '#10B981',
    },
    {
      label: '1 day',
      value: processingTimeDistribution.oneDay,
      color: '#3B82F6',
    },
    {
      label: '2+ days',
      value: processingTimeDistribution.twoPlusDays,
      color: '#F59E0B',
    },
  ];

  return (
    <div className="space-y-6">
      {/* Chart 1: Invoices Processed */}
      <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-50">
            <BarChart3 className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">
              Invoices Processed (Last 30 days)
            </h3>
            <p className="text-xs text-gray-500">Daily processing volume</p>
          </div>
        </div>
        <div className="flex items-end gap-[3px]" style={{ height: 180 }}>
          {dailyInvoicesProcessed.map((day, i) => {
            const heightPct = (day.count / maxCount) * 100;
            return (
              <div
                key={day.date}
                className="group relative flex flex-1 flex-col items-center justify-end"
                style={{ height: '100%' }}
              >
                <div className="pointer-events-none absolute -top-8 left-1/2 z-10 hidden -translate-x-1/2 rounded bg-gray-800 px-2 py-1 text-xs whitespace-nowrap text-white group-hover:block">
                  {day.date}: {day.count}
                </div>
                <div
                  className="w-full rounded-t bg-blue-500 transition-all duration-700 ease-out hover:bg-blue-600"
                  style={{
                    height: mounted ? `${heightPct}%` : '0%',
                    transitionDelay: `${i * 20}ms`,
                    minWidth: 4,
                  }}
                />
              </div>
            );
          })}
        </div>
        <div className="mt-2 flex gap-[3px]">
          {dailyInvoicesProcessed.map((day, i) => (
            <div key={day.date} className="flex-1 text-center">
              {i % 5 === 0 ? (
                <span className="text-[10px] text-gray-400">{day.date}</span>
              ) : null}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* Chart 2: Budget Utilization */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <Users className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Budget Utilization Across Caseload
              </h3>
              <p className="text-xs text-gray-500">
                {budgetTotal} participants by budget usage
              </p>
            </div>
          </div>

          {/* Stacked bar */}
          <div className="mb-4 flex h-10 overflow-hidden rounded-lg">
            {budgetSegments.map((seg) => (
              <div
                key={seg.label}
                className="flex items-center justify-center text-xs font-medium text-white transition-all duration-700 ease-out"
                style={{
                  width: mounted
                    ? `${(seg.count / budgetTotal) * 100}%`
                    : '0%',
                  backgroundColor: seg.color,
                }}
              >
                {seg.count}
              </div>
            ))}
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 gap-2">
            {budgetSegments.map((seg) => (
              <div key={seg.label} className="flex items-center gap-2">
                <div
                  className="h-3 w-3 rounded-full"
                  style={{ backgroundColor: seg.color }}
                />
                <span className="text-xs text-gray-600">
                  {seg.label}:{' '}
                  <span className="font-medium">
                    {seg.count} participants
                  </span>
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 3: Processing Time Distribution */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <Clock className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-900">
                Processing Time Distribution
              </h3>
              <p className="text-xs text-gray-500">
                How quickly invoices are processed
              </p>
            </div>
          </div>

          <div className="space-y-4">
            {timeDistributions.map((item, i) => (
              <div key={item.label}>
                <div className="mb-1 flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-700">
                    {item.label}
                  </span>
                  <span className="text-sm font-semibold text-gray-900">
                    {item.value}%
                  </span>
                </div>
                <div className="h-6 w-full overflow-hidden rounded-lg bg-gray-100">
                  <div
                    className="flex h-full items-center rounded-lg pl-2 text-xs font-medium text-white transition-all duration-700 ease-out"
                    style={{
                      width: mounted ? `${item.value}%` : '0%',
                      backgroundColor: item.color,
                      transitionDelay: `${i * 100}ms`,
                    }}
                  >
                    {item.value}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
