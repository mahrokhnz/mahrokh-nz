import data from "@/data/db.json";
import {LABS_PATH} from "@/app/labs/seo/constants";

type LabsCategory = (typeof data.labs.categories)[number];
type LabsExperiment = LabsCategory["experiments"][number];

type ExperimentWithSlug = LabsExperiment & {slug: string};
type LiveExperiment = ExperimentWithSlug & {status: "live"};

export function getLabsCategories(): LabsCategory[] {
    return data.labs.categories;
}

export function getLabsCategory(categoryId: string): LabsCategory | undefined {
    return data.labs.categories.find((category) => category.id === categoryId);
}

export function getFeaturedCategory(): LabsCategory | undefined {
    return data.labs.categories.find((category) => "featured" in category && category.featured);
}

export function getSideCategories(): LabsCategory[] {
    return data.labs.categories.filter((category) => !("featured" in category && category.featured));
}

export function hasSlug(experiment: LabsExperiment): experiment is ExperimentWithSlug {
    return "slug" in experiment && typeof experiment.slug === "string" && experiment.slug.length > 0;
}

export function isLiveExperiment(experiment: LabsExperiment): experiment is LiveExperiment {
    return hasSlug(experiment) && "status" in experiment && experiment.status === "live";
}

export function getLabsExperiment(
    category: LabsCategory,
    experimentSlug: string
): LabsExperiment | undefined {
    return category.experiments.find(
        (experiment) => hasSlug(experiment) && experiment.slug === experimentSlug
    );
}

export function getExperimentDescription(experiment: LabsExperiment): string {
    if ("description" in experiment && experiment.description) {
        return experiment.description;
    }
    return `${experiment.title} — interactive frontend lab experiment by Mahrokh Nabizadeh.`;
}

export function getExperimentTags(experiment: LabsExperiment): string[] {
    return "tags" in experiment && Array.isArray(experiment.tags) ? experiment.tags : [];
}

export function getCategoryPath(categoryId: string): string {
    return `${LABS_PATH}/${categoryId}`;
}

export function getExperimentPath(categoryId: string, experimentSlug: string): string {
    return `${LABS_PATH}/${categoryId}/${experimentSlug}`;
}

export function getExperimentHref(categoryId: string, experiment: LabsExperiment): string {
    if (isLiveExperiment(experiment)) {
        return getExperimentPath(categoryId, experiment.slug);
    }
    return getCategoryPath(categoryId);
}

export function listLiveExperimentParams(): Array<{category: string; experiment: string}> {
    return data.labs.categories.flatMap((category) =>
        category.experiments.filter(isLiveExperiment).map((experiment) => ({
            category: category.id,
            experiment: experiment.slug,
        }))
    );
}

export function getCategoryCta(category: LabsCategory): string | undefined {
    return "cta" in category && typeof category.cta === "string" ? category.cta : undefined;
}

export type {LabsCategory, LabsExperiment, ExperimentWithSlug, LiveExperiment};
