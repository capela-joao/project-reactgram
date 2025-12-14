import Sidebar from '@/components/ui/sidebar';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex bg-gray-950">
      <Sidebar />
      {children}
    </div>
  );
}
