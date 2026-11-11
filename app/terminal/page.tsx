"use client";

import { FormEvent, Suspense, useMemo, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { TradingViewWidget } from "@/app/components/tradingview-widget";
import { allFeaturedInstruments, type BvbInstrument } from "@/lib/bvb-instruments";
import "./terminal.css";

const initial = allFeaturedInstruments.find((item) => item.ticker === "H2O")!;
const tvSymbol = (item: Pick<BvbInstrument, "ticker">) => `BVB:${item.ticker}`;

export default function Terminal() {
  return <Suspense fallback={<main className="terminal terminal-loading" id="main-content"><p>Opening your market workspace…</p></main>}><TerminalWorkspace /></Suspense>;
}

function TerminalWorkspace() {
  const params = useSearchParams();
  const symbol = (params.get("symbol") ?? "H2O").trim().toUpperCase();
  const active = useMemo(() => allFeaturedInstruments.find((item) => item.ticker === symbol)
    ?? (/^[A-Z0-9.-]{1,16}$/.test(symbol) ? { ticker: symbol, name: symbol, market: "Lookup" } : initial), [symbol]);
  const setActive = (item: { ticker: string }) => {
    if (item.ticker === active.ticker) return;
    const next = new URLSearchParams(params.toString());
    next.set("symbol", item.ticker);
    window.history.pushState(null, "", `?${next}`);
  };
  const [market, setMarket] = useState("All");
  const [searchError, setSearchError] = useState("");
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ro");
    return allFeaturedInstruments.filter((item) =>
      (market === "All" || item.market === market) && (item.ticker.toLowerCase().includes(needle) || item.name.toLocaleLowerCase("ro").includes(needle)),
    );
  }, [query, market]);
  const selectTicker = (event: FormEvent) => {
    event.preventDefault();
    const ticker = query.trim().toUpperCase();
    const match = allFeaturedInstruments.find((item) => item.ticker === ticker);
    if (match) { setActive(match); setSearchError(""); return; }
    if (visible.length === 1) { setActive(visible[0]); setSearchError(""); return; }
    if (!/^[A-Z0-9.-]{1,16}$/.test(ticker)) {
      setSearchError("Choose a company below or enter a valid BVB ticker.");
      return;
    }
    setActive({ ticker });
    setSearchError("");
  };
  const chartConfig = useMemo(() => ({
    autosize: true,
    symbol: tvSymbol(active),
    interval: "15",
    timezone: "Europe/Bucharest",
    theme: "dark",
    backgroundColor: "rgba(16, 23, 19, 1)",
    gridColor: "rgba(42, 53, 44, 0.45)",
    style: "1",
    locale: "en",
    allow_symbol_change: false,
    calendar: false,
    support_host: "https://www.tradingview.com",
  }), [active]);
  const infoConfig = useMemo(() => ({
    symbol: tvSymbol(active),
    width: "100%",
    locale: "en",
    colorTheme: "dark",
    isTransparent: true,
  }), [active]);
  const detailConfig = useMemo(() => ({ width: "100%", height: "100%", colorTheme: "dark", isTransparent: true, symbol: tvSymbol(active), locale: "en" }), [active]);
  const financialConfig = useMemo(() => ({ width: "100%", height: "100%", colorTheme: "dark", isTransparent: true, displayMode: "adaptive", symbol: tvSymbol(active), locale: "en" }), [active]);

  return <main className="terminal real-terminal" id="main-content">
    <header><Link className="mark" href="/">bvb<span>.lol</span></Link><h1 className="selector"><b>{active.ticker}</b> {active.name}</h1><div className="headTools"><Link href="/lab">Synthetic Lab ↗</Link><a href="https://github.com/Vicorico17/bvb.lol" target="_blank" rel="noopener noreferrer">GitHub ↗</a><span className="lime">ACTUAL MARKET DATA</span></div></header>
    <div className="real-source"><span>Market data and charts provided by TradingView</span><span>Quotes may be delayed according to exchange rules</span><a href={`https://www.tradingview.com/symbols/BVB-${active.ticker}/`} target="_blank" rel="noopener noreferrer">Open source page ↗</a></div>
    <div className="real-layout">
      <aside className="real-watchlist"><label htmlFor="company-search">FIND YOUR NEXT COMPANY</label><form className="symbol-search" onSubmit={selectTicker}><input id="company-search" autoComplete="off" value={query} onChange={(event) => { setQuery(event.target.value); setSearchError(""); }} placeholder="Search name or ticker…" aria-label="Search BVB companies"/><button type="submit" aria-label="Open ticker">↵</button></form><div className="market-filters" aria-label="Filter companies">{["All", "Main", "AeRO"].map((value) => <button key={value} aria-pressed={market === value} onClick={() => setMarket(value)}>{value}</button>)}</div><p className="search-count" role="status">{searchError || `${visible.length} companies`}</p><div className="company-list">{visible.map((item) => <button className={item.ticker === active.ticker ? "current" : ""} aria-pressed={item.ticker === active.ticker} onClick={() => setActive(item)} key={item.ticker}><b>{item.ticker}</b><span>{item.name}</span><i>{item.market}</i></button>)}{visible.length === 0 && <p className="search-empty">No matching companies.<br />Try another name, or press Enter to look up a ticker on TradingView.</p>}</div></aside>
      <section className="real-main"><div className="live-symbol"><TradingViewWidget key={`info-${active.ticker}`} kind="symbol-info" config={infoConfig} /></div><div className="live-chart"><TradingViewWidget key={`chart-${active.ticker}`} kind="advanced-chart" config={chartConfig} /></div><div className="company-data"><section><label>COMPANY PROFILE</label><TradingViewWidget key={`profile-${active.ticker}`} kind="company-profile" config={detailConfig} /></section><section><label>FUNDAMENTALS & FINANCIALS</label><TradingViewWidget key={`financials-${active.ticker}`} kind="financials" config={financialConfig} /></section></div></section>
      <aside className="real-side"><label>MARKET DEPTH</label><div className="unavailable"><i>LEVEL 2</i><h2>Order book awaiting BVB licence</h2><p>We will not simulate bid/ask depth. WebTop5 will be connected here after BVB grants redistribution rights.</p><a href="https://www.bvb.ro/Services/DataVending/ForProfessionals" target="_blank" rel="noopener noreferrer">BVB data products ↗</a></div><label>DATA STATUS</label><dl><div><dt>Prices & chart</dt><dd className="okay">ACTUAL</dd></div><div><dt>Provider</dt><dd>TradingView</dd></div><div><dt>Order book</dt><dd className="pending">PENDING</dd></div><div><dt>Trade execution</dt><dd>READ-ONLY</dd></div></dl></aside>
    </div>
    <footer><span>● ACTUAL BVB DATA VIA TRADINGVIEW</span><span>Read-only workspace · Not investment advice</span><Link href="/">About bvb.lol ↗</Link></footer>
  </main>;
}
