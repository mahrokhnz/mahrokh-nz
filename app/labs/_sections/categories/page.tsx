import LabsSection from "@/app/labs/_components/labs_section/page";
import CategoryCard from "@/app/labs/_components/category_card/page";
import {getLabsCategories} from "@/app/labs/_lib/data";

function LabsCategories() {
    const categories = getLabsCategories();

    return (
        <LabsSection className="pb-24 max-tablet:pb-16" aria-label="Lab categories">
            <ul
                className="grid grid-cols-3 gap-5 max-medium-desktop:gap-4 max-small-desktop:grid-cols-2 max-tablet:grid-cols-1"
                style={{animation: "labs-fade-up 0.8s ease-out 0.12s both"}}
            >
                {categories.map((category) => (
                    <li key={category.id} className="flex">
                        <CategoryCard category={category} />
                    </li>
                ))}
            </ul>
        </LabsSection>
    );
}

export default LabsCategories;
