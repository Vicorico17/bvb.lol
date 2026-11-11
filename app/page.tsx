import Link from "next/link";
import { allFeaturedInstruments } from "@/lib/bvb-instruments";

const repository = "https://github.com/Vicorico17/bvb.lol";
const companies = [
  { ticker: "H2O", name: "Hidroelectrica", sector: "Hydropower", icon: "≈" },
  { ticker: "TLV", name: "Banca Transilvania", sector: "Banking", icon: "▥" },
  { ticker: "SNP", name: "OMV Petrom", sector: "Energy", icon: "↗" },
  { ticker: "SNG", name: "Romgaz", sector: "Natural gas", icon: "◇" },
];

export default function Home() {
  return (
    <main className="home" id="main-content">
      <nav className="home-nav" aria-label="Main navigation">
        <Link className="wordmark" href="/" aria-label="bvb.lol home">bvb<span>.lol</span></Link>
        <div className="nav-links"><a href="#markets">The market</a><a href="#why">The idea</a><a href={repository} target="_blank" rel="noopener noreferrer">GitHub ↗</a></div>
        <Link className="button primary nav-cta" href="/terminal">Open terminal <span aria-hidden="true">↗</span></Link>
      </nav>
      <section className="hero">
        <div className="hero-copy">
          <p className="eyebrow"><i /> A fresh perspective on BVB</p>
          <h1>Local market.<br />Bigger <em>picture.</em></h1>
          <p className="intro">Get to know the companies shaping Romania. Clear charts, company fundamentals, and room to explore. All in one open-source terminal.</p>
          <div className="hero-actions"><Link className="button primary" href="/terminal">Explore the market <span aria-hidden="true">↗</span></Link><Link className="button subtle" href="/lab">Try the paper market <span aria-hidden="true">→</span></Link></div>
          <p className="hero-note">Free to use <span>·</span> No account needed <span>·</span> Built in public</p>
        </div>
        <div className="market-atlas" aria-label="An introduction to the Bucharest market">
          <div className="atlas-top"><span>BUCHAREST STOCK EXCHANGE</span><span>RO / BVB</span></div>
          <div className="atlas-art" aria-hidden="true"><div className="orbit orbit-one" /><div className="orbit orbit-two" /><div className="orbit orbit-three" /><div className="atlas-core">B<span>VB</span><small>BUCHAREST</small></div><span className="atlas-coordinate">44°26′ N<br />26°06′ E</span><span className="atlas-cross">+</span></div>
          <div className="atlas-bottom"><span>A market worth knowing.</span><Link href="/terminal" aria-label="Explore BVB companies">↗</Link></div>
        </div>
      </section>
      <div className="market-ribbon"><span className="ribbon-title">YOUR MARKET, IN FOCUS</span><span><b>{allFeaturedInstruments.length}</b> companies to explore</span><span>Charts by <b>TradingView</b></span><span><i /> Real market. Clear sources.</span></div>
      <section className="section markets" id="markets">
        <div className="section-head"><div><p className="eyebrow">01 / Meet the market</p><h2>Big names. Closer look.</h2></div><Link className="text-link" href="/terminal">Browse all companies <span aria-hidden="true">→</span></Link></div>
        <div className="company-grid">{companies.map((company, index) => (
          <Link className="company-card" key={company.ticker} href={`/terminal?symbol=${company.ticker}`}>
            <div className="company-card-top"><span className={`company-icon icon-${index}`} aria-hidden="true">{company.icon}</span><span className="company-exchange">BVB</span></div>
            <p className="company-sector">{company.sector}</p><h3>{company.name}</h3>
            <div className="company-card-bottom"><span>{company.ticker}</span><span aria-label="View company">↗</span></div>
          </Link>
        ))}</div>
        <p className="market-caption">Prices and financials are provided in the terminal by TradingView. Availability and delays vary by instrument.</p>
      </section>
      <section className="section signal" id="why">
        <div className="signal-copy"><p className="eyebrow">02 / Less friction. More perspective.</p><h2>A little clarity<br />goes a <em>long way.</em></h2><p>Following Romanian companies should feel straightforward. We bring the essentials together, with the source always in sight.</p><Link className="text-link" href="/terminal">Find your starting point <span aria-hidden="true">↗</span></Link></div>
        <div className="feature-list"><article><span>01</span><div><h3>The company behind the ticker.</h3><p>Move from price charts to business profiles and financials in the same workspace.</p></div></article><article><span>02</span><div><h3>Real sources. Honest limits.</h3><p>Official TradingView widgets power the terminal. Unavailable data stays clearly marked.</p></div></article><article><span>03</span><div><h3>Curiosity, without a deposit.</h3><p>Explore long and short positions in a separate, clearly labelled simulation with virtual points.</p><Link href="/lab">Enter Synthetic Lab →</Link></div></article></div>
      </section>
      <section className="section open"><p className="eyebrow">03 / Built in public, for everyone</p><h2>Romania deserves<br />better market tools.</h2><p>This is our contribution. Make it yours, too.</p><div className="open-actions"><Link className="button primary" href="/terminal">Open the terminal <span aria-hidden="true">↗</span></Link><a className="button outline" href={repository} target="_blank" rel="noopener noreferrer">Explore the code <span aria-hidden="true">↗</span></a></div><span className="open-footnote">Open source. Read-only. Always curious.</span></section>
      <footer className="home-footer"><Link className="wordmark" href="/">bvb<span>.lol</span></Link><p>Independent project. Not affiliated with BVB.<br />Market data may be delayed. Not investment advice.</p><a href={repository} target="_blank" rel="noopener noreferrer">Made in the open ↗</a></footer>
    </main>
  );
}
