import DemoSidebar from '@/components/DemoSidebar';
import PortalHeader from '@/components/PortalHeader';

export default function ManagerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <PortalHeader title="Alex Chen | Senior Plan Manager" />
      <div className="flex flex-1">
        <DemoSidebar />
        <main className="flex-1 overflow-y-auto bg-gray-50">{children}</main>
      </div>
    </div>
  );
}
