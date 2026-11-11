"use client";

import { useEffect, useRef, useState } from "react";

type WidgetKind = "advanced-chart" | "symbol-info" | "market-overview" | "company-profile" | "financials";

const scripts: Record<WidgetKind, string> = {
  "advanced-chart": "https://s3.tradingview.com/external-embedding/embed-widget-advanced-chart.js",
  "symbol-info": "https://s3.tradingview.com/external-embedding/embed-widget-symbol-info.js",
  "market-overview": "https://s3.tradingview.com/external-embedding/embed-widget-market-overview.js",
  "company-profile": "https://s3.tradingview.com/external-embedding/embed-widget-symbol-profile.js",
  "financials": "https://s3.tradingview.com/external-embedding/embed-widget-financials.js",
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
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");
  const [attempt, setAttempt] = useState(0);

  useEffect(() => {
    const root = container.current;
    if (!root) return;
    root.replaceChildren();
    let disposed = false;
    const listeners: Array<() => void> = [];
    const timer = window.setTimeout(() => { if (!disposed) setStatus("error"); }, 20000);
    const ready = () => {
      if (!disposed) { window.clearTimeout(timer); setStatus("ready"); }
    };
    const observer = new MutationObserver(() => {
      for (const frame of root.querySelectorAll("iframe:not([data-observed])")) {
        frame.setAttribute("data-observed", "true");
        frame.setAttribute("title", `TradingView ${kind.replaceAll("-", " ")}`);
        frame.addEventListener("load", ready);
        listeners.push(() => frame.removeEventListener("load", ready));
      }
    });
    observer.observe(root, { childList: true, subtree: true });

    const host = document.createElement("div");
    host.className = "tradingview-widget-container__widget";
    host.style.height = "100%";
    host.style.width = "100%";

    const script = document.createElement("script");
    script.src = scripts[kind];
    script.type = "text/javascript";
    script.async = true;
    script.textContent = JSON.stringify(config);
    script.onerror = () => { if (!disposed) { window.clearTimeout(timer); setStatus("error"); } };

    root.append(host, script);
    return () => {
      disposed = true;
      window.clearTimeout(timer);
      observer.disconnect();
      listeners.forEach((remove) => remove());
      script.onerror = null;
      root.replaceChildren();
    };
  }, [kind, config, attempt]);

  const symbol = typeof config.symbol === "string" ? config.symbol.replace(":", "-") : "BVB-H2O";
  return <div className={`widget-shell ${className}`} aria-busy={status === "loading"}>
    <div ref={container} className="tradingview-widget-container" />
    {status !== "ready" && <div className="widget-state" role="status">
      {status === "loading" ? <span>Loading TradingView…</span> : <><span>TradingView could not be loaded.</span><div><button onClick={() => { setStatus("loading"); setAttempt((value) => value + 1); }}>Try again</button><a href={`https://www.tradingview.com/symbols/${encodeURIComponent(symbol)}/`} target="_blank" rel="noopener noreferrer">View on TradingView ↗</a></div></>}
    </div>}
  </div>;
}
