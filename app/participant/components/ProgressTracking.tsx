export default function ProgressTracking() {
  return (
    <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
      <div className="border-b border-gray-200 px-6 py-4">
        <h2 className="text-lg font-semibold text-gray-800">Progress Tracking — Physiotherapy</h2>
      </div>
      <div className="space-y-5 px-6 py-5">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Appointment History</h3>
          <div className="mt-2 flex gap-4">
            {[
              { month: 'Jan', sessions: 8 },
              { month: 'Feb', sessions: 8 },
              { month: 'Mar', sessions: 8, planned: true },
            ].map((m) => (
              <div key={m.month} className="flex-1 rounded-lg bg-gray-50 p-3 text-center">
                <p className="text-xs text-gray-500">{m.month}</p>
                <p className="mt-1 text-lg font-bold text-gray-800">{m.sessions}</p>
                <p className="text-xs text-gray-400">{m.planned ? 'planned' : 'sessions'}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Therapist Note</h3>
          <p className="mt-1 rounded-lg bg-gray-50 p-3 text-sm text-gray-600 italic">
            &ldquo;James showing improved mobility. Recommend continue current program.&rdquo;
          </p>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-700">Goal</h3>
          <p className="mt-1 text-sm text-gray-600">Increase walking distance to 100m by June 2026</p>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Current: 75m</span>
              <span>Target: 100m</span>
            </div>
            <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-gray-200">
              <div className="h-full w-3/4 rounded-full bg-emerald-500" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
