import { ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { SITE_CONFIG } from "@/lib/constants";

export default function LegalLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-cream text-dark-brown font-[family-name:var(--font-poppins)]">
      <header className="bg-white border-b border-warm-gray/20 sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link 
            href="/"
            className="inline-flex items-center gap-2 text-warm-gray hover:text-mustard transition-colors font-medium text-sm"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="font-[family-name:var(--font-playfair)] font-bold text-xl text-dark-brown">
            {SITE_CONFIG.name}
          </div>
        </div>
      </header>
      
      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        {children}
      </main>

      <footer className="bg-rich-black text-cream py-8 mt-20 text-center text-sm">
        <p className="opacity-50">© 2026 {SITE_CONFIG.name}. All rights reserved.</p>
      </footer>
    </div>
  );
}
