import { BvbMarketDataProvider } from "./bvb-provider";
import { DemoMarketDataProvider } from "./demo-provider";
import type { MarketDataProvider, MarketSnapshot } from "./types";

function createProvider(): MarketDataProvider {
  return process.env.MARKET_DATA_PROVIDER === "bvb"
    ? new BvbMarketDataProvider()
    : new DemoMarketDataProvider();
}

export async function getMarketSnapshot(symbol: string): Promise<MarketSnapshot> {
  return createProvider().getSnapshot(symbol.trim().toUpperCase());
}

export type { MarketSnapshot } from "./types";
