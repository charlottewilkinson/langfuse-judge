"use client";

import * as React from "react";

type SearchResult = {
  title?: string;
  url?: string;
};

type SearchWidgetProps = {
  query: string;
  summary: string;
  results: SearchResult[];
};

export function SearchWidget({ query, summary, results }: SearchWidgetProps) {
  const topResult = results[0];
  const truncatedQuery =
    query.length > 80 ? `${query.slice(0, 77).trimEnd()}…` : query;

  const domain =
    topResult?.url &&
    (() => {
      try {
        return new URL(topResult.url).hostname.replace(/^www\./, "");
      } catch {
        return undefined;
      }
    })();

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-sm">
      {/* Pseudo search bar */}
      <div className="mb-4">
        <div className="mb-1 text-[11px] uppercase tracking-wide text-muted-foreground">
          You asked
        </div>
        <div className="flex items-center gap-2 rounded-full border border-input bg-background px-3 py-1.5 text-xs shadow-inner">
          <div className="size-4 rounded-full bg-primary/10 flex items-center justify-center">
            <span className="text-[10px] text-primary">🔍</span>
          </div>
          <div
            className="truncate text-xs text-foreground"
            title={query}
          >
            {truncatedQuery || "Search the web..."}
          </div>
        </div>
      </div>

      {/* Answer */}
      <div className="mb-3 rounded-lg border-l-4 border-primary/60 bg-muted/40 px-3 py-2">
        <div className="mb-1 text-[11px] font-medium uppercase tracking-wide text-primary/80">
          Answer
        </div>
        <div className="text-sm leading-relaxed text-foreground">{summary}</div>
      </div>

      {/* Top result card */}
      {topResult ? (
        <div className="flex items-center justify-between gap-2 rounded-lg border border-border bg-background px-3 py-2 text-xs">
          <div className="min-w-0">
            {topResult.title && (
              <div className="truncate font-medium text-foreground">
                {topResult.title}
              </div>
            )}
            {domain && (
              <div className="text-[11px] text-muted-foreground">
                Source: {domain}
              </div>
            )}
          </div>
          {topResult.url && (
            <a
              href={topResult.url}
              target="_blank"
              rel="noreferrer"
              className="shrink-0 inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-[11px] font-medium text-primary hover:bg-primary/20"
            >
              Open source
            </a>
          )}
        </div>
      ) : (
        <div className="text-xs text-muted-foreground">
          No specific results were returned for this query.
        </div>
      )}
    </div>
  );
}

