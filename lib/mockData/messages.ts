export type MessageChannel =
  | 'participants'
  | 'providers'
  | 'internal'
  | 'notifications';

export interface Message {
  id: string;
  channel: MessageChannel;
  from: string;
  role?: string;
  time: string;
  subject?: string;
  preview: string;
  isUnread: boolean;
  replies?: number;
}

export const messages: Message[] = [
  {
    id: 'MSG-001',
    channel: 'participants',
    from: 'Jane Thompson',
    role: 'Parent of James Thompson',
    time: 'Today, 2:45 PM',
    subject: "James's physio budget",
    preview:
      "Hi Alex, just wanted to check on James's physio budget. Are we on track for the rest of the plan period?",
    isUnread: true,
  },
  {
    id: 'MSG-002',
    channel: 'participants',
    from: 'David Park',
    role: 'Father of Emma Park',
    time: 'Yesterday, 11:20 AM',
    subject: 'Plan review preparation',
    preview:
      "Hi Alex, Emma's plan review is coming up. What documents do we need to prepare?",
    isUnread: false,
  },
  {
    id: 'MSG-003',
    channel: 'providers',
    from: 'Sarah Mitchell',
    role: 'Active Kids Physio',
    time: 'Yesterday, 3:30 PM',
    subject: 'Billing query - James Thompson',
    preview:
      'Hi Alex, I have a question about the billing for James Thompson. Can you confirm the correct category for his latest sessions?',
    isUnread: true,
  },
  {
    id: 'MSG-004',
    channel: 'internal',
    from: 'Lisa Ahmed',
    role: 'Plan Manager',
    time: 'Today, 1:15 PM',
    subject: 'Liam Chen budget issue',
    preview:
      "Alex, flagging the Assistive Tech overspend for Liam Chen. We need to discuss options before approving any further invoices in this category.",
    isUnread: false,
    replies: 2,
  },
  {
    id: 'MSG-005',
    channel: 'notifications',
    from: 'System',
    time: 'Today, 9:00 AM',
    preview: '2 invoices approved by AI',
    isUnread: false,
  },
  {
    id: 'MSG-006',
    channel: 'notifications',
    from: 'System',
    time: 'Today, 8:45 AM',
    preview: '1 pricing query flagged',
    isUnread: false,
  },
  {
    id: 'MSG-007',
    channel: 'notifications',
    from: 'System',
    time: 'Today, 8:30 AM',
    preview: '1 duplicate invoice detected',
    isUnread: false,
  },
  {
    id: 'MSG-008',
    channel: 'notifications',
    from: 'System',
    time: 'Yesterday, 5:00 PM',
    preview: 'Payment batch processed: $4,550 paid to 12 providers',
    isUnread: false,
  },
  {
    id: 'MSG-009',
    channel: 'notifications',
    from: 'System',
    time: 'Yesterday, 10:00 AM',
    preview: 'Emma Park plan review due in 27 days',
    isUnread: false,
  },
];
