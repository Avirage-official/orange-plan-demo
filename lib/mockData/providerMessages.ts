export const providerMessages = [
  {
    id: 1,
    from: 'Orange Plan Management',
    subject: 'James Thompson - Appointment Confirmed',
    message:
      "Hi Sarah, we've approved the physio sessions for James Thompson on 27 Feb. His mum has pre-approved invoices. Looking forward to the session!",
    date: '26 Feb 2026, 10:30 AM',
    read: false,
    type: 'confirmation',
  },
  {
    id: 2,
    from: 'Orange Plan Management',
    subject: 'Payment Confirmed - Feb Invoices',
    message:
      '28 invoices totalling $4,550 have been paid to your account. Transaction ref: BULK-PAY-2026-087. Should appear in your bank by tomorrow.',
    date: '25 Feb 2026, 2:15 PM',
    read: true,
    type: 'payment',
  },
  {
    id: 3,
    from: 'Orange Plan Management',
    subject: 'Onboarding: Jackson Lee Documents',
    message:
      "We're waiting on the unsigned service agreement for Jackson Lee. Can you send it to billing@activekidsphysio.com.au? Once signed, we can activate his plan.",
    date: '24 Feb 2026, 4:00 PM',
    read: true,
    type: 'onboarding',
  },
];
