import MetricsCards from './components/MetricsCards';
import PaymentTracker from './components/PaymentTracker';
import InvoiceSubmissionForm from './components/InvoiceSubmissionForm';
import ClientManagement from './components/ClientManagement';
import MessagingHub from './components/MessagingHub';
import PaymentHistory from './components/PaymentHistory';


export default function ProviderPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      <div className="animate-[slideUp_0.4s_ease-out_both]">
        <MetricsCards />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.1s_both]">
        <PaymentTracker />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.2s_both]">
        <InvoiceSubmissionForm />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.3s_both]">
        <ClientManagement />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.4s_both]">
        <MessagingHub />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.5s_both]">
        <PaymentHistory />
      </div>
    </div>
  );
}
