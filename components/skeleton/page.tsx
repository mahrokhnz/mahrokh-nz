import cls from "@/utils/class_names";

type SkeletonProps = {
    className?: string;
};

const pulse = "animate-shimmer rounded-lg bg-[linear-gradient(90deg,var(--secondaryColor)_25%,color-mix(in_srgb,var(--secondaryColor)_70%,var(--primaryColor))_50%,var(--secondaryColor)_75%)] [background-size:200%_100%]";

export function SkeletonPulse({className = ""}: SkeletonProps) {
    return <div className={cls(pulse, className)} aria-hidden="true" />;
}

export function ImageSkeleton({className = ""}: SkeletonProps) {
    return <SkeletonPulse className={cls("size-full min-h-[120px] rounded-[inherit]", className)} />;
}

export function BlogCardSkeleton() {
    return (
        <div className="flex w-full items-center justify-between gap-[100px] max-desktop:gap-[60px] max-medium-desktop:gap-10 max-big-phone:flex-col" aria-hidden="true">
            <SkeletonPulse className="w-[30%] shrink-0 aspect-[16/10] rounded-2xl max-big-phone:w-full" />
            <div className="flex w-full flex-1 flex-col gap-4">
                <SkeletonPulse className="h-3 w-[40%]" />
                <SkeletonPulse className="h-[22px] w-[70%]" />
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-10 w-[120px]" />
            </div>
        </div>
    );
}

export function ProjectCardSkeleton() {
    return (
        <div className="flex w-full flex-col-reverse gap-3 rounded-[5px] bg-(--secondaryColor) p-2.5" aria-hidden="true">
            <SkeletonPulse className="w-full max-h-[127px] aspect-[4/3] rounded-[5px]" />
            <SkeletonPulse className="mx-auto h-[18px] w-[70%]" />
        </div>
    );
}

export function AboutImageSkeleton({className = ""}: SkeletonProps) {
    return <SkeletonPulse className={cls("h-[38rem] w-[30rem] max-w-full rounded-3xl max-medium-desktop:h-[28rem] max-medium-desktop:w-full", className)} />;
}

export function BlogListSkeleton() {
    return (
        <div className="flex flex-col gap-10 py-[100px]">
            <SkeletonPulse className="h-9 w-[220px] max-w-[60%]" />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
            <BlogCardSkeleton />
        </div>
    );
}

export function ProjectsPageSkeleton() {
    return (
        <div className="flex flex-col gap-10 py-[100px]">
            <SkeletonPulse className="h-9 w-[220px] max-w-[60%]" />
            <div className="flex flex-wrap gap-2">
                {Array.from({length: 6}).map((_, i) => (
                    <SkeletonPulse key={i} className="h-8 w-16 rounded-full" />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-6 max-small-desktop:grid-cols-2 max-big-phone:grid-cols-1">
                {Array.from({length: 6}).map((_, i) => (
                    <ProjectCardSkeleton key={i} />
                ))}
            </div>
        </div>
    );
}

export function AboutPageSkeleton() {
    return (
        <div className="flex flex-row items-start gap-[100px] py-[100px] max-medium-desktop:flex-col max-medium-desktop:gap-10" aria-hidden="true">
            <AboutImageSkeleton />
            <div className="flex flex-col gap-10">
                <SkeletonPulse className="h-9 w-[220px] max-w-[60%]" />
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-3.5 w-full" />
                <SkeletonPulse className="h-10 w-[120px]" />
            </div>
        </div>
    );
}

export function ContactPageSkeleton() {
    return (
        <div className="flex flex-col gap-10 py-[100px]" aria-hidden="true">
            <SkeletonPulse className="h-9 w-[220px] max-w-[60%]" />
            <SkeletonPulse className="h-[120px] w-full max-w-[480px]" />
            <SkeletonPulse className="h-[280px] w-full max-w-[520px]" />
        </div>
    );
}

export function LabsPageSkeleton() {
    return (
        <div className="flex flex-col gap-10 px-8 py-28 max-phone:px-4" aria-hidden="true">
            <div className="flex flex-col gap-4">
                <SkeletonPulse className="h-3 w-[120px]" />
                <SkeletonPulse className="h-10 w-[280px] max-w-[70%]" />
                <SkeletonPulse className="h-3.5 w-full max-w-[520px]" />
            </div>
            <div className="grid grid-cols-3 gap-4 max-small-desktop:grid-cols-1">
                <SkeletonPulse className="h-40 rounded-2xl" />
                <SkeletonPulse className="h-40 rounded-2xl" />
                <SkeletonPulse className="h-40 rounded-2xl" />
            </div>
        </div>
    );
}
