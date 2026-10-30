import React, { useState } from "react";
import {
  FileText,
  Newspaper,
  Bell,
  Image as ImageIcon,
  ArrowRight,
} from "lucide-react";
import { INITIAL_MEDIA_ITEMS } from "../data/initialData";
import { MediaItem } from "../types";

interface MediaViewProps {
  onNavigate: (view: string) => void;
}
type MediaCategory = "all" | MediaItem["type"];
const labels = {
  notice: "Public notice",
  press_release: "Press release",
  news: "News",
  gallery: "Gallery",
};
const icons = {
  notice: Bell,
  press_release: FileText,
  news: Newspaper,
  gallery: ImageIcon,
};
const categories: { id: MediaCategory; label: string }[] = [
  { id: "all", label: "All Media" },
  { id: "notice", label: "Public Notices" },
  { id: "press_release", label: "Press Releases" },
  { id: "news", label: "News" },
  { id: "gallery", label: "Gallery" },
];
// Existing generated facility images stay unpublished. Never present them as KACL photos.
const publishedItems = INITIAL_MEDIA_ITEMS.filter(
  (item) =>
    item.type !== "gallery" ||
    (item.imageUrl && !item.imageUrl.startsWith("/src/assets/")),
).sort((a, b) => b.date.localeCompare(a.date));
const formatDate = (date: string) =>
  new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  }).format(new Date(`${date}T00:00:00Z`));

export const MediaView: React.FC<MediaViewProps> = ({ onNavigate }) => {
  const [activeTab, setActiveTab] = useState<MediaCategory>("all");
  const [collapsedIds, setCollapsedIds] = useState<Set<string>>(() => new Set());
  const filteredItems = publishedItems.filter(
    (item) => activeTab === "all" || item.type === activeTab,
  );
  const featured =
    activeTab === "all"
      ? filteredItems.find((item) => item.type !== "gallery")
      : undefined;
  const remaining = filteredItems.filter((item) => item.id !== featured?.id);

  const renderArticle = (item: MediaItem, prominent = false) => {
    const Icon = icons[item.type];
    const expanded = !collapsedIds.has(item.id);
    return (
      <article
        className={prominent ? "media-featured" : "media-story"}
        key={item.id}
      >
        <div className="media-story-meta">
          <span className="media-type">
            <Icon className="w-4 h-4" />
            {labels[item.type]}
          </span>
          <time dateTime={item.date}>{formatDate(item.date)}</time>
        </div>
        {prominent && <span className="media-latest">Latest from KACL</span>}
        <h2>{item.title}</h2>
        <p className="media-summary">{item.summary}</p>
        {item.type === "gallery" && item.imageUrl && (
          <img
            className="media-gallery-photo"
            src={item.imageUrl}
            alt={item.title}
            loading="lazy"
          />
        )}
        {item.content && (
          <>
            <button
              type="button"
              className="media-read"
              aria-expanded={expanded}
              aria-controls={`media-content-${item.id}`}
              aria-label={`${expanded ? "Close" : "Read"} ${item.title}`}
              onClick={() => setCollapsedIds(previous => {
                const next = new Set(previous);
                if (next.has(item.id)) next.delete(item.id);
                else next.add(item.id);
                return next;
              })}
            >
              {expanded ? "Close article" : "Read more"}
              <ArrowRight className="w-4 h-4" />
            </button>
            <div
              id={`media-content-${item.id}`}
              hidden={!expanded}
              className="media-full-article"
            >
              <p>{item.content}</p>
            </div>
          </>
        )}
      </article>
    );
  };

  return (
    <div className="media-page">
      <div className="page-width">
        <div className="media-intro">
          <span className="media-kicker">Stay connected with KACL</span>
          <h1>News & media</h1>
          <p>The latest notices, company news and updates, all in one place.</p>
        </div>
        <div
          className="media-filters"
          role="group"
          aria-label="Filter media by category"
        >
          {categories.map((category) => {
            const count = publishedItems.filter(
              (item) => category.id === "all" || item.type === category.id,
            ).length;
            return (
              <button
                type="button"
                key={category.id}
                aria-pressed={activeTab === category.id}
                aria-controls="media-results"
                onClick={() => {
                  setActiveTab(category.id);
                }}
              >
                {category.label}
                <span>{count}</span>
              </button>
            );
          })}
        </div>
        <section
          id="media-results"
          aria-label={
            activeTab === "all"
              ? "All media updates"
              : categories.find((category) => category.id === activeTab)?.label
          }
        >
          <p className="media-result-count" role="status" aria-live="polite">
            {activeTab === "gallery"
              ? `${filteredItems.length} published photographs`
              : `${filteredItems.length} ${filteredItems.length === 1 ? "update" : "updates"}`}
          </p>
          {featured && renderArticle(featured, true)}
          {remaining.length > 0 && (
            <div className="media-story-grid">
              {remaining.map((item) => renderArticle(item))}
            </div>
          )}
          {filteredItems.length === 0 && (
            <div className="media-empty">
              <span className="media-empty-icon">
                {activeTab === "gallery" ? (
                  <ImageIcon className="w-9 h-9" />
                ) : (
                  <Newspaper className="w-9 h-9" />
                )}
              </span>
              <h2>
                {activeTab === "gallery"
                  ? "Gallery"
                  : "No updates in this category."}
              </h2>
              <p>
                {activeTab === "gallery"
                  ? "There are no photographs in the gallery yet."
                  : "There are no published updates in this category yet."}
              </p>
              <button
                type="button"
                className="button-secondary"
                onClick={() => {
                  setActiveTab("all");
                }}
              >
                Browse company updates <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </section>
        <section className="media-contact">
          <div>
            <span className="media-kicker">Need to know more?</span>
            <h2>Let's put you in touch.</h2>
            <p>
              For questions about a notice or a media enquiry, speak with our
              team.
            </p>
          </div>
          <button
            type="button"
            className="button-primary"
            onClick={() => onNavigate("contact")}
          >
            Contact KACL <ArrowRight className="w-4 h-4" />
          </button>
        </section>
      </div>
    </div>
  );
};
