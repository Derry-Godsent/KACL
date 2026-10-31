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
  priority = false,
}: {
  name: string;
  portraitUrl?: string;
  compact?: boolean;
  priority?: boolean;
}) {
  const [failedUrl, setFailedUrl] = useState<string | null>(null);
  const hasPhoto = Boolean(portraitUrl && failedUrl !== portraitUrl);
  return (
    <div
      className={`leadership-portrait ${compact ? "is-compact" : ""} ${hasPhoto ? "has-photo" : "has-monogram"}`}
    >
      {hasPhoto ? (
        <picture>
          {portraitUrl?.startsWith('/images/leadership/') && portraitUrl.endsWith('.jpg') && (
            <source srcSet={portraitUrl.replace(/\.jpg$/, '.webp')} type="image/webp" />
          )}
        <img
          src={portraitUrl}
          alt={`Portrait of ${name}`}
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : "auto"}
          decoding="async"
          onError={() => setFailedUrl(portraitUrl!)}
        />
        </picture>
      ) : (
        <div className="leadership-monogram" aria-hidden="true">
          <span>{getLeadershipInitials(name)}</span>
          {!compact && <small>KACL</small>}
        </div>
      )}
    </div>
  );
}
