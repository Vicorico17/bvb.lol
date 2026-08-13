# bvb.lol

The open-source BVB terminal Romania deserves.

`bvb.lol` makes the Bucharest Stock Exchange easier to follow: clean instrument pages, market context, issuer filings and dividend events in one place.

## Principles

- **Open source and free to use**
- **Read-only:** no brokerage, custody, order routing or investment advice
- **Context over noise:** price moves accompanied by filings, events and liquidity signals
- **Data rights first:** no scraping or redistribution of BVB market data without permission

## Data policy

The current interface contains demo data. The production app must only display data where its source and redistribution terms are known. BVB offers delayed data on its public site and licenses delayed and real-time redistribution separately. See [BVB's data-vending information](https://www.bvb.ro/Services/DataVending/ForDataVendors).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Contributing

Issues and pull requests are welcome. Good first contributions include Romanian/English copy, accessibility, issuer-event parsers, and clearly licensed data adapters.

## Disclaimer

Not affiliated with Bursa de Valori București. Nothing here is investment advice.
