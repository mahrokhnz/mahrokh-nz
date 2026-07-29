import {notFound} from "next/navigation";
import JsonLdScript from "@/components/seo/jsonld_script";
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
    listLiveExperimentParams,
} from "@/app/labs/seo/data";
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

    if (!category || !experiment || !Playground) notFound();

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

            <div
                className={`flex items-center justify-between gap-4 border-b border-[var(--labs-border)] py-4 pt-28 max-phone:flex-col max-phone:items-start ${labsPadding}`}
            >
                <LabsBreadcrumb
                    variant="mono"
                    items={[
                        {label: "Labs", href: LABS_PATH},
                        {label: category.title, href: getCategoryPath(category.id)},
                        {label: experiment.title},
                    ]}
                />
                <LabsTags tags={tags} />
            </div>

            <h1 className="sr-only">{experiment.title}</h1>
            <p className="sr-only">{getExperimentDescription(experiment)}</p>

            <Playground />
        </LabsShell>
    );
}

export default ExperimentPage;
