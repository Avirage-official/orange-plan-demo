import DemoSidebar from '@/components/DemoSidebar';
import PortalHeader from '@/components/PortalHeader';
import BudgetOverview from './components/BudgetOverview';
import CategoryCards from './components/CategoryCards';
import InvoiceTable from './components/InvoiceTable';
import ProviderList from './components/ProviderList';
import MessagingHub from './components/MessagingHub';
import ParticipantStatsSection from './components/ParticipantStatsSection';
import ProgressTracking from './components/ProgressTracking';

export default function ParticipantPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PortalHeader title="James's Plan — Welcome, Thompson Family" />
      <div className="flex flex-1">
        <DemoSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">
          <div className="mx-auto max-w-6xl space-y-8 p-6 md:p-8">
            <BudgetOverview />
            <section>
              <h2 className="mb-4 text-lg font-semibold text-gray-800">Budget by Category</h2>
              <CategoryCards />
            </section>
            <InvoiceTable />
            <ProviderList />
            <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
              <MessagingHub />
              <ProgressTracking />
            </div>
            <ParticipantStatsSection />
          </div>
        </main>
      </div>
    </div>
  );
}
