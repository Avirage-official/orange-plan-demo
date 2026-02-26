export interface RoadmapPhase {
  title: string;
  timeline: string;
  features: { label: string; done: boolean }[];
}

export const roadmapPhases: RoadmapPhase[] = [
  {
    title: 'Phase 1 — MVP',
    timeline: 'Current Demo',
    features: [
      { label: 'Participant portal (budget visibility, invoices, messaging)', done: true },
      { label: 'Provider portal (invoice submission, payment tracking)', done: true },
      { label: 'Plan manager dashboard (caseload, processing queue)', done: true },
      { label: 'Basic messaging system', done: true },
      { label: 'Real-time budget tracking', done: true },
    ],
  },
  {
    title: 'Phase 2',
    timeline: 'Months 3–6',
    features: [
      { label: 'AI invoice processing with OCR (auto-extract invoice data)', done: false },
      { label: 'Advanced reporting & analytics', done: false },
      { label: 'Mobile apps (iOS/Android)', done: false },
      { label: 'Support coordinator access (read-only)', done: false },
      { label: 'Automated payment notifications', done: false },
    ],
  },
  {
    title: 'Phase 3',
    timeline: 'Months 6–12',
    features: [
      { label: 'Direct NDIA API integration (live budget updates from PRODA/PACE)', done: false },
      { label: 'Predictive analytics (budget forecasting, anomaly detection)', done: false },
      { label: 'Hyper-automation (AI processes 60%+ of invoices autonomously)', done: false },
      { label: 'Provider onboarding workflow', done: false },
      { label: 'Document management system', done: false },
    ],
  },
  {
    title: 'Phase 4',
    timeline: 'Year 2+',
    features: [
      { label: 'Participant goal tracking & progress monitoring', done: false },
      { label: 'Support worker scheduling integration', done: false },
      { label: 'Telehealth appointment integration', done: false },
      { label: 'Multi-language support', done: false },
      { label: 'Advanced compliance reporting', done: false },
      { label: 'Enterprise features (multi-location management)', done: false },
    ],
  },
];
