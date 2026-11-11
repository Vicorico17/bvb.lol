"use client";

import { useEffect, useMemo, useState } from "react";
import "./lab.css";

import Link from "next/link";
import { emptyAccount, executeTrade, instruments, priceHistory, restoreAccount, sandboxPrice } from "@/lib/sandbox";

const selectedDefault = instruments[0];

function format(value: number) {
  return value.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function SyntheticLab() {
  const [active, setActive] = useState(selectedDefault);
  const [account, setAccount] = useState(emptyAccount);
  const { cash, portfolio } = account;
  const [now, setNow] = useState(0);
  const [storageWarning, setStorageWarning] = useState("");
  const [confirmReset, setConfirmReset] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const [message, setMessage] = useState("Sandbox account ready.");

  useEffect(() => {
    // Initialize after hydration so server and first client render agree.
    const timer = window.setTimeout(() => {
      try { setAccount(restoreAccount(window.localStorage.getItem("bvb-lab"))); }
      catch { setStorageWarning("Browser storage is unavailable. This session will not be saved."); }
      setNow(Date.now());
      setHydrated(true);
    }, 0);
    const clock = window.setInterval(() => setNow(Date.now()), 10000);
    return () => { window.clearTimeout(timer); window.clearInterval(clock); };
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try { window.localStorage.setItem("bvb-lab", JSON.stringify({ version: 1, ...account })); }
    catch {
      const timer = window.setTimeout(() => setStorageWarning("Your browser could not save this portfolio. Changes will last for this session only."), 0);
      return () => window.clearTimeout(timer);
    }
  }, [account, hydrated]);

  const prices = useMemo(() => Object.fromEntries(instruments.map((item) => [item.ticker, sandboxPrice(item, now)])), [now]);
  const position = portfolio[active.ticker] ?? { quantity: 0, average: 0 };
  const activePrice = prices[active.ticker];
  const activePnl = position.quantity * (activePrice - position.average);
  const invested = Object.entries(portfolio).reduce((total, [ticker, item]) => total + item.quantity * (prices[ticker] ?? 100), 0);
  const equity = cash + invested;
  const totalPnl = equity - 10000;
  const history = useMemo(() => priceHistory(active, now), [active, now]);
  const low = Math.min(...history) - 0.1;
  const high = Math.max(...history) + 0.1;
  const chartPath = history.map((price, index) => `${index === 0 ? "M" : "L"}${(index / 60 * 800).toFixed(1)} ${(240 - (price - low) / (high - low) * 210).toFixed(1)}`).join(" ");

  const trade = (side: 1 | -1, amount: number) => {
    if (!hydrated) return;
    try {
      const next = executeTrade(account, active.ticker, side * amount, activePrice);
      setAccount(next);
      setMessage(`${side === 1 ? "Bought" : "Sold"} ${amount} ${active.ticker} at ${format(activePrice)} sandbox points.`);
    } catch (error) { setMessage(error instanceof Error ? error.message : "Order could not be completed."); }
  };

  const reset = () => {
    setAccount(emptyAccount());
    setConfirmReset(false);
    setMessage("Sandbox account reset to 10,000 points.");
  };

  return <main className="lab" id="main-content">
    <header className="lab-header"><Link className="mark" href="/">bvb<span>.lol</span></Link><div className="lab-title"><span className="lab-dot" /> SYNTHETIC LAB <small>PAPER MARKET</small></div><nav><Link href="/terminal">Real terminal</Link><Link href="/">About</Link></nav></header>
    <div className="lab-banner"><span>SIMULATION ONLY</span> These instruments are fictional sandbox units. They are not shares, tokens, securities or an offer to invest.</div>
    <section className="lab-intro"><div><p className="lab-eyebrow">Explore the Romanian market</p><h1>Trade the market<br /><em>before you trade it.</em></h1><p>Build a paper portfolio around BVB names, test long and short ideas, and follow your results with virtual points. Prices are generated for practice and do not track the real companies.</p></div><div className="account-card"><label>YOUR SANDBOX EQUITY</label><strong>{hydrated ? format(equity) : "—"}</strong><span>points · virtual balance</span><div><small>AVAILABLE CASH</small><b>{hydrated ? format(cash) : "—"}</b></div></div></section>
    <section className="lab-grid"><aside className="lab-watch"><label>INSTRUMENTS <span>5</span></label>{instruments.map((item) => <button key={item.ticker} className={item.ticker === active.ticker ? "active" : ""} aria-pressed={item.ticker === active.ticker} onClick={() => setActive(item)}><i className={`instrument-icon ${item.tone}`} /> <span><b>{item.ticker}</b><small>{item.name}</small></span><strong>{hydrated ? format(prices[item.ticker]) : "—"}</strong></button>)}<div className="lab-note"><b>WHY SYNTHETIC?</b><p>A safe place to learn market mechanics while the real terminal stays read-only.</p></div></aside>
      <section className="lab-main"><div className="instrument-head"><div><span className="sim-chip">SIMULATED</span><h2>{active.ticker} <small>{active.name}</small></h2></div><div className={activePnl >= 0 ? "pnl positive" : "pnl negative"}><small>POSITION P&amp;L</small><b>{activePnl >= 0 ? "+" : ""}{format(activePnl)}</b></div></div><div className="lab-chart"><div className="chart-label"><span>SANDBOX PRICE</span><b>{hydrated ? format(activePrice) : "—"}</b><i>updates every 10s</i></div><svg viewBox="0 0 800 270" preserveAspectRatio="none" role="img" aria-label={`${active.ticker} simulated prices over the last 60 minutes; low ${format(Math.min(...history))}, high ${format(Math.max(...history))}`}>{hydrated && <><path className="chart-fill" d={`${chartPath} L800 270 L0 270Z`} /><path className="chart-line" d={chartPath} /></>}</svg><div className="chart-axis"><span>60 MIN AGO</span><span>40 MIN AGO</span><span>20 MIN AGO</span><span>NOW</span></div></div><div className="trade-box"><div><label>YOUR POSITION</label><strong>{position.quantity > 0 ? "+" : ""}{position.quantity} {active.ticker}</strong><span>avg. entry {position.average ? format(position.average) : "—"}</span></div><div className="trade-actions"><button disabled={!hydrated} onClick={() => trade(-1, 1)}>SELL / SHORT 1</button><button disabled={!hydrated} className="buy" onClick={() => trade(1, 1)}>BUY / COVER 1</button><div><button disabled={!hydrated} onClick={() => trade(-1, 10)}>−10</button><button disabled={!hydrated} onClick={() => trade(1, 10)}>+10</button></div></div></div><p className="trade-message" role="status">{message}</p>{storageWarning && <p className="storage-warning" role="alert">{storageWarning}</p>}</section>
      <aside className="lab-summary"><div className="portfolio-heading">PORTFOLIO <button disabled={!hydrated} onClick={() => setConfirmReset(true)}>RESET</button></div>{confirmReset && <div className="reset-confirm" role="group" aria-label="Confirm portfolio reset"><p>Clear all positions and start with 10,000 points?</p><button onClick={reset}>Reset portfolio</button><button onClick={() => setConfirmReset(false)}>Keep portfolio</button></div>}<div className="summary-number"><small>TOTAL P&amp;L</small><b className={totalPnl >= 0 ? "positive" : "negative"}>{totalPnl >= 0 ? "+" : ""}{format(totalPnl)}</b></div>{instruments.filter((item) => portfolio[item.ticker]?.quantity).map((item) => <button className="holding" key={item.ticker} onClick={() => setActive(item)}><span><b>{item.ticker}</b><small>{portfolio[item.ticker].quantity} units</small></span><strong className={(prices[item.ticker] - portfolio[item.ticker].average) * portfolio[item.ticker].quantity >= 0 ? "positive" : "negative"}>{format((prices[item.ticker] - portfolio[item.ticker].average) * portfolio[item.ticker].quantity)}</strong></button>)}{!Object.values(portfolio).some((item) => item.quantity !== 0) && <p className="empty">No positions yet.<br />Choose an instrument and take a view.</p>}<div className="settlement"><span>SETTLEMENT</span><b>VIRTUAL POINTS</b><small>Local to this browser · no wallet connected</small></div></aside>
    </section>
    <footer className="lab-footer"><span>● SANDBOX MARKET · NOT REAL-TIME DATA</span><span>Read-only BVB data remains in the real terminal</span><Link href="/terminal">Open real terminal ↗</Link></footer>
  </main>;
}
