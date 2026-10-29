import React, { useState } from "react";

export function getLeadershipInitials(name: string) {
  const titles = new Set([
    "hon.",
    "hon",
    "mr.",
    "mrs.",
    "mr",
    "mrs",
    "alhaji",
    "nana",
    "esq",
    "esq.",
    "rev.",
    "rev",
  ]);
  const parts = name
    .split(/\s+/)
    .filter((part) => part && !titles.has(part.toLowerCase()));
  return [parts[0]?.[0], parts.length > 1 ? parts[parts.length - 1]?.[0] : ""]
    .join("")
    .toUpperCase();
}

/** A designed monogram is the default, never a stock person or broken image. */
export function LeadershipPortrait({
  name,
  portraitUrl,
  compact = false,
}: {
  name: string;
  portraitUrl?: string;
  compact?: boolean;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const hasPhoto = Boolean(portraitUrl && failedUrl !== portraitUrl);
  return (
    <div
      className={`leadership-portrait ${compact ? "is-compact" : ""} ${hasPhoto ? "has-photo" : "has-monogram"}`}
    >
      {hasPhoto ? (
        <img
          src={portraitUrl}
          alt={`Portrait of ${name}`}
          loading="lazy"
          onError={() => setFailedUrl(portraitUrl!)}
        />
      ) : (
        <div className="leadership-monogram" aria-hidden="true">
          <span>{getLeadershipInitials(name)}</span>
          {!compact && <small>KACL</small>}
        </div>
      )}
    </div>
  );
}
