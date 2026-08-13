const stocks = [
  { ticker: "H2O", name: "Hidroelectrica" },
  { ticker: "TLV", name: "Banca Transilvania" },
  { ticker: "SNP", name: "OMV Petrom" },
  { ticker: "SNG", name: "Romgaz" }
];

export default function Home() {
  return <main>
    <nav>
      <a className="wordmark" href="#top">bvb<span>.lol</span></a>
      <div className="nav-links"><a href="#markets">Markets</a><a href="#why">Why bvb.lol</a><a href="https://github.com" target="_blank">GitHub ↗</a></div>
      <a className="watch-button" href="/terminal">Open terminal <span>↗</span></a>
    </nav>

    <section className="hero" id="top">
      <p className="eyebrow"><i /> BVB, with signal</p>
      <h1>The Bucharest market,<br /><em>without the headache.</em></h1>
      <p className="intro">A faster, clearer, open-source way to follow Romanian stocks. Built for investors who are tired of terminals from another decade.</p>
      <div className="hero-actions"><a className="button primary" href="/terminal">Open the terminal <span>↗</span></a><a className="button subtle" href="#why">How it works <span>→</span></a></div>
      <div className="ticker-strip"><span><b>H2O</b> Hidroelectrica</span><span><b>TLV</b> Banca Transilvania</span><span><b>SNP</b> OMV Petrom</span><small>Actual quotes available in the terminal via TradingView</small></div>
    </section>

    <section className="markets section" id="markets">
      <div className="section-head"><div><p className="eyebrow"><i /> Market pulse</p><h2>The names everyone’s watching.</h2></div><a href="#all">View all instruments <span>→</span></a></div>
      <div className="market-grid">
        <article className="featured-card"><div className="stock-top"><span className="chip">H2O</span><span className="live"><i /> AVAILABLE</span></div><p className="company">Hidroelectrica</p><div className="price-line"><b>Actual BVB chart</b></div><p className="intro">Open the terminal for current price, change, candles and TradingView market information.</p><div className="feature-meta"><a className="text-link" href="/terminal">Open H2O <span>→</span></a></div></article>
        <div className="stock-list">{stocks.slice(1).map((stock) => <article className="stock-row" key={stock.ticker}><div className="ticker"><span>{stock.ticker}</span><p>{stock.name}</p></div><div /><div className="row-price"><small>BVB</small></div><div className="change up"><a href="/terminal">View →</a></div></article>)}</div>
      </div>
    </section>

    <section className="signal section" id="why"><div className="signal-copy"><p className="eyebrow"><i /> Real data, clear provenance</p><h2>See the market.<br />Know the source.</h2><p>The terminal now uses TradingView’s official widgets for actual BVB prices and charts. Level 2 depth stays unavailable until direct BVB redistribution is licensed.</p><a className="text-link" href="/terminal">Open the terminal <span>→</span></a></div><div className="signal-card"><div className="card-label">DATA STATUS</div><h3>No invented market figures.</h3><p>Current charts are hosted by TradingView. Every unavailable feed is labelled instead of filled with demo values.</p><div className="mini-stats"><span>PRICES & CHARTS <b>TradingView</b></span><span>LEVEL 2 <b>Pending BVB</b></span></div><div className="source">Read-only market display <span>↗</span></div></div></section>

    <section className="open section"><p className="eyebrow"><i /> Built in public</p><h2>Romania deserves better<br />market tools.</h2><p>Free to use. Open source. No brokerage, no trade execution, no dark patterns.</p><div className="open-actions"><a className="button primary" href="https://github.com" target="_blank">Star on GitHub <span>↗</span></a><a className="button outline" href="mailto:hello@bvb.lol">Help build it <span>→</span></a></div></section>

    <footer><a className="wordmark" href="#top">bvb<span>.lol</span></a><span>Not affiliated with BVB. Market data may be delayed.</span><span>Made for Romanian investors.</span></footer>
  </main>;
}
