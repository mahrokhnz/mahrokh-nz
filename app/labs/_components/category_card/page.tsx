import Link from "next/link";
import CategoryIcon from "@/app/labs/_components/category_icon/page";
import {labsCardSurface} from "@/app/labs/_components/labs_card/page";
import {
    getCategoryPath,
    getExperimentHref,
    isLiveExperiment,
    type LabsCategory,
} from "@/app/labs/_lib/data";

interface CategoryCardProps {
    category: LabsCategory;
}

function CategoryCard({category}: CategoryCardProps) {
    const categoryHref = getCategoryPath(category.id);

    return (
        <article className={labsCardSurface("flex w-full flex-col gap-4 p-6")}>
            <header>
                <Link href={categoryHref} className="flex flex-col gap-4">
                    <div className="flex items-start justify-between gap-3">
                        <CategoryIcon name={category.icon} />
                        <span className="text-[0.85rem] text-[var(--labs-muted)]">
                            {category.experiments.length}
                        </span>
                    </div>

                    <div className="flex flex-col gap-2">
                        <h2 className="text-[1.15rem] font-semibold text-white">{category.title}</h2>
                        <p className="text-[0.9rem] leading-relaxed text-[var(--labs-muted)]">
                            {category.description}
                        </p>
                    </div>
                </Link>
            </header>

            <ul className="mt-1 flex flex-col gap-2.5">
                {category.experiments.map((experiment) => {
                    const isLive = isLiveExperiment(experiment);

                    return (
                        <li key={experiment.id}>
                            {isLive ? (
                                <Link
                                    href={getExperimentHref(category.id, experiment)}
                                    className="group flex items-center gap-2.5 text-[0.9rem] text-[var(--labs-accent)] transition-colors duration-300 hover:opacity-80"
                                >
                                    <span className="size-1 shrink-0 rounded-full bg-[var(--labs-accent)]" />
                                    {experiment.title}
                                </Link>
                            ) : (
                                <span
                                    aria-disabled="true"
                                    className="pointer-events-none flex items-center gap-2.5 text-[0.9rem] text-[var(--labs-muted)]/40"
                                >
                                    <span className="size-1 shrink-0 rounded-full bg-[var(--labs-muted)]/40" />
                                    {experiment.title}
                                </span>
                            )}
                        </li>
                    );
                })}
            </ul>
        </article>
    );
}

export default CategoryCard;
