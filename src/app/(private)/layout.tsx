'use client';

import { ReduxProvider } from '@/providers/redux-provider';

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
