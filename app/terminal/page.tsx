"use client";

import { FormEvent, useMemo, useState } from "react";
import { TradingViewWidget } from "@/app/components/tradingview-widget";
import { allFeaturedInstruments, type BvbInstrument } from "@/lib/bvb-instruments";
import "./terminal.css";

const initial = allFeaturedInstruments.find((item) => item.ticker === "H2O")!;
const tvSymbol = (item: BvbInstrument) => `BVB:${item.ticker}`;

export default function Terminal() {
  const [active, setActive] = useState(initial);
  const [query, setQuery] = useState("");
  const visible = useMemo(() => {
    const needle = query.trim().toLocaleLowerCase("ro");
    if (!needle) return allFeaturedInstruments;
    return allFeaturedInstruments.filter((item) =>
      item.ticker.toLowerCase().includes(needle) || item.name.toLocaleLowerCase("ro").includes(needle),
    );
  }, [query]);
  const selectTicker = (event: FormEvent) => {
    event.preventDefault();
    const ticker = query.trim().toUpperCase();
    if (!/^[A-Z0-9.-]{1,16}$/.test(ticker)) return;
    setActive(allFeaturedInstruments.find((item) => item.ticker === ticker) ?? { ticker, name: ticker, market: "AeRO" });
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
    allow_symbol_change: true,
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
  const overviewConfig = useMemo(() => ({
    colorTheme: "dark",
    dateRange: "1D",
    showChart: true,
    locale: "en",
    width: "100%",
    height: "100%",
    isTransparent: true,
    showSymbolLogo: false,
    tabs: [{
      title: "BVB watchlist",
      symbols: allFeaturedInstruments.slice(0, 30).map((item) => ({ s: tvSymbol(item), d: item.ticker })),
    }],
  }), []);
  const detailConfig = useMemo(() => ({ width: "100%", height: "100%", colorTheme: "dark", isTransparent: true, symbol: tvSymbol(active), locale: "en" }), [active]);
  const financialConfig = useMemo(() => ({ width: "100%", height: "100%", colorTheme: "dark", isTransparent: true, displayMode: "adaptive", symbol: tvSymbol(active), locale: "en" }), [active]);

  return <main className="terminal real-terminal">
    <header><a className="mark" href="/">bvb<span>.lol</span></a><div className="selector"><b>{active.ticker}</b> {active.name}</div><div className="headTools"><a href="/lab">Synthetic Lab ↗</a><a href="https://github.com/Vicorico17/bvb.lol" target="_blank">GitHub ↗</a><span className="lime">ACTUAL MARKET DATA</span></div></header>
    <div className="real-source"><span>Market data and charts provided by TradingView</span><span>Quotes may be delayed according to exchange rules</span><a href={`https://www.tradingview.com/symbols/BVB-${active.ticker}/`} target="_blank">Open source page ↗</a></div>
    <div className="real-layout">
      <aside className="real-watchlist"><label>{allFeaturedInstruments.length} BVB COMPANIES + ANY TICKER</label><form className="symbol-search" onSubmit={selectTicker}><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search name or ticker…" aria-label="Search BVB companies"/><button type="submit">↵</button></form><div className="company-list">{visible.map((item) => <button className={item.ticker === active.ticker ? "current" : ""} onClick={() => setActive(item)} key={item.ticker}><b>{item.ticker}</b><span>{item.name}</span><i>{item.market}</i></button>)}</div><div className="watch-widget"><TradingViewWidget kind="market-overview" config={overviewConfig} /></div></aside>
      <section className="real-main"><div className="live-symbol"><TradingViewWidget key={`info-${active.ticker}`} kind="symbol-info" config={infoConfig} /></div><div className="live-chart"><TradingViewWidget key={`chart-${active.ticker}`} kind="advanced-chart" config={chartConfig} /></div><div className="company-data"><section><label>COMPANY PROFILE</label><TradingViewWidget key={`profile-${active.ticker}`} kind="company-profile" config={detailConfig} /></section><section><label>FUNDAMENTALS & FINANCIALS</label><TradingViewWidget key={`financials-${active.ticker}`} kind="financials" config={financialConfig} /></section></div></section>
      <aside className="real-side"><label>MARKET DEPTH</label><div className="unavailable"><i>LEVEL 2</i><h2>Order book awaiting BVB licence</h2><p>We will not simulate bid/ask depth. WebTop5 will be connected here after BVB grants redistribution rights.</p><a href="https://www.bvb.ro/Services/DataVending/ForProfessionals" target="_blank">BVB data products ↗</a></div><label>DATA STATUS</label><dl><div><dt>Prices & chart</dt><dd className="okay">ACTUAL</dd></div><div><dt>Provider</dt><dd>TradingView</dd></div><div><dt>Order book</dt><dd className="pending">PENDING</dd></div><div><dt>Trade execution</dt><dd>READ-ONLY</dd></div></dl></aside>
    </div>
    <footer><span>● ACTUAL BVB DATA VIA TRADINGVIEW</span><span>Read-only workspace · Not investment advice</span><a href="/">About bvb.lol ↗</a></footer>
  </main>;
}
