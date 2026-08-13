"use client";

import { useMemo, useState } from "react";
import { TradingViewWidget } from "@/app/components/tradingview-widget";
import "./terminal.css";

const symbols = [
  { symbol: "BVB:H2O", ticker: "H2O", name: "Hidroelectrica" },
  { symbol: "BVB:TLV", ticker: "TLV", name: "Banca Transilvania" },
  { symbol: "BVB:SNP", ticker: "SNP", name: "OMV Petrom" },
  { symbol: "BVB:SNG", ticker: "SNG", name: "Romgaz" },
  { symbol: "BVB:SNN", ticker: "SNN", name: "Nuclearelectrica" },
];

export default function Terminal() {
  const [active, setActive] = useState(symbols[0]);
  const chartConfig = useMemo(() => ({
    autosize: true,
    symbol: active.symbol,
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
    symbol: active.symbol,
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
      symbols: symbols.map((item) => ({ s: item.symbol, d: item.ticker })),
    }],
  }), []);

  return <main className="terminal real-terminal">
    <header><a className="mark" href="/">bvb<span>.lol</span></a><div className="selector"><b>{active.ticker}</b> {active.name}</div><div className="headTools"><a href="https://github.com/Vicorico17/bvb.lol" target="_blank">GitHub ↗</a><span className="lime">ACTUAL MARKET DATA</span></div></header>
    <div className="real-source"><span>Market data and charts provided by TradingView</span><span>Quotes may be delayed according to exchange rules</span><a href={`https://www.tradingview.com/symbols/${active.symbol.replace(":", "-")}/`} target="_blank">Open source page ↗</a></div>
    <div className="real-layout">
      <aside className="real-watchlist"><label>BVB INSTRUMENTS</label>{symbols.map((item) => <button className={item.symbol === active.symbol ? "current" : ""} onClick={() => setActive(item)} key={item.symbol}><b>{item.ticker}</b><span>{item.name}</span></button>)}<div className="watch-widget"><TradingViewWidget kind="market-overview" config={overviewConfig} /></div></aside>
      <section className="real-main"><div className="live-symbol"><TradingViewWidget key={`info-${active.symbol}`} kind="symbol-info" config={infoConfig} /></div><div className="live-chart"><TradingViewWidget key={`chart-${active.symbol}`} kind="advanced-chart" config={chartConfig} /></div></section>
      <aside className="real-side"><label>MARKET DEPTH</label><div className="unavailable"><i>LEVEL 2</i><h2>Order book awaiting BVB licence</h2><p>We will not simulate bid/ask depth. WebTop5 will be connected here after BVB grants redistribution rights.</p><a href="https://www.bvb.ro/Services/DataVending/ForProfessionals" target="_blank">BVB data products ↗</a></div><label>DATA STATUS</label><dl><div><dt>Prices & chart</dt><dd className="okay">ACTUAL</dd></div><div><dt>Provider</dt><dd>TradingView</dd></div><div><dt>Order book</dt><dd className="pending">PENDING</dd></div><div><dt>Trade execution</dt><dd>READ-ONLY</dd></div></dl></aside>
    </div>
    <footer><span>● ACTUAL BVB DATA VIA TRADINGVIEW</span><span>Read-only workspace · Not investment advice</span><a href="/">About bvb.lol ↗</a></footer>
  </main>;
}
