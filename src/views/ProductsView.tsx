import React, { useState } from "react";
import {
  Search,
  ShoppingBag,
  ShieldCheck,
  LayoutList,
  LayoutGrid,
} from "lucide-react";
import { Product } from "../types";
import { QuotationItem } from "../lib/storage";
import { ProductCollection } from "../components/FeaturedProducts";

interface ProductsViewProps {
  initialCategory?: string;
  products: Product[];
  quotationItems?: QuotationItem[];
  onAddToQuotation: (product: Product, quantityKg?: number) => void;
  onOpenProductModal: (product: Product) => void;
  onOpenQuotationDrawer: () => void;
  quotationItemCount: number;
}

const ranges = [
  { id: "all", label: "All Products" },
  { id: "beef", label: "Beef Products" },
  { id: "processed", label: "Processed Meat" },
  { id: "chevon-mutton", label: "Chevon / Mutton" },
  { id: "pork", label: "Pork Products" },
];
const PAGE_SIZE = 12;

export const ProductsView: React.FC<ProductsViewProps> = ({
  products,
  initialCategory = "all",
  quotationItems = [],
  onAddToQuotation,
  onOpenProductModal,
  onOpenQuotationDrawer,
  quotationItemCount,
}) => {
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const query = searchQuery.trim().toLowerCase();
  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "all" || product.category === selectedCategory) &&
      (!query ||
        `${product.name} ${product.code} ${product.description}`
          .toLowerCase()
          .includes(query)),
  );
  const selectedRange =
    ranges.find((range) => range.id === selectedCategory) ?? ranges[0];
  const resetFilters = () => {
    setSearchQuery("");
    setSelectedCategory("all");
    setVisibleCount(PAGE_SIZE);
  };

  return (
    <div className="products-page">
      <div className="page-width">
        <div className="products-intro">
          <div>
            <span className="products-kicker">Find your preferred cut</span>
            <h1>Our meat products</h1>
            <p>
              Choose your cut. Set your weight. Let us take care of the quote.
            </p>
          </div>
          <button
            type="button"
            className="products-cart-link"
            onClick={onOpenQuotationDrawer}
          >
            <ShoppingBag className="w-5 h-5" />
            Your cart <span>{quotationItemCount}</span>
          </button>
        </div>

        <section
          id="product-catalogue"
          tabIndex={-1}
          aria-label="Meat product catalogue"
          className="products-catalogue"
        >
          <div className="products-tools">
            <div
              className="products-categories"
              role="group"
              aria-label="Filter by product category"
            >
              {ranges.map((range) => (
                <button
                  type="button"
                  key={range.id}
                  aria-pressed={selectedCategory === range.id}
                  onClick={() => {
                    setSelectedCategory(range.id);
                    setVisibleCount(PAGE_SIZE);
                  }}
                >
                  <span>{range.label}</span>
                  <small>
                    {range.id === "all"
                      ? products.length
                      : products.filter(
                          (product) => product.category === range.id,
                        ).length}
                  </small>
                </button>
              ))}
            </div>
            <label className="products-search">
              <Search className="w-5 h-5" aria-hidden="true" />
              <input
                type="search"
                value={searchQuery}
                onChange={(event) => {
                  setSearchQuery(event.target.value);
                  setVisibleCount(PAGE_SIZE);
                }}
                aria-label="Search meat products"
                placeholder="Find a cut, sausage or product code"
              />
            </label>
          </div>

          <div className="products-results-heading">
            <div>
              <h2>
                {selectedRange.id === "all"
                  ? "Explore our range"
                  : selectedRange.label}
              </h2>
              <p role="status" aria-live="polite">
                {filteredProducts.length}{" "}
                {filteredProducts.length === 1 ? "product" : "products"}
                {query
                  ? ` matching “${searchQuery.trim()}”`
                  : " to choose from"}
              </p>
            </div>
            <div
              className="products-layout"
              role="group"
              aria-label="Product layout"
            >
              <button
                type="button"
                aria-label="Grid view"
                title="Grid view"
                aria-pressed={viewMode === "grid"}
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="w-5 h-5" />
              </button>
              <button
                type="button"
                aria-label="List view"
                title="List view"
                aria-pressed={viewMode === "list"}
                onClick={() => setViewMode("list")}
              >
                <LayoutList className="w-5 h-5" />
              </button>
            </div>
          </div>

          {filteredProducts.length > 0 ? (
            <div
              className={`products-collection ${viewMode === "list" ? "catalogue-list" : ""}`}
            >
              <ProductCollection
                products={filteredProducts.slice(0, visibleCount)}
                items={quotationItems}
                onAdd={onAddToQuotation}
                onDetails={onOpenProductModal}
                onReview={onOpenQuotationDrawer}
              >
                {visibleCount < filteredProducts.length && (
                  <div className="products-more">
                    <p>
                      Showing {Math.min(visibleCount, filteredProducts.length)}{" "}
                      of {filteredProducts.length} products
                    </p>
                    <button
                      type="button"
                      className="button-secondary"
                      onClick={() =>
                        setVisibleCount((count) => count + PAGE_SIZE)
                      }
                    >
                      Show more products
                    </button>
                  </div>
                )}
              </ProductCollection>
            </div>
          ) : (
            <div className="products-empty">
              <Search className="w-8 h-8" aria-hidden="true" />
              <h3>No products found</h3>
              <p>
                Try another name, or clear the filters to explore the full
                range.
              </p>
              <button
                type="button"
                className="button-primary"
                onClick={resetFilters}
              >
                Clear filters
              </button>
            </div>
          )}
        </section>

        <div className="products-assurance">
          <ShieldCheck className="w-6 h-6" />
          <div>
            <strong>Quality you can enquire about.</strong>
            <p>
              Veterinary-inspected meat for homes, butcher counters and
              professional kitchens. Prices and availability confirmed by our
              team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
