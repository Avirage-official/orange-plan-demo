import Link from 'next/link';

interface PortalHeaderProps {
  title: string;
}

export default function PortalHeader({ title }: PortalHeaderProps) {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="px-6 py-4 flex items-center">
        <Link href="/" className="text-xl font-bold text-orange-500 w-64">
          Orange Plan Management
        </Link>
        <div className="flex-1 text-center">
          <span className="text-lg font-semibold text-gray-800">{title}</span>
        </div>
        <div className="w-64" />
      </div>
    </header>
  );
}
