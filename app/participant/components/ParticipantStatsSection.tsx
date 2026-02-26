export default function ParticipantStatsSection() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-center">
        <p className="text-2xl font-bold text-amber-500">98.2%</p>
        <p className="mt-1 text-sm text-gray-600">Invoices processed within 1 business day</p>
      </div>
      <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm text-center">
        <p className="text-2xl font-bold text-amber-500">99.8%</p>
        <p className="mt-1 text-sm text-gray-600">Payments made same-day</p>
      </div>
      <div className="rounded-xl border border-amber-200 bg-amber-50 p-5 shadow-sm">
        <p className="text-sm font-medium text-amber-700">⚠️ Budget Alert</p>
        <p className="mt-1 text-sm text-amber-600">
          Assistive Tech category at 60% — you have $1,200 remaining.
        </p>
      </div>
    </div>
  );
}
