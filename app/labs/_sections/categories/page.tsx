import Link from "next/link";
import cls from "@/utils/class_names";
import LabsSection from "@/app/labs/_components/labs_section";
import CategoryIcon from "@/app/labs/_components/category_icon";
import {
    getCategoryCta,
    getCategoryPath,
    getExperimentHref,
    getFeaturedCategory,
    getSideCategories,
} from "@/app/labs/seo/data";

function LabsCategories() {
    const featured = getFeaturedCategory();
    const sideCards = getSideCategories();

    return (
        <LabsSection className="pb-24 max-tablet:pb-16">
            <div
                className="grid grid-cols-3 gap-5 max-medium-desktop:gap-4 max-small-desktop:grid-cols-2 max-tablet:grid-cols-1"
                style={{animation: "labs-fade-up 0.8s ease-out 0.12s both"}}
            >
                {featured && (
                    <article
                        className={cls(
                            "col-span-2 flex flex-col gap-5 rounded-2xl border border-[var(--labs-border)] bg-[var(--labs-card)] p-6 transition-colors duration-300 hover:border-[var(--labs-border-strong)] hover:bg-[var(--labs-card-hover)]",
                            "max-small-desktop:col-span-2 max-tablet:col-span-1"
                        )}
                    >
                        <div className="flex items-start justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <CategoryIcon name={featured.icon} />
                                <div className="flex flex-wrap items-center gap-2.5">
                                    <h2 className="text-[1.15rem] font-semibold text-white">
                                        {featured.title}
                                    </h2>
                                    <span className="rounded-md bg-[rgba(139,139,255,0.14)] px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] text-[var(--labs-accent)]">
                                        FEATURED
                                    </span>
                                </div>
                            </div>
                            <span className="shrink-0 text-[0.8rem] text-[var(--labs-muted)]">
                                {featured.experiments.length} experiments
                            </span>
                        </div>

                        <p className="text-[0.95rem] leading-relaxed text-[var(--labs-muted)]">
                            {featured.description}
                        </p>

                        <div className="grid grid-cols-5 gap-3 max-medium-desktop:grid-cols-3 max-big-phone:grid-cols-2 max-phone:grid-cols-1">
                            {featured.experiments.map((experiment, index) => (
                                <Link
                                    key={experiment.id}
                                    href={getExperimentHref(featured.id, experiment)}
                                    className={cls(
                                        "group flex min-h-[7.5rem] flex-col justify-between rounded-xl border border-[var(--labs-border)] bg-[rgba(255,255,255,0.015)] p-3 transition-all duration-300",
                                        "hover:border-[var(--labs-border-strong)] hover:bg-[rgba(139,139,255,0.06)]"
                                    )}
                                >
                                    <span className="text-[0.7rem] text-[var(--labs-muted)]">
                                        {String(index + 1).padStart(2, "0")}
                                    </span>
                                    <span
                                        className={cls(
                                            "text-[0.85rem] leading-snug transition-colors duration-300",
                                            index === 0
                                                ? "text-[var(--labs-accent)]"
                                                : "text-[var(--labs-muted)] group-hover:text-white"
                                        )}
                                    >
                                        {experiment.title}
                                    </span>
                                </Link>
                            ))}
                        </div>

                        {getCategoryCta(featured) ? (
                            <Link
                                href={getCategoryPath(featured.id)}
                                className="mt-auto inline-flex w-fit items-center gap-1.5 text-[0.9rem] text-[var(--labs-accent)] transition-opacity hover:opacity-80"
                            >
                                {getCategoryCta(featured)}
                                <span aria-hidden>→</span>
                            </Link>
                        ) : null}
                    </article>
                )}

                {sideCards.map((category) => (
                    <article
                        key={category.id}
                        className="flex flex-col gap-4 rounded-2xl border border-[var(--labs-border)] bg-[var(--labs-card)] p-6 transition-colors duration-300 hover:border-[var(--labs-border-strong)] hover:bg-[var(--labs-card-hover)]"
                    >
                        <div className="flex items-start justify-between gap-3">
                            <CategoryIcon name={category.icon} />
                            <span className="text-[0.85rem] text-[var(--labs-muted)]">
                                {category.experiments.length}
                            </span>
                        </div>

                        <div className="flex flex-col gap-2">
                            <h2 className="text-[1.15rem] font-semibold text-white">
                                {category.title}
                            </h2>
                            <p className="text-[0.9rem] leading-relaxed text-[var(--labs-muted)]">
                                {category.description}
                            </p>
                        </div>

                        <ul className="mt-1 flex flex-col gap-2.5">
                            {category.experiments.map((experiment) => (
                                <li key={experiment.id}>
                                    <Link
                                        href={getCategoryPath(category.id)}
                                        className="group flex items-center gap-2.5 text-[0.9rem] text-[var(--labs-muted)] transition-colors duration-300 hover:text-white"
                                    >
                                        <span className="size-1 shrink-0 rounded-full bg-[var(--labs-muted)] transition-colors group-hover:bg-[var(--labs-accent)]" />
                                        {experiment.title}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </article>
                ))}
            </div>
        </LabsSection>
    );
}

export default LabsCategories;
