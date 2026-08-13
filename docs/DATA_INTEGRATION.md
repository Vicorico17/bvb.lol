# Market-data integration

## Recommended rollout

1. License BVB WebDelayed and Companies and Securities for the public MVP.
2. Receive the contracted endpoints, credentials, XML schemas and display rules.
3. Complete `BvbMarketDataProvider` using fixtures supplied under the agreement.
4. Run ingestion on the server and expose only normalized, display-ready fields.
5. Add WebTop5 only after authentication and end-user entitlement reporting exist.

## Trust boundary

```text
BVB licensed service
        ↓ private credentials
server-side BVB provider
        ↓ normalized fields only
bvb.lol API route
        ↓
web interface
```

Never commit credentials, raw feed captures or licensed fixtures. Never offer a
bulk download endpoint unless the BVB agreement explicitly permits it.

## Provider selection

The public terminal uses TradingView-hosted widgets for actual BVB charts while
the direct BVB agreement is pending. The normalized API does not fall back to
synthetic values.

After the adapter is completed and credentials are configured in Vercel:

```env
BVB_MARKET_DATA_URL=...
BVB_MARKET_DATA_USERNAME=...
BVB_MARKET_DATA_PASSWORD=...
```

The normalized endpoint is `GET /api/markets/:symbol`. Responses explicitly
identify their source, timestamp, delay and data mode.

## Questions for BVB

- May delayed quotes and intraday trades be displayed to anonymous visitors?
- Can normalized responses be cached at the CDN, and for how long?
- Is historical storage permitted, and what retention period applies?
- May charts be derived from stored data?
- What attribution and delay notice must appear in the interface?
- Are issuer PDFs link-only, or may they be cached?
- How are non-professional WebTop5 users counted and reported?
- Are public JSON responses permitted, or must data be rendered only in the UI?
