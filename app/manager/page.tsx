import DemoSidebar from '@/components/DemoSidebar';
import PortalHeader from '@/components/PortalHeader';

export default function ManagerPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <PortalHeader title="Plan Manager Portal" />
      <div className="flex flex-1">
        <DemoSidebar />
        <main className="flex-1 p-8 bg-gray-50" />
      </div>
    </div>
  );
}
