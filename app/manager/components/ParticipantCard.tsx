'use client';

import {
  User,
  Calendar,
  Clock,
  FileText,
  MessageSquare,
  Settings,
  Eye,
  UserPlus,
  AlertTriangle,
} from 'lucide-react';
import type { ManagerParticipant } from '@/lib/mockData/managerParticipants';

interface ParticipantCardProps {
  participant: ManagerParticipant;
  onEditParticipant: (participant: ManagerParticipant) => void;
}

const statusColors: Record<string, string> = {
  Active: 'bg-emerald-50 text-emerald-700',
  'New Onboarding': 'bg-blue-50 text-blue-700',
  'Plan Review Due': 'bg-orange-50 text-orange-700',
  Inactive: 'bg-gray-100 text-gray-600',
};

const budgetStatusColors: Record<string, string> = {
  'On Track': 'bg-emerald-50 text-emerald-700',
  Monitor: 'bg-amber-50 text-amber-700',
  'Over Budget': 'bg-red-50 text-red-700',
  'Under-utilizing': 'bg-blue-50 text-blue-700',
};

const budgetBarColors: Record<string, string> = {
  'On Track': 'bg-emerald-500',
  Monitor: 'bg-amber-500',
  'Over Budget': 'bg-red-500',
  'Under-utilizing': 'bg-blue-500',
};

export default function ParticipantCard({
  participant: p,
  onEditParticipant,
}: ParticipantCardProps) {
  const isOnboarding = p.planStatus === 'New Onboarding';
  const reviewSoon = p.planReviewDays != null && p.planReviewDays < 30;

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <h3 className="text-base font-semibold text-gray-900">{p.name}</h3>
          <p className="mt-0.5 text-xs text-gray-500">
            {p.id} · Age {p.age}
          </p>
        </div>
        <span
          className={`inline-flex shrink-0 items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColors[p.planStatus] ?? 'bg-gray-100 text-gray-600'}`}
        >
          {p.planStatus}
        </span>
      </div>

      {/* Plan period */}
      <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
        <Calendar className="h-3.5 w-3.5" />
        <span>
          {p.planPeriod.start} – {p.planPeriod.end}
        </span>
        <span className="ml-auto font-medium text-gray-700">
          {p.daysRemaining}d remaining
        </span>
      </div>

      {/* Budget bar */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-xs text-gray-600">
          <span>
            Budget: ${p.spent.toLocaleString()} / $
            {p.totalBudget.toLocaleString()}
          </span>
          <span className="font-medium">{p.percentSpent}% spent</span>
        </div>
        <div className="mt-1 h-2 w-full overflow-hidden rounded-full bg-gray-100">
          <div
            className={`h-full rounded-full ${budgetBarColors[p.budgetStatus] ?? 'bg-gray-400'}`}
            style={{ width: `${Math.min(p.percentSpent, 100)}%` }}
          />
        </div>
        <div className="mt-1 flex items-center justify-between text-xs">
          <span
            className={`inline-flex items-center rounded-full px-2 py-0.5 font-medium ${budgetStatusColors[p.budgetStatus] ?? 'bg-gray-100 text-gray-600'}`}
          >
            {p.budgetStatus}
          </span>
          <span className="text-gray-500">
            ${p.remaining.toLocaleString()} remaining
          </span>
        </div>
      </div>

      {/* Stats row */}
      <div className="mt-3 grid grid-cols-2 gap-2 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <User className="h-3.5 w-3.5 text-gray-400" />
          <span>{p.activeProviders} active providers</span>
        </div>
        {p.pendingInvoices > 0 ? (
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-orange-400" />
            <span className="text-orange-600">
              {p.pendingInvoices} pending ($
              {p.pendingAmount.toLocaleString()})
            </span>
          </div>
        ) : (
          <div className="flex items-center gap-1.5">
            <FileText className="h-3.5 w-3.5 text-gray-400" />
            <span>No pending invoices</span>
          </div>
        )}
        <div className="flex items-center gap-1.5">
          <Clock className="h-3.5 w-3.5 text-gray-400" />
          <span>Last: {p.lastActivity}</span>
        </div>
        {p.planReviewDue && (
          <div className="flex items-center gap-1.5">
            {reviewSoon ? (
              <AlertTriangle className="h-3.5 w-3.5 text-orange-500" />
            ) : (
              <Calendar className="h-3.5 w-3.5 text-gray-400" />
            )}
            <span className={reviewSoon ? 'font-medium text-orange-600' : ''}>
              Review: {p.planReviewDue}
            </span>
          </div>
        )}
      </div>

      {/* Onboarding status */}
      {isOnboarding && p.setupStatus && (
        <div className="mt-3 rounded-lg bg-blue-50 px-3 py-2 text-xs font-medium text-blue-700">
          Setup: {p.setupStatus}
        </div>
      )}

      {/* Action buttons */}
      <div className="mt-4 flex flex-wrap gap-2">
        {isOnboarding ? (
          <>
            <button className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors">
              Complete Onboarding
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <span className="inline-flex items-center gap-1">
                <UserPlus className="h-3.5 w-3.5" /> Add Providers
              </span>
            </button>
          </>
        ) : (
          <>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <span className="inline-flex items-center gap-1">
                <Eye className="h-3.5 w-3.5" /> View Full Profile
              </span>
            </button>
            <button
              onClick={() => onEditParticipant(p)}
              className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors"
            >
              <span className="inline-flex items-center gap-1">
                <Settings className="h-3.5 w-3.5" /> Edit Plan Details
              </span>
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <span className="inline-flex items-center gap-1">
                <User className="h-3.5 w-3.5" /> Manage Providers
              </span>
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <span className="inline-flex items-center gap-1">
                <MessageSquare className="h-3.5 w-3.5" /> Message
              </span>
            </button>
            <button className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-medium text-gray-700 hover:bg-gray-200 transition-colors">
              <span className="inline-flex items-center gap-1">
                <FileText className="h-3.5 w-3.5" /> View Invoices
              </span>
            </button>
          </>
        )}
      </div>
    </div>
  );
}
