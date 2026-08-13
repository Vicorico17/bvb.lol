import { BvbMarketDataProvider } from "./bvb-provider";
import type { MarketSnapshot } from "./types";

export async function getMarketSnapshot(symbol: string): Promise<MarketSnapshot> {
  return new BvbMarketDataProvider().getSnapshot(symbol.trim().toUpperCase());
}

export type { MarketSnapshot } from "./types";
