export interface BudgetCategory {
  id: string;
  name: string;
  allocation: number;
  spent: number;
  remaining: number;
  percentSpent: number;
  status: 'On Track' | 'Monitor';
  provider?: string;
  frequency?: string;
  items?: string;
  lastPurchase?: string;
  purpose?: string;
  activities?: string;
  usage?: string;
  icon: string;
}

export const categories: BudgetCategory[] = [
  {
    id: 'physio',
    name: 'Physiotherapy',
    allocation: 8000,
    spent: 3500,
    remaining: 4500,
    percentSpent: 44,
    status: 'On Track',
    provider: 'Active Kids Physio',
    frequency: '2x per week',
    icon: '🏃',
  },
  {
    id: 'speech',
    name: 'Speech Therapy',
    allocation: 6000,
    spent: 1800,
    remaining: 4200,
    percentSpent: 30,
    status: 'On Track',
    provider: 'Communication Plus',
    frequency: '1x per week',
    icon: '🗣️',
  },
  {
    id: 'school',
    name: 'School Support',
    allocation: 7500,
    spent: 2200,
    remaining: 5300,
    percentSpent: 29,
    status: 'On Track',
    provider: 'Education Support Services',
    frequency: 'School days',
    icon: '🎓',
  },
  {
    id: 'tech',
    name: 'Assistive Technology',
    allocation: 3000,
    spent: 1800,
    remaining: 1200,
    percentSpent: 60,
    status: 'Monitor',
    items: 'Laptop software, eye-tracking device',
    lastPurchase: '2 weeks ago',
    icon: '💻',
  },
  {
    id: 'transport',
    name: 'Transport',
    allocation: 2000,
    spent: 400,
    remaining: 1600,
    percentSpent: 20,
    status: 'On Track',
    purpose: 'Accessible taxi to appointments',
    usage: 'As needed',
    icon: '🚗',
  },
  {
    id: 'community',
    name: 'Community Access',
    allocation: 1000,
    spent: 150,
    remaining: 850,
    percentSpent: 15,
    status: 'On Track',
    activities: 'Sports, clubs, social groups',
    usage: 'Monthly',
    icon: '🤝',
  },
];
