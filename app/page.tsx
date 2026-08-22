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
      <a className="watch-button" href="/lab">Explore synthetic lab <span>↗</span></a>
    </nav>

    <section className="hero" id="top">
      <p className="eyebrow"><i /> BVB, with signal</p>
      <h1>The Bucharest market,<br /><em>without the headache.</em></h1>
      <p className="intro">A faster, clearer, open-source way to follow Romanian stocks. Built for investors who are tired of terminals from another decade.</p>
      <div className="hero-actions"><a className="button primary" href="/terminal">Open the terminal <span>↗</span></a><a className="button subtle" href="/lab">Try Synthetic Lab <span>→</span></a></div>
      <div className="ticker-strip"><span><b>H2O</b> Hidroelectrica</span><span><b>TLV</b> Banca Transilvania</span><span><b>SNP</b> OMV Petrom</span><small>Actual quotes available in the terminal via TradingView</small></div>
    </section>

    <section className="markets section" id="markets">
      <div className="section-head"><div><p className="eyebrow"><i /> Market pulse</p><h2>The names everyone’s watching.</h2></div><a href="#all">View all instruments <span>→</span></a></div>
      <div className="market-grid">
        <article className="featured-card"><div className="stock-top"><span className="chip">H2O</span><span className="live"><i /> AVAILABLE</span></div><p className="company">Hidroelectrica</p><div className="price-line"><b>Actual BVB chart</b></div><p className="intro">Open the terminal for current price, change, candles and TradingView market information.</p><div className="feature-meta"><a className="text-link" href="/terminal">Open H2O <span>→</span></a></div></article>
        <div className="stock-list">{stocks.slice(1).map((stock) => <article className="stock-row" key={stock.ticker}><div className="ticker"><span>{stock.ticker}</span><p>{stock.name}</p></div><div /><div className="row-price"><small>BVB</small></div><div className="change up"><a href="/terminal">View →</a></div></article>)}</div>
      </div>
    </section>

    <section className="signal section" id="why"><div className="signal-copy"><p className="eyebrow"><i /> Two ways to explore</p><h2>See the market.<br />Then test it.</h2><p>The real terminal uses TradingView’s official widgets for actual BVB prices and charts. Synthetic Lab is a separate paper market for testing ideas with virtual points.</p><a className="text-link" href="/lab">Try Synthetic Lab <span>→</span></a></div><div className="signal-card"><div className="card-label">DATA STATUS</div><h3>No invented market figures in the terminal.</h3><p>Real charts remain clearly sourced. The lab labels every price as simulated and keeps the sandbox local to your browser.</p><div className="mini-stats"><span>REAL TERMINAL <b>TradingView</b></span><span>SYNTHETIC LAB <b>Virtual points</b></span></div><div className="source">Read-only by design <span>↗</span></div></div></section>

    <section className="open section"><p className="eyebrow"><i /> Built in public</p><h2>Romania deserves better<br />market tools.</h2><p>Free to use. Open source. No brokerage, no trade execution, no dark patterns.</p><div className="open-actions"><a className="button primary" href="/lab">Explore the lab <span>↗</span></a><a className="button outline" href="https://github.com" target="_blank">Star on GitHub <span>↗</span></a></div></section>

    <footer><a className="wordmark" href="#top">bvb<span>.lol</span></a><span>Not affiliated with BVB. Market data may be delayed.</span><span>Made for Romanian investors.</span></footer>
  </main>;
}
