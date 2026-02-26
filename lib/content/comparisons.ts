export interface ComparisonRow {
  feature: string;
  current: string;
  orange: string;
}

export const comparisonRows: ComparisonRow[] = [
  {
    feature: 'Participant Portal',
    current: 'Generic, no Orange branding',
    orange: 'Custom branded, feature-rich',
  },
  {
    feature: 'Real-time Budget Visibility',
    current: 'Basic',
    orange: 'Real-time by category + charts',
  },
  {
    feature: 'Invoice Management',
    current: 'Standard approval process',
    orange: 'AI-validated, flagged anomalies',
  },
  {
    feature: 'Payment Tracking',
    current: 'Manual updates',
    orange: 'Real-time pipeline visibility',
  },
  {
    feature: 'Provider Communication',
    current: 'Limited',
    orange: 'Direct messaging built-in',
  },
  {
    feature: 'Plan Manager Tools',
    current: 'Not available (external software)',
    orange: 'Complete caseload dashboard',
  },
  {
    feature: 'Alerts & Compliance',
    current: 'None',
    orange: 'AI-powered alerts + audit trail',
  },
  {
    feature: 'Customization',
    current: 'None (third-party)',
    orange: 'Fully customizable to Orange brand',
  },
  {
    feature: 'Performance Metrics',
    current: 'Not available',
    orange: 'Full analytics + KPIs',
  },
  {
    feature: 'Mobile Experience',
    current: 'Basic',
    orange: 'Mobile-first responsive design',
  },
];
