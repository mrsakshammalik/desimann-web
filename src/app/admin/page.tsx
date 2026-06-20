import { 
  Users, 
  UserPlus, 
  Mail, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight 
} from "lucide-react";
import prisma from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AdminDashboard() {
  const user = { firstName: "Demo Admin" };

  // Fetch some metrics from Prisma
  let totalLeads = 0;
  let totalReferrals = 0;
  let totalEmails = 0;

  try {
    const counts = await Promise.all([
      prisma.waitlistLead.count(),
      prisma.waitlistLead.count({ where: { referredByCode: { not: null } } }),
      prisma.emailLog.count(),
    ]);
    totalLeads = counts[0];
    totalReferrals = counts[1];
    totalEmails = counts[2];
  } catch (error) {
    console.warn("Database not connected yet, showing mock data.");
  }

  // Mock conversion rate for now (we can calculate actual later)
  const conversionRate = totalLeads > 0 ? ((totalReferrals / totalLeads) * 100).toFixed(1) : "0.0";

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold font-[family-name:var(--font-playfair)] text-dark-brown">
          Welcome back, {user.firstName || "Admin"}
        </h1>
        <p className="text-warm-gray mt-2">
          Here's what's happening with the Desimann pre-launch campaign.
        </p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <MetricCard 
          title="Total Waitlist Users" 
          value={totalLeads.toString()} 
          icon={<Users size={24} />} 
          trend="+12%" 
          trendUp={true} 
          color="bg-blue-50 text-blue-600"
        />
        <MetricCard 
          title="Total Referrals" 
          value={totalReferrals.toString()} 
          icon={<UserPlus size={24} />} 
          trend="+8%" 
          trendUp={true}
          color="bg-green-50 text-green-600"
        />
        <MetricCard 
          title="Conversion Rate" 
          value={`${conversionRate}%`} 
          icon={<TrendingUp size={24} />} 
          trend="-2%" 
          trendUp={false}
          color="bg-purple-50 text-purple-600"
        />
        <MetricCard 
          title="Emails Sent" 
          value={totalEmails.toString()} 
          icon={<Mail size={24} />} 
          trend="+24%" 
          trendUp={true}
          color="bg-orange-50 text-orange-600"
        />
      </div>

      {/* Recent Activity Section */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-dark-brown">Recent Signups</h2>
          <button className="text-sm font-medium text-mustard hover:text-dark-brown transition-colors">
            View All
          </button>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-gray-100 text-sm text-warm-gray">
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">City</th>
                <th className="pb-3 font-medium">Referral Code</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody className="text-sm">
              {/* In a real app, we'd fetch the last 5 leads here. Mocking for now if empty. */}
              {totalLeads === 0 && (
                <tr>
                  <td colSpan={4} className="py-8 text-center text-warm-gray italic">
                    No signups yet. Share the waitlist link!
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

function MetricCard({ 
  title, 
  value, 
  icon, 
  trend, 
  trendUp, 
  color 
}: { 
  title: string; 
  value: string; 
  icon: React.ReactNode; 
  trend: string; 
  trendUp: boolean;
  color: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 flex flex-col">
      <div className="flex justify-between items-start mb-4">
        <div className={`p-3 rounded-xl ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center gap-1 text-sm font-medium ${trendUp ? 'text-green-600' : 'text-red-500'}`}>
          {trend}
          {trendUp ? <ArrowUpRight size={16} /> : <ArrowDownRight size={16} />}
        </div>
      </div>
      <h3 className="text-warm-gray text-sm font-medium mb-1">{title}</h3>
      <p className="text-3xl font-bold text-dark-brown">{value}</p>
    </div>
  );
}
