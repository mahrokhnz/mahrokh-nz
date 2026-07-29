import Link from "next/link";
import cls from "@/utils/class_names";

export type BreadcrumbItem = {
    label: string;
    href?: string;
};

interface LabsBreadcrumbProps {
    items: BreadcrumbItem[];
    variant?: "default" | "mono";
    className?: string;
}

function LabsBreadcrumb({items, variant = "default", className}: LabsBreadcrumbProps) {
    return (
        <nav
            aria-label="Breadcrumb"
            className={cls(
                "flex flex-wrap items-center gap-2",
                variant === "mono" ? "font-mono text-[0.8rem]" : "text-[0.9rem]",
                className
            )}
        >
            {items.map((item, index) => {
                const isLast = index === items.length - 1;

                return (
                    <span key={`${item.label}-${index}`} className="inline-flex items-center gap-2">
                        {index > 0 ? <span className="text-[var(--labs-muted)]">/</span> : null}
                        {item.href && !isLast ? (
                            <Link
                                href={item.href}
                                className="text-[var(--labs-muted)] transition-colors hover:text-white"
                            >
                                {item.label}
                            </Link>
                        ) : (
                            <span
                                className={
                                    isLast
                                        ? variant === "mono"
                                            ? "text-white"
                                            : "text-[var(--labs-accent)]"
                                        : "text-[var(--labs-muted)]"
                                }
                            >
                                {item.label}
                            </span>
                        )}
                    </span>
                );
            })}
        </nav>
    );
}

export default LabsBreadcrumb;
