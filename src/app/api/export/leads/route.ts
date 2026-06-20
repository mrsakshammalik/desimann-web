import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const leads = await prisma.waitlistLead.findMany({
      orderBy: { createdAt: "desc" },
    });

    if (leads.length === 0) {
      return new NextResponse("No leads found", { status: 404 });
    }

    // Prepare CSV header
    const headers = [
      "ID",
      "Name",
      "Email",
      "Phone",
      "City",
      "Interested Product",
      "Referral Code",
      "Referred By",
      "Date Joined",
    ].join(",");

    // Prepare CSV rows
    const rows = leads.map((lead) => {
      // Escape commas and quotes inside fields
      const escape = (str: string | null) => {
        if (!str) return "";
        const escapedStr = str.replace(/"/g, '""');
        return `"${escapedStr}"`;
      };

      return [
        escape(lead.id),
        escape(lead.name),
        escape(lead.email),
        escape(lead.phone),
        escape(lead.city),
        escape(lead.interestedProduct),
        escape(lead.referralCode),
        escape(lead.referredByCode),
        escape(new Date(lead.createdAt).toISOString()),
      ].join(",");
    });

    const csvContent = [headers, ...rows].join("\n");

    return new NextResponse(csvContent, {
      status: 200,
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": 'attachment; filename="desimann_waitlist_leads.csv"',
      },
    });
  } catch (error) {
    console.error("Export CSV error:", error);
    return new NextResponse("Internal Server Error", { status: 500 });
  }
}
