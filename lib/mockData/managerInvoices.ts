export type ManagerInvoiceStatus =
  | 'Validated'
  | 'Needs Review'
  | 'Duplicate Detected'
  | 'Budget Alert';

export type InvoicePriority = 'Normal' | 'HIGH' | 'URGENT';

export interface ManagerInvoice {
  id: string;
  status: ManagerInvoiceStatus;
  statusIcon: string;
  participant: string;
  provider: string;
  serviceType: string;
  amount: number;
  submitted: string;
  priority: InvoicePriority;
  aiAnalysis: string;
  reason?: string;
  noteField?: string;
}

export const managerInvoices: ManagerInvoice[] = [
  {
    id: 'INV-2026-0401',
    status: 'Validated',
    statusIcon: '✓',
    participant: 'James Thompson',
    provider: 'Active Kids Physio',
    serviceType: 'Physio (2 sessions)',
    amount: 350,
    submitted: '24 Feb 2026',
    priority: 'Normal',
    aiAnalysis: '✓ Matches NDIS price guide ($175/session), no issues',
  },
  {
    id: 'INV-2026-0402',
    status: 'Validated',
    statusIcon: '✓',
    participant: 'Emma Park',
    provider: 'Communication Plus',
    serviceType: 'Speech Therapy (60 min)',
    amount: 280,
    submitted: '23 Feb 2026',
    priority: 'Normal',
    aiAnalysis: '✓ Valid. Within budget. Participant approved.',
  },
  {
    id: 'INV-2026-0403',
    status: 'Needs Review',
    statusIcon: '⚠',
    participant: 'Liam Chen',
    provider: 'Physio Plus',
    serviceType: 'Initial Assessment',
    amount: 320,
    submitted: '22 Feb 2026',
    priority: 'HIGH',
    aiAnalysis:
      '⚠ Amount ($320) exceeds NDIS guide ($300). Query: Is this justified?',
    reason: 'Pricing mismatch',
    noteField:
      "Approve with comment: 'Please confirm assessment scope justifies higher rate'",
  },
  {
    id: 'INV-2026-0404',
    status: 'Duplicate Detected',
    statusIcon: '🚨',
    participant: 'Noah Williams',
    provider: 'Active Kids Physio',
    serviceType: 'Physiotherapy',
    amount: 350,
    submitted: '20 Feb 2026',
    priority: 'URGENT',
    aiAnalysis:
      '🚨 DUPLICATE: Matches invoice from 20 Feb, 12:45 PM (same participant, provider, amount, date)',
  },
  {
    id: 'INV-2026-0405',
    status: 'Budget Alert',
    statusIcon: '⚠',
    participant: 'Sophie Rodriguez',
    provider: 'Assistive Tech Solutions',
    serviceType: 'Laptop software license',
    amount: 1200,
    submitted: '19 Feb 2026',
    priority: 'HIGH',
    aiAnalysis:
      '⚠ Assistive Tech category: $1,200 remaining. This purchase uses 100% remaining budget.',
  },
  {
    id: 'INV-2026-0406',
    status: 'Validated',
    statusIcon: '✓',
    participant: 'Charlotte Adams',
    provider: 'Education Support Services',
    serviceType: 'School Support (5 days)',
    amount: 500,
    submitted: '18 Feb 2026',
    priority: 'Normal',
    aiAnalysis: '✓ Valid. Within school support budget.',
  },
  {
    id: 'INV-2026-0407',
    status: 'Validated',
    statusIcon: '✓',
    participant: 'Oliver Taylor',
    provider: 'Active Kids Physio',
    serviceType: 'Physiotherapy',
    amount: 175,
    submitted: '17 Feb 2026',
    priority: 'Normal',
    aiAnalysis: '✓ Single session. Within budget.',
  },
  {
    id: 'INV-2026-0408',
    status: 'Validated',
    statusIcon: '✓',
    participant: 'Amelia Johnson',
    provider: 'Communication Plus',
    serviceType: 'Speech Therapy (30 min)',
    amount: 150,
    submitted: '16 Feb 2026',
    priority: 'Normal',
    aiAnalysis: '✓ Valid. Standard rate applied.',
  },
];
