import { NextResponse } from "next/server";

function extract(html: string, re: RegExp): string | null {
  const m = html.match(re);
  return m?.[1]?.trim() || null;
}

function extractAll(html: string, re: RegExp): string[] {
  const out: string[] = [];
  let m: RegExpExecArray | null;
  const r = new RegExp(re.source, re.flags.includes("g") ? re.flags : re.flags + "g");
  while ((m = r.exec(html)) !== null) {
    if (m[1]) out.push(m[1].replace(/<[^>]+>/g, "").trim());
  }
  return out.filter(Boolean);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    let url = String(body.url || "").trim();

    if (!url) {
      return NextResponse.json({ error: "URL is required" }, { status: 400 });
    }

    if (!/^https?:\/\//i.test(url)) {
      url = "https://" + url;
    }

    let parsed: URL;
    try {
      parsed = new URL(url);
    } catch {
      return NextResponse.json({ error: "Invalid URL" }, { status: 400 });
    }

    if (!["http:", "https:"].includes(parsed.protocol)) {
      return NextResponse.json({ error: "Only http/https URLs allowed" }, { status: 400 });
    }

    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(parsed.toString(), {
      signal: controller.signal,
      headers: {
        "User-Agent": "RankOwnBot/1.0 (+https://rank-own.vercel.app)",
        Accept: "text/html,application/xhtml+xml",
      },
      redirect: "follow",
    }).finally(() => clearTimeout(timeout));

    const statusCode = res.status;
    const html = await res.text();
    const snippet = html.slice(0, 500000);

    const title = extract(snippet, /<title[^>]*>([\s\S]*?)<\/title>/i);
    const metaDescription =
      extract(snippet, /<meta[^>]+name=["']description["'][^>]+content=["']([\s\S]*?)["'][^>]*>/i) ||
      extract(snippet, /<meta[^>]+content=["']([\s\S]*?)["'][^>]+name=["']description["'][^>]*>/i);
    const canonical =
      extract(snippet, /<link[^>]+rel=["']canonical["'][^>]+href=["']([^"']+)["'][^>]*>/i) ||
      extract(snippet, /<link[^>]+href=["']([^"']+)["'][^>]+rel=["']canonical["'][^>]*>/i);
    const robots =
      extract(snippet, /<meta[^>]+name=["']robots["'][^>]+content=["']([^"']+)["'][^>]*>/i) ||
      extract(snippet, /<meta[^>]+content=["']([^"']+)["'][^>]+name=["']robots["'][^>]*>/i);
    const hasViewport = /<meta[^>]+name=["']viewport["'][^>]*>/i.test(snippet);
    const h1 = extractAll(snippet, /<h1[^>]*>([\s\S]*?)<\/h1>/gi).slice(0, 10);
    const h2 = extractAll(snippet, /<h2[^>]*>([\s\S]*?)<\/h2>/gi).slice(0, 20);

    const issues: { level: "error" | "warn" | "ok"; message: string }[] = [];

    if (statusCode >= 400) issues.push({ level: "error", message: `HTTP status ${statusCode}` });
    else if (statusCode >= 300) issues.push({ level: "warn", message: `HTTP status ${statusCode}` });
    else issues.push({ level: "ok", message: `HTTP status ${statusCode}` });

    if (!title) issues.push({ level: "error", message: "Missing <title> tag" });
    else if (title.length < 15) issues.push({ level: "warn", message: `Title is short (${title.length} chars)` });
    else if (title.length > 65) issues.push({ level: "warn", message: `Title is long (${title.length} chars)` });
    else issues.push({ level: "ok", message: `Title length OK (${title.length} chars)` });

    if (!metaDescription) issues.push({ level: "warn", message: "Missing meta description" });
    else if (metaDescription.length < 50)
      issues.push({ level: "warn", message: `Meta description short (${metaDescription.length} chars)` });
    else if (metaDescription.length > 165)
      issues.push({ level: "warn", message: `Meta description long (${metaDescription.length} chars)` });
    else issues.push({ level: "ok", message: `Meta description length OK (${metaDescription.length} chars)` });

    if (h1.length === 0) issues.push({ level: "error", message: "No H1 found" });
    else if (h1.length > 1) issues.push({ level: "warn", message: `Multiple H1 tags (${h1.length})` });
    else issues.push({ level: "ok", message: "Single H1 found" });

    if (!canonical) issues.push({ level: "warn", message: "No canonical URL" });
    else issues.push({ level: "ok", message: "Canonical present" });

    if (!hasViewport) issues.push({ level: "warn", message: "Missing viewport meta (mobile)" });
    else issues.push({ level: "ok", message: "Viewport meta present" });

    const errors = issues.filter((i) => i.level === "error").length;
    const warns = issues.filter((i) => i.level === "warn").length;
    const score = Math.max(0, 100 - errors * 20 - warns * 8);

    return NextResponse.json({
      url: parsed.toString(),
      statusCode,
      title,
      metaDescription,
      canonical,
      h1,
      h2,
      robots,
      hasViewport,
      issues,
      score,
      fetchedAt: new Date().toISOString(),
      source: "Live HTML fetch (RankOwn crawler)",
    });
  } catch (e: any) {
    if (e?.name === "AbortError") {
      return NextResponse.json({ error: "Request timed out" }, { status: 504 });
    }
    console.error("audit error", e);
    return NextResponse.json({ error: "Failed to fetch or analyze URL" }, { status: 500 });
  }
}
