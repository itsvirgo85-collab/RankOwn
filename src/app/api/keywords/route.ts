import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// Current Google Ads API version (v17 returns 404)
const ADS_API_VERSION = "v26";

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => ({}));
    const seed = String((body as any).seed || "").trim();
    const country = String((body as any).country || "US").toUpperCase();

    if (!seed) {
      return NextResponse.json({ error: "Seed keyword is required" }, { status: 400 });
    }

    const customerId = (process.env.GOOGLE_ADS_CUSTOMER_ID || "").replace(/-/g, "");
    if (!customerId) {
      return NextResponse.json(
        {
          error:
            "GOOGLE_ADS_CUSTOMER_ID not set. Add your Google Ads customer ID in Vercel environment variables.",
        },
        { status: 503 }
      );
    }

    if (!/^\d{10}$/.test(customerId)) {
      return NextResponse.json(
        {
          error:
            "GOOGLE_ADS_CUSTOMER_ID must be exactly 10 digits (no dashes). Example: 1234567890",
        },
        { status: 400 }
      );
    }

    const session = await getServerSession(authOptions);
    let accessToken = session?.accessToken as string | undefined;

    if (!accessToken && process.env.GOOGLE_ADS_REFRESH_TOKEN) {
      try {
        const { google } = await import("googleapis");
        const oauth2 = new google.auth.OAuth2(
          process.env.GOOGLE_CLIENT_ID,
          process.env.GOOGLE_CLIENT_SECRET
        );
        oauth2.setCredentials({ refresh_token: process.env.GOOGLE_ADS_REFRESH_TOKEN });
        const t = await oauth2.getAccessToken();
        accessToken = t.token || undefined;
      } catch (e: any) {
        return NextResponse.json(
          { error: "Failed to refresh Google Ads token", hint: e?.message },
          { status: 500 }
        );
      }
    }

    if (!accessToken) {
      return NextResponse.json(
        {
          error:
            "Sign in with Google (Ads permission) or set GOOGLE_ADS_REFRESH_TOKEN for server-side Keyword Planner access.",
          hint: "Go to /login, continue with Google, allow Ads access, then retry search.",
        },
        { status: 401 }
      );
    }

    const geoByCountry: Record<string, string> = {
      US: "geoTargetConstants/2840",
      GB: "geoTargetConstants/2826",
      PK: "geoTargetConstants/2586",
      IN: "geoTargetConstants/2356",
      CA: "geoTargetConstants/2124",
      AU: "geoTargetConstants/2036",
    };
    const geo = geoByCountry[country] || geoByCountry.US;

    const loginCustomerId = (process.env.GOOGLE_ADS_LOGIN_CUSTOMER_ID || "").replace(/-/g, "");

    const headers: Record<string, string> = {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    };
    // Developer tokens were sunset Sep 2026 — access is tied to Cloud project
    if (loginCustomerId) headers["login-customer-id"] = loginCustomerId;

    const endpoint = `https://googleads.googleapis.com/${ADS_API_VERSION}/customers/${customerId}:generateKeywordIdeas`;

    const adsRes = await fetch(endpoint, {
      method: "POST",
      headers,
      body: JSON.stringify({
        language: "languageConstants/1000",
        geoTargetConstants: [geo],
        includeAdultKeywords: false,
        keywordPlanNetwork: "GOOGLE_SEARCH",
        keywordSeed: { keywords: [seed] },
      }),
    });

    const adsJson = await adsRes.json().catch(() => ({}));

    if (!adsRes.ok) {
      const msg =
        adsJson?.error?.message ||
        adsJson?.error?.status ||
        `Google Ads API error (${adsRes.status})`;

      let hint =
        "1) Enable Google Ads API in the same Cloud project as your OAuth client. 2) Confirm Customer ID is 10 digits. 3) Request Explorer/Basic access for the Cloud project if still on Test.";

      if (adsRes.status === 404) {
        hint =
          "404 usually means wrong Customer ID, or the Ads account is not accessible with this Google login. Double-check Customer ID in ads.google.com (top-right), no dashes.";
      }
      if (adsRes.status === 403) {
        hint =
          "403 = permission / access level. Enable Google Ads API on your Cloud project and raise access (Explorer/Basic) from Google Cloud Ads API overview.";
      }

      return NextResponse.json({ error: msg, hint, status: adsRes.status }, { status: 502 });
    }

    const results = adsJson?.results || [];
    const keywords = results
      .slice(0, 50)
      .map((row: any) => {
        const metrics = row.keywordIdeaMetrics || {};
        return {
          keyword: row.text || row.keyword?.text || "",
          volume: metrics.avgMonthlySearches ?? null,
          cpc:
            metrics.averageCpcMicros != null
              ? Number(metrics.averageCpcMicros) / 1_000_000
              : null,
          competition:
            metrics.competitionIndex != null ? Number(metrics.competitionIndex) / 100 : null,
          competitionLevel: metrics.competition ?? null,
          source: "Google Ads Keyword Planner API",
        };
      })
      .filter((k: any) => k.keyword);

    return NextResponse.json({
      keywords,
      source: "Google Ads Keyword Planner (official API)",
      fetchedAt: new Date().toISOString(),
      country,
      seed,
    });
  } catch (e: any) {
    console.error("keywords api error", e);
    return NextResponse.json({ error: e?.message || "Internal error" }, { status: 500 });
  }
}
