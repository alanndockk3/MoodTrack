export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full h-screen overflow-hidden px-8 py-4 no-scrollbar">
      {/* Centered container with responsive max-width */}
      <div className="max-w-screen-2xl mx-auto flex flex-col h-full overflow-hidden">
        {children}
      </div>
    </div>
  );
}
