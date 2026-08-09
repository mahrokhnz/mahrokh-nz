"use client";

import {useCallback, useEffect, useMemo, useRef, useState} from "react";
import cls from "@/utils/class_names";
import LabsGrid from "@/app/labs/_components/labs_grid/page";
import {
    ControlButton,
    ControlSection,
    ControlsSidebar,
    GeneratedCodePanel,
    SegmentedButtons,
} from "@/app/labs/_components/playgrounds/controls/page";
import {PlaygroundShell, useCopyCss} from "@/app/labs/_components/playgrounds/shared/page";
import {LuSearch} from "react-icons/lu";
import {
    CODE_SNIPPETS,
    CODE_TABS,
    COMPLEXITY_OPTIONS,
    ITEM_PRESETS,
    OVERSCAN,
    ROW_HEIGHT,
    STRATEGIES,
    TOTAL_ITEMS,
    createProducts,
    formatNumber,
    sortProducts,
    type CodeTab,
    type Complexity,
    type ItemPreset,
    type Metrics,
    type Product,
    type RowStatus,
    type Strategy,
} from "./constants";
import {buildMetrics} from "./metrics";
import ProductRowView, {MemoProductRow} from "./product_row/page";

function TimelineBar({
    label,
    ms,
    total,
    accent = false,
}: {
    label: string;
    ms: number;
    total: number;
    accent?: boolean;
}) {
    const width = total > 0 ? Math.max(4, (ms / total) * 100) : 0;

    return (
        <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between text-[0.75rem]">
                <span className={accent ? "text-white" : "text-[var(--labs-muted)]"}>{label}</span>
                <span className="font-mono text-[var(--labs-accent)]">{ms.toFixed(1)}ms</span>
            </div>
            <div className="h-1.5 overflow-hidden rounded-full bg-[rgba(139,139,255,0.12)]">
                <div
                    className={cls(
                        "h-full rounded-full",
                        accent ? "bg-[var(--labs-accent)]" : "bg-[rgba(139,139,255,0.55)]"
                    )}
                    style={{width: `${width}%`}}
                />
            </div>
        </div>
    );
}

