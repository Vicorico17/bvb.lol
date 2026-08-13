const stocks = [
  { ticker: "H2O", name: "Hidroelectrica", price: "187.00", change: "+1.08%", volume: "4.2M RON", tone: "up" },
  { ticker: "TLV", name: "Banca Transilvania", price: "32.42", change: "+0.62%", volume: "12.8M RON", tone: "up" },
  { ticker: "SNP", name: "OMV Petrom", price: "0.8860", change: "−0.22%", volume: "8.7M RON", tone: "down" },
  { ticker: "SNG", name: "Romgaz", price: "8.11", change: "+0.12%", volume: "2.1M RON", tone: "up" }
];

function Sparkline({ tone }: { tone: string }) {
  return <svg className={`spark ${tone}`} viewBox="0 0 100 30" aria-hidden="true"><path d={tone === "down" ? "M1 7 C15 5 18 17 30 13 S47 18 57 15 S70 28 80 21 S91 25 99 27" : "M1 24 C10 20 15 25 25 19 S38 22 46 13 S61 16 69 10 S80 14 87 5 S95 8 99 2"} /></svg>;
}

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
      <div className="ticker-strip"><span><b>BET</b> 22,114.60 <strong>+0.54%</strong></span><span><b>BET-TR</b> 48,205.10 <strong>+0.55%</strong></span><span><b>BET-NG</b> 1,641.20 <strong>+0.33%</strong></span><small>Data delayed · demo preview</small></div>
    </section>

    <section className="markets section" id="markets">
      <div className="section-head"><div><p className="eyebrow"><i /> Market pulse</p><h2>The names everyone’s watching.</h2></div><a href="#all">View all instruments <span>→</span></a></div>
      <div className="market-grid">
        <article className="featured-card"><div className="stock-top"><span className="chip">H2O</span><span className="live"><i /> OPEN</span></div><p className="company">Hidroelectrica</p><div className="price-line"><b>187.00</b><span>RON</span><strong>+1.08%</strong></div><Sparkline tone="up" /><div className="feature-meta"><span>Today’s range <b>185.80—188.40</b></span><span>Dividend yield <b>5.12%</b></span></div></article>
        <div className="stock-list">{stocks.slice(1).map((stock) => <article className="stock-row" key={stock.ticker}><div className="ticker"><span>{stock.ticker}</span><p>{stock.name}</p></div><Sparkline tone={stock.tone} /><div className="row-price"><b>{stock.price}</b><small>RON</small></div><div className={`change ${stock.tone}`}>{stock.change}<small>{stock.volume}</small></div></article>)}</div>
      </div>
    </section>

    <section className="signal section" id="why"><div className="signal-copy"><p className="eyebrow"><i /> Less noise, more signal</p><h2>Know what moved.<br />Know what’s next.</h2><p>Price changes mean very little without context. bvb.lol puts filings, dividends, earnings, volume and liquidity together—where they belong.</p><a className="text-link" href="#market">See the H2O story <span>→</span></a></div><div className="signal-card"><div className="card-label">H2O · Today</div><h3>Hidroelectrica rises 1.08%</h3><p>Higher-than-normal activity ahead of the 2025 dividend ex-date.</p><div className="mini-stats"><span>VOLUME <b>1.7× normal</b></span><span>EX-DATE <b>08 Sep</b></span></div><div className="source">Source: BVB disclosures <span>↗</span></div></div></section>

    <section className="open section"><p className="eyebrow"><i /> Built in public</p><h2>Romania deserves better<br />market tools.</h2><p>Free to use. Open source. No brokerage, no trade execution, no dark patterns.</p><div className="open-actions"><a className="button primary" href="https://github.com" target="_blank">Star on GitHub <span>↗</span></a><a className="button outline" href="mailto:hello@bvb.lol">Help build it <span>→</span></a></div></section>

    <footer><a className="wordmark" href="#top">bvb<span>.lol</span></a><span>Not affiliated with BVB. Market data may be delayed.</span><span>Made for Romanian investors.</span></footer>
  </main>;
}
