import type { MarketDataProvider, MarketSnapshot } from "./types";

const snapshot: MarketSnapshot = {
  symbol: "H2O",
  name: "Hidroelectrica",
  currency: "RON",
  isin: "RO4Q0Z5RO1B6",
  mode: "demo",
  source: "bvb.lol demo dataset",
  asOf: "2026-08-13T17:59:21+03:00",
  delayMinutes: 15,
  last: 187,
  change: 2,
  changePercent: 1.08,
  open: 185.8,
  high: 188.4,
  low: 185.8,
  volumeValue: 4_200_000,
  asks: [
    { price: 188.4, size: 124 }, { price: 188.2, size: 352 },
    { price: 188, size: 179 }, { price: 187.8, size: 104 },
    { price: 187.6, size: 208 },
  ],
  bids: [
    { price: 187, size: 179 }, { price: 186.8, size: 100 },
    { price: 186.6, size: 426 }, { price: 186.4, size: 285 },
    { price: 186.2, size: 607 },
  ],
  trades: [
    { id: "1", timestamp: "17:59:21", price: 187, size: 179, direction: "up" },
    { id: "2", timestamp: "17:58:44", price: 186.8, size: 100, direction: "down" },
    { id: "3", timestamp: "17:57:03", price: 186.8, size: 240, direction: "down" },
    { id: "4", timestamp: "17:55:19", price: 187, size: 55, direction: "up" },
  ],
  events: [
    { id: "filing-1", type: "filing", title: "H1 2026 financial results published", detail: "Today · 12:14", publishedAt: "2026-08-13T12:14:00+03:00" },
    { id: "dividend-1", type: "dividend", title: "2025 dividend ex-date in 26 days", detail: "08 Sep · 9.57 RON/share", publishedAt: "2026-08-13T09:00:00+03:00" },
    { id: "signal-1", type: "signal", title: "Volume is 1.7× its 20-day average", detail: "Today’s session", publishedAt: "2026-08-13T17:59:21+03:00" },
  ],
  watchlist: [
    { symbol: "H2O", price: 187, changePercent: 1.08 },
    { symbol: "TLV", price: 32.42, changePercent: 0.62 },
    { symbol: "SNP", price: 0.886, changePercent: -0.22 },
    { symbol: "SNG", price: 8.11, changePercent: 0.12 },
  ],
};

export class DemoMarketDataProvider implements MarketDataProvider {
  async getSnapshot(symbol: string): Promise<MarketSnapshot> {
    if (symbol.toUpperCase() !== snapshot.symbol) {
      throw new Error(`Demo data is not available for ${symbol}`);
    }
    return structuredClone(snapshot);
  }
}
