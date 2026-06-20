"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Lock, Mail, ArrowRight } from "lucide-react";
import { loginAdmin } from "@/app/actions/auth";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("email", email);
    formData.append("password", password);

    try {
      const result = await loginAdmin(formData);

      if (result.success) {
        router.push("/admin");
        router.refresh();
      } else {
        setError(result.error || "Login failed");
        setIsLoading(false);
      }
    } catch (err) {
      console.error(err);
      setError("An unexpected error occurred. Please try again.");
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-rich-black flex items-center justify-center p-4">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-mustard/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-red-900/10 rounded-full blur-[100px]" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl p-8 shadow-2xl">
          <div className="flex flex-col items-center mb-8">
            <div className="relative w-40 h-16 mb-6">
              <Image 
                src="/logo.png" 
                alt="Desimann Logo" 
                fill
                className="object-contain"
                priority
              />
            </div>
            <h1 className="text-2xl font-[family-name:var(--font-playfair)] font-bold text-cream">
              Admin Gateway
            </h1>
            <p className="text-cream/50 text-sm mt-2 text-center">
              Enter your credentials to securely access the Desimann Control Panel.
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {error && (
              <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm p-3 rounded-lg text-center">
                {error}
              </div>
            )}

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-cream/70 mb-1.5 ml-1">
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-cream/40" />
                  </div>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-cream placeholder-cream/30 focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all"
                    placeholder="admin@desimann.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-medium text-cream/70 mb-1.5 ml-1">
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-cream/40" />
                  </div>
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-11 pr-4 text-cream placeholder-cream/30 focus:border-mustard focus:ring-1 focus:ring-mustard outline-none transition-all"
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center gap-2 bg-mustard text-rich-black font-bold py-3.5 rounded-xl hover:bg-mustard/90 hover:shadow-lg hover:shadow-mustard/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                "Authenticating..."
              ) : (
                <>
                  Secure Login <ArrowRight className="w-5 h-5" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
