'use client';

import { useState, useCallback, useEffect } from 'react';
import { X, DollarSign, UserPlus, UserMinus, CalendarDays, Flag } from 'lucide-react';
import type { ManagerParticipant } from '@/lib/mockData/managerParticipants';

interface EditParticipantModalProps {
  participant: ManagerParticipant | null;
  isOpen: boolean;
  onClose: () => void;
}

const budgetBarColors: Record<string, string> = {
  'On Track': 'bg-emerald-500',
  Monitor: 'bg-amber-500',
  'Over Budget': 'bg-red-500',
  'Under-utilizing': 'bg-blue-500',
};

export default function EditParticipantModal({
  participant,
  isOpen,
  onClose,
}: EditParticipantModalProps) {
  const [toast, setToast] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const showToast = useCallback((msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  }, []);

  if (!isOpen || !participant) return null;

  const p = participant;

  const actions = [
    {
      label: 'Edit budget allocation',
      icon: DollarSign,
      msg: `Budget allocation updated for ${p.name}`,
    },
    {
      label: 'Add provider',
      icon: UserPlus,
      msg: `Provider assignment initiated for ${p.name}`,
    },
    {
      label: 'Remove provider',
      icon: UserMinus,
      msg: `Provider removal initiated for ${p.name}`,
    },
    {
      label: 'Adjust plan end date',
      icon: CalendarDays,
      msg: `Plan end date adjustment requested for ${p.name}`,
    },
    {
      label: 'Flag for review',
      icon: Flag,
      msg: `${p.name} flagged for review`,
    },
  ];

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40"
        onClick={onClose}
      />

      {/* Modal card */}
      <div className="relative z-10 w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-xl border border-gray-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">{p.name}</h2>
            <p className="text-sm text-gray-500">
              {p.id} · Age {p.age}
            </p>
          </div>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-5 px-6 py-5">
          {/* Plan dates */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Plan Period</h3>
            <p className="mt-1 text-sm text-gray-600">
              {p.planPeriod.start} – {p.planPeriod.end} ({p.daysRemaining} days
              remaining)
            </p>
          </div>

          {/* Budget breakdown */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">
              Budget Breakdown
            </h3>
            <div className="mt-2 space-y-1 text-sm text-gray-600">
              <div className="flex justify-between">
                <span>Total Budget</span>
                <span className="font-medium text-gray-900">
                  ${p.totalBudget.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Spent</span>
                <span className="font-medium text-gray-900">
                  ${p.spent.toLocaleString()}
                </span>
              </div>
              <div className="flex justify-between">
                <span>Remaining</span>
                <span className="font-medium text-emerald-600">
                  ${p.remaining.toLocaleString()}
                </span>
              </div>
            </div>
            <div className="mt-2 h-2.5 w-full overflow-hidden rounded-full bg-gray-100">
              <div
                className={`h-full rounded-full ${budgetBarColors[p.budgetStatus] ?? 'bg-gray-400'}`}
                style={{ width: `${Math.min(p.percentSpent, 100)}%` }}
              />
            </div>
            <p className="mt-1 text-xs text-gray-500">
              {p.percentSpent}% spent · {p.budgetStatus}
            </p>
          </div>

          {/* Current providers */}
          {p.providerNames && p.providerNames.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Current Providers ({p.activeProviders})
              </h3>
              <ul className="mt-2 space-y-1">
                {p.providerNames.map((name) => (
                  <li
                    key={name}
                    className="flex items-center gap-2 rounded-lg bg-gray-50 px-3 py-1.5 text-sm text-gray-700"
                  >
                    <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-emerald-500" />
                    {name}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {!p.providerNames && (
            <div>
              <h3 className="text-sm font-medium text-gray-700">
                Active Providers
              </h3>
              <p className="mt-1 text-sm text-gray-500">
                {p.activeProviders} provider{p.activeProviders !== 1 ? 's' : ''}{' '}
                linked to this plan
              </p>
            </div>
          )}

          {/* Action buttons */}
          <div>
            <h3 className="text-sm font-medium text-gray-700">Actions</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {actions.map((action) => (
                <button
                  key={action.label}
                  onClick={() => showToast(action.msg)}
                  className="inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  <action.icon className="h-3.5 w-3.5" />
                  {action.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Close
          </button>
          <button
            onClick={() => {
              showToast(`Changes saved for ${p.name}`);
              setTimeout(onClose, 1500);
            }}
            className="rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            Save Changes
          </button>
        </div>
      </div>

      {/* Toast */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] animate-[slideUp_0.3s_ease-out] rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
