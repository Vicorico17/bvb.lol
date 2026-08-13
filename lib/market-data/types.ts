export type MarketDataMode = "delayed" | "realtime";

export type PriceLevel = {
  price: number;
  size: number;
};

export type Trade = {
  id: string;
  timestamp: string;
  price: number;
  size: number;
  direction: "up" | "down" | "flat";
};

export type MarketEvent = {
  id: string;
  type: "filing" | "dividend" | "signal" | "operation";
  title: string;
  detail: string;
  publishedAt: string;
  url?: string;
};

export type WatchlistQuote = {
  symbol: string;
  price: number;
  changePercent: number;
};

export type MarketSnapshot = {
  symbol: string;
  name: string;
  currency: "RON" | "EUR" | "USD";
  isin: string;
  mode: MarketDataMode;
  source: string;
  asOf: string;
  delayMinutes: number;
  last: number;
  change: number;
  changePercent: number;
  open: number;
  high: number;
  low: number;
  volumeValue: number;
  bids: PriceLevel[];
  asks: PriceLevel[];
  trades: Trade[];
  events: MarketEvent[];
  watchlist: WatchlistQuote[];
};

export interface MarketDataProvider {
  getSnapshot(symbol: string): Promise<MarketSnapshot>;
}