function RenderingPlayground() {
    const [strategy, setStrategy] = useState<Strategy>("default");
    const [showCount, setShowCount] = useState<ItemPreset>(10);
    const [complexity, setComplexity] = useState<Complexity>("med");
    const [query, setQuery] = useState("");
    const [selectedId, setSelectedId] = useState<number | null>(1);
    const [parentTick, setParentTick] = useState(0);
    const [codeTab, setCodeTab] = useState<CodeTab>("default");
    const [visualize, setVisualize] = useState(true);
    const [renderedIds, setRenderedIds] = useState<Set<number>>(() => new Set());
    const [metrics, setMetrics] = useState<Metrics>({
        lastMs: 0,
        renders: 0,
        fps: 60,
        domNodes: 0,
        renderMs: 0,
        commitMs: 0,
        paintMs: 0,
    });
    const [scrollTop, setScrollTop] = useState(0);
    const [viewportHeight, setViewportHeight] = useState(420);

    const scrollRef = useRef<HTMLDivElement | null>(null);
    const renderedBucket = useRef<Set<number>>(new Set());
    const measuringRef = useRef(false);
    const latestRef = useRef({
        strategy,
        complexity,
        showCount,
        productsLength: 0,
        visibleLength: 0,
        isVirtualized: false,
    });

    const catalog = useMemo(() => createProducts(TOTAL_ITEMS), []);

    const filteredCatalog = useMemo(() => {
        const needle = query.trim().toLowerCase();
        if (!needle) return catalog;
        return catalog.filter(
            (product) =>
                product.name.toLowerCase().includes(needle) ||
                product.category.toLowerCase().includes(needle)
        );
    }, [catalog, query]);

    // useMemo strategy caches the expensive sort across parent ticks.
    const memoizedSorted = useMemo(() => {
        if (strategy !== "usememo") return null;
        return sortProducts(filteredCatalog, complexity);
    }, [strategy, filteredCatalog, complexity]);

    const preparedCatalog = useMemo(() => {
        void parentTick;

        if (strategy === "usememo" && memoizedSorted) {
            return memoizedSorted;
        }

        if (strategy === "default") {
            // New object identities every parent update.
            return filteredCatalog.map((product) => ({...product}));
        }

        // memo / usecallback / virtualized still pay sort cost unless useMemo is selected.
        return sortProducts(filteredCatalog, complexity);
    }, [parentTick, strategy, memoizedSorted, filteredCatalog, complexity]);

    const products = useMemo(
        () => preparedCatalog.slice(0, showCount),
        [preparedCatalog, showCount]
    );

    const isVirtualized = strategy === "virtualized";
    const useMemoRows = strategy !== "default";
    const Row = useMemoRows ? MemoProductRow : ProductRowView;

    const stableSelect = useCallback((id: number) => {
        setSelectedId(id);
    }, []);

    // Recreated every render on purpose for default + memo strategies.
    const unstableSelect = (id: number) => {
        setSelectedId(id);
    };

    const onSelect =
        strategy === "usecallback" || strategy === "usememo" || strategy === "virtualized"
            ? stableSelect
            : unstableSelect;

    useEffect(() => {
        const node = scrollRef.current;
        if (!node) return;

        const update = () => setViewportHeight(node.clientHeight);
        update();

        const observer = new ResizeObserver(update);
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const startIndex = isVirtualized
        ? Math.max(0, Math.floor(scrollTop / ROW_HEIGHT) - OVERSCAN)
        : 0;
    const windowCount = isVirtualized
        ? Math.ceil(viewportHeight / ROW_HEIGHT) + OVERSCAN * 2
        : products.length;
    const endIndex = isVirtualized
        ? Math.min(products.length, startIndex + windowCount)
        : products.length;
    const visibleProducts = products.slice(startIndex, endIndex);

    latestRef.current = {
        strategy,
        complexity,
        showCount,
        productsLength: products.length,
        visibleLength: visibleProducts.length,
        isVirtualized,
    };

    const onRowRendered = useCallback((id: number) => {
        if (!measuringRef.current) return;
        renderedBucket.current.add(id);
    }, []);

    const finalizePass = useCallback((computeMs: number) => {
        window.requestAnimationFrame(() => {
            window.requestAnimationFrame(() => {
                const latest = latestRef.current;
                const rendered = new Set(renderedBucket.current);
                const domNodes = latest.isVirtualized
                    ? latest.visibleLength
                    : latest.productsLength;

                setRenderedIds(rendered);
                setMetrics(
                    buildMetrics({
                        strategy: latest.strategy,
                        complexity: latest.complexity,
                        renderedCount: Math.max(rendered.size, latest.isVirtualized ? domNodes : 0),
                        domNodes,
                        computeMs,
                    })
                );

                measuringRef.current = false;
                renderedBucket.current = new Set();
            });
        });
    }, []);

    const runParentUpdate = useCallback(() => {
        measuringRef.current = true;
        renderedBucket.current = new Set();

        const started = performance.now();
        setParentTick((value) => value + 1);
        finalizePass(performance.now() - started);
    }, [finalizePass]);

    // Keep preview/metrics in sync when controls change.
    useEffect(() => {
        const timer = window.setTimeout(() => {
            runParentUpdate();
        }, 0);
        return () => window.clearTimeout(timer);
    }, [strategy, showCount, complexity, query, runParentUpdate]);

    useEffect(() => {
        if (strategy === "virtualized") setCodeTab("virtual");
        else if (strategy === "default") setCodeTab("default");
        else setCodeTab("memo");
    }, [strategy]);

    const resetAll = () => {
        setQuery("");
        setSelectedId(1);
        setShowCount(10);
        setComplexity("med");
        setStrategy("default");
        setVisualize(true);
        setScrollTop(0);
        if (scrollRef.current) scrollRef.current.scrollTop = 0;
        setRenderedIds(new Set());
        setMetrics({
            lastMs: 0,
            renders: 0,
            fps: 60,
            domNodes: 10,
            renderMs: 0,
            commitMs: 0,
            paintMs: 0,
        });
    };

    const code = CODE_SNIPPETS[codeTab];
    const {copied, copyCss: copyCode} = useCopyCss(code);
    const strategyMeta = STRATEGIES.find((item) => item.key === strategy) ?? STRATEGIES[0];

    const rowStatus = (product: Product): RowStatus => {
        if (!visualize) return "skipped";
        if (!renderedIds.has(product.id)) return "skipped";
        if (selectedId === product.id) return "updated";
        return "rendered";
    };

    return (
        <div className="flex flex-col">
            <PlaygroundShell className="max-medium-desktop:flex-col">
                <ControlsSidebar title="CONTROLS" side="left" maxWidthClassName="max-w-[300px]">
                    <ControlSection title="RENDERING STRATEGY">
                        <div className="flex flex-col gap-2">
                            {STRATEGIES.map((item) => (
                                <button
                                    key={item.key}
                                    type="button"
                                    onClick={() => setStrategy(item.key)}
                                    className={cls(
                                        "rounded-xl border px-3.5 py-3 text-left transition-colors",
                                        strategy === item.key
                                            ? "border-[var(--labs-accent)] bg-[rgba(139,139,255,0.14)]"
                                            : "border-[var(--labs-border)] hover:border-[var(--labs-border-strong)]"
                                    )}
                                >
                                    <span
                                        className={cls(
                                            "block text-[0.88rem] font-medium",
                                            strategy === item.key
                                                ? "text-[var(--labs-accent)]"
                                                : "text-white"
                                        )}
                                    >
                                        {item.label}
                                    </span>
                                    <span className="mt-1 block text-[0.72rem] leading-relaxed text-[var(--labs-muted)]">
                                        {item.hint}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </ControlSection>

                    <ControlSection title="NUMBER OF ITEMS" divided>
                        <SegmentedButtons
                            value={showCount}
                            onChange={setShowCount}
                            options={ITEM_PRESETS.map((preset) => ({
                                label: String(preset),
                                value: preset,
                            }))}
                        />
                    </ControlSection>

                    <ControlSection title="COMPONENT COMPLEXITY" divided>
                        <SegmentedButtons
                            value={complexity}
                            onChange={setComplexity}
                            options={COMPLEXITY_OPTIONS.map((option) => ({
                                label: option.label,
                                value: option.key,
                            }))}
                        />
                    </ControlSection>

                    <ControlSection title="OPTIONS" divided>
                        <label className="flex items-center justify-between gap-3 text-[0.82rem] text-[var(--labs-muted)]">
                            <span>Render Visualization</span>
                            <button
                                type="button"
                                role="switch"
                                aria-checked={visualize}
                                onClick={() => setVisualize((value) => !value)}
                                className={cls(
                                    "relative h-6 w-11 rounded-full border transition-colors",
                                    visualize
                                        ? "border-[var(--labs-accent)] bg-[rgba(139,139,255,0.35)]"
                                        : "border-[var(--labs-border)] bg-[#0c0c14]"
                                )}
                            >
                                <span
                                    className={cls(
                                        "absolute top-0.5 size-4 rounded-full bg-white transition-transform",
                                        visualize ? "left-6" : "left-0.5"
                                    )}
                                />
                            </button>
                        </label>
                    </ControlSection>

                    <ControlSection divided>
                        <div className="flex flex-col gap-2.5">
                            <button
                                type="button"
                                onClick={runParentUpdate}
                                className="rounded-xl bg-[linear-gradient(135deg,#6e6ef0,#8b8bff)] px-4 py-3 text-[0.9rem] font-semibold text-white shadow-[0_0_24px_rgba(139,139,255,0.25)] transition-opacity hover:opacity-90"
                            >
                                Run Benchmark
                            </button>
                            <button
                                type="button"
                                onClick={resetAll}
                                className="text-[0.8rem] text-[var(--labs-muted)] transition-colors hover:text-white"
                            >
                                Reset
                            </button>
                        </div>
                    </ControlSection>
                </ControlsSidebar>

                <section aria-label="Preview" className="relative flex min-h-[560px] flex-1 flex-col">
                    <header className="flex items-center justify-between gap-3 border-b border-[var(--labs-border)] px-5 py-3">
                        <h2 className="text-[0.72rem] font-semibold tracking-[0.16em] text-[var(--labs-muted)]">
                            PREVIEW
                        </h2>
                        <span className="rounded-md bg-[rgba(239,68,68,0.16)] px-2.5 py-1 text-[0.72rem] font-medium text-[#f87171]">
                            {strategyMeta.label}
                        </span>
                    </header>

                    <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden p-5">
                        <LabsGrid variant="scene" />

                        <div className="relative mx-auto flex h-full w-full max-w-[560px] flex-col overflow-hidden rounded-2xl border border-[var(--labs-border)] bg-[rgba(10,10,16,0.94)] shadow-[0_24px_60px_rgba(0,0,0,0.45)]">
                            <div className="border-b border-[var(--labs-border)] px-4 py-3">
                                <h3 className="text-[0.95rem] font-semibold text-white">Products</h3>
                                <p className="mt-0.5 text-[0.72rem] text-[var(--labs-muted)]">
                                    {formatNumber(TOTAL_ITEMS)} items
                                </p>
                            </div>

                            <div className="border-b border-[var(--labs-border)] px-4 py-3">
                                <label className="flex items-center gap-2 rounded-lg border border-[var(--labs-border)] bg-[#08080e] px-3 py-2">
                                    <LuSearch className="size-3.5 shrink-0 text-[var(--labs-muted)]" />
                                    <input
                                        value={query}
                                        onChange={(event) => setQuery(event.target.value)}
                                        placeholder="Search products..."
                                        className="w-full bg-transparent text-[0.85rem] text-white outline-none placeholder:text-[var(--labs-muted)]"
                                    />
                                </label>
                            </div>

                            <div
                                ref={scrollRef}
                                className="min-h-0 flex-1 overflow-auto"
                                onScroll={(event) => {
                                    if (isVirtualized) {
                                        setScrollTop(event.currentTarget.scrollTop);
                                    }
                                }}
                            >
                                <div className="relative" style={{height: Math.max(products.length, 1) * ROW_HEIGHT}}>
                                    <div
                                        className={cls(isVirtualized && "absolute inset-x-0")}
                                        style={
                                            isVirtualized
                                                ? {transform: `translateY(${startIndex * ROW_HEIGHT}px)`}
                                                : undefined
                                        }
                                    >
                                        {visibleProducts.map((product) => (
                                            <Row
                                                key={product.id}
                                                product={product}
                                                status={rowStatus(product)}
                                                complexity={complexity}
                                                selected={selectedId === product.id}
                                                onSelect={onSelect}
                                                onRendered={onRowRendered}
                                                style={{height: ROW_HEIGHT}}
                                            />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            <footer className="flex flex-wrap items-center justify-between gap-2 border-t border-[var(--labs-border)] px-4 py-2.5 text-[0.72rem] text-[var(--labs-muted)]">
                                <span>
                                    Showing {formatNumber(showCount)} of {formatNumber(TOTAL_ITEMS)}
                                </span>
                                {visualize ? (
                                    <div className="flex items-center gap-3">
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="size-2 rounded-[2px] bg-[var(--labs-accent)]" />
                                            Rendered
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="size-2 rounded-[2px] bg-[#e8b84a]" />
                                            Updated
                                        </span>
                                        <span className="inline-flex items-center gap-1.5">
                                            <span className="size-2 rounded-[2px] border border-[var(--labs-border-strong)]" />
                                            Skipped
                                        </span>
                                    </div>
                                ) : null}
                            </footer>
                        </div>
                    </div>
                </section>

                <ControlsSidebar title="PERFORMANCE" side="right" maxWidthClassName="max-w-[320px]">
                    <ControlSection>
                        <div className="mb-5">
                            <p className="font-mono text-[2rem] leading-none text-white">
                                {metrics.lastMs.toFixed(1)}
                                <span className="ml-1 text-[0.95rem] text-[var(--labs-muted)]">ms</span>
                            </p>
                            <p className="mt-2 text-[0.75rem] tracking-[0.12em] text-[var(--labs-muted)]">
                                LAST RENDER
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {[
                                {label: "Renders", value: formatNumber(metrics.renders)},
                                {label: "FPS", value: String(metrics.fps)},
                                {label: "Items", value: formatNumber(TOTAL_ITEMS)},
                                {label: "DOM", value: formatNumber(metrics.domNodes)},
                            ].map((stat) => (
                                <div
                                    key={stat.label}
                                    className="rounded-xl border border-[var(--labs-border)] bg-[#0a0a12] px-3 py-3"
                                >
                                    <p className="font-mono text-[1.05rem] text-white">{stat.value}</p>
                                    <p className="mt-1 text-[0.68rem] tracking-[0.12em] text-[var(--labs-muted)]">
                                        {stat.label.toUpperCase()}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </ControlSection>

                    <ControlSection title="TIMELINE" divided>
                        <div className="flex flex-col gap-3">
                            <TimelineBar label="Render" ms={metrics.renderMs} total={metrics.lastMs || 1} />
                            <TimelineBar label="Commit" ms={metrics.commitMs} total={metrics.lastMs || 1} />
                            <TimelineBar label="Paint" ms={metrics.paintMs} total={metrics.lastMs || 1} />
                            <TimelineBar label="Total" ms={metrics.lastMs} total={metrics.lastMs || 1} accent />
                        </div>
                    </ControlSection>

                    <ControlSection title="WHAT CHANGED" divided>
                        <p className="text-[0.8rem] leading-relaxed text-[var(--labs-muted)]">
                            {strategyMeta.summary}
                        </p>
                    </ControlSection>

                    <ControlSection title="IMPLEMENTATION" divided>
                        <div className="mb-3 flex flex-wrap gap-1.5">
                            {CODE_TABS.map((tab) => (
                                <ControlButton
                                    key={tab.key}
                                    active={codeTab === tab.key}
                                    onClick={() => setCodeTab(tab.key)}
                                >
                                    {tab.label}
                                </ControlButton>
                            ))}
                        </div>
                        <GeneratedCodePanel
                            code={code}
                            copied={copied}
                            onCopy={copyCode}
                            compact
                            copyLabel="Copy"
                        />
                    </ControlSection>
                </ControlsSidebar>
            </PlaygroundShell>

            <section
                aria-label="What are we measuring"
                className="border-t border-[var(--labs-border)] bg-[#08080e] px-8 py-10 max-phone:px-4"
            >
                <h2 className="mb-3 text-[1.25rem] font-semibold text-white">What are we measuring?</h2>
                <p className="mb-8 max-w-3xl text-[0.95rem] leading-relaxed text-[var(--labs-muted)]">
                    React rendering performance depends on how much work needs to be performed when
                    state or props change. This playground lets you experiment with different
                    optimization strategies and observe their effect.
                </p>

                <div className="grid grid-cols-3 gap-4 max-small-desktop:grid-cols-1">
                    {[
                        {
                            title: "Render",
                            body: "How many components React evaluates when state changes. Memoization reduces this count.",
                        },
                        {
                            title: "Commit",
                            body: "How much work React commits to the DOM. Only components with actual changes require DOM updates.",
                        },
                        {
                            title: "Paint",
                            body: "How much visual work the browser performs to display the updated UI on screen.",
                        },
                    ].map((card) => (
                        <article
                            key={card.title}
                            className="rounded-2xl border border-[var(--labs-border)] bg-[#0a0a12] p-5"
                        >
                            <h3 className="mb-2 text-[0.95rem] font-semibold text-[var(--labs-accent)]">
                                {card.title}
                            </h3>
                            <p className="text-[0.85rem] leading-relaxed text-[var(--labs-muted)]">
                                {card.body}
                            </p>
                        </article>
                    ))}
                </div>
            </section>
        </div>
    );
}

export default RenderingPlayground;
