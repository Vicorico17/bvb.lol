import { NextResponse } from "next/server";
import { getMarketSnapshot } from "@/lib/market-data";

export const dynamic = "force-dynamic";

export async function GET(
  _request: Request,
  context: RouteContext<"/api/markets/[symbol]">,
) {
  const { symbol } = await context.params;

  if (!/^[A-Z0-9.-]{1,16}$/i.test(symbol)) {
    return NextResponse.json({ error: "Invalid market symbol" }, { status: 400 });
  }

  try {
    const snapshot = await getMarketSnapshot(symbol);
    return NextResponse.json(snapshot, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=300",
        "X-Market-Data-Mode": snapshot.mode,
        "X-Market-Data-Source": snapshot.source,
      },
    });
  } catch {
    return NextResponse.json(
      { error: "Licensed market data is not available. View charts in the terminal via TradingView." },
      { status: 503, headers: { "Cache-Control": "no-store" } },
    );
  }
}
