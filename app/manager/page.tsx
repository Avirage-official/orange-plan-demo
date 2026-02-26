import CaseloadOverview from './components/CaseloadOverview';
import InvoiceQueue from './components/InvoiceQueue';
import ParticipantManagement from './components/ParticipantManagement';
import AlertsPanel from './components/AlertsPanel';
import MessagingHub from './components/MessagingHub';
import AnalyticsDashboard from './components/AnalyticsDashboard';
import PerformanceCharts from './components/PerformanceCharts';
import ComplianceAuditLog from './components/ComplianceAuditLog';
import TeamWorkload from './components/TeamWorkload';

export default function ManagerPage() {
  return (
    <div className="mx-auto max-w-7xl space-y-8 p-6 md:p-8">
      <div className="animate-[slideUp_0.4s_ease-out_both]">
        <CaseloadOverview />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.1s_both]">
        <InvoiceQueue />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.2s_both]">
        <ParticipantManagement />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.3s_both]">
        <AlertsPanel />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.4s_both]">
        <MessagingHub />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.5s_both]">
        <AnalyticsDashboard />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.6s_both]">
        <PerformanceCharts />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.7s_both]">
        <TeamWorkload />
      </div>
      <div className="animate-[slideUp_0.4s_ease-out_0.8s_both]">
        <ComplianceAuditLog />
      </div>
    </div>
  );
}
