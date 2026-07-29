import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import {
    getExperimentDescription,
    getExperimentPath,
    getExperimentTags,
    getLabsCategory,
    getLabsExperiment,
} from "@/app/labs/seo/data";

export async function generateMetadata({
    params,
}: {
    params: Promise<{category: string; experiment: string}>;
}): Promise<Metadata> {
    const {category: categoryId, experiment: experimentSlug} = await params;
    const category = getLabsCategory(categoryId);
    const experiment = category ? getLabsExperiment(category, experimentSlug) : undefined;

    if (!category || !experiment) {
        return {title: "Not found", robots: {index: false, follow: false}};
    }

    return metadataCreator({
        title: experiment.title,
        description: getExperimentDescription(experiment),
        path: getExperimentPath(category.id, experimentSlug),
        keywords: getExperimentTags(experiment),
    });
}
