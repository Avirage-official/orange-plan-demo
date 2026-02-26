'use client';

import { useState } from 'react';
import { categories, type BudgetCategory } from '@/lib/mockData/categories';

function CategoryDetailModal({ category, onClose }: { category: BudgetCategory; onClose: () => void }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={onClose}>
      <div
        className="mx-4 w-full max-w-md animate-[slideUp_0.25s_ease-out] rounded-xl border border-gray-200 bg-white p-6 shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">
            <span className="mr-2">{category.icon}</span>
            {category.name}
          </h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600 text-xl leading-none">
            ✕
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Allocation</span>
            <span className="font-medium">${category.allocation.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Spent</span>
            <span className="font-medium text-amber-500">${category.spent.toLocaleString()}</span>
          </div>
          <div className="flex justify-between">
            <span>Remaining</span>
            <span className="font-medium text-emerald-500">${category.remaining.toLocaleString()}</span>
          </div>

          <div className="h-3 w-full overflow-hidden rounded-full bg-gray-200">
            <div
              className="h-full rounded-full bg-amber-500"
              style={{ width: `${category.percentSpent}%` }}
            />
          </div>
          <p className="text-center text-xs text-gray-500">{category.percentSpent}% of allocation used</p>

          {category.provider && (
            <div className="flex justify-between">
              <span>Provider</span>
              <span className="font-medium">{category.provider}</span>
            </div>
          )}
          {category.frequency && (
            <div className="flex justify-between">
              <span>Frequency</span>
              <span>{category.frequency}</span>
            </div>
          )}
          {category.items && (
            <div className="flex justify-between">
              <span>Items</span>
              <span>{category.items}</span>
            </div>
          )}
          {category.lastPurchase && (
            <div className="flex justify-between">
              <span>Last Purchase</span>
              <span>{category.lastPurchase}</span>
            </div>
          )}
          {category.purpose && (
            <div className="flex justify-between">
              <span>Purpose</span>
              <span>{category.purpose}</span>
            </div>
          )}
          {category.activities && (
            <div className="flex justify-between">
              <span>Activities</span>
              <span>{category.activities}</span>
            </div>
          )}
          {category.usage && (
            <div className="flex justify-between">
              <span>Usage</span>
              <span>{category.usage}</span>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="mt-5 w-full rounded-lg bg-amber-500 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default function CategoryCards() {
  const [selected, setSelected] = useState<BudgetCategory | null>(null);

  return (
    <>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setSelected(cat)}
            className="group w-full rounded-xl border border-gray-200 bg-white p-5 text-left shadow-sm transition-all hover:scale-[1.02] hover:shadow-md"
          >
            <div className="flex items-center gap-3">
              <span className="text-2xl">{cat.icon}</span>
              <div>
                <h3 className="text-sm font-semibold text-gray-800">{cat.name}</h3>
                <span
                  className={`mt-0.5 inline-block rounded-full px-2 py-0.5 text-xs font-medium ${
                    cat.status === 'On Track'
                      ? 'bg-amber-100 text-amber-700'
                      : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {cat.status}
                </span>
              </div>
            </div>

            <div className="mt-4 space-y-1 text-sm">
              <div className="flex justify-between text-gray-500">
                <span>Spent</span>
                <span className="font-medium text-gray-800">
                  ${cat.spent.toLocaleString()} / ${cat.allocation.toLocaleString()}
                </span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-full rounded-full transition-all ${
                    cat.status === 'Monitor' ? 'bg-amber-500' : 'bg-amber-400'
                  }`}
                  style={{ width: `${cat.percentSpent}%` }}
                />
              </div>
              <p className="text-xs text-gray-500">
                ${cat.remaining.toLocaleString()} remaining
              </p>
            </div>

            {cat.provider && (
              <p className="mt-2 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                {cat.provider} · {cat.frequency}
              </p>
            )}
            {cat.items && (
              <p className="mt-2 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                {cat.items}
              </p>
            )}
            {cat.purpose && (
              <p className="mt-2 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                {cat.purpose} · {cat.usage}
              </p>
            )}
            {cat.activities && !cat.purpose && (
              <p className="mt-2 text-xs text-gray-400 opacity-0 transition-opacity group-hover:opacity-100">
                {cat.activities} · {cat.usage}
              </p>
            )}
          </button>
        ))}
      </div>

      {selected && <CategoryDetailModal category={selected} onClose={() => setSelected(null)} />}
    </>
  );
}
