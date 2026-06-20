import dynamic from 'next/dynamic';

// ============================================================
// DESIMANN.COM — MAIN LANDING PAGE
// Luxury D2C Food Brand Experience
// ============================================================

// Dynamic imports for code-splitting and optimal loading
const SmoothScroll = dynamic(() => import('@/components/features/SmoothScroll'));
const ScrollProgress = dynamic(() => import('@/components/ui/ScrollProgress'));
const LiveNotifications = dynamic(() => import('@/components/features/LiveNotifications'));

// Section imports — loaded in order of appearance
const Navbar = dynamic(() => import('@/components/sections/Navbar'));
const HeroSection = dynamic(() => import('@/components/sections/HeroSection'));
const ProductShowcase = dynamic(() => import('@/components/sections/ProductShowcase'));
const StoryTimeline = dynamic(() => import('@/components/sections/StoryTimeline'));
const FoundersSection = dynamic(() => import('@/components/sections/FoundersSection'));
const FarmToTable = dynamic(() => import('@/components/sections/FarmToTable'));
const IngredientExplorer = dynamic(() => import('@/components/sections/IngredientExplorer'));
const WhyDesimann = dynamic(() => import('@/components/sections/WhyDesimann'));
const TrustCenter = dynamic(() => import('@/components/sections/TrustCenter'));
const CustomerWall = dynamic(() => import('@/components/sections/CustomerWall'));
const CommunitySection = dynamic(() => import('@/components/sections/CommunitySection'));
const DesimannClub = dynamic(() => import('@/components/sections/DesimannClub'));
const AIRecipeAssistant = dynamic(() => import('@/components/sections/AIRecipeAssistant'));
const IndiaMap = dynamic(() => import('@/components/sections/IndiaMap'));
const EarlyBirdOffer = dynamic(() => import('@/components/sections/EarlyBirdOffer'));
const ReserveSpot = dynamic(() => import('@/components/sections/ReserveSpot'));
const ReferralSystem = dynamic(() => import('@/components/sections/ReferralSystem'));
const Footer = dynamic(() => import('@/components/sections/Footer'));

export default function Home() {
  return (
    <SmoothScroll>
      {/* Global UI Elements */}
      <ScrollProgress />
      <LiveNotifications />

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        {/* 1. Hero — Full viewport cinematic intro */}
        <HeroSection />

        {/* 2. Product Showcase — Horizontal scroll experience */}
        <ProductShowcase />

        {/* 3. Story Timeline — 1940 to 2026 */}
        <StoryTimeline />

        {/* 3.5 Founders Section */}
        <FoundersSection />

        {/* 4. Farm to Table — Interactive 6-step journey */}
        <FarmToTable />

        {/* 5. Ingredient Explorer — Interactive transparency */}
        <IngredientExplorer />

        {/* 6. Why Desimann — Premium feature cards */}
        <WhyDesimann />

        {/* 7. Trust Center — Certifications & badges */}
        <TrustCenter />

        {/* 8. Customer Wall — Testimonials */}
        <CustomerWall />

        {/* 9. Community — Social media links */}
        <CommunitySection />

        {/* 10. Desimann Club — VIP membership */}
        <DesimannClub />

        {/* 11. AI Recipe Assistant — Teaser */}
        <AIRecipeAssistant />

        {/* 12. India Map — Regional presence */}
        <IndiaMap />

        {/* 13. Early Bird Offer — Urgency section */}
        <EarlyBirdOffer />

        {/* 14. Reserve Your Spot — Conversion form */}
        <ReserveSpot />

        {/* 15. Referral System — Refer & Earn */}
        <ReferralSystem />
      </main>

      {/* Footer */}
      <Footer />
    </SmoothScroll>
  );
}
