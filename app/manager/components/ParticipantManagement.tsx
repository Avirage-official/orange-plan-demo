'use client';

import { useState } from 'react';
import { Search } from 'lucide-react';
import { managerParticipants } from '@/lib/mockData/managerParticipants';
import type { ManagerParticipant } from '@/lib/mockData/managerParticipants';
import ParticipantCard from './ParticipantCard';
import EditParticipantModal from './EditParticipantModal';

type FilterValue = 'all' | 'active' | 'review' | 'onboarding';

const filterOptions: { label: string; value: FilterValue }[] = [
  { label: 'All participants', value: 'all' },
  { label: 'Active only', value: 'active' },
  { label: 'Plan reviews due', value: 'review' },
  { label: 'New onboarding', value: 'onboarding' },
];

const PAGE_SIZE = 10;

export default function ParticipantManagement() {
  const [filter, setFilter] = useState<FilterValue>('all');
  const [search, setSearch] = useState('');
  const [showAll, setShowAll] = useState(false);
  const [editParticipant, setEditParticipant] =
    useState<ManagerParticipant | null>(null);

  const filtered = managerParticipants.filter((p) => {
    const matchesSearch =
      search === '' ||
      p.name.toLowerCase().includes(search.toLowerCase()) ||
      p.id.toLowerCase().includes(search.toLowerCase());

    let matchesFilter = true;
    if (filter === 'active') matchesFilter = p.planStatus === 'Active';
    if (filter === 'review') matchesFilter = p.planStatus === 'Plan Review Due';
    if (filter === 'onboarding')
      matchesFilter = p.planStatus === 'New Onboarding';

    return matchesSearch && matchesFilter;
  });

  const displayed = showAll ? filtered : filtered.slice(0, PAGE_SIZE);
  const hasMore = filtered.length > PAGE_SIZE && !showAll;

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Your Participants ({managerParticipants.length})
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            {filtered.length} participant{filtered.length !== 1 ? 's' : ''}{' '}
            shown
          </p>
        </div>

        {/* Filter bar */}
        <div className="flex flex-wrap items-center gap-3 border-b border-gray-200 px-6 py-3">
          <div className="flex gap-1">
            {filterOptions.map((opt) => (
              <button
                key={opt.value}
                onClick={() => {
                  setFilter(opt.value);
                  setShowAll(false);
                }}
                className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                  filter === opt.value
                    ? 'bg-amber-500 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
          <div className="relative ml-auto">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search by name..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setShowAll(false);
              }}
              className="w-64 rounded-lg border border-gray-200 bg-white py-1.5 pl-9 pr-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
            />
          </div>
        </div>

        {/* Grid */}
        <div className="p-6">
          {displayed.length > 0 ? (
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
              {displayed.map((p) => (
                <ParticipantCard
                  key={p.id}
                  participant={p}
                  onEditParticipant={setEditParticipant}
                />
              ))}
            </div>
          ) : (
            <div className="py-12 text-center text-sm text-gray-500">
              No participants match your filters.
            </div>
          )}

          {hasMore && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setShowAll(true)}
                className="rounded-lg bg-gray-100 px-6 py-2 text-sm font-medium text-gray-700 hover:bg-gray-200 transition-colors"
              >
                Show more ({filtered.length - PAGE_SIZE} remaining)
              </button>
            </div>
          )}
        </div>
      </div>

      <EditParticipantModal
        participant={editParticipant}
        isOpen={editParticipant !== null}
        onClose={() => setEditParticipant(null)}
      />
    </>
  );
}
