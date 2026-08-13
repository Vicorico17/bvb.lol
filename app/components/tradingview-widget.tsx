"use client";

import { useEffect, useRef } from "react";

type WidgetKind = "advanced-chart" | "symbol-info" | "market-overview";

const scripts: Record<WidgetKind, string> = {
  "advanced-chart": "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
  "symbol-info": "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js",
  "market-overview": "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
};

export function TradingViewWidget({
  kind,
  config,
  className = "",
}: {
  kind: WidgetKind;
  config: Record<string, unknown>;
  className?: string;
}) {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!container.current) return;
    container.current.replaceChildren();

    const host = document.createElement("div");
    host.className = "tradingview-widget-container__widget";
    host.style.height = "100%";
    host.style.width = "100%";

    const script = document.createElement("script");
    script.src = scripts[kind];
    script.type = "text/javascript";
    script.async = true;
    script.textContent = JSON.stringify(config);

    container.current.append(host, script);
  }, [kind, config]);

  return <div ref={container} className={`tradingview-widget-container ${className}`} />;
}
