import prisma from "@/lib/prisma";
import { revalidatePath } from "next/cache";

export default async function SettingsPage() {
  const user = { firstName: "Demo Admin" };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let settings: any = {};
  try {
    settings = await prisma.siteSettings.upsert({
      where: { id: "singleton" },
      update: {},
      create: { id: "singleton" },
    });
  } catch (error) {
    console.warn("Database not connected yet, showing mock data.");
  }

  async function saveSettings(formData: FormData) {
    "use server";
    const smtpHost = formData.get("smtpHost")?.toString();
    const smtpPort = parseInt(formData.get("smtpPort")?.toString() || "0", 10);
    const smtpUser = formData.get("smtpUser")?.toString();
    const smtpPass = formData.get("smtpPass")?.toString();
    const senderName = formData.get("senderName")?.toString();
    const senderEmail = formData.get("senderEmail")?.toString();
    const smtpEnabled = formData.get("smtpEnabled") === "on";

    const cloudinaryName = formData.get("cloudinaryName")?.toString();
    const cloudinaryApiKey = formData.get("cloudinaryApiKey")?.toString();
    const cloudinaryApiSecret = formData.get("cloudinaryApiSecret")?.toString();

    await prisma.siteSettings.update({
      where: { id: "singleton" },
      data: {
        smtpHost,
        smtpPort: smtpPort || null,
        smtpUser,
        smtpPass,
        senderName,
        senderEmail,
        smtpEnabled,
        cloudinaryName,
        cloudinaryApiKey,
        cloudinaryApiSecret,
      },
    });

    revalidatePath("/admin/settings");
  }

  return (
    <div className="max-w-4xl space-y-8">
      <div>
        <h1 className="text-2xl font-bold font-[family-name:var(--font-playfair)] text-dark-brown">
          Platform Settings
        </h1>
        <p className="text-warm-gray text-sm">Configure email, storage, and CMS content.</p>
      </div>

      <form action={saveSettings} className="space-y-8">
        {/* SMTP Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="flex justify-between items-center border-b border-gray-100 pb-4">
            <h2 className="text-lg font-semibold text-dark-brown">SMTP Configuration</h2>
            <label className="flex items-center gap-2 text-sm font-medium cursor-pointer">
              <input 
                type="checkbox" 
                name="smtpEnabled" 
                defaultChecked={settings.smtpEnabled}
                className="w-4 h-4 rounded text-mustard border-gray-300 focus:ring-mustard" 
              />
              Enable Emails
            </label>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">SMTP Host</label>
              <input type="text" name="smtpHost" defaultValue={settings.smtpHost || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" placeholder="smtp.gmail.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">SMTP Port</label>
              <input type="number" name="smtpPort" defaultValue={settings.smtpPort || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" placeholder="465" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">SMTP Username</label>
              <input type="text" name="smtpUser" defaultValue={settings.smtpUser || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" placeholder="user@domain.com" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">SMTP Password</label>
              <input type="password" name="smtpPass" defaultValue={settings.smtpPass || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" placeholder="••••••••" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Sender Name</label>
              <input type="text" name="senderName" defaultValue={settings.senderName || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" placeholder="Desimann Team" />
            </div>
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Sender Email</label>
              <input type="email" name="senderEmail" defaultValue={settings.senderEmail || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" placeholder="hello@desimann.com" />
            </div>
          </div>
        </div>

        {/* Cloudinary Settings */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
          <div className="border-b border-gray-100 pb-4">
            <h2 className="text-lg font-semibold text-dark-brown">Cloudinary API (Image Storage)</h2>
          </div>
          
          <div className="grid grid-cols-1 gap-6">
            <div>
              <label className="block text-sm font-medium text-dark-brown mb-1">Cloud Name</label>
              <input type="text" name="cloudinaryName" defaultValue={settings.cloudinaryName || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-dark-brown mb-1">API Key</label>
                <input type="text" name="cloudinaryApiKey" defaultValue={settings.cloudinaryApiKey || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" />
              </div>
              <div>
                <label className="block text-sm font-medium text-dark-brown mb-1">API Secret</label>
                <input type="password" name="cloudinaryApiSecret" defaultValue={settings.cloudinaryApiSecret || ""} className="w-full rounded-lg border-gray-300 shadow-sm focus:border-mustard focus:ring-mustard sm:text-sm px-3 py-2 border" />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end">
          <button type="submit" className="px-6 py-2.5 bg-mustard text-dark-brown font-bold rounded-lg shadow-sm hover:scale-105 transition-transform">
            Save Settings
          </button>
        </div>
      </form>
    </div>
  );
}
