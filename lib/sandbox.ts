export type Instrument = { ticker: string; name: string; tone: string; seed: number; volatility: number };
export type Position = { quantity: number; average: number };
export type Account = { cash: number; portfolio: Record<string, Position> };

export const initialCash = 10000;
export const instruments: Instrument[] = [
  { ticker: "sH2O", name: "Hidroelectrica", tone: "hydro", seed: 101, volatility: 0.7 },
  { ticker: "sTLV", name: "Banca Transilvania", tone: "bank", seed: 203, volatility: 1.1 },
  { ticker: "sSNP", name: "OMV Petrom", tone: "petrol", seed: 307, volatility: 0.9 },
  { ticker: "sSNG", name: "Romgaz", tone: "gas", seed: 409, volatility: 0.8 },
  { ticker: "sBET", name: "BET index basket", tone: "index", seed: 503, volatility: 0.45 },
];
export const emptyAccount = (): Account => ({ cash: initialCash, portfolio: {} });

export function sandboxPrice(instrument: Instrument, now: number) {
  const minute = now / 60000;
  const wave = Math.sin((minute + instrument.seed) / 8) * instrument.volatility;
  const drift = Math.sin((minute + instrument.seed) / 29) * instrument.volatility * 0.6;
  return Number((100 + wave + drift).toFixed(2));
}

export function restoreAccount(raw: string | null): Account {
  try {
    const saved = JSON.parse(raw ?? "null");
    if (!saved || (saved.version !== undefined && saved.version !== 1) || !Number.isFinite(saved.cash) || saved.cash < 0 || !saved.portfolio || typeof saved.portfolio !== "object" || Array.isArray(saved.portfolio)) return emptyAccount();
    const portfolio: Account["portfolio"] = {};
    for (const [ticker, value] of Object.entries(saved.portfolio)) {
      const position = value as Position | null;
      if (!instruments.some((item) => item.ticker === ticker) || !position || !Number.isSafeInteger(position.quantity) || !Number.isFinite(position.average) || position.average < 0 || (position.quantity !== 0 && position.average === 0)) return emptyAccount();
      if (position.quantity !== 0) portfolio[ticker] = { quantity: position.quantity, average: position.average };
    }
    return { cash: saved.cash, portfolio };
  } catch { return emptyAccount(); }
}

export function executeTrade(account: Account, ticker: string, delta: number, price: number): Account {
  if (!instruments.some((item) => item.ticker === ticker) || !Number.isSafeInteger(delta) || delta === 0 || !Number.isFinite(price) || price <= 0) throw new Error("Invalid sandbox order.");
  const cost = delta * price;
  if (delta > 0 && cost > account.cash + 0.000001) throw new Error("Not enough sandbox cash for that order.");
  const position = account.portfolio[ticker] ?? { quantity: 0, average: 0 };
  const quantity = position.quantity + delta;
  if (!Number.isSafeInteger(quantity)) throw new Error("Position limit reached.");
  let average = position.average;
  if (position.quantity === 0 || Math.sign(position.quantity) === Math.sign(delta)) {
    average = (Math.abs(position.quantity) * position.average + Math.abs(delta) * price) / Math.abs(quantity);
  } else if (quantity !== 0 && Math.sign(quantity) !== Math.sign(position.quantity)) {
    average = price;
  }
  const portfolio = { ...account.portfolio };
  if (quantity === 0) delete portfolio[ticker];
  else portfolio[ticker] = { quantity, average };
  return { cash: Math.round((account.cash - cost) * 100) / 100, portfolio };
}

export function priceHistory(instrument: Instrument, now: number) {
  return Array.from({ length: 61 }, (_, index) => sandboxPrice(instrument, now - (60 - index) * 60000));
}
