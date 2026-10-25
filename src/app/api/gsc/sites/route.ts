import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { listGscSites } from "@/lib/gsc";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await getServerSession(authOptions);

  if (!session?.accessToken) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  try {
    const sites = await listGscSites(session.accessToken);
    return NextResponse.json({ sites });
  } catch (error: any) {
    console.error("GSC sites error:", error?.message);
    return NextResponse.json(
      { error: "Failed to fetch Search Console sites" },
      { status: 500 }
    );
  }
}
