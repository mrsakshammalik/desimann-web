import { ReactNode } from "react";
import Link from "next/link";
import Image from "next/image";
import { LayoutDashboard, Users, UserPlus, Mail, Settings, LogOut, Search, FileText } from "lucide-react";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col md:flex-row">
      {/* Sidebar */}
      <aside className="w-full md:w-64 bg-rich-black text-cream shadow-xl flex flex-col">
        <div className="p-6">
          <Link href="/" className="block relative w-32 h-14 md:w-40 md:h-16 mb-2">
            <Image 
              src="/logo.png" 
              alt="Desimann Logo" 
              fill
              className="object-contain object-left"
              priority
            />
          </Link>
          <p className="text-xs text-cream/50 mt-1 uppercase tracking-wider">
            Control Panel v4.0
          </p>
        </div>
        <nav className="flex-1 px-4 py-4 space-y-2 overflow-y-auto">
          <NavItem href="/admin" icon={<LayoutDashboard size={20} />} label="Dashboard" />
          <NavItem href="/admin/leads" icon={<Users size={20} />} label="Lead Management" />
          <NavItem href="/admin/referrals" icon={<UserPlus size={20} />} label="Referrals" />
          <NavItem href="/admin/emails" icon={<Mail size={20} />} label="Email Templates" />
          <NavItem href="/admin/settings" icon={<Settings size={20} />} label="Settings & CMS" />
          <NavItem href="/admin/seo" icon={<Search size={20} />} label="SEO Management" />
          <NavItem href="/admin/blog" icon={<FileText size={20} />} label="Blog Content" />
        </nav>
        <div className="p-4 border-t border-white/10 mt-auto">
          <form action={async () => {
            "use server";
            const { logoutAdmin } = await import("@/app/actions/auth");
            await logoutAdmin();
            const { redirect } = await import("next/navigation");
            redirect("/admin-login");
          }}>
            <button type="submit" className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream/80 hover:bg-red-500/10 hover:text-red-400 transition-colors group">
              <LogOut size={20} className="group-hover:text-red-400" />
              <span className="font-medium">Secure Logout</span>
            </button>
          </form>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Mobile Header (Only visible on small screens) */}
        <header className="md:hidden bg-white shadow-sm px-4 py-3 flex justify-between items-center">
          <div className="relative w-24 h-10">
            <Image 
              src="/logo.png" 
              alt="Desimann Logo" 
              fill
              className="object-contain object-left"
            />
          </div>
          <div className="w-8 h-8 rounded-full bg-mustard text-dark-brown flex items-center justify-center font-bold">KV</div>
        </header>
        
        {/* Content Wrapper */}
        <div className="flex-1 p-6 lg:p-10 bg-gray-50/50">
          {children}
        </div>
      </main>
    </div>
  );
}

function NavItem({ href, icon, label }: { href: string; icon: ReactNode; label: string }) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-cream/80 hover:bg-white/10 hover:text-white transition-colors group"
    >
      <span className="text-mustard/70 group-hover:text-mustard transition-colors">{icon}</span>
      <span className="font-medium">{label}</span>
    </Link>
  );
}
