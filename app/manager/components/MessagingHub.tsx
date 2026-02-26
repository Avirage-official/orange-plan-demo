'use client';

import { useState } from 'react';
import { Plus, Reply, ExternalLink, MessageCircle } from 'lucide-react';
import { messages, type MessageChannel } from '@/lib/mockData/messages';
import ComposeMessageModal from './ComposeMessageModal';

const tabs: { label: string; value: MessageChannel }[] = [
  { label: 'Participants', value: 'participants' },
  { label: 'Providers', value: 'providers' },
  { label: 'Team', value: 'internal' },
  { label: 'Notifications', value: 'notifications' },
];

function unreadCount(channel: MessageChannel): number {
  return messages.filter((m) => m.channel === channel && m.isUnread).length;
}

export default function MessagingHub() {
  const [activeTab, setActiveTab] = useState<MessageChannel>('participants');
  const [composeOpen, setComposeOpen] = useState(false);

  const channelMessages = messages.filter((m) => m.channel === activeTab);

  return (
    <>
      <div className="rounded-xl border border-gray-200 bg-white shadow-sm">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">
              Messages &amp; Notifications
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {messages.filter((m) => m.isUnread).length} unread message
              {messages.filter((m) => m.isUnread).length !== 1 ? 's' : ''}
            </p>
          </div>
          <button
            onClick={() => setComposeOpen(true)}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            <Plus className="h-4 w-4" />
            Compose Message
          </button>
        </div>

        {/* Tabs */}
        <div className="flex border-b border-gray-200 px-6">
          {tabs.map((tab) => {
            const count = unreadCount(tab.value);
            return (
              <button
                key={tab.value}
                onClick={() => setActiveTab(tab.value)}
                className={`relative px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.value
                    ? 'text-amber-600 after:absolute after:inset-x-0 after:bottom-0 after:h-0.5 after:bg-amber-500'
                    : 'text-gray-500 hover:text-gray-700'
                }`}
              >
                {tab.label}
                {count > 0 && (
                  <span className="ml-1.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                    {count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Message list */}
        <div className="divide-y divide-gray-100">
          {channelMessages.length > 0 ? (
            channelMessages.map((msg) => (
              <div
                key={msg.id}
                className={`flex gap-3 px-6 py-4 ${msg.isUnread ? 'bg-amber-50/40' : ''}`}
              >
                {/* Unread dot */}
                <div className="mt-1.5 flex w-2 shrink-0 items-start">
                  {msg.isUnread && (
                    <span className="h-2 w-2 rounded-full bg-amber-500" />
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span
                      className={`text-sm ${msg.isUnread ? 'font-semibold text-gray-900' : 'font-medium text-gray-700'}`}
                    >
                      {msg.from}
                    </span>
                    {msg.role && (
                      <span className="text-xs text-gray-400">
                        {msg.role}
                      </span>
                    )}
                    <span className="ml-auto shrink-0 text-xs text-gray-400">
                      {msg.time}
                    </span>
                  </div>

                  {msg.subject && (
                    <p className="mt-0.5 text-sm font-medium text-gray-800">
                      {msg.subject}
                    </p>
                  )}

                  <p className="mt-0.5 text-sm text-gray-500 line-clamp-2">
                    {msg.preview}
                  </p>

                  <div className="mt-2 flex items-center gap-3">
                    {msg.replies != null && msg.replies > 0 && (
                      <span className="flex items-center gap-1 text-xs text-gray-400">
                        <MessageCircle className="h-3 w-3" />
                        {msg.replies} repl{msg.replies === 1 ? 'y' : 'ies'}
                      </span>
                    )}
                    {msg.channel !== 'notifications' && (
                      <>
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-amber-600 hover:text-amber-700 transition-colors">
                          <Reply className="h-3 w-3" />
                          Reply
                        </button>
                        <button className="inline-flex items-center gap-1 text-xs font-medium text-gray-500 hover:text-gray-700 transition-colors">
                          <ExternalLink className="h-3 w-3" />
                          View thread
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-sm text-gray-500">
              No messages in this channel.
            </div>
          )}
        </div>
      </div>

      <ComposeMessageModal
        isOpen={composeOpen}
        onClose={() => setComposeOpen(false)}
      />
    </>
  );
}
