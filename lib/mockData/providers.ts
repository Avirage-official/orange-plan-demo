export interface Provider {
  id: string;
  name: string;
  serviceType: string;
  contact: string;
  billedThisMonth: number;
  sessionsThisMonth: number;
  nextAppointment?: string;
  pendingInvoices: number;
}

export const providers: Provider[] = [
  {
    id: 'prov-1',
    name: 'Active Kids Physio',
    serviceType: 'Physiotherapy',
    contact: '03 9876 5432',
    billedThisMonth: 700,
    sessionsThisMonth: 2,
    nextAppointment: '27 Feb 2026, 2:00 PM',
    pendingInvoices: 1,
  },
  {
    id: 'prov-2',
    name: 'Communication Plus',
    serviceType: 'Speech Therapy',
    contact: '03 9123 4567',
    billedThisMonth: 280,
    sessionsThisMonth: 1,
    nextAppointment: '28 Feb 2026, 4:00 PM',
    pendingInvoices: 1,
  },
  {
    id: 'prov-3',
    name: 'Education Support Services',
    serviceType: 'School Support',
    contact: '03 9555 0100',
    billedThisMonth: 500,
    sessionsThisMonth: 5,
    nextAppointment: '3 Mar 2026, 8:30 AM',
    pendingInvoices: 0,
  },
  {
    id: 'prov-4',
    name: 'Transport Assist',
    serviceType: 'Transport',
    contact: '03 9444 2200',
    billedThisMonth: 120,
    sessionsThisMonth: 4,
    pendingInvoices: 0,
  },
];
