import type { MarketDataProvider, MarketSnapshot } from "./types";

/**
 * Server-only adapter boundary for BVB WebDelayed/WebTop5.
 *
 * The exact endpoint, authentication scheme and XML fields must come from the
 * signed BVB agreement. Keeping this adapter separate prevents credentials or
 * raw licensed feed payloads from reaching the browser.
 */
export class BvbMarketDataProvider implements MarketDataProvider {
  async getSnapshot(symbol: string): Promise<MarketSnapshot> {
    // Reserved for the licensed provider's eventual instrument lookup.
    void symbol;
    const endpoint = process.env.BVB_MARKET_DATA_URL;
    const username = process.env.BVB_MARKET_DATA_USERNAME;
    const password = process.env.BVB_MARKET_DATA_PASSWORD;

    if (!endpoint || !username || !password) {
      throw new Error(
        "BVB provider selected, but licensed market-data credentials are missing.",
      );
    }

    // Implement only after BVB supplies the contracted XML schema. The mapper
    // must emit normalized display fields and must never return the raw feed.
    throw new Error("BVB provider awaits the licensed XML specification.");
  }
}
