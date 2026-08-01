import type {Metadata} from "next";
import metadataCreator from "@/utils/server-metadata";
import {getCategoryPath, getLabsCategory} from "@/app/labs/_lib/data";

export async function generateMetadata({
    params,
}: {
    params: Promise<{category: string}>;
}): Promise<Metadata> {
    const {category: categoryId} = await params;
    const category = getLabsCategory(categoryId);

    if (!category) {
        return {title: "Not found", robots: {index: false, follow: false}};
    }

    return metadataCreator({
        title: `${category.title} Labs`,
        description: category.description,
        path: getCategoryPath(category.id),
    });
}
