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
  const [localQuery, setLocalQuery] = React.useState(query);

  const topResult = results[0];

  return (
    <div className="w-full max-w-md rounded-xl border border-border bg-card p-4 shadow-sm">
      {/* Search bar */}
      <div className="flex items-center gap-2 mb-4">
        <input
          type="text"
          className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          value={localQuery}
          onChange={(e) => setLocalQuery(e.target.value)}
          placeholder="Search the web..."
          readOnly
        />
      </div>

      {/* Summary */}
      <div className="mb-3 text-sm text-muted-foreground">{summary}</div>

      {/* Top result card */}
      {topResult ? (
        <div className="rounded-lg border border-border bg-background p-3 text-sm">
          {topResult.title && (
            <div className="font-medium mb-1">{topResult.title}</div>
          )}
          {topResult.url && (
            <a
              href={topResult.url}
              target="_blank"
              rel="noreferrer"
              className="text-xs text-primary underline break-all"
            >
              {topResult.url}
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

