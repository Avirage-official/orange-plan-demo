export interface Benefit {
  title: string;
  description: string;
}

export const participantBenefits: Benefit[] = [
  {
    title: 'Transparency they deserve',
    description:
      'Know exactly where NDIS funding is allocated and spent',
  },
  {
    title: 'Control & autonomy',
    description:
      'Approve invoices, manage providers, communicate directly',
  },
  {
    title: 'Peace of mind',
    description:
      'Fast payments to providers mean continuity of care',
  },
  {
    title: 'Accessibility',
    description:
      'Designed for low digital literacy, multiple family members',
  },
];

export const providerBenefits: Benefit[] = [
  {
    title: 'Get paid on time, every time',
    description:
      '99.8% same-day or next-day payments',
  },
  {
    title: 'Streamlined invoicing',
    description:
      'Submit once, track progress, get payment confirmation',
  },
  {
    title: 'Better cash flow',
    description:
      'Predictable payment schedule helps business planning',
  },
  {
    title: 'Less admin burden',
    description:
      'Focus on delivering quality services, not chasing payments',
  },
];

export const managerBenefits: Benefit[] = [
  {
    title: 'Efficiency at scale',
    description:
      'Manage 40-100+ participants without drowning in paperwork',
  },
  {
    title: 'AI-powered validation',
    description:
      'Detect duplicates, pricing mismatches, budget anomalies automatically',
  },
  {
    title: 'Compliance confidence',
    description:
      'Built-in audit trails, NDIS-compliant processes',
  },
  {
    title: 'Team collaboration',
    description:
      'Real-time communication, workload distribution, performance tracking',
  },
];
