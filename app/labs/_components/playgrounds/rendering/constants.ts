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

export const STRATEGIES: Array<{key: Strategy; label: string; hint: string}> = [
    {
        key: "default",
        label: "Default Render",
        hint: "Components re-render when their parent renders.",
    },
    {
        key: "memo",
        label: "React.memo",
        hint: "Skip rendering when component props have not changed.",
    },
    {
        key: "usememo",
        label: "useMemo",
        hint: "Memoize expensive calculations between renders.",
    },
    {
        key: "usecallback",
        label: "useCallback",
        hint: "Keep function references stable across renders.",
    },
    {
        key: "virtualized",
        label: "Virtualized List",
        hint: "Render only items currently visible in the viewport.",
    },
];

export const ITEM_PRESETS = [100, 1000, 5000, 10000] as const;
export const TOTAL_ITEMS = 10000;

export const BENCHMARK_ITERATIONS = 5;

export const BENCHMARK_STRATEGIES: Array<{key: Strategy; label: string}> = [
    {key: "default", label: "Default"},
    {key: "memo", label: "React.memo"},
    {key: "virtualized", label: "Virtualized"},
];

export type BenchmarkPhase = "idle" | "preparing" | "running" | "analyzing" | "done";

export const BENCHMARK_PHASE_LABEL: Record<Exclude<BenchmarkPhase, "idle">, string> = {
    preparing: "Preparing...",
    running: "Running 5 iterations...",
    analyzing: "Analyzing...",
    done: "Done",
};

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

/** Extra CPU burn so High complexity is clearly expensive for useMemo / useCallback paths. */
export function runHeavyListWork(products: Product[], complexity: Complexity) {
    if (complexity === "low") return;

    const inner = complexity === "med" ? 6 : 48;
    let checksum = 0;
    for (let i = 0; i < products.length; i += 1) {
        const product = products[i];
        for (let j = 0; j < inner; j += 1) {
            checksum += (product.price * (j + 3) + product.name.length * (i + 1)) % 997;
        }
    }
    void checksum;
}

export function runHeavyRowWork(product: Product, complexity: Complexity) {
    const iterations = complexity === "low" ? 0 : complexity === "med" ? 2000 : 20000;
    if (iterations === 0) return;

    let checksum = 0;
    for (let i = 0; i < iterations; i += 1) {
        checksum += (product.price * (i + 3) + product.name.length) % 97;
    }
    void checksum;
}

export function sortProducts(products: Product[], complexity: Complexity): Product[] {
    const rounds = complexity === "low" ? 1 : complexity === "med" ? 6 : 20;
    let next = products;

    for (let round = 0; round < rounds; round += 1) {
        next = [...next].sort((a, b) => {
            const left = a.price * (round + 1) + a.name.length;
            const right = b.price * (round + 1) + b.name.length;
            return left - right || a.id - b.id;
        });
    }

    runHeavyListWork(next, complexity);
    return next;
}

export function getWhatChangedLines(input: {
    strategy: Strategy;
    listCount: number;
    renderedCount: number;
    domUpdates: number;
}): string[] {
    const listCount = Math.max(input.listCount, 0);
    const rendered = Math.max(input.renderedCount, 0);
    const skipped = Math.max(listCount - rendered, 0);
    const domUpdates = Math.max(input.domUpdates, rendered);

    if (input.strategy === "default") {
        return [
            "Parent rendered",
            "ProductList rendered",
            `${formatNumber(listCount)} ProductItem components rendered`,
            `${formatNumber(domUpdates)} DOM updates`,
        ];
    }

    if (input.strategy === "virtualized") {
        return [
            "Parent rendered",
            "ProductList rendered",
            `${formatNumber(listCount)} ProductItem components mounted`,
            `${formatNumber(Math.max(TOTAL_ITEMS - listCount, 0))} items not in DOM`,
            `${formatNumber(domUpdates)} DOM updates`,
        ];
    }

    // memo / useMemo / useCallback — show skip vs render split when memoization works
    if (skipped > 0) {
        return [
            "Parent rendered",
            "ProductList rendered",
            "ProductItem",
            `${formatNumber(skipped)} skipped`,
            `${formatNumber(rendered)} rendered`,
            `${formatNumber(domUpdates)} DOM updates`,
        ];
    }

    return [
        "Parent rendered",
        "ProductList rendered",
        `${formatNumber(rendered || listCount)} ProductItem components rendered`,
        `${formatNumber(domUpdates)} DOM updates`,
    ];
}
