import type { Metadata } from 'next';
import './globals.css';
import { ReduxProvider } from '@/providers/redux-provider';

export const metadata: Metadata = {
  title: 'ReactGram',
  description: 'The awesome copy of Instagram.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="font-roboto">
      <ReduxProvider>
        <body className={`bg-gray-800`}>{children}</body>
      </ReduxProvider>
    </html>
  );
}
