import React, { useState } from "react";
import { ArrowRight, ShoppingBag, LayoutGrid, LayoutList } from "lucide-react";
import { Product } from "../types";
import { QuotationItem } from "../lib/storage";

interface FeaturedProductsProps {
  products: Product[];
  items: QuotationItem[];
  onAdd: (product: Product, quantityKg: number) => void;
  onDetails: (product: Product) => void;
  onReview: () => void;
  featuredOnly?: boolean;
  showIntro?: boolean;
  children?: React.ReactNode;
}

const featuredNames = [
  "BEEF BONELESS",
  "BEEF FILLET",
  "BEEF BRISKET",
  "MINCED MEAT (BEEF)",
];
const displayName = (name: string) =>
  name.toLowerCase().replace(/\b\w/g, (letter) => letter.toUpperCase());
const weight = (value: string) =>
  Number.isFinite(Number(value))
    ? Math.min(10000, Math.max(1, Number(value)))
    : 1;

export function ProductCollection({
  products,
  items,
  onAdd,
  onDetails,
  onReview,
  featuredOnly = false,
  showIntro = false,
  children,
}: FeaturedProductsProps) {
  const [quantities, setQuantities] = useState<Record<string, string>>({});
  const [message, setMessage] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const featured = featuredOnly
    ? featuredNames
        .map((name) => products.find((product) => product.name === name))
        .filter((product): product is Product => Boolean(product))
    : products;
  const totalKg = items.reduce((sum, item) => sum + (item.estimatedKg || 0), 0);
  const setQuantity = (id: string, value: string) =>
    setQuantities((previous) => ({ ...previous, [id]: value }));

  return (
    <div
      className={`counter-shop ${showIntro && viewMode === "list" ? "catalogue-list" : ""}`}
      aria-label={showIntro ? undefined : "Product selection"}
      aria-labelledby={showIntro ? "popular-cuts-heading" : undefined}
    >
      {showIntro && (
        <div className="counter-shop-heading">
          <div>
            <h3 id="popular-cuts-heading">Start with a favourite</h3>
            <p>Choose your cut, set the weight and add it to your cart.</p>
          </div>
          <div className="counter-heading-actions">
            <span className="counter-quote-note">
              Prices confirmed by our sales team
            </span>
            <div className="products-layout" role="group" aria-label="Featured product layout">
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
        </div>
      )}
      <div className="counter-product-grid">
        {featured.map((product) => {
          const quantity = quantities[product.id] ?? "1";
          const selected = items.find((item) => item.productId === product.id);
          const name = displayName(product.name);
          return (
            <article
              className={`counter-product ${selected ? "has-cart-item" : ""}`}
              key={product.id}
            >
              <div className="counter-product-meta">
                <span>{product.categoryLabel}</span>
                <span>{product.code}</span>
              </div>
              <h4>
                <button type="button" onClick={() => onDetails(product)}>
                  {name}
                </button>
              </h4>
              <p className="counter-product-description">
                {product.description}
              </p>
              <button
                className="counter-details"
                type="button"
                onClick={() => onDetails(product)}
                aria-label={`View details for ${name}`}
              >
                Product details <ArrowRight className="w-3.5 h-3.5" />
              </button>
              <div className="counter-purchase">
                <label htmlFor={`counter-weight-${product.id}`}>
                  Quantity <span>(kg)</span>
                </label>
                <div className="counter-stepper">
                  <button
                    type="button"
                    aria-label={`Decrease ${name} quantity`}
                    disabled={weight(quantity) <= 1 || !product.inStock}
                    onClick={() =>
                      setQuantity(
                        product.id,
                        String(Math.max(1, weight(quantity) - 1)),
                      )
                    }
                  >
                    −
                  </button>
                  <input
                    id={`counter-weight-${product.id}`}
                    type="number"
                    inputMode="decimal"
                    min="1"
                    max="10000"
                    step="any"
                    value={quantity}
                    disabled={!product.inStock}
                    aria-label={`${name} quantity in kilograms`}
                    onChange={(event) =>
                      setQuantity(product.id, event.target.value)
                    }
                    onBlur={() =>
                      setQuantity(product.id, String(weight(quantity)))
                    }
                  />
                  <button
                    type="button"
                    aria-label={`Increase ${name} quantity`}
                    disabled={weight(quantity) >= 10000 || !product.inStock}
                    onClick={() =>
                      setQuantity(
                        product.id,
                        String(Math.min(10000, weight(quantity) + 1)),
                      )
                    }
                  >
                    +
                  </button>
                </div>
                <button
                  className="counter-add"
                  type="button"
                  disabled={!product.inStock}
                  aria-label={`Add ${weight(quantity)} kg of ${name} to cart`}
                  onClick={() => {
                    const kg = weight(quantity);
                    onAdd(product, kg);
                    setQuantity(product.id, String(kg));
                    setMessage(
                      `${kg} kg of ${name} added to your cart. Review your cart when you are ready to request a quote.`,
                    );
                  }}
                >
                  <ShoppingBag className="w-4 h-4" />
                  {product.inStock
                    ? `Add ${weight(quantity)} kg to cart`
                    : "Currently unavailable"}
                </button>
                <div className="counter-item-status">
                  {selected
                    ? `${selected.estimatedKg} kg in your cart`
                    : "Choose the weight you need"}
                </div>
              </div>
            </article>
          );
        })}
      </div>
      {children}
      <p
        className="counter-announcement"
        role="status"
        aria-live="polite"
        aria-atomic="true"
      >
        {message}
      </p>
      <div className="counter-cart-bar">
        <div className="counter-cart-label">
          <span className="counter-cart-icon">
            <ShoppingBag className="w-5 h-5" />
          </span>
          <div>
            <strong>
              Your quote cart <span>{items.length}</span>
            </strong>
            <p>
              {items.length
                ? `${items.length} ${items.length === 1 ? "product" : "products"} · ${Number(totalKg.toFixed(2))} kg estimated`
                : "Your cart is ready for your first cut."}
            </p>
          </div>
        </div>
        <button type="button" className="button-primary" onClick={onReview}>
          Review cart <ArrowRight className="w-4 h-4" />
        </button>
      </div>
      <p className="counter-disclaimer">
        No payment required. Submit your cart for a quote, and our team will
        confirm prices and availability.
      </p>
    </div>
  );
}

/** Homepage uses the same shopping controls as the full catalogue. */
export function FeaturedProducts(props: FeaturedProductsProps) {
  return <ProductCollection {...props} featuredOnly showIntro />;
}
