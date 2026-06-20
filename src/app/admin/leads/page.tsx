import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const user = { firstName: "Demo Admin" };

  let leads: any[] = [];
  try {
    leads = await prisma.waitlistLead.findMany({
      orderBy: { createdAt: "desc" },
      take: 50, // Limit for UI performance, implement pagination later
    });
  } catch (error) {
    console.warn("Database not connected yet, showing mock data.");
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-dark-brown">
            Lead Management
          </h1>
          <p className="text-warm-gray text-sm">View and manage waitlist signups.</p>
        </div>
        <a href="/api/export/leads" download className="px-4 py-2 bg-dark-brown text-cream rounded-lg text-sm font-medium hover:bg-dark-brown/90 transition-colors inline-block">
          Export CSV
        </a>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Email</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Phone</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">City</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Referral Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Products</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {leads.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-8 text-center text-warm-gray italic">
                    No leads found.
                  </td>
                </tr>
              ) : (
                leads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-medium text-dark-brown">{lead.name}</td>
                    <td className="px-6 py-4 text-warm-gray">{lead.email}</td>
                    <td className="px-6 py-4 text-warm-gray">{lead.phone}</td>
                    <td className="px-6 py-4 text-warm-gray">{lead.city}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-mustard/10 text-mustard rounded-md text-xs font-bold font-mono">
                        {lead.referralCode}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-warm-gray">{lead.interestedProduct}</td>
                    <td className="px-6 py-4 text-warm-gray">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
