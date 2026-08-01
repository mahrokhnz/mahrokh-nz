import {AUTHOR_NAME, SITE_NAME, SITE_URL} from "@/config/seo";
import {
    absolutePath,
    getBreadcrumbListJsonLd,
    getWebPageJsonLd,
} from "@/utils/seo/jsonld";
import {LABS_PATH} from "@/app/labs/seo/constants";
import {
    getExperimentDescription,
    getExperimentPath,
    getExperimentTags,
    getCategoryPath,
    hasSlug,
    type LabsCategory,
    type LabsExperiment,
} from "@/app/labs/_lib/data";

type JsonLd = Record<string, unknown>;

export function getCategoryWebPageJsonLd(category: LabsCategory): JsonLd {
    return getWebPageJsonLd({
        title: `${category.title} Labs`,
        description: category.description,
        path: getCategoryPath(category.id),
    });
}

export function getCategoryBreadcrumbJsonLd(category: LabsCategory): JsonLd {
    return getBreadcrumbListJsonLd([
        {name: "Labs", path: LABS_PATH},
        {name: category.title, path: getCategoryPath(category.id)},
    ]);
}

export function getCategoryItemListJsonLd(category: LabsCategory): JsonLd {
    return {
        "@context": "https://schema.org",
        "@type": "ItemList",
        name: `${category.title} experiments`,
        description: category.description,
        numberOfItems: category.experiments.length,
        itemListElement: category.experiments.map((experiment, index) => {
            const path = hasSlug(experiment)
                ? getExperimentPath(category.id, experiment.slug)
                : getCategoryPath(category.id);

            return {
                "@type": "ListItem",
                position: index + 1,
                name: experiment.title,
                url: absolutePath(path),
            };
        }),
        author: {"@type": "Person", name: AUTHOR_NAME},
        isPartOf: {"@type": "WebSite", name: SITE_NAME},
    };
}

export function getExperimentWebPageJsonLd(
    category: LabsCategory,
    experiment: LabsExperiment,
    experimentSlug: string
): JsonLd {
    return getWebPageJsonLd({
        title: experiment.title,
        description: getExperimentDescription(experiment),
        path: getExperimentPath(category.id, experimentSlug),
    });
}

export function getExperimentBreadcrumbJsonLd(
    category: LabsCategory,
    experiment: LabsExperiment,
    experimentSlug: string
): JsonLd {
    return getBreadcrumbListJsonLd([
        {name: "Labs", path: LABS_PATH},
        {name: category.title, path: getCategoryPath(category.id)},
        {
            name: experiment.title,
            path: getExperimentPath(category.id, experimentSlug),
        },
    ]);
}

export function getExperimentAppJsonLd(
    category: LabsCategory,
    experiment: LabsExperiment,
    experimentSlug: string
): JsonLd {
    const tags = getExperimentTags(experiment);

    return {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: experiment.title,
        description: getExperimentDescription(experiment),
        url: absolutePath(getExperimentPath(category.id, experimentSlug)),
        applicationCategory: "DeveloperApplication",
        operatingSystem: "Any",
        browserRequirements: "Requires JavaScript and CSS 3D Transforms support",
        isAccessibleForFree: true,
        keywords: tags.join(", "),
        author: {"@type": "Person", name: AUTHOR_NAME, url: SITE_URL},
        publisher: {"@type": "Person", name: AUTHOR_NAME},
        isPartOf: {"@type": "WebSite", name: SITE_NAME, url: SITE_URL},
        about: {"@type": "Thing", name: category.title},
    };
}
