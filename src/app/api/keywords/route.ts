import { NextResponse } from "next/server";

const LOCATION_CODES: Record<string, number> = {
  US: 2840,
  GB: 2826,
  PK: 2586,
  IN: 2356,
  CA: 2124,
  AU: 2036,
};

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const seed = String(body.seed || "").trim();
    const country = String(body.country || "US").toUpperCase();

    if (!seed) {
      return NextResponse.json({ error: "Seed keyword is required" }, { status: 400 });
    }

    const login = process.env.DATAFORSEO_LOGIN;
    const password = process.env.DATAFORSEO_PASSWORD;

    if (!login || !password) {
      return NextResponse.json(
        {
          error:
            "Keyword provider not configured. Set DATAFORSEO_LOGIN and DATAFORSEO_PASSWORD in environment variables.",
        },
        { status: 503 }
      );
    }

    const locationCode = LOCATION_CODES[country] || 2840;
    const auth = Buffer.from(`${login}:${password}`).toString("base64");

    const response = await fetch("https://api.dataforseo.com/v3/keywords_data/google_ads/keywords_for_keywords/live", {
      method: "POST",
      headers: {
        Authorization: `Basic ${auth}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify([
        {
          keywords: [seed],
          location_code: locationCode,
          language_code: "en",
          sort_by: "search_volume",
        },
      ]),
    });

    const json = await response.json();

    if (!response.ok || json.status_code !== 20000) {
      const msg = json?.status_message || "DataForSEO request failed";
      return NextResponse.json({ error: msg }, { status: 502 });
    }

    const items = json?.tasks?.[0]?.result?.[0]?.items || [];
    const keywords = items.map((item: any) => ({
      keyword: item.keyword,
      volume: item.search_volume ?? null,
      cpc: item.cpc ?? null,
      competition: item.competition ?? null,
      competitionLevel: item.competition_level ?? null,
      source: "DataForSEO / Google Ads",
    }));

    return NextResponse.json({
      keywords,
      source: "DataForSEO (Google Ads keyword data)",
      fetchedAt: new Date().toISOString(),
      country,
      seed,
    });
  } catch (e: any) {
    console.error("keywords api error", e);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
