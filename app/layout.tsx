import './globals.css';
import type { Metadata, Viewport } from 'next';

export const metadata: Metadata = {
  title: 'Orange Plan Management',
  description: 'NDIS plan management for participants, providers, and our team.'
};

export const viewport: Viewport = {
  maximumScale: 1
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className="bg-white dark:bg-gray-950 text-black dark:text-white"
    >
      <body className="min-h-[100dvh] bg-gray-50">
        {children}
      </body>
    </html>
  );
}
