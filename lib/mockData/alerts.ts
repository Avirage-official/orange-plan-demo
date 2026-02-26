export type AlertSeverity = 'red' | 'orange' | 'yellow';

export interface Alert {
  id: string;
  title: string;
  severity: AlertSeverity;
  icon: string;
  participant?: string;
  provider?: string;
  details: Record<string, string>;
  status: string;
  actions: string[];
}

export const alerts: Alert[] = [
  {
    id: 'ALT-001',
    title: 'Assistive Tech Over Budget',
    severity: 'red',
    icon: '🔴',
    participant: 'Liam Chen',
    details: {
      category: 'Assistive Technology',
      allocated: '$3,000',
      spent: '$3,200 (+$200 over)',
    },
    status: 'Exceeded - Requires approval',
    actions: ['Review budget', 'Request plan variation', 'Contact participant'],
  },
  {
    id: 'ALT-002',
    title: 'Duplicate Detected',
    severity: 'red',
    icon: '🔴',
    participant: 'Noah Williams',
    provider: 'Active Kids Physio',
    details: {
      amount: '$350',
      invoice: 'INV-2026-0404',
    },
    status: 'Flagged in processing queue',
    actions: ['Review invoice', 'Reject duplicate', 'Contact provider'],
  },
  {
    id: 'ALT-003',
    title: 'Pricing Query',
    severity: 'orange',
    icon: '🟠',
    participant: 'Liam Chen',
    provider: 'Physio Plus',
    details: {
      charged: '$320',
      guideRate: '$300',
      difference: '+$20',
    },
    status: 'Pending your approval',
    actions: ['Approve with note', 'Query provider', 'Reject'],
  },
  {
    id: 'ALT-004',
    title: 'Plan Reviews Due Soon',
    severity: 'orange',
    icon: '🟠',
    details: {
      'Emma Park': '27 days',
      'Michael Foster': '42 days',
    },
    status: 'Start preparation 30 days before',
    actions: ['Start review prep', 'Schedule meeting', 'Gather reports'],
  },
  {
    id: 'ALT-005',
    title: 'New Participant Setup',
    severity: 'yellow',
    icon: '🟡',
    participant: 'Zara Khan',
    details: {
      onboardingDuration: '2 days',
      nextStep: 'Provider assignment',
    },
    status: 'Awaiting provider assignment',
    actions: ['Assign providers', 'Send welcome pack', 'Schedule intro call'],
  },
  {
    id: 'ALT-006',
    title: 'Provider Documentation Expired',
    severity: 'yellow',
    icon: '🟡',
    provider: 'Active Kids Physio',
    details: {
      document: 'Insurance',
      expires: '15 Mar 2026',
      daysRemaining: '19 days',
    },
    status: 'Send renewal reminder',
    actions: ['Send reminder email', 'Flag provider', 'Request documentation'],
  },
];
