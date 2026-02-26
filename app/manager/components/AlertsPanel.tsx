'use client';

import { useState, useCallback } from 'react';
import { alerts, type Alert } from '@/lib/mockData/alerts';

const severityOrder: Record<string, number> = { red: 0, orange: 1, yellow: 2 };

const borderColors: Record<string, string> = {
  red: 'border-l-red-500',
  orange: 'border-l-orange-500',
  yellow: 'border-l-yellow-400',
};

const bgColors: Record<string, string> = {
  red: 'bg-red-50',
  orange: 'bg-orange-50',
  yellow: 'bg-yellow-50',
};

const iconMap: Record<string, string> = {
  red: '🚨',
  orange: '⚠️',
  yellow: '⚠️',
};

const statusTextColors: Record<string, string> = {
  red: 'text-red-700',
  orange: 'text-orange-700',
  yellow: 'text-yellow-700',
};

const sorted = [...alerts].sort(
  (a, b) => (severityOrder[a.severity] ?? 9) - (severityOrder[b.severity] ?? 9)
);

export default function AlertsPanel() {
  const [toast, setToast] = useState<string | null>(null);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-900">
          Active Alerts &amp; Compliance Issues
        </h2>
        <p className="mt-1 text-sm text-gray-500">
          {alerts.length} alert{alerts.length !== 1 ? 's' : ''} requiring
          attention
        </p>
      </div>

      <div className="divide-y divide-gray-100 p-4">
        {sorted.map((alert) => (
          <AlertItem key={alert.id} alert={alert} onAction={showToast} />
        ))}
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-50 animate-[slideUp_0.3s_ease-out] rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}

function AlertItem({
  alert,
  onAction,
}: {
  alert: Alert;
  onAction: (msg: string) => void;
}) {
  return (
    <div
      className={`border-l-4 ${borderColors[alert.severity]} ${bgColors[alert.severity]} rounded-lg p-4 my-3`}
    >
      {/* Title row */}
      <div className="flex items-start gap-2">
        <span className="text-base leading-none">
          {iconMap[alert.severity]}
        </span>
        <div className="flex-1">
          <h3 className="text-sm font-bold text-gray-900">{alert.title}</h3>
          <div className="mt-0.5 flex flex-wrap gap-x-3 text-xs text-gray-600">
            {alert.participant && <span>Participant: {alert.participant}</span>}
            {alert.provider && <span>Provider: {alert.provider}</span>}
          </div>
        </div>
        <span className="shrink-0 text-xs font-medium text-gray-400">
          {alert.id}
        </span>
      </div>

      {/* Details */}
      <div className="mt-2 ml-6 grid grid-cols-2 gap-x-4 gap-y-0.5 text-xs">
        {Object.entries(alert.details).map(([key, value]) => (
          <div key={key} className="contents">
            <span className="text-gray-500 capitalize">{key}</span>
            <span className="font-medium text-gray-700">{value}</span>
          </div>
        ))}
      </div>

      {/* Status */}
      <p
        className={`mt-2 ml-6 text-xs font-medium ${statusTextColors[alert.severity]}`}
      >
        {alert.status}
      </p>

      {/* Action buttons */}
      <div className="mt-3 ml-6 flex flex-wrap gap-2">
        {alert.actions.map((action) => (
          <button
            key={action}
            onClick={() => onAction(`${action} — ${alert.title}`)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            {action}
          </button>
        ))}
      </div>
    </div>
  );
}
