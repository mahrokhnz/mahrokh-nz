import {notFound} from "next/navigation";
import JsonLdScript from "@/components/seo/jsonld_script";
import cls from "@/utils/class_names";
import LabsShell from "@/app/labs/_components/labs_shell";
import LabsBreadcrumb from "@/app/labs/_components/labs_breadcrumb";
import LabsTags from "@/app/labs/_components/labs_tags";
import {labsPadding} from "@/app/labs/_components/labs_section";
import {getExperimentPlayground} from "@/app/labs/_components/playgrounds/registry";
import {LABS_PATH} from "@/app/labs/seo/constants";
import {
    getCategoryPath,
    getExperimentDescription,
    getExperimentTags,
    getLabsCategory,
    getLabsExperiment,
    isLiveExperiment,
    listLiveExperimentParams,
} from "@/app/labs/_lib/data";
import {
    getExperimentAppJsonLd,
    getExperimentBreadcrumbJsonLd,
    getExperimentWebPageJsonLd,
} from "@/app/labs/seo/jsonld";

export {generateMetadata} from "./seo/metadata";

export function generateStaticParams() {
    return listLiveExperimentParams();
}

interface ExperimentPageProps {
    params: Promise<{category: string; experiment: string}>;
}

async function ExperimentPage({params}: ExperimentPageProps) {
    const {category: categoryId, experiment: experimentSlug} = await params;
    const category = getLabsCategory(categoryId);
    const experiment = category ? getLabsExperiment(category, experimentSlug) : undefined;
    const Playground = getExperimentPlayground(experimentSlug);

    if (!category || !experiment || !isLiveExperiment(experiment) || !Playground) {
        notFound();
    }

    const tags = getExperimentTags(experiment);

    return (
        <LabsShell>
            <JsonLdScript
                id={`ld-labs-${category.id}-${experimentSlug}`}
                data={getExperimentWebPageJsonLd(category, experiment, experimentSlug)}
            />
            <JsonLdScript
                id={`ld-labs-${category.id}-${experimentSlug}-breadcrumbs`}
                data={getExperimentBreadcrumbJsonLd(category, experiment, experimentSlug)}
            />
            <JsonLdScript
                id={`ld-labs-${category.id}-${experimentSlug}-app`}
                data={getExperimentAppJsonLd(category, experiment, experimentSlug)}
            />

            <header
                className={cls(
                    "flex items-center justify-between gap-4 border-b border-[var(--labs-border)] py-4 pt-28 max-phone:flex-col max-phone:items-start",
                    labsPadding
                )}
            >
                <div>
                    <h1 className="sr-only">{experiment.title}</h1>
                    <p className="sr-only">{getExperimentDescription(experiment)}</p>
                    <LabsBreadcrumb
                        variant="mono"
                        items={[
                            {label: "Labs", href: LABS_PATH},
                            {label: category.title, href: getCategoryPath(category.id)},
                            {label: experiment.title},
                        ]}
                    />
                </div>
                <div className="flex flex-wrap items-center gap-3">
                    <LabsTags tags={tags} />
                    {isLiveExperiment(experiment) ? (
                        <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-[#4ade80]">
                            <span className="size-1.5 rounded-full bg-[#4ade80]" aria-hidden />
                            Live
                        </span>
                    ) : null}
                </div>
            </header>

            <Playground />
        </LabsShell>
    );
}

export default ExperimentPage;
