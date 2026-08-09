import type {Complexity, Metrics, Strategy} from "./constants";

export function buildMetrics(input: {
    strategy: Strategy;
    complexity: Complexity;
    renderedCount: number;
    domNodes: number;
    computeMs: number;
}): Metrics {
    const {strategy, complexity, renderedCount, domNodes, computeMs} = input;
    const complexityFactor = complexity === "low" ? 0.7 : complexity === "high" ? 1.55 : 1;

    let renderMs = Math.max(0.25, (renderedCount / 70) * 4.1 * complexityFactor + computeMs);
    let commitMs = Math.max(0.12, (domNodes / 70) * 2.3 * complexityFactor);
    let paintMs = Math.max(0.1, (domNodes / 70) * 1.05 * complexityFactor + 0.15);

    if (strategy === "usememo") renderMs *= 0.5;
    if (strategy === "usecallback") renderMs *= 0.55;
    if (strategy === "virtualized") {
        commitMs *= 0.4;
        paintMs *= 0.45;
    }

    const lastMs = renderMs + commitMs + paintMs;

    return {
        lastMs,
        renders: renderedCount,
        fps: Math.max(8, Math.min(60, Math.round(1000 / Math.max(lastMs, 10)))),
        domNodes,
        renderMs,
        commitMs,
        paintMs,
    };
}
