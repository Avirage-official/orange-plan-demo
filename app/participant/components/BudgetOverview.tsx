'use client';

import { useState, useEffect } from 'react';
import { participant } from '@/lib/mockData/james';

export default function BudgetOverview() {
  const [barWidth, setBarWidth] = useState(0);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setBarWidth(participant.percentSpent);
    }, 50);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="w-full rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
      <h2 className="text-3xl font-bold text-gray-800">
        ${participant.totalBudget.toLocaleString()}
      </h2>
      <p className="mt-1 text-sm text-gray-500">
        Annual NDIS Plan Budget for 2025-26
      </p>

      {/* Progress bar */}
      <div className="mt-5 h-4 w-full overflow-hidden rounded-full bg-emerald-500">
        <div
          className="h-full rounded-full bg-amber-500 transition-all duration-700 ease-out"
          style={{ width: `${barWidth}%` }}
        />
      </div>

      <div className="mt-2 flex justify-between text-sm">
        <span className="font-medium text-amber-500">
          ${participant.spent.toLocaleString()} spent
        </span>
        <span className="font-medium text-emerald-500">
          ${participant.remaining.toLocaleString()} remaining
        </span>
      </div>

      <p className="mt-1 text-sm text-gray-800">
        {participant.percentSpent}% spent, {participant.percentRemaining}% remaining
      </p>

      {/* Stats */}
      <div className="mt-4 flex flex-col gap-2 sm:flex-row sm:gap-6 text-sm text-gray-800">
        <span>
          Average ${participant.averageMonthlyBurn.toLocaleString()}/month
        </span>
        <span>{participant.daysRemaining} days remaining</span>
      </div>
    </div>
  );
}
