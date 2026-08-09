import cls from "@/utils/class_names";
import LabsBreadcrumb, {type BreadcrumbItem} from "@/app/labs/_components/labs_breadcrumb/page";
import LabsTags from "@/app/labs/_components/labs_tags/page";
import {labsPadding} from "@/app/labs/_components/labs_section/page";

interface ExperimentToolbarProps {
    title: string;
    description: string;
    breadcrumbItems: BreadcrumbItem[];
    tags: string[];
    isLive: boolean;
}

function ExperimentToolbar({
    title,
    description,
    breadcrumbItems,
    tags,
    isLive,
}: ExperimentToolbarProps) {
    return (
        <header
            className={cls(
                "flex items-center justify-between gap-4 border-b border-[var(--labs-border)] py-4 pt-28 max-phone:flex-col max-phone:items-start",
                labsPadding
            )}
        >
            <div>
                <h1 className="sr-only">{title}</h1>
                <p className="sr-only">{description}</p>
                <LabsBreadcrumb variant="mono" items={breadcrumbItems} />
            </div>
            <div className="flex flex-wrap items-center gap-3">
                <LabsTags tags={tags} />
                {isLive ? (
                    <span className="inline-flex items-center gap-1.5 text-[0.8rem] text-[#4ade80]">
                        <span className="size-1.5 rounded-full bg-[#4ade80]" aria-hidden />
                        Live
                    </span>
                ) : null}
            </div>
        </header>
    );
}

export default ExperimentToolbar;
