'use client';

import { Award, Shield, Zap, TrendingUp } from 'lucide-react';
import { performanceStats, paymentSummary } from '@/lib/mockData/providerPaymentHistory';

export default function StatsSection() {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-800 mb-4">
        Key Performance Stats
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Left: Orange's Speed Advantage */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-orange-50">
              <Zap className="h-5 w-5 text-orange-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Orange Payment Speed
            </h3>
          </div>

          <ul className="space-y-4">
            <li className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-600">
                ⚡ Invoices processed within 1 business day
              </span>
              <span className="text-sm font-semibold text-emerald-600 whitespace-nowrap">
                {performanceStats.processedWithin1Day}%
              </span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-600">
                ✅ Payments made same-day or next day
              </span>
              <span className="text-sm font-semibold text-emerald-600 whitespace-nowrap">
                {performanceStats.paidSameOrNextDay}%
              </span>
            </li>
            <li className="flex items-start justify-between gap-4 rounded-lg bg-orange-50 p-3 -mx-3">
              <span className="text-sm text-gray-700 font-medium">
                🕐 Your average payment time
              </span>
              <span className="text-sm font-bold text-orange-600 whitespace-nowrap">
                {performanceStats.avgPaymentDays} days
              </span>
            </li>
            <li className="flex items-start justify-between gap-4">
              <span className="text-sm text-gray-500">
                📊 Industry comparison average
              </span>
              <span className="text-sm font-semibold text-red-500 whitespace-nowrap">
                {performanceStats.industryAvgDays} days
              </span>
            </li>
          </ul>

          {/* Visual comparison bar */}
          <div className="mt-6 space-y-3">
            <p className="text-xs font-medium text-gray-500 uppercase tracking-wide">
              Speed Comparison
            </p>
            <div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">Your provider</span>
                <span className="font-semibold text-orange-600">
                  {performanceStats.avgPaymentDays} days
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100">
                <div
                  className="h-3 rounded-full bg-orange-500"
                  style={{ width: '17%' }}
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between text-xs text-gray-600 mb-1">
                <span className="font-medium">Industry average</span>
                <span className="font-semibold text-gray-400">
                  {performanceStats.industryAvgDays} days
                </span>
              </div>
              <div className="h-3 w-full rounded-full bg-gray-100">
                <div
                  className="h-3 rounded-full bg-gray-300"
                  style={{ width: '85%' }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right: Your Stats */}
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
          <div className="flex items-center gap-2 mb-5">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-50">
              <Award className="h-5 w-5 text-emerald-600" />
            </div>
            <h3 className="text-base font-semibold text-gray-900">
              Your Performance
            </h3>
          </div>

          <ul className="space-y-5">
            <li>
              <p className="text-sm text-gray-500">Total earned with Orange Plan</p>
              <p className="text-2xl font-bold text-gray-900 mt-0.5">
                ${paymentSummary.totalEarnedYTD.toLocaleString()}{' '}
                <span className="text-sm font-medium text-gray-400">YTD</span>
              </p>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">
                Number of payments received
              </span>
              <span className="text-sm font-semibold text-gray-900">
                {paymentSummary.totalPaymentsReceived}
              </span>
            </li>
            <li className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Payment failures</span>
              <span className="inline-flex items-center gap-1 text-sm font-semibold text-emerald-600">
                <span className="flex h-5 w-5 items-center justify-center rounded-full bg-emerald-100 text-xs">
                  ✓
                </span>
                Zero
              </span>
            </li>
            <li>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-600">Reliability rating</span>
                <span className="text-sm font-semibold text-gray-900">
                  {paymentSummary.reliabilityRating}%
                </span>
              </div>
              <div className="flex items-center gap-0.5 mt-1.5">
                {[1, 2, 3, 4, 5].map((star) => (
                  <span key={star} className="text-yellow-400 text-lg">★</span>
                ))}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
