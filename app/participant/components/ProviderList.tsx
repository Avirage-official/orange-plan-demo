'use client';

import { useState } from 'react';
import { providers } from '@/lib/mockData/providers';

export default function ProviderList() {
  const [messageProvider, setMessageProvider] = useState<string | null>(null);
  const [messageText, setMessageText] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const handleSend = () => {
    setMessageSent(true);
    setTimeout(() => {
      setMessageProvider(null);
      setMessageText('');
      setMessageSent(false);
    }, 2000);
  };

  return (
    <>
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-800">Active Providers</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {providers.map((prov) => (
            <div
              key={prov.id}
              className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-semibold text-gray-800">{prov.name}</h3>
                  <p className="text-sm text-gray-500">{prov.serviceType}</p>
                </div>
                {prov.pendingInvoices > 0 && (
                  <span className="rounded-full bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-700">
                    {prov.pendingInvoices} pending
                  </span>
                )}
              </div>

              <div className="mt-3 space-y-1 text-sm text-gray-600">
                <p>📞 {prov.contact}</p>
                <p>
                  💰 ${prov.billedThisMonth.toLocaleString()} billed this month ({prov.sessionsThisMonth}{' '}
                  {prov.sessionsThisMonth === 1 ? 'session' : 'sessions'})
                </p>
                {prov.nextAppointment && <p>📅 Next: {prov.nextAppointment}</p>}
              </div>

              <div className="mt-4 flex gap-2">
                <button
                  onClick={() => {
                    setMessageProvider(prov.name);
                    setMessageSent(false);
                    setMessageText('');
                  }}
                  className="rounded-lg bg-amber-50 px-3 py-1.5 text-xs font-medium text-amber-700 hover:bg-amber-100 transition-colors"
                >
                  Message Provider
                </button>
                <button className="rounded-lg bg-gray-50 px-3 py-1.5 text-xs font-medium text-gray-600 hover:bg-gray-100 transition-colors">
                  View Invoices
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {messageProvider && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setMessageProvider(null)}>
          <div
            className="mx-4 w-full max-w-md animate-[slideUp_0.25s_ease-out] rounded-xl border border-gray-200 bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {messageSent ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-xl text-emerald-600">✓</span>
                </div>
                <p className="font-medium text-gray-800">Message sent!</p>
                <p className="mt-1 text-sm text-gray-500">Your message to {messageProvider} has been delivered.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800">Message {messageProvider}</h3>
                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="mt-4 w-full rounded-lg border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  rows={4}
                />
                <div className="mt-4 flex gap-3">
                  <button
                    onClick={handleSend}
                    disabled={!messageText.trim()}
                    className="flex-1 rounded-lg bg-amber-500 py-2 text-sm font-medium text-white hover:bg-amber-600 disabled:opacity-50 transition-colors"
                  >
                    Send Message
                  </button>
                  <button
                    onClick={() => setMessageProvider(null)}
                    className="rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-600 hover:bg-gray-200 transition-colors"
                  >
                    Cancel
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
