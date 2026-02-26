'use client';

import { useState } from 'react';
import { Mail, Send, Plus, X, Check } from 'lucide-react';
import { providerMessages } from '@/lib/mockData/providerMessages';

const typeBadge: Record<string, string> = {
  confirmation: 'bg-blue-50 text-blue-700',
  payment: 'bg-emerald-50 text-emerald-700',
  onboarding: 'bg-orange-50 text-orange-700',
};

export default function MessagingHub() {
  const [showCompose, setShowCompose] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [readIds, setReadIds] = useState<number[]>([]);
  const [composeTo, setComposeTo] = useState('Orange Plan Management');
  const [composeType, setComposeType] = useState('General inquiry');
  const [composeSubject, setComposeSubject] = useState('');
  const [composeBody, setComposeBody] = useState('');

  const handleSend = () => {
    setShowCompose(false);
    setSuccessMessage(`Message sent to ${composeTo}`);
    setComposeTo('Orange Plan Management');
    setComposeType('General inquiry');
    setComposeSubject('');
    setComposeBody('');
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const markAsRead = (id: number) => {
    setReadIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  return (
    <div>
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-gray-800">
          Messages &amp; Alerts
        </h2>
        <button
          onClick={() => setShowCompose(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-3 py-2 text-sm font-medium text-white hover:bg-orange-600"
        >
          <Plus className="h-4 w-4" />
          New Message
        </button>
      </div>

      {/* Success Banner */}
      {successMessage && (
        <div className="mb-4 flex items-center gap-2 rounded-lg bg-emerald-50 border border-emerald-200 px-4 py-3 text-sm text-emerald-700">
          <Check className="h-4 w-4" />
          {successMessage}
        </div>
      )}

      {/* Message List */}
      <div className="space-y-3">
        {providerMessages.map((msg) => {
          const isUnread = !msg.read && !readIds.includes(msg.id);
          const isExpanded = expandedId === msg.id;

          return (
            <div
              key={msg.id}
              className={`rounded-lg border bg-white p-4 shadow-sm ${
                isUnread ? 'border-l-4 border-blue-500 bg-blue-50/30' : ''
              }`}
            >
              <div className="flex items-start justify-between">
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 text-sm text-gray-500">
                    <Mail className="h-4 w-4" />
                    <span className="font-medium text-gray-700">
                      {msg.from}
                    </span>
                    <span>·</span>
                    <span>{msg.date}</span>
                  </div>
                  <p className="mt-1 font-medium text-gray-900">
                    {msg.subject}
                  </p>
                  <p
                    className={`mt-1 text-sm text-gray-600 ${
                      isExpanded ? '' : 'line-clamp-2'
                    }`}
                  >
                    {msg.message}
                  </p>
                  {!isExpanded && (
                    <button
                      onClick={() => setExpandedId(msg.id)}
                      className="mt-1 text-xs text-blue-600 hover:underline"
                    >
                      Show more
                    </button>
                  )}
                  {isExpanded && (
                    <button
                      onClick={() => setExpandedId(null)}
                      className="mt-1 text-xs text-blue-600 hover:underline"
                    >
                      Show less
                    </button>
                  )}
                </div>
                <span
                  className={`ml-3 inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${
                    typeBadge[msg.type] ?? 'bg-gray-50 text-gray-700'
                  }`}
                >
                  {msg.type}
                </span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <button className="text-xs font-medium text-orange-600 hover:text-orange-700">
                  Reply
                </button>
                {isUnread && (
                  <button
                    onClick={() => markAsRead(msg.id)}
                    className="text-xs font-medium text-blue-600 hover:text-blue-700"
                  >
                    Mark as read
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Compose Modal */}
      {showCompose && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-lg rounded-xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-semibold text-gray-900">
                New Message
              </h3>
              <button
                onClick={() => setShowCompose(false)}
                className="rounded-lg p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  To
                </label>
                <select
                  value={composeTo}
                  onChange={(e) => setComposeTo(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option>Orange Plan Management</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message type
                </label>
                <select
                  value={composeType}
                  onChange={(e) => setComposeType(e.target.value)}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                >
                  <option>General inquiry</option>
                  <option>Urgent payment follow-up</option>
                  <option>Onboarding help</option>
                  <option>Other</option>
                </select>
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Subject
                </label>
                <input
                  type="text"
                  value={composeSubject}
                  onChange={(e) => setComposeSubject(e.target.value)}
                  placeholder="Enter subject"
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <div>
                <label className="mb-1 block text-sm font-medium text-gray-700">
                  Message
                </label>
                <textarea
                  rows={4}
                  value={composeBody}
                  onChange={(e) => setComposeBody(e.target.value)}
                  placeholder="Write your message..."
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-orange-500 focus:outline-none focus:ring-1 focus:ring-orange-500"
                />
              </div>
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <button
                onClick={() => setShowCompose(false)}
                className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSend}
                className="inline-flex items-center gap-1.5 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
              >
                <Send className="h-4 w-4" />
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
