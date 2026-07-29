import {notFound} from "next/navigation";
import JsonLdScript from "@/components/seo/jsonld_script";
import LabsShell from "@/app/labs/_components/labs_shell";
import LabsSection from "@/app/labs/_components/labs_section";
import LabsGrid from "@/app/labs/_components/labs_grid";
import LabsBreadcrumb from "@/app/labs/_components/labs_breadcrumb";
import ExperimentCard from "@/app/labs/_components/experiment_card";
import {LABS_PATH} from "@/app/labs/seo/constants";
import {getLabsCategories, getLabsCategory} from "@/app/labs/seo/data";
import {
    getCategoryBreadcrumbJsonLd,
    getCategoryItemListJsonLd,
    getCategoryWebPageJsonLd,
} from "@/app/labs/seo/jsonld";

export {generateMetadata} from "./seo/metadata";

export function generateStaticParams() {
    return getLabsCategories().map((category) => ({category: category.id}));
}

interface CategoryPageProps {
    params: Promise<{category: string}>;
}

async function CategoryPage({params}: CategoryPageProps) {
    const {category: categoryId} = await params;
    const category = getLabsCategory(categoryId);

    if (!category) notFound();

    return (
        <LabsShell>
            <JsonLdScript id={`ld-labs-${category.id}`} data={getCategoryWebPageJsonLd(category)} />
            <JsonLdScript
                id={`ld-labs-${category.id}-breadcrumbs`}
                data={getCategoryBreadcrumbJsonLd(category)}
            />
            <JsonLdScript
                id={`ld-labs-${category.id}-list`}
                data={getCategoryItemListJsonLd(category)}
            />

            <LabsSection className="overflow-hidden pb-10 pt-36 max-tablet:pt-28">
                <LabsGrid variant="category" />

                <div className="relative" style={{animation: "labs-fade-up 0.7s ease-out both"}}>
                    <LabsBreadcrumb
                        className="mb-8"
                        items={[
                            {label: "Labs", href: LABS_PATH},
                            {label: category.title},
                        ]}
                    />

                    <div className="flex items-end justify-between gap-6 max-phone:flex-col max-phone:items-start">
                        <div className="max-w-2xl">
                            <h1 className="mb-4 text-[clamp(2.25rem,5vw,3.5rem)] font-bold tracking-tight text-white">
                                {category.title}
                            </h1>
                            <p className="text-[1.05rem] leading-relaxed text-[var(--labs-muted)] max-phone:text-[0.95rem]">
                                {category.description}
                            </p>
                        </div>
                        <span className="shrink-0 pb-1 text-[0.85rem] text-[var(--labs-muted)]">
                            {category.experiments.length} experiments
                        </span>
                    </div>
                </div>
            </LabsSection>

            <LabsSection className="flex flex-col gap-4 pb-24 max-tablet:pb-16">
                <div
                    className="flex flex-col gap-4"
                    style={{animation: "labs-fade-up 0.8s ease-out 0.1s both"}}
                >
                    {category.experiments.map((experiment, index) => (
                        <ExperimentCard
                            key={experiment.id}
                            experiment={experiment}
                            index={index}
                            categoryId={category.id}
                        />
                    ))}
                </div>
            </LabsSection>
        </LabsShell>
    );
}

export default CategoryPage;
