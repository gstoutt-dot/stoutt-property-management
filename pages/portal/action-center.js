export default function ActionCenter() {
  return (
    <main className="min-h-screen bg-slate-950 text-white p-10">
      <h1 className="text-4xl font-bold mb-6">Action Center</h1>
      <p className="text-slate-300">
        This will become your operational command center for:
      </p>

      <ul className="mt-6 space-y-3 text-slate-400">
        <li>• Violations</li>
        <li>• Work Orders</li>
        <li>• Architectural Requests</li>
        <li>• Vendor Invoices</li>
        <li>• Approval Routing</li>
      </ul>
    </main>
  );
}
