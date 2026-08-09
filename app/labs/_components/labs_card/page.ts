import cls from "@/utils/class_names";

export const labsCardClass =
    "rounded-2xl border border-[var(--labs-border)] bg-[var(--labs-card)] transition-colors duration-300 hover:border-[var(--labs-border-strong)] hover:bg-[var(--labs-card-hover)]";

export function labsCardSurface(...extra: Array<string | false | null | undefined>) {
    return cls(labsCardClass, ...extra);
}
