export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full px-8 py-12">
      {/* Full-width container for children */}
      <div className="max-w-screen-2xl mx-auto">{children}</div>
    </div>
  );
}
