import prisma from "@/lib/prisma";
import { Trophy, Gift, Users } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function ReferralsPage() {
  const user = { firstName: "Demo Admin" };

  // Get top referrers
  let topReferrers: Array<{ name: string | null }> = [];
  try {
    topReferrers = await prisma.waitlistLead.findMany({
      where: {
        referrals: {
          some: {} // has at least one
        }
      },
      include: {
        _count: {
          select: { referrals: true }
        }
      },
      orderBy: {
        referrals: {
          _count: 'desc'
        }
      },
      take: 10,
    });
  } catch (error) {
    console.warn("Database not connected yet, showing mock data.");
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-dark-brown">
          Referral Program
        </h1>
        <p className="text-warm-gray text-sm">Monitor leaderboard and issue rewards.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-mustard/10 rounded-lg text-mustard">
            <Trophy size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-warm-gray">Top Referrer</p>
            <p className="text-xl font-bold text-dark-brown">{topReferrers[0]?.name || "N/A"}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-village-green/10 rounded-lg text-village-green">
            <Gift size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-warm-gray">Rewards Issued</p>
            <p className="text-xl font-bold text-dark-brown">0</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-xl border border-gray-100 shadow-sm flex items-center gap-4">
          <div className="p-3 bg-blue-50 rounded-lg text-blue-600">
            <Users size={24} />
          </div>
          <div>
            <p className="text-sm font-medium text-warm-gray">Total Referrals</p>
            <p className="text-xl font-bold text-dark-brown">
              {topReferrers.reduce((acc, lead) => acc + lead._count.referrals, 0)}
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-bold text-dark-brown">Leaderboard</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead className="bg-gray-50 border-b border-gray-100">
              <tr>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Rank</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Name</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Code</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Signups</th>
                <th className="px-6 py-4 text-xs font-semibold text-warm-gray uppercase tracking-wider">Reward Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-sm">
              {topReferrers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-warm-gray italic">
                    No referrals yet.
                  </td>
                </tr>
              ) : (
                topReferrers.map((lead, index) => (
                  <tr key={lead.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-6 py-4 font-bold text-dark-brown">#{index + 1}</td>
                    <td className="px-6 py-4 font-medium text-dark-brown">{lead.name}</td>
                    <td className="px-6 py-4">
                      <span className="px-2 py-1 bg-gray-100 rounded-md font-mono text-xs">{lead.referralCode}</span>
                    </td>
                    <td className="px-6 py-4 font-bold text-village-green">{lead._count.referrals}</td>
                    <td className="px-6 py-4">
                      {lead._count.referrals >= 10 ? (
                        <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-semibold">Eligible for Reward</span>
                      ) : (
                        <span className="px-2 py-1 bg-gray-100 text-gray-500 rounded-md text-xs">Keep sharing</span>
                      )}
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
