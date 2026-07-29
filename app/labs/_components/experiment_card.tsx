import Link from "next/link";
import cls from "@/utils/class_names";
import LabsTags from "@/app/labs/_components/labs_tags";
import {
    getExperimentHref,
    getExperimentTags,
    isLiveExperiment,
    type LabsExperiment,
} from "@/app/labs/seo/data";

interface ExperimentCardProps {
    experiment: LabsExperiment;
    index: number;
    categoryId: string;
}

function ExperimentCard({experiment, index, categoryId}: ExperimentCardProps) {
    const isLive = isLiveExperiment(experiment);
    const href = isLive ? getExperimentHref(categoryId, experiment) : undefined;
    const tags = getExperimentTags(experiment);

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
                            isLive ? "text-white" : "text-white/80"
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
                {"description" in experiment && experiment.description ? (
                    <p
                        className={cls(
                            "max-w-2xl text-[0.9rem] leading-relaxed",
                            isLive ? "text-[var(--labs-muted)]" : "text-[var(--labs-muted)]/70"
                        )}
                    >
                        {experiment.description}
                    </p>
                ) : null}
            </div>

            <div className="flex shrink-0 flex-col items-end justify-between gap-4 self-stretch max-small-desktop:w-full max-small-desktop:flex-row max-small-desktop:items-center">
                <LabsTags tags={tags} dimmed={!isLive} className="justify-end max-small-desktop:justify-start" />

                {isLive ? (
                    <span className="text-[0.9rem] font-medium text-[var(--labs-accent)] transition-opacity group-hover:opacity-80">
                        Open →
                    </span>
                ) : (
                    <span className="text-[0.8rem] font-medium tracking-[0.08em] text-[var(--labs-muted)]/55">
                        SOON
                    </span>
                )}
            </div>
        </>
    );

    const className = cls(
        "group flex items-start gap-5 rounded-2xl border border-[var(--labs-border)] bg-[var(--labs-card)] px-5 py-5 transition-all duration-300 max-small-desktop:flex-col max-phone:gap-4 max-phone:px-4 max-phone:py-4",
        isLive
            ? "hover:border-[var(--labs-border-strong)] hover:bg-[var(--labs-card-hover)]"
            : "opacity-70"
    );

    if (href) {
        return (
            <Link href={href} className={className}>
                {content}
            </Link>
        );
    }

    return <article className={className}>{content}</article>;
}

export default ExperimentCard;
