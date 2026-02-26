'use client';

import { useState } from 'react';

const recentMessages = [
  {
    id: 'msg-1',
    from: 'Plan Manager',
    text: "Hi Thompson family, James's Feb invoices all approved. Next check-in: 5 March.",
    time: '2 hours ago',
  },
  {
    id: 'msg-2',
    from: 'Plan Manager',
    text: 'The Assistive Tech invoice for the eye-tracking software has been processed. Payment sent today.',
    time: '1 day ago',
  },
  {
    id: 'msg-3',
    from: 'Active Kids Physio',
    text: "James did really well in today's session. We'll continue the current program.",
    time: '3 days ago',
  },
];

export default function MessagingHub() {
  const [showCompose, setShowCompose] = useState(false);
  const [recipient, setRecipient] = useState('Plan Manager');
  const [messageText, setMessageText] = useState('');
  const [sent, setSent] = useState(false);

  const handleSend = () => {
    setSent(true);
    setTimeout(() => {
      setShowCompose(false);
      setMessageText('');
      setSent(false);
    }, 2000);
  };

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-800">Messages</h2>
          <button
            onClick={() => {
              setShowCompose(true);
              setSent(false);
              setMessageText('');
            }}
            className="rounded-lg bg-amber-500 px-3 py-1.5 text-xs font-medium text-white hover:bg-amber-600 transition-colors"
          >
            Send Message
          </button>
        </div>

        <div className="divide-y divide-gray-100">
          {recentMessages.map((msg) => (
            <div key={msg.id} className="px-6 py-4">
              <div className="flex items-start justify-between">
                <p className="text-sm font-medium text-gray-800">{msg.from}</p>
                <span className="text-xs text-gray-400">{msg.time}</span>
              </div>
              <p className="mt-1 text-sm text-gray-600">{msg.text}</p>
            </div>
          ))}
        </div>

        <div className="border-t border-gray-200 px-6 py-3">
          <button className="text-sm font-medium text-amber-600 hover:text-amber-700 hover:underline">
            View All Messages
          </button>
        </div>
      </div>

      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40" onClick={() => setShowCompose(false)}>
          <div
            className="mx-4 w-full max-w-md animate-[slideUp_0.25s_ease-out] rounded-xl border border-gray-200 bg-white p-6 shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            {sent ? (
              <div className="text-center py-4">
                <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100">
                  <span className="text-xl text-emerald-600">✓</span>
                </div>
                <p className="font-medium text-gray-800">Message sent!</p>
                <p className="mt-1 text-sm text-gray-500">Your message has been delivered to {recipient}.</p>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-semibold text-gray-800">New Message</h3>

                <div className="mt-4">
                  <label className="text-sm font-medium text-gray-700">Send to:</label>
                  <select
                    value={recipient}
                    onChange={(e) => setRecipient(e.target.value)}
                    className="mt-1 w-full rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-800 focus:outline-none focus:ring-2 focus:ring-amber-500"
                  >
                    <option>Plan Manager</option>
                    <option>Active Kids Physio</option>
                    <option>Communication Plus</option>
                    <option>Education Support Services</option>
                    <option>Transport Assist</option>
                  </select>
                </div>

                <textarea
                  value={messageText}
                  onChange={(e) => setMessageText(e.target.value)}
                  placeholder="Type your message..."
                  className="mt-3 w-full rounded-lg border border-gray-200 p-3 text-sm text-gray-800 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
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
                    onClick={() => setShowCompose(false)}
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
