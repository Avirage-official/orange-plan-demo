'use client';

import { useState, useEffect } from 'react';
import { X, Send } from 'lucide-react';

interface ComposeMessageModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ComposeMessageModal({
  isOpen,
  onClose,
}: ComposeMessageModalProps) {
  const [visible, setVisible] = useState(false);
  const [sendTo, setSendTo] = useState('participant');
  const [msgType, setMsgType] = useState('general');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [toast, setToast] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      requestAnimationFrame(() => setVisible(true));
    } else {
      setVisible(false);
    }
  }, [isOpen]);

  const handleSend = () => {
    setToast('✓ Message sent successfully');
    setTimeout(() => {
      setToast(null);
      setSendTo('participant');
      setMsgType('general');
      setSubject('');
      setBody('');
      onClose();
    }, 1500);
  };

  if (!isOpen) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 transition-opacity duration-200 ${visible ? 'opacity-100' : 'opacity-0'}`}
    >
      <div className="absolute inset-0 bg-black/40" onClick={onClose} />

      <div className="relative z-10 w-full max-w-lg rounded-xl border border-gray-200 bg-white shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">
            Compose Message
          </h2>
          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-4 px-6 py-5">
          {/* Send to */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Send to
            </label>
            <select
              value={sendTo}
              onChange={(e) => setSendTo(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
            >
              <option value="participant">Participant</option>
              <option value="provider">Provider</option>
              <option value="team">Team member</option>
            </select>
          </div>

          {/* Type */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              value={msgType}
              onChange={(e) => setMsgType(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
            >
              <option value="general">General message</option>
              <option value="invoice">Invoice query</option>
              <option value="plan">Plan update</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>

          {/* Subject */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Subject
            </label>
            <input
              type="text"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder="Enter subject..."
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300"
            />
          </div>

          {/* Body */}
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              rows={4}
              value={body}
              onChange={(e) => setBody(e.target.value)}
              placeholder="Write your message..."
              className="mt-1 w-full rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-900 placeholder:text-gray-400 focus:border-amber-300 focus:outline-none focus:ring-1 focus:ring-amber-300 resize-none"
            />
          </div>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 border-t border-gray-200 px-6 py-4">
          <button
            onClick={onClose}
            className="rounded-lg border border-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSend}
            className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500 px-4 py-2 text-sm font-medium text-white hover:bg-amber-600 transition-colors"
          >
            <Send className="h-4 w-4" />
            Send
          </button>
        </div>
      </div>

      {toast && (
        <div className="fixed bottom-6 right-6 z-[60] animate-[slideUp_0.3s_ease-out] rounded-lg bg-gray-900 px-4 py-3 text-sm font-medium text-white shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
