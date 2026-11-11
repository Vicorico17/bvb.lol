# bvb.lol

The open-source BVB terminal Romania deserves.

`bvb.lol` makes the Bucharest Stock Exchange easier to follow: clean instrument pages, market context, issuer filings and dividend events in one place.

## Principles

- **Open source and free to use**
- **Read-only:** no brokerage, custody, order routing or investment advice
- **Context over noise:** price moves accompanied by filings, events and liquidity signals
- **Data rights first:** no scraping or redistribution of BVB market data without permission

## Data policy

The interface does not contain demo market figures. Actual BVB prices and charts are displayed through official TradingView widgets. Direct BVB Level 1/Level 2 data remains unavailable until redistribution is licensed. See [BVB's data-vending information](https://www.bvb.ro/Services/DataVending/ForDataVendors).

The app also has a typed provider boundary and a normalized market endpoint at
`GET /api/markets/:symbol` ready for licensed BVB access. Until configured, it
returns unavailable rather than synthetic data. Licensed credentials are never
exposed to the browser. See [the integration guide](docs/DATA_INTEGRATION.md).

The terminal includes the complete BVB regulated-market equity catalogue
captured from BVB on 2026-08-14, frequently followed AeRO issuers, and direct
lookup for any other `BVB:<ticker>` supported by TradingView. Company profiles
and financial statements are displayed through TradingView-hosted widgets.

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Company links such as `/terminal?symbol=TLV` can be bookmarked or shared. Search
by company name or ticker, filter the catalogue by Main/AeRO, or submit a ticker
for direct TradingView lookup. Browser back/forward restores the selected ticker.

The Synthetic Lab stores a versioned portfolio in this browser. Its chart uses
the same generated prices as its orders, and total P&L includes closed positions.
This is a simplified learning sandbox: no fees, margin requirements, liquidity
constraints or real-market price tracking. Reset requires an explicit second click.

## Checks

Use Node.js 22.18+ and run:

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
```

Browser tests use installed Google Chrome and start a local server automatically.
They cover ticker navigation, search, blocked third-party embeds, paper orders,
storage failures, and phone/tablet/desktop layouts. TradingView requests are
blocked in these tests so checks do not depend on exchange or widget availability.

## Contributing

Issues and pull requests are welcome. Good first contributions include Romanian/English copy, accessibility, issuer-event parsers, and clearly licensed data adapters.

## Disclaimer

Not affiliated with Bursa de Valori București. Nothing here is investment advice.

## License

MIT. The software licence does not grant rights to BVB market data, issuer
content, trademarks, or third-party feeds.
