import BudgetOverview from './components/BudgetOverview';
import CategoryCards from './components/CategoryCards';
import InvoiceTable from './components/InvoiceTable';
import ProviderList from './components/ProviderList';
import MessagingHub from './components/MessagingHub';
import ParticipantStatsSection from './components/ParticipantStatsSection';
import ProgressTracking from './components/ProgressTracking';

export default function ParticipantPage() {
  return (
    <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
      <div className="animate-[slideUp_0.4s_ease-out_both]">
        <BudgetOverview />
      </div>
      <section className="animate-[slideUp_0.4s_ease-out_0.1s_both]">
        <h2 className="mb-4 text-lg font-semibold text-gray-800">Budget by Category</h2>
        <CategoryCards />
      </section>
      <div className="animate-[slideUp_0.4s_ease-out_0.2s_both]">
        <InvoiceTable />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.3s_both]">
        <ProviderList />
      </div>
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 animate-[slideUp_0.4s_ease-out_0.4s_both]">
        <MessagingHub />
        <ProgressTracking />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.5s_both]">
        <ParticipantStatsSection />
      </div>
    </div>
  );
}
