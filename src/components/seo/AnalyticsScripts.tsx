import Script from "next/script";
import prisma from "@/lib/prisma";

export async function AnalyticsScripts() {
  let tracking = null;
  try {
    tracking = await prisma.analyticsTracking.findUnique({
      where: { id: "singleton" },
    });
  } catch (error) {
    // Graceful fallback if table is not migrated yet
    console.warn("Analytics tracking table not available yet.");
  }

  if (!tracking) return null;

  return (
    <>
      {/* Google Analytics 4 */}
      {tracking.ga4Id && (
        <>
          <Script
            src={`https://www.googletagmanager.com/gtag/js?id=${tracking.ga4Id}`}
            strategy="afterInteractive"
          />
          <Script id="google-analytics" strategy="afterInteractive">
            {`
              window.dataLayer = window.dataLayer || [];
              function gtag(){window.dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${tracking.ga4Id}');
            `}
          </Script>
        </>
      )}

      {/* Meta Pixel */}
      {tracking.metaPixelId && (
        <Script id="meta-pixel" strategy="afterInteractive">
          {`
            !function(f,b,e,v,n,t,s)
            {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
            n.callMethod.apply(n,arguments):n.queue.push(arguments)};
            if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
            n.queue=[];t=b.createElement(e);t.async=!0;
            t.src=v;s=b.getElementsByTagName(e)[0];
            s.parentNode.insertBefore(t,s)}(window, document,'script',
            'https://connect.facebook.net/en_US/fbevents.js');
            fbq('init', '${tracking.metaPixelId}');
            fbq('track', 'PageView');
          `}
        </Script>
      )}

      {/* Microsoft Clarity */}
      {tracking.clarityId && (
        <Script id="ms-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "${tracking.clarityId}");
          `}
        </Script>
      )}
    </>
  );
}
