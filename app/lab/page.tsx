"use client";

import { useEffect, useMemo, useState } from "react";
import "./lab.css";

type Instrument = {
  ticker: string;
  name: string;
  tone: string;
  seed: number;
  volatility: number;
};

type Position = {
  quantity: number;
  average: number;
};

type Portfolio = Record<string, Position>;

const instruments: Instrument[] = [
  { ticker: "sH2O", name: "Hidroelectrica", tone: "hydro", seed: 101, volatility: 0.7 },
  { ticker: "sTLV", name: "Banca Transilvania", tone: "bank", seed: 203, volatility: 1.1 },
  { ticker: "sSNP", name: "OMV Petrom", tone: "petrol", seed: 307, volatility: 0.9 },
  { ticker: "sSNG", name: "Romgaz", tone: "gas", seed: 409, volatility: 0.8 },
  { ticker: "sBET", name: "BET index basket", tone: "index", seed: 503, volatility: 0.45 },
];

const initialCash = 10000;
const selectedDefault = instruments[0];

function sandboxPrice(instrument: Instrument, now: number) {
  const minute = Math.floor(now / 60000);
  const wave = Math.sin((minute + instrument.seed) / 8) * instrument.volatility;
  const drift = Math.sin((minute + instrument.seed) / 29) * instrument.volatility * 0.6;
  return Number((100 + wave + drift).toFixed(2));
}

