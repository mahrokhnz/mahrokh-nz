import Link from "next/link";
import cls from "@/utils/class_names";
import LabsTags from "@/app/labs/_components/labs_tags";
import {labsCardSurface} from "@/app/labs/_components/labs_card";
import {
    getExperimentHref,
    getExperimentOwnDescription,
    getExperimentTags,
    isLiveExperiment,
    type LabsExperiment,
} from "@/app/labs/_lib/data";

interface ExperimentCardProps {
    experiment: LabsExperiment;
    index: number;
    categoryId: string;
}

function ExperimentCard({experiment, index, categoryId}: ExperimentCardProps) {
    const isLive = isLiveExperiment(experiment);
    const tags = getExperimentTags(experiment);
    const description = getExperimentOwnDescription(experiment);

    const content = (
        <>
            <span className="w-8 shrink-0 pt-1 text-[0.85rem] tabular-nums text-[var(--labs-muted)] max-phone:w-7">
                {String(index + 1).padStart(2, "0")}
            </span>

            <div className="flex min-w-0 flex-1 flex-col gap-2">
                <div className="flex flex-wrap items-center gap-2.5">
                    <h2
                        className={cls(
                            "text-[1.05rem] font-semibold leading-snug",
                            isLive ? "text-white" : "text-white/50"
                        )}
                    >
                        {experiment.title}
                    </h2>
                    {isLive ? (
                        <span className="rounded-md bg-[rgba(139,139,255,0.18)] px-2 py-0.5 text-[0.65rem] font-semibold tracking-[0.08em] text-[var(--labs-accent)]">
                            LIVE
                        </span>
                    ) : null}
                </div>
                {description ? (
                    <p
                        className={cls(
                            "max-w-2xl text-[0.9rem] leading-relaxed",
                            isLive ? "text-[var(--labs-muted)]" : "text-[var(--labs-muted)]/50"
                        )}
                    >
                        {description}
                    </p>
                ) : null}
            </div>

            <div className="flex shrink-0 flex-col items-end justify-between gap-4 self-stretch max-small-desktop:w-full max-small-desktop:flex-row max-small-desktop:items-center">
                <LabsTags
                    tags={tags}
                    dimmed={!isLive}
                    className="justify-end max-small-desktop:justify-start"
                />

                {isLive ? (
                    <span className="text-[0.9rem] font-medium text-[var(--labs-accent)] transition-opacity group-hover:opacity-80">
                        Open →
                    </span>
                ) : null}
            </div>
        </>
    );

    if (isLive) {
        return (
            <Link
                href={getExperimentHref(categoryId, experiment)}
                className={labsCardSurface(
                    "group flex items-start gap-5 px-5 py-5 transition-all max-small-desktop:flex-col max-phone:gap-4 max-phone:px-4 max-phone:py-4"
                )}
            >
                {content}
            </Link>
        );
    }

    return (
        <article
            aria-disabled="true"
            className={labsCardSurface(
                "pointer-events-none flex cursor-not-allowed items-start gap-5 px-5 py-5 opacity-50 max-small-desktop:flex-col max-phone:gap-4 max-phone:px-4 max-phone:py-4",
                "hover:border-[var(--labs-border)] hover:bg-[var(--labs-card)]"
            )}
        >
            {content}
        </article>
    );
}

export default ExperimentCard;
