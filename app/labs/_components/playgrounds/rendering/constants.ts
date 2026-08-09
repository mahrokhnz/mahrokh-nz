export type Strategy = "default" | "memo" | "usememo" | "usecallback" | "virtualized";
export type Complexity = "low" | "med" | "high";
export type CodeTab = "default" | "memo" | "virtual";
export type RowStatus = "rendered" | "updated" | "skipped";
export type ItemPreset = (typeof ITEM_PRESETS)[number];

export type Product = {
    id: number;
    name: string;
    category: string;
    price: number;
};

export type Metrics = {
    lastMs: number;
    renders: number;
    fps: number;
    domNodes: number;
    renderMs: number;
    commitMs: number;
    paintMs: number;
};

export const STRATEGIES: Array<{key: Strategy; label: string; hint: string; summary: string}> = [
    {
        key: "default",
        label: "Default Render",
        hint: "Components re-render when their parent renders.",
        summary: "Parent updated → every visible row re-rendered.",
    },
    {
        key: "memo",
        label: "React.memo",
        hint: "Skip rendering when component props have not changed.",
        summary:
            "Rows are wrapped in React.memo, but an unstable handler still changes props — so most rows re-render anyway.",
    },
    {
        key: "usememo",
        label: "useMemo",
        hint: "Memoize expensive calculations between renders.",
        summary:
            "Expensive sorting is cached with useMemo, so parent ticks avoid recomputing the list.",
    },
    {
        key: "usecallback",
        label: "useCallback",
        hint: "Keep function references stable across renders.",
        summary:
            "Memoized rows plus a stable useCallback handler let unchanged rows skip rendering.",
    },
    {
        key: "virtualized",
        label: "Virtualized List",
        hint: "Render only items currently visible in the viewport.",
        summary: "Only the viewport window is mounted in the DOM, so DOM work stays small.",
    },
];

export const ITEM_PRESETS = [10, 200, 300, 400] as const;
export const TOTAL_ITEMS = 400;

export const COMPLEXITY_OPTIONS: Array<{key: Complexity; label: string}> = [
    {key: "low", label: "Low"},
    {key: "med", label: "Med"},
    {key: "high", label: "High"},
];

export const CODE_TABS: Array<{key: CodeTab; label: string}> = [
    {key: "default", label: "Default"},
    {key: "memo", label: "Memo"},
    {key: "virtual", label: "Virtual"},
];

export const CATEGORIES = ["Electronics", "Apparel", "Books", "Home", "Sports", "Beauty"] as const;
export const ROW_HEIGHT = 52;
export const OVERSCAN = 6;

export const CODE_SNIPPETS: Record<CodeTab, string> = {
    default: `function ProductItem({ product }) {
  return (
    <div className="product-row">
      <span>{product.name}</span>
      <span>{product.category}</span>
      <span>\${product.price}</span>
    </div>
  )
}

function ProductList({ products }) {
  return (
    <div className="list">
      {products.map((p) => (
        <ProductItem key={p.id} product={p} />
      ))}
    </div>
  )
}`,
    memo: `const ProductItem = memo(function ProductItem({ product, onSelect }) {
  return (
    <button className="product-row" onClick={() => onSelect(product.id)}>
      <span>{product.name}</span>
      <span>{product.category}</span>
      <span>\${product.price}</span>
    </button>
  )
})

const onSelect = useCallback((id) => {
  setSelected(id)
}, [])`,
    virtual: `function VirtualList({ products, scrollTop, viewportCount }) {
  const start = Math.floor(scrollTop / ROW_HEIGHT)
  const visible = products.slice(start, start + viewportCount)

  return (
    <div style={{ height: products.length * ROW_HEIGHT }}>
      <div style={{ transform: \`translateY(\${start * ROW_HEIGHT}px)\` }}>
        {visible.map((p) => (
          <ProductItem key={p.id} product={p} />
        ))}
      </div>
    </div>
  )
}`,
};

export function createProducts(count: number): Product[] {
    return Array.from({length: count}, (_, index) => {
        const id = index + 1;
        return {
            id,
            name: `Product #${String(id).padStart(4, "0")}`,
            category: CATEGORIES[index % CATEGORIES.length],
            price: 20 + ((index * 47) % 280),
        };
    });
}

export function formatNumber(value: number) {
    return new Intl.NumberFormat("en-US").format(value);
}

export function sortProducts(products: Product[], complexity: Complexity): Product[] {
    const rounds = complexity === "low" ? 1 : complexity === "med" ? 6 : 18;
    let next = products;

    for (let round = 0; round < rounds; round += 1) {
        next = [...next].sort((a, b) => {
            const left = a.price * (round + 1) + a.name.length;
            const right = b.price * (round + 1) + b.name.length;
            return left - right || a.id - b.id;
        });
    }

    return next;
}