function format(value: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SyntheticLab() {
  const [active, setActive] = useState(selectedDefault);
  const [cash, setCash] = useState(initialCash);
  const [portfolio, setPortfolio] = useState<Portfolio>({});
  const [now, setNow] = useState(() => Date.now());
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState("Sandbox account ready.");

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem("bvb-lab") ?? "null");
      if (saved?.cash && saved?.portfolio) {
        setCash(saved.cash);
        setPortfolio(saved.portfolio);
      }
    } catch {
      // A corrupted local sandbox simply starts fresh.
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    const timer = window.setInterval(() => setNow(Date.now()), 10000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem("bvb-lab", JSON.stringify({ cash, portfolio }));
  }, [cash, portfolio, hydrated]);

  const prices = useMemo(() => Object.fromEntries(instruments.map((item) => [item.ticker, sandboxPrice(item, now)])), [now]);
  const position = portfolio[active.ticker] ?? { quantity: 0, average: 0 };
  const activePrice = prices[active.ticker];
  const positionValue = position.quantity * activePrice;
  const activePnl = position.quantity * (activePrice - position.average);
  const invested = Object.entries(portfolio).reduce((total, [ticker, item]) => total + item.quantity * (prices[ticker] ?? 100), 0);
  const totalPnl = Object.entries(portfolio).reduce((total, [ticker, item]) => total + item.quantity * ((prices[ticker] ?? 100) - item.average), 0);
  const equity = cash + invested;

  const trade = (side: 1 | -1, amount: number) => {
    const delta = side * amount;
    const nextQuantity = position.quantity + delta;
    const cost = delta * activePrice;
    if (side === 1 && cost > cash) {
      setMessage("Not enough sandbox cash for that order.");
      return;
    }
    const nextAverage = nextQuantity === 0
      ? 0
      : position.quantity === 0 || Math.sign(position.quantity) === Math.sign(delta)
        ? (Math.abs(position.quantity) * position.average + Math.abs(delta) * activePrice) / Math.abs(nextQuantity)
        : Math.abs(nextQuantity) < Math.abs(position.quantity) ? position.average : activePrice;
    setCash((value) => value - cost);
    setPortfolio((value) => ({ ...value, [active.ticker]: { quantity: nextQuantity, average: Number(nextAverage.toFixed(2)) } }));
    setMessage(`${side === 1 ? "Bought" : "Sold short"} ${amount} ${active.ticker} at ${format(activePrice)} sandbox points.`);
  };

  const reset = () => {
    setCash(initialCash);
    setPortfolio({});
    setMessage("Sandbox account reset to 10,000 points.");
  };

  return <main className="lab">
    <header className="lab-header"><a className="mark" href="/">bvb<span>.lol</span></a><div className="lab-title"><span className="lab-dot" /> SYNTHETIC LAB <small>PAPER MARKET</small></div><nav><a href="/terminal">Real terminal</a><a href="/">About</a></nav></header>
    <div className="lab-banner"><span>SIMULATION ONLY</span> These instruments are fictional sandbox units. They are not shares, tokens, securities or an offer to invest.</div>
    <section className="lab-intro"><div><p className="lab-eyebrow">Explore the Romanian market</p><h1>Trade the market<br /><em>before you trade it.</em></h1><p>Build a paper portfolio around BVB names, test long and short ideas, and see how a crypto-native market experience could feel—without deposits or withdrawals.</p></div><div className="account-card"><label>YOUR SANDBOX EQUITY</label><strong>{format(equity)}</strong><span>points · virtual balance</span><div><small>AVAILABLE CASH</small><b>{format(cash)}</b></div></div></section>
    <section className="lab-grid"><aside className="lab-watch"><label>INSTRUMENTS <span>5</span></label>{instruments.map((item) => <button key={item.ticker} className={item.ticker === active.ticker ? "active" : ""} onClick={() => setActive(item)}><i className={`instrument-icon ${item.tone}`} /> <span><b>{item.ticker}</b><small>{item.name}</small></span><strong>{format(prices[item.ticker])}</strong></button>)}<div className="lab-note"><b>WHY SYNTHETIC?</b><p>A safe place to learn market mechanics while the real terminal stays read-only.</p></div></aside>
      <section className="lab-main"><div className="instrument-head"><div><span className="sim-chip">SIMULATED</span><h2>{active.ticker} <small>{active.name}</small></h2></div><div className={activePnl >= 0 ? "pnl positive" : "pnl negative"}><small>POSITION P&amp;L</small><b>{activePnl >= 0 ? "+" : ""}{format(activePnl)}</b></div></div><div className="lab-chart"><div className="chart-label"><span>SANDBOX PRICE</span><b>{format(activePrice)}</b><i>updates every 10s</i></div><svg viewBox="0 0 800 270" preserveAspectRatio="none" role="img" aria-label="Simulated price chart"><path className="chart-fill" d="M0 185 C50 180 75 205 120 180 S185 130 230 155 S295 220 345 170 S410 100 455 140 S520 190 565 130 S625 70 675 110 S745 135 800 75 L800 270 L0 270Z" /><path className="chart-line" d="M0 185 C50 180 75 205 120 180 S185 130 230 155 S295 220 345 170 S410 100 455 140 S520 190 565 130 S625 70 675 110 S745 135 800 75" /></svg><div className="chart-axis"><span>09:00</span><span>12:00</span><span>15:00</span><span>NOW</span></div></div><div className="trade-box"><div><label>YOUR POSITION</label><strong>{position.quantity > 0 ? "+" : ""}{position.quantity} {active.ticker}</strong><span>avg. entry {position.average ? format(position.average) : "—"}</span></div><div className="trade-actions"><button onClick={() => trade(-1, 1)}>− 1 SHORT</button><button className="buy" onClick={() => trade(1, 1)}>+ 1 LONG</button><div><button onClick={() => trade(-1, 10)}>−10</button><button onClick={() => trade(1, 10)}>+10</button></div></div></div><p className="trade-message">{message}</p></section>
      <aside className="lab-summary"><label>PORTFOLIO <button onClick={reset}>RESET</button></label><div className="summary-number"><small>TOTAL P&amp;L</small><b className={totalPnl >= 0 ? "positive" : "negative"}>{totalPnl >= 0 ? "+" : ""}{format(totalPnl)}</b></div>{instruments.filter((item) => portfolio[item.ticker]?.quantity).map((item) => <button className="holding" key={item.ticker} onClick={() => setActive(item)}><span><b>{item.ticker}</b><small>{portfolio[item.ticker].quantity} units</small></span><strong>{format((prices[item.ticker] - portfolio[item.ticker].average) * portfolio[item.ticker].quantity)}</strong></button>)}{!Object.keys(portfolio).length && <p className="empty">No positions yet.<br />Choose an instrument and take a view.</p>}<div className="settlement"><span>SETTLEMENT</span><b>VIRTUAL POINTS</b><small>Local to this browser · no wallet connected</small></div></aside>
    </section>
    <footer className="lab-footer"><span>● SANDBOX MARKET · NOT REAL-TIME DATA</span><span>Read-only BVB data remains in the real terminal</span><a href="/terminal">Open real terminal ↗</a></footer>
  </main>;
}
