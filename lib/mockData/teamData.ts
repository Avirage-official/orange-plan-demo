export interface TeamMember {
  id: string;
  name: string;
  role: string;
  invoicesInQueue: number;
  status: 'Available' | 'Busy' | 'On Leave';
  caseload: number;
}

export const teamMembers: TeamMember[] = [
  {
    id: 'TM-001',
    name: 'Alex Chen',
    role: 'Senior Plan Manager',
    invoicesInQueue: 8,
    status: 'Available',
    caseload: 47,
  },
  {
    id: 'TM-002',
    name: 'Sarah Mitchell',
    role: 'Plan Manager',
    invoicesInQueue: 12,
    status: 'Available',
    caseload: 52,
  },
  {
    id: 'TM-003',
    name: 'James Wong',
    role: 'Plan Manager',
    invoicesInQueue: 5,
    status: 'Available',
    caseload: 44,
  },
  {
    id: 'TM-004',
    name: 'Maria Garcia',
    role: 'Plan Manager',
    invoicesInQueue: 6,
    status: 'Available',
    caseload: 48,
  },
  {
    id: 'TM-005',
    name: 'David Brown',
    role: 'Plan Manager',
    invoicesInQueue: 7,
    status: 'Available',
    caseload: 46,
  },
  {
    id: 'TM-006',
    name: 'Lisa Ahmed',
    role: 'Plan Manager',
    invoicesInQueue: 4,
    status: 'Available',
    caseload: 48,
  },
];

export const teamTotalPending = 42;
