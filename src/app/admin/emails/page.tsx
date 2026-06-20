import prisma from "@/lib/prisma";
import { Mail, CheckCircle, XCircle, Clock } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function EmailsPage() {
  let logs: any[] = [];
  
  try {
    logs = await prisma.emailLog.findMany({
      orderBy: { sentAt: "desc" },
      take: 100,
    });
  } catch (error) {
    console.error("Failed to fetch email logs", error);
  }

  const successCount = logs.filter(l => l.status === "SUCCESS").length;
  const failureCount = logs.filter(l => l.status === "FAILED").length;

  return (
    <div className="space-y-8 max-w-6xl">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-dark-brown">
          Email Logs & Templates
        </h1>
        <p className="text-warm-gray text-sm mt-1">
          Monitor automated emails sent by the system.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-warm-gray/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-blue-50 text-blue-500 flex items-center justify-center">
            <Mail size={24} />
          </div>
          <div>
            <p className="text-sm text-warm-gray font-medium">Total Sent</p>
            <p className="text-2xl font-bold text-dark-brown">{logs.length}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-warm-gray/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-green-50 text-green-500 flex items-center justify-center">
            <CheckCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-warm-gray font-medium">Delivered</p>
            <p className="text-2xl font-bold text-dark-brown">{successCount}</p>
          </div>
        </div>
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-warm-gray/10 flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-red-50 text-red-500 flex items-center justify-center">
            <XCircle size={24} />
          </div>
          <div>
            <p className="text-sm text-warm-gray font-medium">Failed</p>
            <p className="text-2xl font-bold text-dark-brown">{failureCount}</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-warm-gray/10 overflow-hidden">
        <div className="px-6 py-4 border-b border-warm-gray/10 bg-gray-50/50">
          <h2 className="font-semibold text-dark-brown">Recent Outgoing Emails</h2>
        </div>
        
        {logs.length === 0 ? (
          <div className="p-8 text-center text-warm-gray">
            <Mail className="w-12 h-12 mx-auto text-warm-gray/30 mb-3" />
            <p>No emails have been sent yet.</p>
            <p className="text-sm mt-1">Make sure your SMTP settings are configured in the Settings tab.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-warm-gray/10 text-xs uppercase tracking-wider text-warm-gray bg-gray-50/30">
                  <th className="px-6 py-4 font-medium">Status</th>
                  <th className="px-6 py-4 font-medium">Recipient</th>
                  <th className="px-6 py-4 font-medium">Subject</th>
                  <th className="px-6 py-4 font-medium">Template</th>
                  <th className="px-6 py-4 font-medium">Date & Time</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-warm-gray/10">
                {logs.map((log) => (
                  <tr key={log.id} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-6 py-4">
                      {log.status === "SUCCESS" ? (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-green-50 text-green-700 text-xs font-medium border border-green-200">
                          <CheckCircle size={14} /> Sent
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-red-50 text-red-700 text-xs font-medium border border-red-200" title={log.error || "Unknown Error"}>
                          <XCircle size={14} /> Failed
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-dark-brown text-sm">{log.recipient}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-warm-gray truncate max-w-[250px]">{log.subject}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="inline-flex px-2 py-1 bg-gray-100 text-gray-600 rounded text-xs font-mono">
                        {log.template}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2 text-sm text-warm-gray">
                        <Clock size={14} />
                        {new Date(log.sentAt).toLocaleString('en-IN')}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
