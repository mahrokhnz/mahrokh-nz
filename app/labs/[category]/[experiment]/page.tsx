import {notFound} from "next/navigation";
import JsonLdScript from "@/components/seo/jsonld_script";
import LabsShell from "@/app/labs/_components/labs_shell/page";
import ExperimentToolbar from "@/app/labs/_components/experiment_toolbar/page";
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

            <ExperimentToolbar
                title={experiment.title}
                description={getExperimentDescription(experiment)}
                breadcrumbItems={[
                    {label: "Labs", href: LABS_PATH},
                    {label: category.title, href: getCategoryPath(category.id)},
                    {label: experiment.title},
                ]}
                tags={getExperimentTags(experiment)}
                isLive={isLiveExperiment(experiment)}
            />

            <Playground />
        </LabsShell>
    );
}

export default ExperimentPage;
